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
            }

            return factory

        }]);
