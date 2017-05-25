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
var Vector_1 = require("../../www/lib/Vector");
var Particle_1 = require("../../www/lib/Particle");
var World_1 = require("../../www/lib/World");
var ConstantForce_1 = require("../../www/lib/ConstantForce");
describe("ParticleTest", function () {
    it("stepTest", function () {
        var particle = new Particle_1.Particle();
        particle.position.x = 10;
        particle.position.y = 12;
        particle.position.z = 13;
        particle.velocity = new Vector_1.Vector();
        particle.velocity.y = 1;
        particle.step(12);
        assert.equal(particle.position.y, 12 + 12);
        assert.equal(particle.position.x, 10);
        assert.equal(particle.position.z, 13);
    });
    it("getForcesTest", function () {
        var world = new World_1.World();
        var particle = new Particle_1.Particle();
        var firstLaw = new ConstantForce_1.ConstantForce();
        firstLaw.force.z = -9.81;
        var secondLaw = new ConstantForce_1.ConstantForce();
        secondLaw.force.x = -9.11;
        world.laws = [firstLaw, secondLaw];
        var forces = particle.getForces(world);
        assert.equal(firstLaw.force, forces[0]);
        assert.equal(secondLaw.force, forces[1]);
    });
});
