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
var Particle_1 = require("../../www/lib/Particle");
var World_1 = require("../../www/lib/World");
var ConstantForce_1 = require("../../www/lib/ConstantForce");
describe("ConstantForceTest", function () {
    it("getForceTest", function () {
        var world = new World_1.World();
        var particle = new Particle_1.Particle();
        var law = new ConstantForce_1.ConstantForce();
        law.force.z = -9.81;
        var actualForce = law.getForce(particle, world);
        assert.equal(law.force, actualForce);
    });
});
