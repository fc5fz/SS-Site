var app = angular.module('SS', ['ngRoute', 'ngResource']);
app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
			controller: 'HomeCtrl'
        })
		.when('/addTeam', {
            templateUrl: 'partials/addTeam.html',
			controller: 'AddTeamCtrl'
        })
		.when('/:id', {
			templateUrl: 'partials/addTeam.html',
			controller: 'EditTeamCtrl'
		})
		.when('/delete/:id', {
			templateUrl: 'partials/home.html',
			controller: 'HomeCtrl'
		});
		/*
        .otherwise({
            redirectTo: '/team'
        });
		*/
}]);

app.controller('HomeCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){
		var teams = $resource('/api/teams');
		teams.query(function(teams){
			$scope.teams = teams;
		});
		if($routeParams.id) {
			var deleteTeams = $resource('/api/teams/:id');
			$scope.delete = function() {
				deleteTeams.delete({ id: $routeParams.id}, function(team) {
					$location.path('/');
				});
			}
			$scope.delete();
		}
    }]);
app.controller('AddTeamCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){
        $scope.save = function(){
            var teams = $resource('/api/teams');
            teams.save($scope.team, function(){
                $location.path('/');
            });
        };
    }]);
app.controller('EditTeamCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){	
        var Teams = $resource('/api/teams/:id', { id: '@_id' }, {
            update: { method: 'PUT' }
        });

        Teams.get({ id: $routeParams.id }, function(team){
            $scope.team = team;
        });

        $scope.save = function(){
            Teams.update($scope.team, function(){
                $location.path('/');
            });
        }
    }]);