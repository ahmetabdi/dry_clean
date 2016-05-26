angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, $localstorage, Product) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // $scope.chats = Chats.all();
  $scope.chats = [];

  Product.query().then(function(response) {
    $scope.chats = response;
  });

  var post = $localstorage.getObject('post');
  console.log(post);


  // $scope.remove = function(chat) {
  //   Chats.remove(chat);
  // };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

// .controller('SignInCtrl', function($scope, $state) {
//   $scope.signIn = function(user) {
//     console.log('Sign-In', user);
//     $state.go('tabs.home');
//   };
// })

// .controller('HomeTabCtrl', function($scope) {
//   console.log('HomeTabCtrl');
// })

.controller('LoginCtrl', function($scope, $state, $auth) {
  $scope.loginUser = function() {
    $auth.submitLogin($scope.user)
      .then(function(resp) {
        $state.go('tab.dash');
      })
      .catch(function(resp) {
        console.log(resp);
      });
  }
})

.controller('RegisterCtrl', function($scope, $auth) {
  $scope.registerUser = function() {
    $auth.submitRegistration($scope.user)
      .then(function(resp) { // handle success response
        $state.go('login');
      })
      .catch(function(resp) { // handle error response
        console.log(resp);
      });
  };
})

.controller('PostCtrl', function($scope) {
  $scope.getPosts = function() {
    Post.query().then(function (posts) {
      $scope.posts = posts;
    }, function (error) {
      console.log( 'Did not get posts!');
    }).finally(function() {
      // Stop the ion-refresher from spinning
      // $scope.$broadcast('scroll.refreshComplete');
    });
  };
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('MapCtrl', function($scope, $ionicLoading, $compile) {
  var myLatlng = new google.maps.LatLng(51.507351,-0.127758);
  $scope.locationCtrl = {
    coordinates : null
  };

  var mapOptions = {
    center: myLatlng,
    zoom: 12,
    streetViewControl: false,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP]
    },
    mapTypeControl: false,
    scaleControl: true,
    zoomControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
  var compiled = $compile(contentString)($scope);

  var infowindow = new google.maps.InfoWindow({
    content: compiled[0]
  });

  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    draggable: false,
    animation: google.maps.Animation.DROP,
    title: 'London'
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });

  $scope.map = map;
  $scope.locationCtrl.coordinates = $scope.map.getCenter().toUrlValue();

  map.addListener('center_changed', function() {
    $scope.locationCtrl.coordinates = $scope.map.getCenter().toUrlValue();
    $scope.$apply();
  });

  $scope.centerOnMe = function() {
    if(!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      template: 'Getting current location...',
      showBackdrop: true
    });

    navigator.geolocation.getCurrentPosition(function(pos) {
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $ionicLoading.hide();
    }, function(error) {
      alert('Unable to get location: ' + error.message);
    });
  };

  $scope.clickTest = function() {
    alert('Example of infowindow with ng-click')
  };

});
