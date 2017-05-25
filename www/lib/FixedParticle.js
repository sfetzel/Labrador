"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Particle_1 = require("./Particle");
var FixedParticle = (function (_super) {
    __extends(FixedParticle, _super);
    function FixedParticle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FixedParticle.prototype.getForces = function (world) {
        return new Array();
    };
    return FixedParticle;
}(Particle_1.Particle));
exports.FixedParticle = FixedParticle;
