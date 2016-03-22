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

    .controller('HomeCtrl', ['$scope','$ionicPopup','$location',function($scope,$ionicPopup,$location) {
        $('.modal-backdrop').css({'display':'none'});
        $(document).ready(function() {
          var x=(ny-95)/3;
          if(nx>419){
            document.getElementById('container').style.marginTop=x+"px";
          }
        });

      $scope.popupGameMode  = function() {

        var confirmPopup = $ionicPopup.alert({
          title: 'Game mode',
          template: '<hr class="divider-short" style="margin-bottom: 2px;margin-top: 2px;">',
          buttons: [
            {
              text: '<button class="button btn-calmed" ui-sref="play-classic">Classic </button>',
              type: ' btn-gold',
              onTap: function(e) {
                $location.path("play-classic");
              }
            },
            {
              text: '<button class="button" ui-sref="play-zen">Zen </button>',
              type: ' btn-gold',
              onTap: function(e) {
                $location.path("play-zen");
              }
            }
          ]
        });
        confirmPopup.then(function(res) {
          if(res) {
            console.log('You are sure');
          } else {
            console.log('You are not sure');
          }
        });
      };
    }])

    .controller('HelpCtrl', ['$scope',function($scope,NavbarFactory) {

    }])

    .controller('RankCtrl',  ['$scope',function($scope,NavbarFactory) {

    }])

    .controller('PlayZenCtrl',  ['$scope','$ionicPopup','$location',function($scope,$ionicPopup,$location) {
    $scope.popupGamePause  = function() {

      var confirmPopup = $ionicPopup.alert({
        title: 'Score : '+$scope.score,
        //template: 'Score : '+$scope.score,
        buttons: [
          {
            text: '<button class="button btn-calmed" ui-sref="play-classic"><i class="icon ion-refresh"></i> </button>',
            type: ' btn-gold',
            onTap: function(e) {
              $scope.Restart();
            }
          },
          {
            text: '<button class="button" ui-sref="play-zen"><i class="icon ion-play"></i> </button>',
            type: ' btn-gold',
            onTap: function(e) {

            }
          },
          {
            text: '<button class="button" ui-sref="play-zen"><i class="icon ion-android-exit"></i> </button>',
            type: ' btn-gold',
            onTap: function(e) {
              $location.path("home");
            }
          }
        ]
      });
      confirmPopup.then(function(res) {
        if(res) {
          console.log('You are sure');
        } else {
          console.log('You are not sure');
        }
      });
    };
        $scope.time=10;
        var state=true;

        $scope.hit=0;
        $scope.score=$scope.hit+" hit";
        $scope.Click=function(){
            if(state){
                $scope.hit+=10;
                $scope.score=$scope.hit+" hits";
            }
        }

        $('#pauseModal').click(function(){
        })



        $scope.Restart=function(){
            $('.modal-backdrop').css({'display':'none'});
            $('#pauseModal').css({'display':'none'});
            $scope.hit=0
            $scope.score="0 hit";
            state=true;
        }

    }])
    .controller('PlayClassicCtrl',  ['$scope','$interval',function($scope,$interval) {
        $('.modal-backdrop').css({'display':'none'});

        $scope.time=10;
        var chrono;
        var state=true;

        $scope.hit=0;
        $scope.score=$scope.hit+" hit";
        $scope.Click=function(){
            if(state){
                $scope.StartChrono();
                $scope.hit+=10;
                $scope.score=$scope.hit+" hits";
            }
        }

        $('#pauseModal').click(function(){
            //console.log("q");
        })

        // Gestion du chrono
        $scope.StartChrono = function() {
            // Don't start a new fight if we are already fighting
            if ( angular.isDefined(chrono) ) return;

            chrono = $interval(function() {
                if($scope.time>0){
                    $scope.time--;
                    if($scope.time==0){
                        state=false;
                    }
                }
                else{
                    state=false;
                    $scope.StopChrono();
                }

            }, 1000);
        };

        $scope.StopChrono=function(){
            $interval.cancel(chrono);
            chrono=undefined;
        }

        $scope.Restart=function(){
            $('.modal-backdrop').css({'display':'none'});
            $('#pauseModal').css({'display':'none'});
            $scope.hit=0
            $scope.score="0 hit";
            $scope.time=10;
            $scope.StartChrono();
            state=true;
        }

        $scope.StartChrono();
    }])

    .controller('OptionCtrl',  ['$scope',function($scope,NavbarFactory) {

        $scope.SaveOption=function(pseudo,email){
            console.log(pseudo+" | "+email);
        }
    }]);


