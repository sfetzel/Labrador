/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import {IPhysicsObject} from "./IPhysicsObject";
import {Particle} from "./Particle";

export class Spring implements IPhysicsObject
{
    step(time:number)
    {
        
    }
    
    firstParticle:Particle;
    secondParticle:Particle;
    relaxedLength:number;
    newtonPerDistance:number;
}