/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import {Vector} from "./Vector";
import {World} from "./World";
import {ILaw} from "./ILaw";
import {IParticleAttribute} from "./IParticleAttribute";

export class Particle
{
    position:Vector = new Vector();
    velocity:Vector = new Vector();
    attributes: Array<IParticleAttribute>;

    public getForces(world:World):Array<Vector>
    {
        let forces:Array<Vector> = new Array<Vector>();
        let thisObject = this;
        
        world.laws.forEach(function(law){
            forces.push(law.getForce(thisObject, world));
        })
        return forces;
    }
    
    public step(time:number)
    {
        this.position = this.position.add(this.velocity.multiply(time));
    }
}