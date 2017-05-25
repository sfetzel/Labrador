"use strict";
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Vector_1 = require("./Vector");
var Particle = (function () {
    function Particle() {
        this.position = new Vector_1.Vector();
        this.velocity = new Vector_1.Vector();
    }
    Particle.prototype.getForces = function (world) {
        var forces = new Array();
        var thisObject = this;
        world.laws.forEach(function (law) {
            forces.push(law.getForce(thisObject, world));
        });
        return forces;
    };
    Particle.prototype.step = function (time) {
        this.position = this.position.add(this.velocity.multiply(time));
    };
    return Particle;
}());
exports.Particle = Particle;
