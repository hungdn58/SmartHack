angular.module('starter.controllers', ['ionic'])

.controller('DashCtrl', function($scope, $state, $timeout, DashService) {
	$scope.showFeedDetails = function() {
		$state.go('feed-details');
	}

	$scope.feeds = DashService.getFeeds();

	$scope.doRefresh = function() {
    
	    console.log('Refreshing!');
	    $timeout( function() {
	      //simulate async response
	      $scope.feeds.push({avatar: 'img/ben.png', name: 'Hung Do Ngoc', created: "November 05, 2016", image: "img/place.jpg", description: "Beautiful Place!"});

	      //Stop the ion-refresher from spinning
	      $scope.$broadcast('scroll.refreshComplete');
	    
	    }, 1000);
      
  	};

  	$scope.loadMore = function() {
	    // $http.get('/more-items').success(function(items) {
	    //   // useItems(items);
	   //  $scope.feeds.push({avatar: 'img/max.png', name: 'Ha Phan', created: "October 05, 2016", image: "img/background.png", description: "Beautiful Place!"});
	  	// $scope.$broadcast('scroll.infiniteScrollComplete');
	 //    setTimeout(() => {
	  	 

		//  console.log('Async operation has ended');
		//  // infiniteScroll.complete();
		// }, 500);
	}
})

.controller('NewFeedCtrl', function($scope, Chats) {
	$scope.action = function() {
		$ionicBackdrop.retain();
		$timeout(function() {
			$ionicBackdrop.release();
		}, 1000);
	};

	// Execute action on backdrop disappearing
	$scope.$on('backdrop.hidden', function() {
		// Execute action
	});

	// Execute action on backdrop appearing
	$scope.$on('backdrop.shown', function() {
		// Execute action
	});
	$scope.pets = Chats.allPet();
})

.controller('PetDetailCtrl', function($scope, $stateParams, Chats) {
	// "Pets" is a service returning mock data (services.js)
	$scope.pet = Chats.getPet($stateParams.desId);
})

.controller('ChatsCtrl', function($scope, Chats, $http, $ionicLoading, $ionicModal, $ionicPopup) {
	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//
	//$scope.$on('$ionicView.enter', function(e) {
	//});
	$ionicModal.fromTemplateUrl('modal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.doRefresh = function() {
		var chatItem = {
			id: 0,
			name: 'Ben Sparrow',
			lastText: 'You on your way?',
			face: 'img/ben.png'
		}
		$ionicLoading.show({
			content: 'Loading',
			animation: 'fade-in',
			showBackdrop: true,
			maxWidth: 200,
		showDelay: 0
	});
		$http.get('/#/tab/chats')
		 .success(function(newItems) {
				
			 $scope.chats.push(chatItem); 
		 })
		 .finally(function() {
			 // Stop the ion-refresher from spinning
			 $ionicLoading.hide().then(function(){
			 console.log("The loading indicator is now hidden");
		});
			 $scope.$broadcast('scroll.refreshComplete');
		 });
	};

	$scope.chats = Chats.all();
	$scope.remove = function(chat) {
	 var confirmPopup = $ionicPopup.confirm({
		 title: 'Consume Delete Chat Item',
		 template: 'Are you sure you want to remove this chat from list?'
	 });
	 confirmPopup.then(function(res) {
		 if(res) {
			 console.log('You are sure');
			 Chats.remove(chat);
		 } else {
			 console.log('You are not sure');
		 }
	 });
	};
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
	$scope.chat = Chats.get($stateParams.chatId);
})

.controller('FeedDetailCtrl', function($scope, $stateParams, $ionicModal){
		$ionicModal.fromTemplateUrl('templates/feed-details-comment.html', {
				scope: $scope,
				animation: 'slide-in-up',
				backdropClickToClose: false,
				hardwareBackButtonClose: false,
				focusFirstInput: true
		}).then(function(modal) {
				$scope.modal = modal;
				console.log(modal);
		});

		$scope.openModal = function() {
				
				$scope.modal.show();
				alert("aa");
		};

		$scope.closeModal = function() {
				$scope.modal.hide();
		};
})

