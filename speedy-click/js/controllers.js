angular.module('sc.controllers', [])

    .controller('SCCtrl', ['$scope','$rootScope',function($scope,$rootScope) {
        $scope.wiicod_name="Wiicod";
        $scope.wiicod_link="http://www.wiicod.com";

        $scope.error_mesage_pseudo="Pseudo all ready use, take an other";
        
    }])

    .controller('StatsCtrl', ['$scope',function($scope,NavbarFactory){
        $scope.score=[
          {"rang":1,"nom":"Zephyr","point":4125},
          {"rang":1,"nom":"Slim","point":125}
        ];
    }])

    .controller('HomeCtrl', ['$scope','$rootScope',function($scope,$rootScope) {

    }])

    .controller('MenuCtrl', ['$scope','$rootScope',function($scope,$rootScope){
        
    }])

    .controller('HelpCtrl', ['$scope',function($scope,NavbarFactory) {
       
    }])

    .controller('RankCtrl',  ['$scope',function($scope,NavbarFactory) {
        
    }])

    .controller('PlayCtrl',  ['$scope',function($scope,NavbarFactory) {
        $scope.hit=0;
        $scope.score=$scope.hit+" hit";
        $scope.Click=function(){
            $scope.hit+=10;
            $scope.score=$scope.hit+" hits";
        }
    }])

    .controller('OptionCtrl',  ['$scope',function($scope,NavbarFactory) {

        $scope.SaveOption=function(pseudo,email){
            console.log(pseudo+" | "+email);
        }
    }]);


