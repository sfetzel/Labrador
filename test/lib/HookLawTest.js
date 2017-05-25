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
var HookLaw_1 = require("../../www/lib/HookLaw");
var Spring_1 = require("../../www/lib/Spring");
describe("HookLawTest", function () {
    it("getForceOnFirstParticleNullTest", function () {
        var law = new HookLaw_1.HookLaw();
        assert.isNull(law.getForceOnFirstParticle(null, null));
        assert.isNull(law.getForceOnFirstParticle(undefined, undefined));
    });
    it("getForceOnFirstParticleTest", function () {
        var law = new HookLaw_1.HookLaw();
        var firstParticle = new Particle_1.Particle();
        firstParticle.position = new Vector_1.Vector();
        firstParticle.position.x = 0;
        var secondParticle = new Particle_1.Particle();
        secondParticle.position = new Vector_1.Vector();
        secondParticle.position.x = 6;
        var spring = new Spring_1.Spring();
        spring.firstParticle = firstParticle;
        spring.secondParticle = secondParticle;
        spring.relaxedLength = 4;
        spring.newtonPerDistance = 2;
        var force = law.getForceOnFirstParticle(firstParticle, spring);
        assert.isNotNull(force);
        assert.equal(force.x, 2 * 2);
        var contraryForce = law.getForceOnSecondParticle(firstParticle, spring);
        assert.equal(contraryForce.x, -2 * 2);
    });
});
