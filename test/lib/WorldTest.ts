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
import { Mass } from "../../www/lib/Mass";
import { ConstantForce } from "../../www/lib/ConstantForce";

describe("WorldTest", () => 
{ 
    it("stepTest", () => 
    {
        let world = new World();
        let firstLaw = new ConstantForce();
        firstLaw.force.z = -9.81;
        let secondLaw = new ConstantForce();
        secondLaw.force.x = -9.11;
        
        world.laws = [firstLaw, secondLaw];
                
        let mass = new Mass();
        mass.massValue = 14;
        
        let particle = new Particle();
        particle.attributes = [ mass ];
        particle.position.x = 10;
        particle.position.y = 12;
        particle.position.z = 13;
        particle.velocity = new Vector();
        particle.velocity.y = 1;
        
        world.objects = [particle];
        world.step(12);
        
        assert.equal(particle.velocity.y, 1);
        assert.equal(particle.velocity.x, -9.11*12/14);
        assert.equal(particle.velocity.z, -9.81*12/14);
    });
});
