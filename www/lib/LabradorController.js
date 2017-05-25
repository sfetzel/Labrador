require([ "./lib/vendor/angular.min", "Vector", "Particle", "World", "ConstantForce", "HookLaw", "FixedParticle" ], 
function(ang, Vector, Particle, World, ConstantForce, HookLaw, FixedParticle)
{
    var fabricCanvas = new fabric.Canvas("simulation-canvas");
    var width = fabricCanvas.getWidth();
    var height = fabricCanvas.getHeight();
    
    var world = new World.World();
    var gravitation = new ConstantForce.ConstantForce();
    gravitation.force = new Vector.Vector();
    gravitation.force.y = -0.00981;
    world.laws = [ gravitation, new HookLaw.HookLaw()];
    
    function updatePosition(canvasElement, particle)
    {
        particle.position.x = canvasElement.left;
        particle.position.y = height - canvasElement.top;
    }
    
    function addToCanvas(particle)
    {
        var particleCircle = new fabric.Circle({ top: height-particle.position.y, left: particle.position.x, radius: 15 });
        fabricCanvas.add(particleCircle);
        fabricCanvas.on("object:moving", function(e)
        {
            if(e.target === particleCircle)
            {
                updatePosition(e.target, particle);
            }
        });
        return particleCircle;
    }
    
    angular.module('Labrador', [])
        .controller('LabradorController', function($scope)
        {
            $scope.createType = "particle";
            var objectTypes = 
            {
                "particle": Particle.Particle,
                "fixedParticle": FixedParticle.FixedParticle
            }
            
            $scope.addObject = function()
            {
                var particle = new objectTypes[$scope.createType]();
                particle.position = new Vector.Vector();
                particle.position.x = 30;
                particle.position.y = 30;
                particle.caption = "Mass " + ($scope.objects.length+1);
                particle.canvasObject = addToCanvas(particle);
                
                $scope.objects.push(particle);
                world.objects.push(particle);
            }
            
            $scope.stepSimulation = function()
            {
                world.step(10);
                world.objects.forEach(function(object) { 
                    object.step(10); 
                    if(object.canvasObject)
                    { 
                        object.canvasObject.top = height-object.position.y; 
                        object.canvasObject.left = object.position.x; 
                    } 
                });
                fabricCanvas.renderAll();
            }
            
            var simulationTicker = null;
            
            $scope.startSimulation = function()
            {
                if(simulationTicker === null)
                {
                    simulationTicker = setInterval(function() { $scope.stepSimulation(); }, 10);
                }
            }
            
            $scope.stopSimulation = function()
            {
                if(simulationTicker !== null)
                {
                    clearInterval(simulationTicker);
                    simulationTicker = null;
                }
            }
            
            $scope.objects = [ ];
        });
});

