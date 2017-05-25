/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/// <reference path="../../typings/index.d.ts" />
/// <reference path="../../www/lib/Vector.ts" />
"use strict";
var chai = require("chai");
var assert = chai.assert;
var Vector_1 = require("../../www/lib/Vector");
describe("VectorTest", function () {
    it("AddTest", function () {
        var firstVector = new Vector_1.Vector();
        firstVector.x = 10;
        firstVector.y = 12;
        firstVector.z = 1;
        var secondVector = new Vector_1.Vector();
        secondVector.x = -1;
        secondVector.y = 2;
        secondVector.z = 3;
        var sum = firstVector.add(secondVector);
        assert.equal(sum.x, 9);
        assert.equal(sum.y, 14);
        assert.equal(sum.z, 4);
    });
    it("AddNullTest", function () {
        var firstVector = new Vector_1.Vector();
        firstVector.x = 10;
        firstVector.y = 12;
        firstVector.z = 1;
        var sum = firstVector.add(null);
        assert.equal(sum.x, 10);
        assert.equal(sum.y, 12);
        assert.equal(sum.z, 1);
    });
    it("DiffTest", function () {
        var firstVector = new Vector_1.Vector();
        firstVector.x = 10;
        firstVector.y = 12;
        firstVector.z = 1;
        var secondVector = new Vector_1.Vector();
        secondVector.x = -1;
        secondVector.y = 2;
        secondVector.z = 3;
        var sum = firstVector.diff(secondVector);
        assert.equal(sum.x, 11);
        assert.equal(sum.y, 10);
        assert.equal(sum.z, -2);
    });
    it("normTest", function () {
        var vector = new Vector_1.Vector();
        vector.x = 3;
        vector.y = 4;
        vector.z = 5;
        assert.equal(Math.sqrt(50), vector.norm());
    });
    it("normalizeTest", function () {
        var vector = new Vector_1.Vector();
        vector.x = 3;
        vector.y = 4;
        vector.z = 5;
        assert.equal(1, Math.round(vector.normalized().norm()));
    });
    it("sumListTest", function () {
        var firstVector = new Vector_1.Vector();
        firstVector.x = 3;
        firstVector.y = 4;
        firstVector.z = 5;
        var secondVector = new Vector_1.Vector();
        secondVector.x = 2;
        secondVector.y = 6;
        secondVector.z = 7;
        var list = [firstVector, secondVector, firstVector];
        var sum = Vector_1.Vector.sumList(list);
        assert.equal(3 * 2 + 2, sum.x);
        assert.equal(4 * 2 + 6, sum.y);
        assert.equal(5 * 2 + 7, sum.z);
    });
});
