/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/// <reference path="../../typings/index.d.ts" />
/// <reference path="../../www/lib/Vector.ts" /> 
 
import chai = require('chai');
var assert = chai.assert; 
import { Vector } from "../../www/lib/Vector";
import { Particle } from "../../www/lib/Particle";
import { World } from "../../www/lib/World";
import { ConstantForce } from "../../www/lib/ConstantForce";
import { Spring } from "../../www/lib/Spring";
import { HookLaw } from "../../www/lib/HookLaw";
import { FixedParticle } from "../../www/lib/FixedParticle";

describe("ParticleTest", () => 
{ 
    it("stepTest", () => 
    {
        let particle = new Particle();
        particle.position.x = 10;
        particle.position.y = 12;
        particle.position.z = 13;
        particle.velocity = new Vector();
        particle.velocity.y = 1;
        particle.step(12);

        assert.equal(particle.position.y, 12+12);
        assert.equal(particle.position.x, 10);
        assert.equal(particle.position.z, 13);
    });
    
    it("getForcesTest", () => 
    {
        let world = new World();
        let particle = new Particle();
        let firstLaw = new ConstantForce();
        firstLaw.force.z = -9.81;
        let secondLaw = new ConstantForce();
        secondLaw.force.x = -9.11;
        
        world.laws = [firstLaw, secondLaw];
        
        let forces = particle.getForces(world);
        
        assert.equal(firstLaw.force, forces[0]);
        assert.equal(secondLaw.force, forces[1]);
    });
    
    
     
    it("twoSpringsTest", () => 
    {
        let world = new World();
        var hookLaw = new HookLaw();
        world.laws = [ hookLaw ];
                
        let fixedParticle = new FixedParticle();
        fixedParticle.position.x = 0;
        fixedParticle.position.y = 0;
        fixedParticle.position.z = 0;
        
        let firstParticle = new Particle();
        firstParticle.position.x = 15;
        
        let secondParticle = new Particle();
        secondParticle.position.x = 25;
        
        let firstSpring = new Spring();
        firstSpring.relaxedLength = 10;
        firstSpring.firstParticle = fixedParticle;
        firstSpring.secondParticle = firstParticle;
        firstSpring.newtonPerDistance = 1;
        // actual distance from fixedParticle to firstParticle is 15,
        // it is 5 longer, forces goes to fixedParticle -5*1
        assert.equal(hookLaw.getForceOnSecondParticle(firstParticle, firstSpring).x, -5);
        
        let secondSpring = new Spring();
        secondSpring.relaxedLength = 5;
        secondSpring.firstParticle = firstParticle;
        secondSpring.secondParticle = secondParticle;
        secondSpring.newtonPerDistance = 1;
        // actual distance from firstParticle to secondParticle is 10,
        // it is 5 longer, forces goes to secondParticle 5*1
        assert.equal(hookLaw.getForceOnFirstParticle(firstParticle, secondSpring).x, 5);
        
        world.objects = [ fixedParticle, firstParticle, secondParticle, firstSpring, secondSpring ];
        
        assert.equal(hookLaw.getForces(firstParticle, world).length, 2);
        
        let allForces = firstParticle.getForces(world);
        assert.equal(allForces.length, 1); 
        let actualForce = Vector.sumList(allForces);
        assert.equal(actualForce.x, 0);
        assert.equal(actualForce.y, 0);
        assert.equal(actualForce.z, 0);
    });
});
