/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import {IPhysicsObject} from "./IPhysicsObject";
import {World} from "./World";
import {Vector} from "./Vector";

export interface ILaw
{
    getForce(particle:IPhysicsObject, world:World):Vector;
}