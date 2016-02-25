/**
 * Created by Thedward on 21/02/2016.
 */

angular.module('sc', ['ui.router', 'sc.controllers','sc.services'])

    .run(['$rootScope','NavbarFactory',
        function($rootScope,NavbarFactory){
            /* Translate *
            gettextCatalog.currentLanguage=navigator.language;
            gettextCatalog.debug=true;

            /* End Translate */
            /* ceci est le main de l'application */
            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState){

                /*/ mise a jour du title de la page de maniere automatique
                $rootScope.title=toState.title;
                $rootScope.currentUser={};
                $rootScope.currentUser.roles = [{name:'Admin'},{name:'UserManager '},{name:"User"}];

                AuthorizationFactory.hasAuthorization(toState.access).then(
                    function(data){
                        console.info('authorize');
                    },function(msg){
                        console.error(msg);
                        $state.transitionTo('login');
                    }
                );*/
            });
        }])

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'templates/home-hexa.html',
                controller: 'HomeCtrl'
            })
            .state('rank', {
                url: '/rang',
                templateUrl: 'templates/rank.html',
                controller: 'RankCtrl'
            })
            .state('play', {
                url: '/play',
                templateUrl: 'templates/play.html',
                controller: 'PlayCtrl'
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
                templateUrl: 'templates/Stats.html',
                controller: 'StatsCtrl'
            });
        $urlRouterProvider.otherwise('/home');
    });
//gerer vertical center en fonction des taille d'ecran
//gerer le top et left des icons interieures