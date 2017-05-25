/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/// <reference path="../../typings/index.d.ts" />
/// <reference path="../../www/lib/Vector.ts" />
 
import chai = require('chai');
var assert = chai.assert; 
import { Vector } from "../../www/lib/Vector";

describe("VectorTest", () => 
{
    it("AddTest", () => 
    {
        let firstVector = new Vector();
        firstVector.x = 10;
        firstVector.y = 12;
        firstVector.z = 1;
        
        let secondVector = new Vector();
        secondVector.x = -1;
        secondVector.y = 2;
        secondVector.z = 3;
        
        let sum = firstVector.add(secondVector);
        assert.equal(sum.x, 9);
        assert.equal(sum.y, 14);
        assert.equal(sum.z, 4);
    });
    
    it("AddNullTest", () => 
    {
        let firstVector = new Vector();
        firstVector.x = 10;
        firstVector.y = 12;
        firstVector.z = 1;
        
        let sum = firstVector.add(null);
        assert.equal(sum.x, 10);
        assert.equal(sum.y, 12);
        assert.equal(sum.z, 1);
    });
    
    it("DiffTest", () => 
    {
        let firstVector = new Vector();
        firstVector.x = 10;
        firstVector.y = 12;
        firstVector.z = 1;
        
        let secondVector = new Vector();
        secondVector.x = -1;
        secondVector.y = 2;
        secondVector.z = 3;
        
        let sum = firstVector.diff(secondVector);
        assert.equal(sum.x, 11);
        assert.equal(sum.y, 10);
        assert.equal(sum.z, -2);
    });
    
    it("normTest", () =>
    {
        let vector = new Vector();
        vector.x = 3;
        vector.y = 4;
        vector.z = 5;
        assert.equal(Math.sqrt(50), vector.norm());
    });
    
    it("normalizeTest", () =>
    {
        let vector = new Vector();
        vector.x = 3;
        vector.y = 4;
        vector.z = 5;
        assert.equal(1, Math.round(vector.normalized().norm()));
    });
    
        
    it("sumListTest", () =>
    {
        let firstVector = new Vector();
        firstVector.x = 3;
        firstVector.y = 4;
        firstVector.z = 5;
        let secondVector = new Vector();
        secondVector.x = 2;
        secondVector.y = 6;
        secondVector.z = 7;
        let list = [firstVector, secondVector, firstVector];
        let sum = Vector.sumList(list);
        assert.equal(3*2 + 2, sum.x);
        assert.equal(4*2 + 6, sum.y);
        assert.equal(5*2 + 7, sum.z);
    });
});