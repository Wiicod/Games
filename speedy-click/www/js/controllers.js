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
          var y=(ny-95-384)/2;
          if(nx>419){
            document.getElementById('container').style.marginTop=x+"px";
          }
          else{
            document.getElementById('container').style.marginTop=y+"px";
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

    .controller('MultiCtrl',  ['$scope','$ionicPopup','$location','$interval',function($scope,$ionicPopup,$location,$interval) {
      $(".play-zone").css('height',(ny-95-43)/2+"px");
      $("#play-zone2").css("margin-top","43px");

      var time=10;
      $scope.time="10s";
      var chrono;
      var state=true;

      $scope.hit1=0;
      $scope.hit2=0;
      $scope.Click1=function(){
        if(state){
          $scope.StartChrono();
          $scope.hit1+=10;
        }
      };
      $scope.Click2=function(){
        if(state){
          $scope.StartChrono();
          $scope.hit2+=10;
        }
      };

      $scope.winner="";

      // Gestion du chrono
      $scope.StartChrono = function() {
        // Don't start a new fight if we are already fighting
        if ( angular.isDefined(chrono) ) return;

        chrono = $interval(function() {
          if(time>0){
            time--;
            $scope.time="00:0"+time;
            if(time==0){
              state=false;
            }
          }
          else{
            state=false;
            if($scope.hit1>$scope.hit2){
              $scope.winner="Winner is <span style='color: #cc0000; font-weight: bold;'>Player 1";
            }
            else if($scope.hit1<$scope.hit2){
              $scope.winner="Winner is <span style='color: #cc0000; font-weight: bold;'>Player 2";
            }
            else {
              $scope.winner="Egality";
            }
            $scope.popupGameEnd();
            $scope.StopChrono();
          }

        }, 1000);
      };

      $scope.StopChrono=function(){
        $interval.cancel(chrono);
        chrono=undefined;
      }

      $scope.Restart=function(){
        $scope.hit1=0
        $scope.hit2=0
        $scope.time="10s";
        time=10;
        $scope.StartChrono();
        state=true;
      }

      $scope.StartChrono();

      $scope.popupGameEnd  = function() {
        var confirmPopup = $ionicPopup.alert({
          title: $scope.winner,
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
    .controller('PlayClassicCtrl',  ['$scope','$ionicPopup','$location','$interval',function($scope,$ionicPopup,$location,$interval) {
        $scope.popupGamePause  = function(etat) {
          $scope.StopChrono();

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
                  if(!etat){
                    $scope.StartChrono();
                  }
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

        var time=10;
        $scope.time="10s";
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


        // Gestion du chrono
        $scope.StartChrono = function() {
            // Don't start a new fight if we are already fighting
            if ( angular.isDefined(chrono) ) return;

            chrono = $interval(function() {
                if(time>0){
                    time--;
                    $scope.time="00:0"+time;
                    if(time==0){
                        state=false;
                    }
                }
                else{
                    state=false;
                    $scope.popupGamePause(true);
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
            $scope.time="10s";
            time=10;
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


