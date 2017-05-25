/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
var Vector_1 = require("./Vector");
var ConstantForce = (function () {
    function ConstantForce() {
        this.force = new Vector_1.Vector();
    }
    ConstantForce.prototype.getForce = function (object, world) {
        return this.force;
    };
    return ConstantForce;
}());
exports.ConstantForce = ConstantForce;
