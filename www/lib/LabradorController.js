require([ "./lib/vendor/angular.min", "Vector", "Particle", "World", "ConstantForce", "HookLaw", "FixedParticle", "Spring" ], 
function(ang, Vector, Particle, World, ConstantForce, HookLaw, FixedParticle, Spring)
{
    var fabricCanvas = new fabric.Canvas("simulation-canvas");
    var width = fabricCanvas.getWidth();
    var height = fabricCanvas.getHeight();
    
    var world = new World.World();
    var gravitation = new ConstantForce.ConstantForce();
    gravitation.force = new Vector.Vector();
    gravitation.force.y = -9.81;
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
            $scope.timeStep = 0.1;
            $scope.time = 0;
            $scope.selectedItems = [];
            $scope.objects = world.objects;
            
            var objectTypes = 
            {
                "particle": Particle.Particle,
                "fixedParticle": FixedParticle.FixedParticle
            }
            
            $scope.addObject = function()
            {
                var particle = new objectTypes[$scope.createType]();
                particle.position = new Vector.Vector();
                particle.position.x = 30 + $scope.objects.length * 50;
                particle.position.y = height*(3/4);
                particle.type = $scope.createType;
                particle.caption = "Mass " + ($scope.objects.length+1);
                particle.canvasObject = addToCanvas(particle);
                
                world.objects.push(particle);
            }
            
            $scope.addSpring = function()
            {
                var spring = new Spring.Spring();
                spring.firstParticle = $scope.selectedItems[0];
                spring.secondParticle = $scope.selectedItems[1];
                console.log($scope.selectedItems);
                spring.relaxedLength = spring.firstParticle.position.diff(spring.secondParticle.position).norm();
                spring.newtonPerDistance = 1;
                spring.type = "spring";
                spring.caption = "Spring " + ($scope.objects.length+1);

                world.objects.push(spring);
            }
            
            function stepAll(timeStep)
            {
                world.step(timeStep);
                world.objects.forEach(function(object) { 
                    object.step(timeStep); 
                    if(object.canvasObject)
                    { 
                        object.canvasObject.top = height-object.position.y; 
                        object.canvasObject.left = object.position.x; 
                    } 
                });
            }
            
            $scope.stepSimulation = function()
            {
                stepAll($scope.timeStep);
                fabricCanvas.renderAll();
                $scope.time += $scope.timeStep;
                $scope.$apply();
            }
            
            $scope.goToTime = function(destinationTime)
            {
                var step = $scope.timeStep;
                // go back in time, use negative time steps
                if(destinationTime < $scope.time)
                {
                    step = -$scope.timeStep;
                }
                while(Math.round(($scope.time - destinationTime)*10)/10 >= 0.1)
                {
                    stepAll(step);
                    $scope.time += step;
                }
                fabricCanvas.renderAll();
                fabricCanvas.renderTop();
                $scope.$apply();
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
            
        });
});

