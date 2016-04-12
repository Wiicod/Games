/**
 * Created by Ets Simon on 08/04/2016.
 */

angular.module('sc.filters', [])


  .filter('ordinal', function() {
    return function(input) {
      var s=["th","st","nd","rd"],
        v=input%100;
      return input+(s[(v-20)%10]||s[v]||s[0]);
    }
  })

  .filter('arrondie', function ($filter) {
    return function (input, places) {
      if (isNaN(input)) return input;
      var factor = "1" + Array(+(places > 0 && places + 1)).join("0");
      return Math.round(input * factor) / factor;
    };
  })

  .filter('range', function() {
    return function(input, total) {
      total = parseInt(total);

      for (var i=0; i<total; i++) {
        input.push(i);
      }

      return input;
    };
  });
