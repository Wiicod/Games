/**
 * Created by Thedward on 24/02/2016.
 */
angular.module('sc.services', [])
    .factory('NavbarFactory', ['$http','$filter','$q',
        function ($http,$filter,$q) {
            var factory = {
                name: false,
                state: false,
                show:false,
                getName: function () {
                    return factory.name;

                },
                getState: function () {
                    return factory.state;

                },
                getShow: function () {
                    return factory.show;

                },
                setName: function (name) {
                    factory.name=name;

                },
                setState: function (state) {
                    factory.state=state;

                },
                setShow: function (show) {
                    factory.show=show;

                }
            };

            return factory;

        }])
     .factory('DBQuery',['$ionicPlatform','$ionicLoading', '$cordovaSQLite', '$q',function($ionicPlatform,$ionicLoading, $cordovaSQLite,$q){
      var factory;
      factory = {
        db:null,
        dbname:"speedy.db",
        month: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
        open:function(){

          var q = $q.defer();
          if(factory.db!=null){
            q.resolve(factory.db);
          }else{
            factory.db = $cordovaSQLite.openDB(factory.dbname);
            q.resolve(factory.db);
          }
          return q.promise;

        },
        init:function(){
          $ionicLoading.show({ template: 'Chargement....<ion-spinner icon="android"></ion-spinner>' });
          window.plugins.sqlDB.copy(factory.dbname,0, function() {
              factory.open().then(function(dat){
                $ionicLoading.hide();
              },function(msg){
                alert('erreur');
              });

            },
            function(error) {
              console.error("There was an error copying the database: " + error);
              factory.open().then(function(dat){
                $ionicLoading.hide();
              },function(msg){
                alert('erreur');
              });

            });


        },
        query: function (query, parameters) {
          parameters = parameters || [];
          var q = $q.defer();
          $ionicPlatform.ready(function () {
            factory.open().then(function(db){
              $cordovaSQLite.execute(db, query, parameters)
                .then(function (result) {
                  q.resolve(result);
                }, function (error) {
                  console.warn('I found an error');
                  console.warn(error);
                  q.reject(error);
                });
            },function(msg){
              alert("errdb")
            });

          });
          return q.promise;
        },
        fetchAll: function (result) {
          var output = [];
          for (var i = 0; i < result.rows.length; i++) {
            output.push(result.rows.item(i));
          }
          return output;
        },
        fetch: function (result) {
          return result.rows.item(0);
        }
      };
        return factory;
    }])
    .factory('ApiFactory',['$http','$q',function($http,$q){

        var factory ={

          player:false,
          score:false,
          addPlayer:function(player){
            var deferred = $q.defer();
            $http(
              {method:'POST',
                url:server+'player',
                params:player
              }).success(function(data,status){

              // console.log(data.user);
              if(status==200){
                factory.player =data.player;
                deferred.resolve(factory.player);
              }else{
                deferred.reject(data.error);
              }
            }).error(function(err){
              deferred.reject(err);
            });
            return deferred.promise;
          },
          addScore:function(score){
            var deferred = $q.defer();
            $http(
              {method:'POST',
                url:server+'score',
                params:score
              }).success(function(data,status){
              if(status==200){
                factory.score =data.score;
                deferred.resolve(factory.score);
              }else{
                deferred.reject(data.error);
              }
            }).error(function(err){
              deferred.reject(err);
            });

            return deferred.promise;
          },
          getRanks:function(){
            var deferred = $q.defer();
            $http.get(server+'score').success(function(data,status){
              if(status==200){
                deferred.resolve(data.scores);
              }
            }).error(function(data){
              deferred.reject(data);
            });
            return deferred.promise;
          },
          getConnected:function(file){
            var deferred = $q.defer();
              $http(
                {method:'GET',
                  url:server+'connected'
                }).success(function(data,status){

                // console.log(data.user);
                if(status==200){
                  // factory.user =data.user;
                  deferred.resolve(data.players);
                }

              }).error(function(data){
                deferred.reject("Impossible de recuperer les joueurs connectes");
              });

            return deferred.promise;

          }

        };
        return factory;
      }])
    .factory('PlayerFactory',['$q','DBQuery','ApiFactory',function($q,DBQuery,ApiFactory) {

      var factory={
        historisques:[],
        month:['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Decembre'],
        player:false,
        getPlayer:function(){
          var deferred= $q.defer();
          if(factory.player!=false){
            deferred.resolve(factory.player);
          }else{
            var query = "SELECT * FROM player";
            DBQuery.query(query).then(function(player){
              factory.player=DBQuery.fetch(player);
              deferred.resolve(factory.player);
            },function(msg){
              deferred.reject(msg);
            });
          }
          return deferred.promise;
        },
        addPlayer: function(item){
          var deferred= $q.defer();
          ApiFactory.addPlayer(item).then(function(player){
            item.id=player.id;
            item.city=player.id;
            item.country=player.country;
            item.created_at=player.created_at;
            item.updated_at=player.updated_at;
            var query = "INSERT INTO player (id,username,email,telephone,country,city,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?)";
            var param = [item.id,item.username,item.email,item.telephone,item.country,item.city,item.created_at,item.updated_at];
            DBQuery.query(query,param).then(function(res){
              deferred.resolve(res);
            },function(msg){
              deferred.reject(msg);
            });
          },function(msg){
            console.log(msg);
            deferred.reject(msg);
          });

        },

        remove: function(item) {

          var outerquery = "DELETE FROM player where id = ?";
          DBQuery.query(outerquery,[item.id]).then(function(player){
            factory.player=false;
            return player;
          },function(err){
            console.log(err);
          });

        }

       };
      return factory;
  }])
    .factory('ScoreFactory',['$q','DBQuery','ApiFactory','PlayerFactory',function($q,DBQuery,ApiFactory,PlayerFactory) {

      var factory={
        scores:[],
        type_score:["zen","classic"],
        getScores:function(){
          var deferred= $q.defer();
          if(factory.scores.length==false){
            deferred.resolve(factory.scores);
          }else{
            var query = "SELECT * FROM scores";
            DBQuery.query(query).then(function(scores){
              factory.scores=DBQuery.fetchAll(scores);
              deferred.resolve(factory.scores);
            },function(msg){
              deferred.reject(msg);
            });
          }
          return deferred.promise;
        },
        isNewHighScore:function(score){
          var deferred = $q.defer();
          var query = "SELECT max(click) FROM scores where type = ?;";
          DBQuery.query(outerquery,[score.type]).then(function(res){
            alert(res);
            max = res;
            deferred.resolve(max<score.click);
          },function(err){
            console.log(err);
          });


          return deferred.promise;
        },
        addScore: function(item){
          var deferred= $q.defer();
          var query = "INSERT INTO scores (click,speed,type,created_at,updated_at) VALUES (?,?,?,?,?)";
          var d = new Date();
          var param = [item.click,item.speed,item.type, d.toString(), d.toString()];
          DBQuery.query(query,param).then(function(res){
            //var sco = DBQuery.fetch(res);
           //factory.scores.push(res);
            factory.isNewHighScore(item).then(function(flag){
              if(flag){
                PlayerFactory.getPlayer().then(function(player){
                  item.player=player.id;
                  ApiFactory.addScore(item).then(function(data){
                  },function(msg){
                   // alert("Impossible score non mis a jour");
                  });

                },function(msg){
                  alert(msg);
                });

              }
            },function(msg){
              console.error(msg);
            });
            deferred.resolve(res);
          },function(msg){
            alert("echec d enregistrement du score");
            deferred.reject(msg);
          });
          return deferred.promise;
        },
        getMaxScore : function(type){
          var deferred = $q.defer();
          var query = "SELECT MAX(click) AS click,speed,type FROM scores where type = ?";
          DBQuery.query(query,[type]).then(function(res){
            res = DBQuery.fetch(res);
            PlayerFactory.getPlayer().then(function(player){
              res.player=player.id;
              ApiFactory.addScore(res).then(function(data){

              },function(msg){
               // alert("Impossible score non mis a jour");
              });

            },function(msg){
              alert(msg);
            });
          });
          return deferred.promise;

        },
        updateScoreOnline:function(){
           for(var i=0;i<factory.type_score.length;i++){
             factory.getMaxScore(factory.type_score[i]).then(function(res){
               ApiFactory.addScore(res).then(function(data){
                 alert("ok");
               },function(msg){
                 alert("echec update score"+msg);
               });
             });
           }
        },
        remove: function(score) {

          var outerquery = "DELETE FROM scores where id = ?";
          DBQuery.query(outerquery,[score.id]).then(function(score){
            factory.scores.splice(factory.scores.indexOf(score),1);
            return score;
          },function(err){
            console.log(err);
          });

        }

       };
      return factory;
  }])
    .factory('RankFactory',['$q','DBQuery','ApiFactory',function($q,DBQuery,ApiFactory) {
      var factory={
        ranks:[],
        getRanks:function(){
          var deferred= $q.defer();
          factory.updateRanks().then(function(data){
            var query = "SELECT * FROM ranks";
            DBQuery.query(query).then(function(ranks){
              factory.ranks=DBQuery.fetchAll(ranks);
              deferred.resolve(factory.ranks);
            },function(msg){
              deferred.reject(msg);
            });
          },function(msg){
            if(factory.ranks.length>0){
              deferred.resolve(factory.ranks);
            }else{
              var query = "SELECT * FROM ranks";
              DBQuery.query(query).then(function(ranks){
                factory.ranks=DBQuery.fetchAll(ranks);
                deferred.resolve(factory.ranks);
              },function(msg){
                deferred.reject(msg);
              });
            }
          });

          return deferred.promise;
        },
        updateRanks:function(){
          var deferred= $q.defer();
          ApiFactory.getRanks().then(
            function(data){
            var query = "delete from ranks";
            DBQuery.query(query).then(function(res){
              for(var i=0;i<data.length;i++){
                item={
                  id:data[i].player_id,
                  username:data[i].player.username,
                  country:data[i].player.country,
                  city:data[i].player.city,
                  isocode:data[i].player.isocode,
                  click:data[i].click,
                  speed:data[i].speed,
                  type:data[i].type,
                  rank:0

                };
                factory.addRank(item);
              }
              deferred.resolve("ok");
            },function(err){

              deferred.reject(err);
            });
          },
            function(msg){
            deferred.reject("Veullez vous connecter pour obtenir les mise a jour !")
          });
          return deferred.promise;
        },
        addRank: function(item){
          var deferred= $q.defer();
          var query = "INSERT INTO ranks (id,username,city,country,isocode,click,speed,type,rank) VALUES (?,?,?,?,?,?,?,?,?)";
          var param = [item.id,item.username,item.city,item.country,item.isocode,item.click,item.speed,item.type,item.rank];
          DBQuery.query(query,param).then(function(res){
            deferred.resolve(res);
          },function(msg){
            deferred.reject(msg);
          });
          return deferred.promise;
        }
       };
      return factory;
  }])
    .factory('MultiPlayerFactory',['$q','DBQuery','ApiFactory',function($q,DBQuery,ApiFactory) {
      var factory={
        ranks:[],
        getPlayers:function(){
          var deferred= $q.defer();
          ApiFactory.getConnected().then(function(players){
            deferred.resolve(players);
          },function(msg){
            deferred.reject(msg);
          });
          return deferred.promise;
        },
        sendScore: function(score){
          var deferred= $q.defer();
          return deferred.promise;

        },
        receiveScor: function(){
          var deferred= $q.defer();
          return deferred.promise;

        }

       };
      return factory;
  }])



;
