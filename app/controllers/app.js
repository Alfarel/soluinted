
// Creación del módulo
var app = angular.module('app', ['ngRoute','ui.bootstrap','google-maps','bootstrapLightbox']);

var admin = angular.module('administracion',['ui.bootstrap', 'ngRoute', 'angularFileUpload']);
    
// Configuración de las rutas
app.config(function($routeProvider,$locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl : 'views/home.html',
            controller  : 'homeController'
        })
        .when('/home', {
            templateUrl : 'views/home.html',
            controller  : 'homeController'
        })
        .when('/quienesomos', {
            templateUrl : 'views/quienesomos.html',
            controller  : 'quienesomosController'
        })
        .when('/contactenos', {
            templateUrl : 'views/contactenos.html',
            controller  : 'contactenosController'
        })
        .when('/productos/:productUrl', {
            templateUrl : 'views/detalle.html',
            controller  : 'detailController'
        })
        // .when('/detalle', {
        //     templateUrl : 'views/detalle.html',
        //     controller  : 'detailController'
        // })   
        .when('/admin', {
            templateUrl : 'views/admin/index.html',
            controller  : 'detailController'
        })     
        .otherwise({
            redirectTo: '/'
        });
        //locationProvider.html5Mode(true);
});

app.controller('detailController',function($scope) {
    // body...
    $scope.message = 'This is the detail controller';    
});


function CarouselDetail($scope){
  $scope.myInterval = 3000;
  $scope.slides = [
    {
      image: 'images/Silla1.png'
    },
    {
      image: 'images/Silla2.png'
    },
    {
      image: 'images/Silla3.png'
    },
    {
      image: 'images/Silla4.png'
    }
  ];
}

app.controller('FormController', function ($scope, $http, $window) {

    $scope.result = 'hidden'
    $scope.resultMessage;
    $scope.formData; //formData is an object holding the name, email, subject, and message
    $scope.submitButtonDisabled = false;
    $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
    //console.log(''+$scope.formData);
    $scope.submit = function(contactform) {
        $scope.submitted = true;
        $scope.submitButtonDisabled = true;
        //if (contactform.$valid) {

            $http({
                method  : 'POST',
                url     : 'email.php',
                data    : $.param($scope.formData),  //param method from jQuery
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
            }).success(function(data){
                console.log(data);
                if (data.success) { //success comes from the return json object
                    $scope.submitButtonDisabled = true;
                    $scope.resultMessage = data.message;
                    $window.alert($scope.resultMessage);
                    //$scope.result='bg-success';
                } else {
                    $scope.submitButtonDisabled = false;
                    $scope.resultMessage = data.message;
                    $window.alert($scope.resultMessage);
                    //$scope.result='bg-danger';
                }
            });
        /*} else {
            $scope.submitButtonDisabled = false;
            $scope.resultMessage = 'Failed :( Please fill out all the fields.';
            $scope.result='bg-danger';
        }*/
    }
});


