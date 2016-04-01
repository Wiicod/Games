// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'


var chrono_player;
var chrono_multi;
var server="http://54.200.82.255/api/";
angular.module('sc', ['ionic','sc.controllers','sc.services','ngCordova'])

.run(function($ionicPlatform,$ionicLoading,DBQuery,RankFactory,ScoreFactory,$rootScope,$interval) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    if(window.cordova) {
      DBQuery.init();
      $ionicLoading.show({ template: 'Mise a jour en cour....<br><ion-spinner icon="android"></ion-spinner>' });
      RankFactory.updateRanks().then(function(){
        $ionicLoading.hide();
        /*RankFactory.getRanks().then(function(data){
          alert(data[0].username+"ooooo"+data[0].id);
        },function(err){
          alert("pas marcher");
        });*/
      },function(msg){
        alert(msg);
        $ionicLoading.hide();
      });
      ScoreFactory.updateScoreOnline();

    }


    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

        if(chrono_multi!=undefined){
          $interval.cancel(chrono_multi);
          chrono_multi=undefined;

        }
        if(chrono_player!=undefined){
          $interval.cancel(chrono_player);
          chrono_player=undefined;
        }
    });



  });
})

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'templates/home-hexa.html',
        controller: 'HomeCtrl'
      })
      .state('logo', {
        url: '/logo',
        templateUrl: 'templates/logo.html',
        controller: 'LogoCtrl'
      })
      .state('multi', {
        url: '/multi',
        templateUrl: 'templates/multi.html',
        controller: 'MultiCtrl'
      })
      .state('play-zen', {
        url: '/play-zen',
        templateUrl: 'templates/play-zen.html',
        controller: 'PlayZenCtrl'
      })
      .state('play-classic', {
        url: '/play-classic',
        templateUrl: 'templates/play-classic.html',
        controller: 'PlayClassicCtrl'
      })
      .state('help', {
        url: '/help',
        templateUrl: 'templates/help.html',
        controller: 'HelpCtrl'
      })
      .state('option', {
        url: '/option',
        templateUrl: 'templates/option.html',
        controller: 'OptionCtrl'
      })
      .state('stats', {
        url: '/stats',
        templateUrl: 'templates/stats.html',
        controller: 'StatsCtrl'
      });
    $urlRouterProvider.otherwise('/home');
  })

  .filter('ordinal', function() {
    return function(input) {
      var s=["th","st","nd","rd"],
        v=input%100;
      return input+(s[(v-20)%10]||s[v]||s[0]);
    }
  });

;
