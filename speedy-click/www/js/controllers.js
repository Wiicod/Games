angular.module('sc.controllers', [])

    .controller('SCCtrl', ['$scope','$rootScope',function($scope,$rootScope) {
        $scope.wiicod_name="Wiicod";
        $scope.wiicod_link="http://www.wiicod.com";

        $scope.error_mesage_pseudo="Pseudo all ready use, take an other";

    }])

    .controller('StatsCtrl', ['$scope',function($scope){
        $scope.score=[
          {"rang":1,"nom":"Zephyr","point":4125},
          {"rang":1,"nom":"Slim","point":125}
        ];
    }])

    .controller('HomeCtrl', ['$scope','$ionicPopup','$location',function($scope,$ionicPopup,$location) {

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

    .controller('MultiCtrl',  ['$scope','$ionicPopup','$location','$interval','$timeout',
    function($scope,$ionicPopup,$location,$interval,$timeout) {
      $(".play-zone").css('height',(ny-95)/2+"px");
      $("#play-zone2").css("margin-top","43px");

      var time=10;
      $scope.time="10s";
      var chrono;
      var state=true;

      $scope.hit1=0;
      $scope.hit2=0;
      $scope.Click1=function(e){
        if(state){
          if(compteur1%3==0){
            $('#bonus1').removeClass('red');
            $('#bonus1').removeClass('gold');
            $('#bonus1').addClass('white');
          }
          else if(compteur1%3==1){
            $('#bonus1').removeClass('red');
            $('#bonus1').addClass('gold');
            $('#bonus1').removeClass('white');
          }
          else if(compteur1%3==2){
            $('#bonus1').addClass('red');
            $('#bonus1').removeClass('gold');
            $('#bonus1').removeClass('white');
          }
          $timeout(function(){
            $("#bonus1").css('top', '-100px');
            $("#bonus1").css('left', '-100px');
          },500);

          compteur1++;
          $("#bonus1").css('top', (e.clientY-25)+'px');
          $("#bonus1").css('left', (e.clientX-25)+'px');

          $scope.StartChrono();
          $scope.hit1+=10;
        }
      };
      var compteur1=0;
      var compteur2=0;

      $scope.Click2=function(e){
        if(state){
          if(compteur2%3==0){
            $('#bonus2').removeClass('red');
            $('#bonus2').removeClass('gold');
            $('#bonus2').addClass('white');
          }
          else if(compteur2%3==1){
            $('#bonus2').removeClass('red');
            $('#bonus2').addClass('gold');
            $('#bonus2').removeClass('white');
          }
          else if(compteur2%3==2){
            $('#bonus2').addClass('red');
            $('#bonus2').removeClass('gold');
            $('#bonus2').removeClass('white');
          }
          $timeout(function(){
            $("#bonus2").css('top', '-100px');
            $("#bonus2").css('left', '-100px');
          },500);
          compteur2++;
          $("#bonus2").css('top', (e.clientY-25)+'px');
          $("#bonus2").css('left', (e.clientX-25)+'px');

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
            $scope.time=""+time;
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
            $scope.popupGameEnd(true);
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
        compteur1=0;
        compteur2=0;
      }

      $scope.popupGameEnd  = function(etat) {
        $scope.StopChrono();
        if($scope.winner==""){
          $scope.winner="Pause";
        }
        var hide="";
        if(etat){
          hide="hide";
        }
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
              text: '<button class="button btn-calmed" ui-sref="play-classic"><i class="icon ion-play"></i> </button>',
              type: ' btn-gold '+hide,
              onTap: function(e) {
                $scope.StartChrono();
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

      $scope.StartChrono();
    }])

    .controller('PlayZenCtrl',  ['$scope','$ionicPopup','$location','$timeout',function($scope,$ionicPopup,$location,$timeout) {

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
      var compteur1=0;

      $scope.hit=0;
      $scope.score=$scope.hit+" hit";
      $scope.Click=function(e){
          if(state){
            if(compteur1%3==0){
              $('#bonus1').removeClass('red');
              $('#bonus1').removeClass('gold');
              $('#bonus1').addClass('white');
            }
            else if(compteur1%3==1){
              $('#bonus1').removeClass('red');
              $('#bonus1').addClass('gold');
              $('#bonus1').removeClass('white');
            }
            else if(compteur1%3==2){
              $('#bonus1').addClass('red');
              $('#bonus1').removeClass('gold');
              $('#bonus1').removeClass('white');
            }
            $timeout(function(){
              $("#bonus1").css('top', '-100px');
              $("#bonus1").css('left', '-100px');
            },500);

            compteur1++;
            $("#bonus1").css('top', (e.clientY-70)+'px');
            $("#bonus1").css('left', (e.clientX-25)+'px');
            $scope.hit+=10;
            $scope.score=$scope.hit+" hits";

          }
      }

      $scope.rang=2;
      $scope.total=42;

      $scope.Restart=function(){
          $('.modal-backdrop').css({'display':'none'});
          $('#pauseModal').css({'display':'none'});
          $scope.hit=0
          $scope.score="0 hit";
          state=true;
          compteur1=0;
      }

    }])
    .controller('PlayClassicCtrl',  ['$scope','$ionicPopup','$location','$interval','$timeout',
    function($scope,$ionicPopup,$location,$interval,$timeout) {

        $scope.popupGamePause  = function(etat) {
          $scope.StopChrono();
          var hide="";
          if(etat){
            hide="hide";
          }
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
                type: ' btn-gold '+hide,
                onTap: function(e) {
                  $scope.StartChrono();
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
        $scope.time="10";
        var chrono;
        var state=true;

        /*** Bonus ***/
        var bonusSize=50;
        var minY=51+bonusSize;
        var maxY=ny-114-bonusSize;
        var minX=0+bonusSize;
        var maxX=nx-bonusSize;
        var scoreBonus=450;

        var X;var Y;

        $scope.setBonus=function(e){
          X=getCoordonnees(minX,maxX);
          Y=getCoordonnees(minY,maxY);
          $(".bonus").css('top',Y);
          $(".bonus").css('left',X);

          // if no touch
          $timeout(function(){
            $(".bonus").css('top','-100px');
            $(".bonus").css('left','-100px');
          },1000)
        }
        /**** End Bonus ****/
        var compteur1=0;
        $scope.hit=0;
        $scope.score=$scope.hit+" hit";
        $scope.Click=function(e){
            if(state){
              if(compteur1%3==0){
                $('#bonus1').removeClass('red');
                $('#bonus1').removeClass('gold');
                $('#bonus1').addClass('white');
              }
              else if(compteur1%3==1){
                $('#bonus1').removeClass('red');
                $('#bonus1').addClass('gold');
                $('#bonus1').removeClass('white');
              }
              else if(compteur1%3==2){
                $('#bonus1').addClass('red');
                $('#bonus1').removeClass('gold');
                $('#bonus1').removeClass('white');
              }
              $timeout(function(){
                $("#bonus1").css('top', '-100px');
                $("#bonus1").css('left', '-100px');
              },500);

              compteur1++;
              $("#bonus1").css('top', (e.clientY-70)+'px');
              $("#bonus1").css('left', (e.clientX-25)+'px');

                $scope.StartChrono();
                $scope.hit+=10;
                $scope.score=$scope.hit+" hits";
              if($scope.hit%scoreBonus==0){
                $scope.setBonus();
              }
            }
        }

        $scope.Bonus=function(){
          $('.bonus').css('top','-100px');
          time+=3;
          $scope.time=time;
        }

        // Gestion du chrono
        $scope.StartChrono = function() {
            // Don't start a new fight if we are already fighting
            if ( angular.isDefined(chrono) ) return;

            chrono = $interval(function() {
                if(time>0){
                    time--;
                    $scope.time=time;
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
            compteur1=0;
        }

        $scope.StartChrono();


    }])

    .controller('OptionCtrl',  ['$scope',function($scope,NavbarFactory) {

        $scope.SaveOption=function(pseudo,email){
            console.log(pseudo+" | "+email);
        }
    }]);


function getCoordonnees(min,max){
  console.log(min,max);
  return Math.random()*(max -min)+min;
}
