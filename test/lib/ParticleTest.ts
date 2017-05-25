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
});
