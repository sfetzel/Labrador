/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


export class Vector
{
    x:number = 0;
    y:number = 0;
    z:number = 0;
    
    Vector(x?:number, y?:number, z?:number):void
    {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }

    add(secondVector:Vector):Vector
    {
        let sum = new Vector();
        sum.x = this.x;
        sum.y = this.y;
        sum.z = this.z;
        if(secondVector instanceof Vector)
        {
            sum.x += secondVector.x;
            sum.y += secondVector.y;
            sum.z += secondVector.z;
        }
        return sum;
    }
    
    multiply(scalar:number)
    {
        let newVector = new Vector();
        newVector.x = this.x*scalar;
        newVector.y = this.y*scalar;
        newVector.z = this.z*scalar;
        return newVector;
    }
    
    diff(secondVector:Vector):Vector
    {
        return this.add(secondVector.multiply(-1));
    }
    
    norm():number
    {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
    }
    
    normalized():Vector
    {
        return this.multiply(1/this.norm());
    }
    
    static sumList(vectorList:Array<Vector>):Vector
    {
        let sum = new Vector();
        vectorList.forEach(function(vector){
            sum = sum.add(vector);
        })
        return sum;
    }
}