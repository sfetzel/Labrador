/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import {IPhysicsObject} from "./IPhysicsObject";
import {World} from "./World";
import {Vector} from "./Vector";
import {ILaw} from "./ILaw";
import {Spring} from "./Spring";
import {Particle} from "./Particle";

export class HookLaw implements ILaw
{
    getForce(object:IPhysicsObject, world:World):Vector
    {
        var force = null;
        if(world !== null && object instanceof Particle)
        {
            var self = this;
            world.objects.forEach(function(worldObject)
            {
                if(worldObject instanceof Spring)
                {
                    if (worldObject.firstParticle == object)
                    {
                        force = self.getForceOnFirstParticle(object, worldObject);
                    }
                    if (worldObject.secondParticle == object)
                    {
                        force = self.getForceOnSecondParticle(object, worldObject);
                    }
                }
            })
        }
        return force;
    }
    
    getForceOnFirstParticle(firstParticle:Particle, spring:Spring):Vector
    {
        let force = null;
        if(firstParticle != null && spring != null)
        {
            let positionDifference = spring.secondParticle.position.diff(spring.firstParticle.position);
            let distance = positionDifference.norm();
            let differenceToRelaxedLength = distance - spring.relaxedLength;
            let forceLength = spring.newtonPerDistance * differenceToRelaxedLength;

            force = positionDifference.normalized().multiply(forceLength);
        }
        return force;
    }
    
    getForceOnSecondParticle(secondParticle:Particle, spring:Spring):Vector
    {
        return this.getForceOnFirstParticle(secondParticle, spring).multiply(-1);
    }
}