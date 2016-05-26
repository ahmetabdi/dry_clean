angular.module('starter.utils', [])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])

// USAGE

// $localstorage.set('name', 'Max');
// $localstorage.get('name')

// $localstorage.setObject('post', {
//   name: 'Thoughts',
//   text: 'Today was a good day'
// });

// $localstorage.getObject('post');
