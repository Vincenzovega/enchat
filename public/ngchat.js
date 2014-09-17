(function(){


angular.module('chatApp',[]).controller('chatCtrl',function($scope){
	$scope.messages = ["riri","fifi","loulou"];
	$scope.users = ["riri","fifi","loulou"];
	$scope.messages = [];
	$scope.message = "";
	
	socket = io('http://leyne.me:3000');
		this.nickname = null;
	socket.on('connect',function(){
		
	if (nickname === null) {
		do {
		var nickname = prompt("Choose a nickname","Annonymous");
		
		socket.emit('join',nickname,function(reply){
			this.nickname = reply;
			});
		} while (this.nickname !== null);
	
	}
		document.title = 'chat: '+nickname;

		socket.on('join',$scope.addUser);

		socket.on('userlist',$scope.userList);

		socket.on('leave',$scope.delUser);
		socket.on('chat message',$scope.newMsg);
	});
	
	
	
	
	$scope.newMsg = function(message){
		$scope.messages.push(message);
	};

	$scope.userList = function(userlist){
		
		$scope.users = [];
		angular.forEach(userlist,function(user) {$scope.users.push(user);});
		$scope.$apply();
		};
	
	$scope.addUser = function(user) {
		$scope.messages.push(user + ' viens de se connecter');
		$scope.users.push(user);
	}; 
	
	$scope.delUser = function(user) {
		this.messages.push(user + ' viens de se deconnecter');
		$scope.users.splice($scope.users.indexOf(user),1);
	}

	$scope.sendMsg = function(){
		console.log('sending message: '+ $scope.newMsg);
		socket.emit('chat message',$scope.newMsg);
	};

	$scope.newMsg = function(msg){
		$scope.messages.push(msg);
	};


});

	
})()