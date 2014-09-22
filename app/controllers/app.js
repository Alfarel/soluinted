
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
        .when('/productos/:productName', {
            templateUrl : 'views/detalle.html',
            controller  : 'detailController'
        })        
        .otherwise({
            redirectTo: '/'
        });
        //locationProvider.html5Mode(true);
});

