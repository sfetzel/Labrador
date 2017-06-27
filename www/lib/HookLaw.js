/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
var Vector_1 = require("./Vector");
var Spring_1 = require("./Spring");
var Particle_1 = require("./Particle");
var HookLaw = (function () {
    function HookLaw() {
    }
    HookLaw.prototype.getForces = function (object, world) {
        var forces = new Array();
        if (world !== null && object instanceof Particle_1.Particle) {
            var self = this;
            world.objects.forEach(function (worldObject) {
                if (worldObject instanceof Spring_1.Spring) {
                    if (worldObject.firstParticle == object) {
                        forces.push(self.getForceOnFirstParticle(object, worldObject));
                    }
                    if (worldObject.secondParticle == object) {
                        forces.push(self.getForceOnSecondParticle(object, worldObject));
                    }
                }
            });
        }
        return forces;
    };
    HookLaw.prototype.getForce = function (object, world) {
        var forces = this.getForces(object, world);
        var force = null;
        if (forces.length > 0) {
            force = Vector_1.Vector.sumList(forces);
        }
        return force;
    };
    HookLaw.prototype.getForceOnFirstParticle = function (firstParticle, spring) {
        var force = null;
        if (firstParticle != null && spring != null) {
            var positionDifference = spring.secondParticle.position.diff(spring.firstParticle.position);
            var distance = positionDifference.norm();
            var differenceToRelaxedLength = distance - spring.relaxedLength;
            var forceLength = spring.newtonPerDistance * differenceToRelaxedLength;
            force = positionDifference.normalized().multiply(forceLength);
        }
        return force;
    };
    HookLaw.prototype.getForceOnSecondParticle = function (secondParticle, spring) {
        return this.getForceOnFirstParticle(secondParticle, spring).multiply(-1);
    };
    return HookLaw;
}());
exports.HookLaw = HookLaw;
