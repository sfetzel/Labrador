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
import { Particle } from "../../www/lib/Particle";
import { HookLaw } from "../../www/lib/HookLaw";
import { Spring } from "../../www/lib/Spring";

describe("HookLawTest", () => 
{
    it("getForceOnFirstParticleNullTest", () => 
    {
        let law = new HookLaw();
        assert.isNull(law.getForceOnFirstParticle(null, null));
        assert.isNull(law.getForceOnFirstParticle(undefined, undefined));
    });
    
    it("getForceOnFirstParticleTest", () => 
    {
        let law = new HookLaw();
        
        let firstParticle = new Particle();
        firstParticle.position = new Vector();
        firstParticle.position.x = 0;
        
        let secondParticle = new Particle();
        secondParticle.position = new Vector();
        secondParticle.position.x = 6;
        
        let spring = new Spring();
        spring.firstParticle = firstParticle;
        spring.secondParticle = secondParticle;
        spring.relaxedLength = 4;
        spring.newtonPerDistance = 2;
        
        let force = law.getForceOnFirstParticle(firstParticle, spring);
        assert.isNotNull(force);
        assert.equal(force.x, 2*2);
        
        let contraryForce = law.getForceOnSecondParticle(firstParticle, spring);
        assert.equal(contraryForce.x, -2*2);
    });
});
