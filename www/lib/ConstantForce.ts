/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import {IPhysicsObject} from "./IPhysicsObject";
import {World} from "./World";
import {Vector} from "./Vector";
import {ILaw} from "./ILaw";

export class ConstantForce implements ILaw
{ 
    public force:Vector = new Vector();
    
    getForce(object:IPhysicsObject, world:World):Vector
    {
        return this.force;
    }
    
}