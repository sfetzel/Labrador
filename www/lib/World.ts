/* 
 */
 
import {IPhysicsObject} from "./IPhysicsObject";
import {ILaw} from "./ILaw";
import {Particle} from "./Particle";
import {Vector} from "./Vector";
import {Mass} from "./Mass";

export class World
{
    public objects:Array<IPhysicsObject> = new Array();
    public laws:Array<ILaw>;
    
    step(time:number) 
    {
        var self = this;
        this.objects.forEach((object) =>
        {
            if(object instanceof Particle)
            {
                let forces = object.getForces(self);
                let sumForce = Vector.sumList(forces);
                
                let mass = 1;
                if (object.attributes instanceof Array)
                {
                    // use mass from particle if present
                    object.attributes.forEach((attribute) => 
                    {
                        if(attribute instanceof Mass)
                        {
                            mass = attribute.massValue;
                        }
                    })
                }
                // use F * Delta t = m * Delta v
                object.velocity = object.velocity.add(sumForce.multiply(time / mass));
            }
        });
    }
}