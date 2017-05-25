/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import {Particle} from "./Particle";
import {Vector} from "./Vector";
import {World} from "./World";

export class FixedParticle extends Particle
{
    public getForces(world:World):Array<Vector>
    {
        return new Array<Vector>();
    }
}