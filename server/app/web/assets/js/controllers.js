'use strict';

var ctrl = angular.module('wtfControllers', []);


ctrl.controller('globalCtrl', ['$rootScope', 'SocketHandler', '$filter', function($rootScope, socket, $filter) {
	$rootScope.patterns = []
	$rootScope.events = ""
	socket.on('livepattern', (pattern) => {
		$rootScope.events = $filter('date')(new Date, "HH:mm:ss")+" | "+pattern.join("")+"\n"+$rootScope.events
		console.log(pattern)
	})
	socket.on('patterns', (patterns) => {
		$rootScope.patterns = []
		for (var k in patterns) {
			patterns[k].forEach((item) => {
				$rootScope.patterns.push(item)
			})
		}
	})
}])


ctrl.controller('modCtrl', ['$rootScope', '$scope', 'SocketHandler', '$state', function($rootScope, $scope, socket, $state) {
	if ($rootScope.$stateParams.id === "0") {
		$scope.pattern = {
			id: 0,
			name: "",
			url: "",
			pattern: ""
		}
	} else {
		for (var k in $rootScope.patterns) {
			if ($rootScope.patterns[k].id == $rootScope.$stateParams.id) {
				$scope.pattern = $rootScope.patterns[k]
				break
			}
		}
		if (!$scope.pattern) $state.go("home")
	}
	$scope.save = function() {
		socket.emit("savepattern", {id: $scope.pattern.id,  pattern: $scope.pattern})
		$state.go("home")
	}
	$scope.delete = function() {
		socket.emit("delpattern", $scope.pattern.id)
		$state.go("home")
	}
}])