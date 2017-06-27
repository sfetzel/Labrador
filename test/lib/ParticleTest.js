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
var Spring_1 = require("../../www/lib/Spring");
var HookLaw_1 = require("../../www/lib/HookLaw");
var FixedParticle_1 = require("../../www/lib/FixedParticle");
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
    it("twoSpringsTest", function () {
        var world = new World_1.World();
        var hookLaw = new HookLaw_1.HookLaw();
        world.laws = [hookLaw];
        var fixedParticle = new FixedParticle_1.FixedParticle();
        fixedParticle.position.x = 0;
        fixedParticle.position.y = 0;
        fixedParticle.position.z = 0;
        var firstParticle = new Particle_1.Particle();
        firstParticle.position.x = 15;
        var secondParticle = new Particle_1.Particle();
        secondParticle.position.x = 25;
        var firstSpring = new Spring_1.Spring();
        firstSpring.relaxedLength = 10;
        firstSpring.firstParticle = fixedParticle;
        firstSpring.secondParticle = firstParticle;
        firstSpring.newtonPerDistance = 1;
        // actual distance from fixedParticle to firstParticle is 15,
        // it is 5 longer, forces goes to fixedParticle -5*1
        assert.equal(hookLaw.getForceOnSecondParticle(firstParticle, firstSpring).x, -5);
        var secondSpring = new Spring_1.Spring();
        secondSpring.relaxedLength = 5;
        secondSpring.firstParticle = firstParticle;
        secondSpring.secondParticle = secondParticle;
        secondSpring.newtonPerDistance = 1;
        // actual distance from firstParticle to secondParticle is 10,
        // it is 5 longer, forces goes to secondParticle 5*1
        assert.equal(hookLaw.getForceOnFirstParticle(firstParticle, secondSpring).x, 5);
        world.objects = [fixedParticle, firstParticle, secondParticle, firstSpring, secondSpring];
        assert.equal(hookLaw.getForces(firstParticle, world).length, 2);
        var allForces = firstParticle.getForces(world);
        assert.equal(allForces.length, 1);
        var actualForce = Vector_1.Vector.sumList(allForces);
        assert.equal(actualForce.x, 0);
        assert.equal(actualForce.y, 0);
        assert.equal(actualForce.z, 0);
    });
});
