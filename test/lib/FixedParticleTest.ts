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
import { FixedParticle } from "../../www/lib/FixedParticle";
import { World } from "../../www/lib/World";
import { ConstantForce } from "../../www/lib/ConstantForce";

describe("FixedParticleTest", () => 
{ 
    it("getForceTest", () => 
    {
        let world = new World();
        let particle = new FixedParticle();
        let law = new ConstantForce();
        law.force.z = -9.81;
        let actualForces = particle.getForces(world);
        
        assert.equal(0, actualForces.length);
    });
});