.controller('HomeCtrl', function($scope, $ionicPopup, $state, $q, UserService, $ionicLoading) {
	// $scope.chat = Chats.get($stateParams.chatId);
	var myPopup, resetPopup;

	$scope.showSigninPopup = function() {
		$scope.data = {}

		 // An elaborate, custom popup
		myPopup = $ionicPopup.show({
			 templateUrl: 'templates/login.html',
			 cssClass: 'my-custom-popup',
			 scope: $scope,
			 buttons: [

			 ]
		 });
		 // IonicClosePopupService.register(myPopup);
		 myPopup.then(function(res) {
			 console.log('Tapped!', res);
		 });
		 // $timeout(function() {
		 //    myPopup.close(); //close the popup after 3 seconds for some reason
		 // }, 3000);
	}

	$scope.showSignupPopup = function() {
		myPopup = $ionicPopup.show({
			 templateUrl: 'templates/register.html',
			 cssClass: 'my-custom-popup',
			 scope: $scope,
			 buttons: [

			 ]
		 });
		 // IonicClosePopupService.register(myPopup);
		 myPopup.then(function(res) {
			 console.log('Tapped!', res);
		 });
	}

	function validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	function showAlert(title, description) {
		var alertPopup = $ionicPopup.alert({
			title: title,
			template: description
		});
		alertPopup.then(function(res) {
			console.log('Thank you for not eating my delicious ice cream cone');
		});
	};

	$scope.singin = function() {
		var email = document.getElementById('email').value;
		var password = document.getElementById('password').value;

		if (email == "" || password == "") {
				// An alert dialog
				showAlert("Validation", "Email or password is empty!");
				
		} else if (validateEmail(email)) {
			$state.go('tab.dash');
			$scope.hidePopup();
		} else {
			showAlert("Validation", "Email or password is invalid");
		}
	}
 
	 $scope.showResetPopup = function() {
		resetPopup = $ionicPopup.show({
			templateUrl: 'templates/reset-password.html',
			cssClass: 'my-custom-popup',
			scope: $scope,
			buttons: [

			]
		 });
		 // IonicClosePopupService.register(myPopup);
		 myPopup.then(function(res) {
			 console.log('Tapped!', res);
		 });
	}

	$scope.showFeedDetails = function() {
		$state.go('feed-details');
	}

	$scope.hidePopup = function() {
		myPopup.close();
	}

	$scope.hideResetPopup = function() {
		resetPopup.close();
	}

	// This is the success callback from the login method
	var fbLoginSuccess = function(response) {
		if (!response.authResponse){
			fbLoginError("Cannot find the authResponse");
			return;
		}

		var authResponse = response.authResponse;

		getFacebookProfileInfo(authResponse)
		.then(function(profileInfo) {
			// For the purpose of this example I will store user data on local storage
			UserService.setUser({
				authResponse: authResponse,
				userID: profileInfo.id,
				name: profileInfo.name,
				email: profileInfo.email,
				picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
			});
			$ionicLoading.hide();
			$state.go('app.home');
		}, function(fail){
			// Fail get profile info
			console.log('profile info fail', fail);
		});
	};

	// This is the fail callback from the login method
	var fbLoginError = function(error){
		console.log('fbLoginError', error);
		$ionicLoading.hide();
	};

	// This method is to get the user profile info from the facebook api
	var getFacebookProfileInfo = function (authResponse) {
		var info = $q.defer();

		facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
			function (response) {
				console.log(response);
				info.resolve(response);
			},
			function (response) {
				console.log(response);
				info.reject(response);
			}
		);
		return info.promise;
	};

	//This method is executed when the user press the "Login with facebook" button
	$scope.facebookSignIn = function() {
		facebookConnectPlugin.getLoginStatus(function(success){
			if(success.status === 'connected'){
				// The user is logged in and has authenticated your app, and response.authResponse supplies
				// the user's ID, a valid access token, a signed request, and the time the access token
				// and signed request each expire
				console.log('getLoginStatus', success.status);

				// Check if we have our user saved
				var user = UserService.getUser('facebook');

				if(!user.userID){
					getFacebookProfileInfo(success.authResponse)
					.then(function(profileInfo) {
						// For the purpose of this example I will store user data on local storage
						UserService.setUser({
							authResponse: success.authResponse,
							userID: profileInfo.id,
							name: profileInfo.name,
							email: profileInfo.email,
							picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
						});

						$state.go('tab.dash');
					}, function(fail){
						// Fail get profile info
						console.log('profile info fail', fail);
					});
				}else{
					$state.go('tab.dash');
				}
			} else {
				// If (success.status === 'not_authorized') the user is logged in to Facebook,
				// but has not authenticated your app
				// Else the person is not logged into Facebook,
				// so we're not sure if they are logged into this app or not.

				console.log('getLoginStatus', success.status);

				$ionicLoading.show({
					template: 'Logging in...'
				});

				// Ask the permissions you need. You can learn more about
				// FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
				facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
			}
		});
	};

//   $scope.googleSignIn = function() {
//     $ionicLoading.show({
//       template: 'Logging in...'
//     });

//     window.plugins.googleplus.login(
//       {},
//       function (user_data) {
//         // For the purpose of this example I will store user data on local storage
//         UserService.setUser({
//           userID: user_data.userId,
//           name: user_data.displayName,
//           email: user_data.email,
//           picture: user_data.imageUrl,
//           accessToken: user_data.accessToken,
//           idToken: user_data.idToken
//         });

//         $ionicLoading.hide();
//         $state.go('tab.dash');
//       },
//       function (msg) {
//         $ionicLoading.hide();
//       }
//     );
//   };

// })

// .controller('AccountCtrl', function($scope) {
//   $scope.settings = {
//     enableFriends: true
//   };
});
