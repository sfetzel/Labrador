/*
 */
"use strict";
var Particle_1 = require("./Particle");
var Vector_1 = require("./Vector");
var Mass_1 = require("./Mass");
var World = (function () {
    function World() {
        this.objects = new Array();
    }
    World.prototype.step = function (time) {
        var self = this;
        this.objects.forEach(function (object) {
            if (object instanceof Particle_1.Particle) {
                var forces = object.getForces(self);
                var sumForce = Vector_1.Vector.sumList(forces);
                var mass_1 = 1;
                if (object.attributes instanceof Array) {
                    // use mass from particle if present
                    object.attributes.forEach(function (attribute) {
                        if (attribute instanceof Mass_1.Mass) {
                            mass_1 = attribute.massValue;
                        }
                    });
                }
                // use F * Delta t = m * Delta v
                object.velocity = object.velocity.add(sumForce.multiply(time / mass_1));
            }
        });
    };
    return World;
}());
exports.World = World;
