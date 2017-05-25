/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
var Vector = (function () {
    function Vector() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
    Vector.prototype.Vector = function (x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    };
    Vector.prototype.add = function (secondVector) {
        var sum = new Vector();
        sum.x = this.x;
        sum.y = this.y;
        sum.z = this.z;
        if (secondVector instanceof Vector) {
            sum.x += secondVector.x;
            sum.y += secondVector.y;
            sum.z += secondVector.z;
        }
        return sum;
    };
    Vector.prototype.multiply = function (scalar) {
        var newVector = new Vector();
        newVector.x = this.x * scalar;
        newVector.y = this.y * scalar;
        newVector.z = this.z * scalar;
        return newVector;
    };
    Vector.prototype.diff = function (secondVector) {
        return this.add(secondVector.multiply(-1));
    };
    Vector.prototype.norm = function () {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
    };
    Vector.prototype.normalized = function () {
        return this.multiply(1 / this.norm());
    };
    Vector.sumList = function (vectorList) {
        var sum = new Vector();
        vectorList.forEach(function (vector) {
            sum = sum.add(vector);
        });
        return sum;
    };
    return Vector;
}());
exports.Vector = Vector;
