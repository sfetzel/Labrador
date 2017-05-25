/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


export interface IPhysicsObject
{
    /**
     * step for the provided time in milliseconds
     */
    step(time:number):void;
} 
