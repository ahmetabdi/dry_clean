// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.utils', 'ng-token-auth', 'ui.router', 'rails'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.run(function($rootScope, $state) {
  // $rootScope.$on('loading:show', function() {
  //   $state.show({template: 'foo'})
  // })

  // $rootScope.$on('loading:hide', function() {
  //   $state.hide()
  // })

  // Broadcast after successful user authentication. Event message contains the user object.
  // $rootScope.$on('auth:login-success', function(ev, user) {
    // alert('Welcome ', user.email);
  // })

  // Broadcast after user fails authentication.
  $rootScope.$on('auth:login-error', function(ev, reason) {
    alert('auth failed because', reason.errors[0]);
  });

  // Broadcast when the message posted after an oauth login as the new_record attribute set to true.
  $rootScope.$on('auth:oauth-registration', function(ev, user) {
    alert('new user registered through oauth:' + user.email);
  });

  // Broadcast when a user's token is successfully verified using the $auth.validateUser method.
  $rootScope.$on('auth:validation-success', function() {
    // alert("Token successfully verified");
    $state.go('tab.dash');
  })

  // Broadcast when the $auth.validateUser method fails (network error, etc). Note that this does not indicate an invalid token, but an error in the validation process.
  $rootScope.$on('auth:validation-error', function() {
    alert("Token failed to valiadte, please try again. Please ensure you are connected to the internet");
  })

  // Broadcast when a user's token fails validation using the $auth.validateUser method. This is different from the auth:validation-error in that it indicates an invalid token, whereas the auth:validation-error event indicates an error in the validation process.
  $rootScope.$on('auth:invalid', function() {
    alert("Failed to validate token, please login again.");
  })

  // Broadcast after user is successfully logged out using the $auth.signOut method. This event does not contain a message.
  $rootScope.$on('auth:logout-success', function(ev) {
    $state.go('index');
  });

  // Broadcast after failed logout attempts using the $auth.signOut method. Message contains the failed logout response.
  $rootScope.$on('auth:logout-error', function(ev, reason) {
    alert('logout failed because ' + reason.errors[0]);
  });

  // Broadcast after email registration requests complete successfully using the $auth.submitRegistration method. Message contains the params that were sent to the server.
  $rootScope.$on('auth:registration-email-success', function(ev, message) {
    alert("A registration email was sent to " + message.email);
  });

  // Broadcast after failed email registration requests using the $auth.submitRegistration method. Message contains the error response.
  $rootScope.$on('auth:registration-email-error', function(ev, reason) {
    alert(reason.errors.full_messages.join());
  });

  // Broadcast when users arrive from links contained in password-reset emails. This can be used to trigger "welcome" notifications to new users.
  $rootScope.$on('auth:email-confirmation-success', function(ev, user) {
    alert("Welcome, "+user.email+". Your account has been verified.");
  });

  // Broadcast when a user arrives from a link contained in a confirmation email, but the confirmation token fails to validate.
  $rootScope.$on('auth:email-confirmation-error', function(ev, reason) {
    alert("There was an error with your registration.");
  });

  // Broadcast when users successfully submit the password reset form using the $auth.requestPasswordReset method.
  $rootScope.$on('auth:password-reset-request-success', function(ev, data) {
    alert("Password reset instructions were sent to " + data.email);
  });

  // Broadcast after failed requests using the $auth.requestPasswordReset method. Message contains the error response.
  $rootScope.$on('auth:password-reset-request-error', function(ev, resp) {
    alert("Password reset request failed: " + resp.errors[0]);
  });

  // auth:password-reset-confirm-success

  // Broadcast when users arrive from links contained in password reset emails, but the server fails to validate their password reset token.
  $rootScope.$on('auth:password-reset-confirm-error', function(ev, reason) {
    alert("Unable to verify your account. Please try again.");
  });

  // Broadcast when users successfully update their password using the $auth.updatePassword method.
  $rootScope.$on('auth:password-change-success', function(ev) {
    alert("Your password has been successfully updated!");
  });

  // Broadcast when requests resulting from the $auth.updatePassword method fail.
  $rootScope.$on('auth:password-change-error', function(ev, reason) {
    alert("Registration failed: " + reason.errors[0]);
  });

  // Broadcast when users successfully update their account info using the $auth.updateAccount method.
  $rootScope.$on('auth:account-update-success', function(ev) {
    alert("Your account has been successfully updated!");
  });

  // Broadcast when requests resulting from the $auth.updateAccount method fail.
  $rootScope.$on('auth:account-update-error', function(ev, reason) {
    alert("Registration failed: " + reason.errors[0]);
  });

  // Broadcast when users successfully delete their account info using the $auth.destroyAccount method.
  $rootScope.$on('auth:account-destroy-success', function(ev) {
    alert("Your account has been successfully destroyed!");
  });

  // Broadcast when requests resulting from the $auth.destroyAccount method fail.
  $rootScope.$on('auth:account-destroy-error', function(ev, reason) {
    alert("Account deletion failed: " + reason.errors[0]);
  });

  // Broadcast when the $auth.validateUser method fails because a user's token has expired.
  $rootScope.$on('auth:session-expired', function(ev) {
    alert('Session has expired');
  });
})

// ng-token-auth
// The $authProvider is available for injection during the app's configuration phase.
// Use $authProvider.configure to configure the module for use with your server.
// The following settings correspond to the paths that are available when using the devise token auth gem for Rails.
// If you're using this gem, you will only need to set the apiUrl option.
.config(function($authProvider) {
  $authProvider.configure({
      apiUrl: 'http://localhost:3000',
      storage: 'localStorage'
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


  // Index
  .state('index', {
    url: '/',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  // Sign in

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegisterCtrl'
  })
  .state('forgotpassword', {
    url: '/forgot-password',
    templateUrl: 'templates/forgot-password.html'
  })

  // Each tab has its own nav history stack:

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'MapCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/tab/dash');
  // $urlRouterProvider.otherwise('/sign-in');

  $urlRouterProvider.otherwise('/');

});
