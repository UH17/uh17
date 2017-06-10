'use strict';

/* Factory */
var fty = angular.module("wtfFactory", ['btford.socket-io']);


fty.factory('SocketHandler', function(socketFactory) {
	return socketFactory()
})
