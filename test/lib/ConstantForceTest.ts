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

describe("ConstantForceTest", () => 
{ 
    it("getForceTest", () => 
    {
        let world = new World();
        let particle = new Particle();
        let law = new ConstantForce();
        law.force.z = -9.81;
        let actualForce = law.getForce(particle, world);
        assert.equal(law.force, actualForce);
    });
});
