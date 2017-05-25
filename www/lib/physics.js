var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define("IPhysicsObject", ["require", "exports"], function (require, exports) {
    "use strict";
});
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define("Vector", ["require", "exports"], function (require, exports) {
    "use strict";
    var Vector = (function () {
        function Vector() {
            this.x = 0;
            this.y = 0;
            this.z = 0;
        }
        Vector.prototype.Vector = function (x, y, z) {
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
        };
        Vector.prototype.add = function (secondVector) {
            var sum = new Vector();
            sum.x = this.x;
            sum.y = this.y;
            sum.z = this.z;
            if (secondVector instanceof Vector) {
                sum.x += secondVector.x;
                sum.y += secondVector.y;
                sum.z += secondVector.z;
            }
            return sum;
        };
        Vector.prototype.multiply = function (scalar) {
            var newVector = new Vector();
            newVector.x = this.x * scalar;
            newVector.y = this.y * scalar;
            newVector.z = this.z * scalar;
            return newVector;
        };
        Vector.prototype.diff = function (secondVector) {
            return this.add(secondVector.multiply(-1));
        };
        Vector.prototype.norm = function () {
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
        };
        Vector.prototype.normalized = function () {
            return this.multiply(1 / this.norm());
        };
        Vector.sumList = function (vectorList) {
            var sum = new Vector();
            vectorList.forEach(function (vector) {
                sum = sum.add(vector);
            });
            return sum;
        };
        return Vector;
    }());
    exports.Vector = Vector;
});
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define("ILaw", ["require", "exports"], function (require, exports) {
    "use strict";
});
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define("IParticleAttribute", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("Particle", ["require", "exports", "Vector"], function (require, exports, Vector_1) {
    "use strict";
    var Particle = (function () {
        function Particle() {
            this.position = new Vector_1.Vector();
            this.velocity = new Vector_1.Vector();
        }
        Particle.prototype.getForces = function (world) {
            var forces = new Array();
            var thisObject = this;
            world.laws.forEach(function (law) {
                forces.push(law.getForce(thisObject, world));
            });
            return forces;
        };
        Particle.prototype.step = function (time) {
            this.position = this.position.add(this.velocity.multiply(time));
        };
        return Particle;
    }());
    exports.Particle = Particle;
});
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define("Mass", ["require", "exports"], function (require, exports) {
    "use strict";
    var Mass = (function () {
        function Mass() {
        }
        return Mass;
    }());
    exports.Mass = Mass;
});
/*
 */
define("World", ["require", "exports", "Particle", "Vector", "Mass"], function (require, exports, Particle_1, Vector_2, Mass_1) {
    "use strict";
    var World = (function () {
        function World() {
            this.objects = new Array();
        }
        World.prototype.step = function (time) {
            var self = this;
            this.objects.forEach(function (object) {
                if (object instanceof Particle_1.Particle) {
                    var forces = object.getForces(self);
                    var sumForce = Vector_2.Vector.sumList(forces);
                    var mass_1 = 1;
                    if (object.attributes instanceof Array) {
                        // use mass from particle if present
                        object.attributes.forEach(function (attribute) {
                            if (attribute instanceof Mass_1.Mass) {
                                mass_1 = attribute.massValue;
                            }
                        });
                    }
                    // use F * Delta t = m * Delta v
                    object.velocity = object.velocity.add(sumForce.multiply(time / mass_1));
                }
            });
        };
        return World;
    }());
    exports.World = World;
});
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define("ConstantForce", ["require", "exports", "Vector"], function (require, exports, Vector_3) {
    "use strict";
    var ConstantForce = (function () {
        function ConstantForce() {
            this.force = new Vector_3.Vector();
        }
        ConstantForce.prototype.getForce = function (object, world) {
            return this.force;
        };
        return ConstantForce;
    }());
    exports.ConstantForce = ConstantForce;
});
define("FixedParticle", ["require", "exports", "Particle"], function (require, exports, Particle_2) {
    "use strict";
    var FixedParticle = (function (_super) {
        __extends(FixedParticle, _super);
        function FixedParticle() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FixedParticle.prototype.getForces = function (world) {
            return new Array();
        };
        return FixedParticle;
    }(Particle_2.Particle));
    exports.FixedParticle = FixedParticle;
});
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define("Spring", ["require", "exports"], function (require, exports) {
    "use strict";
    var Spring = (function () {
        function Spring() {
        }
        Spring.prototype.step = function (time) {
        };
        return Spring;
    }());
    exports.Spring = Spring;
});
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define("HookLaw", ["require", "exports", "Spring", "Particle"], function (require, exports, Spring_1, Particle_3) {
    "use strict";
    var HookLaw = (function () {
        function HookLaw() {
        }
        HookLaw.prototype.getForce = function (object, world) {
            var force = null;
            if (world !== null && object instanceof Particle_3.Particle) {
                var self = this;
                world.objects.forEach(function (worldObject) {
                    if (worldObject instanceof Spring_1.Spring) {
                        if (worldObject.firstParticle == object) {
                            force = self.getForceOnFirstParticle(object, worldObject);
                        }
                        if (worldObject.secondParticle == object) {
                            force = self.getForceOnSecondParticle(object, worldObject);
                        }
                    }
                });
            }
            return force;
        };
        HookLaw.prototype.getForceOnFirstParticle = function (firstParticle, spring) {
            var force = null;
            if (firstParticle != null && spring != null) {
                var positionDifference = spring.secondParticle.position.diff(spring.firstParticle.position);
                var distance = positionDifference.norm();
                var differenceToRelaxedLength = distance - spring.relaxedLength;
                var forceLength = spring.newtonPerDistance * differenceToRelaxedLength;
                force = positionDifference.normalized().multiply(forceLength);
            }
            return force;
        };
        HookLaw.prototype.getForceOnSecondParticle = function (secondParticle, spring) {
            return this.getForceOnFirstParticle(secondParticle, spring).multiply(-1);
        };
        return HookLaw;
    }());
    exports.HookLaw = HookLaw;
});
define("SimulationController", ["require", "exports", "angular"], function (require, exports, angular) {
    "use strict";
    var LabradorController = (function () {
        function LabradorController() {
        }
        return LabradorController;
    }());
    angular.module('Labrador', []).controller(LabradorController);
});
