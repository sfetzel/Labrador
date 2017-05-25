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
var Mass_1 = require("../../www/lib/Mass");
var ConstantForce_1 = require("../../www/lib/ConstantForce");
describe("WorldTest", function () {
    it("stepTest", function () {
        var world = new World_1.World();
        var firstLaw = new ConstantForce_1.ConstantForce();
        firstLaw.force.z = -9.81;
        var secondLaw = new ConstantForce_1.ConstantForce();
        secondLaw.force.x = -9.11;
        world.laws = [firstLaw, secondLaw];
        var mass = new Mass_1.Mass();
        mass.massValue = 14;
        var particle = new Particle_1.Particle();
        particle.attributes = [mass];
        particle.position.x = 10;
        particle.position.y = 12;
        particle.position.z = 13;
        particle.velocity = new Vector_1.Vector();
        particle.velocity.y = 1;
        world.objects = [particle];
        world.step(12);
        assert.equal(particle.velocity.y, 1);
        assert.equal(particle.velocity.x, -9.11 * 12 / 14);
        assert.equal(particle.velocity.z, -9.81 * 12 / 14);
    });
});
