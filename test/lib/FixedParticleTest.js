/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
/// <reference path="../../typings/index.d.ts" />
/// <reference path="../../www/lib/Vector.ts" /> 
var chai = require("chai");
var assert = chai.assert;
var FixedParticle_1 = require("../../www/lib/FixedParticle");
var World_1 = require("../../www/lib/World");
var ConstantForce_1 = require("../../www/lib/ConstantForce");
describe("FixedParticleTest", function () {
    it("getForceTest", function () {
        var world = new World_1.World();
        var particle = new FixedParticle_1.FixedParticle();
        var law = new ConstantForce_1.ConstantForce();
        law.force.z = -9.81;
        var actualForces = particle.getForces(world);
        assert.equal(0, actualForces.length);
    });
});
