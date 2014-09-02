//Reservas99Polangy
// Creación del módulo
var app = angular.module('app', ['ngRoute','ui.bootstrap','google-maps','bootstrapLightbox']);

// Configuración de las rutas
app.config(function($routeProvider,$locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl : 'views/home.html',
            controller  : 'mainController'
        })
        .when('/home', {
            templateUrl : 'views/home.html',
            controller  : 'aboutController'
        })
        .when('/cabana1', {
            templateUrl : 'views/cabana1.html',
            controller  : 'contactController'
        })
        .when('/cabana2', {
            templateUrl : 'views/cabana2.html',
            controller  : 'contactController'
        })
        .when('/cabana3', {
            templateUrl : 'views/cabana3.html'
        })
        .when('/zonasocial', {
            templateUrl : 'views/zonasocial.html'
        })
        .when('/galeria', {
            templateUrl : 'views/galeria.html'
        })
          
        .when('/ubicacion', {
            templateUrl : 'views/ubicacion.html',
            controller  : 'ubicacionController'
        })
        .when('/villavicencio', {
            templateUrl : 'views/villavicencio.html',
            controller  : 'villavicencioController'
        })
        .otherwise({
            redirectTo: '/'
        });
        //locationProvider.html5Mode(true);
});

//thumbnail+modal viewers <-+->
app.controller('GalleryCtrlCab1', function ($scope, Lightbox) {
  $scope.images = [
    {
      'url': 'img/cabana-01-galeria-01.jpg', // required property
      'width': 900,   // required property
      'height': 603
    },
    {
      'url': 'img/cabana-01-galeria-02.jpg', // required property
      'width': 900,   // required property
      'height': 603
    },
    {
      'url': 'img/cabana-01-galeria-03.jpg', // required property
      'width': 900,   // required property
      'height': 603
    },
    {
      'url': 'img/cabana-01-galeria-04.jpg', // required property
      'width': 900,   // required property
      'height': 603
    },
    {
      'url': 'img/cabana-01-galeria-05.jpg', // required property
      'width': 900,   // required property
      'height': 603
    },
    {
      'url': 'img/cabana-01-galeria-06.jpg', // required property
      'width': 900,   // required property
      'height': 603
    }
  ];

  $scope.openLightboxModal = function (index) {
    Lightbox.openModal($scope.images, index);
  };
});
app.controller('GalleryCtrlCab2', function ($scope, Lightbox) {
  $scope.images = [
    {
      'url': 'img/cabana-02-galeria-01.jpg', // required property
      'width': 900,   // required property
      'height': 603
    },
    {
      'url': 'img/cabana-02-galeria-02.jpg', // required property
      'width': 900,   // required property
      'height': 603
    },
    {
      'url': 'img/cabana-02-galeria-03.jpg', // required property
      'width': 900,   // required property
      'height': 603
    },
    {
      'url': 'img/cabana-02-galeria-04.jpg', // required property
      'width': 900,   // required property
      'height': 603
    },
    {
      'url': 'img/cabana-02-galeria-05.jpg', // required property
      'width': 900,   // required property
      'height': 603
    },
    {
      'url': 'img/cabana-02-galeria-06.jpg', // required property
      'width': 900,   // required property
      'height': 603
    }
  ];

  $scope.openLightboxModal = function (index) {
    Lightbox.openModal($scope.images, index);
  };
});
app.controller('GalleryCtrlCab3', function ($scope, Lightbox) {
  $scope.images = [
    {
      'url': 'img/cabana-03-galeria-01.jpg', // required property
      'width': 900,   // required property
      'height': 603
    },
    {
      'url': 'img/cabana-03-galeria-02.jpg', // required property
      'width': 900,   // required property
      'height': 603
    },
    {
      'url': 'img/cabana-03-galeria-03.jpg', // required property
      'width': 900,   // required property
      'height': 603
    },
    {
      'url': 'img/cabana-03-galeria-04.jpg', // required property
      'width': 900,   // required property
      'height': 603
    },
    {
      'url': 'img/cabana-03-galeria-05.jpg', // required property
      'width': 900,   // required property
      'height': 603
    },
    {
      'url': 'img/cabana-03-galeria-06.jpg', // required property
      'width': 900,   // required property
      'height': 603
    }
  ];

  $scope.openLightboxModal = function (index) {
    Lightbox.openModal($scope.images, index);
  };
});
//Controlador de los formularios
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

app.controller('GalleryCtrlZonaS', function ($scope, Lightbox) {
  $scope.images = [
    {
      'url': 'img/zona-social-galeria-01.jpg', // required property
      'width': 900,   // required property
      'height': 603
    },
    {
      'url': 'img/zona-social-galeria-02.jpg', // required property
      'width': 900,   // required property
      'height': 603
    },
    {
      'url': 'img/zona-social-galeria-03.jpg', // required property
      'width': 900,   // required property
      'height': 603
    },
    {
      'url': 'img/zona-social-galeria-04.jpg', // required property
      'width': 900,   // required property
      'height': 603
    },
    {
      'url': 'img/zona-social-galeria-05.jpg', // required property
      'width': 900,   // required property
      'height': 603
    },
    {
      'url': 'img/zona-social-galeria-06.jpg', // required property
      'width': 900,   // required property
      'height': 603
    }
  ];

  $scope.openLightboxModal = function (index) {
    Lightbox.openModal($scope.images, index);
  };
});
app.config(function (LightboxProvider) {
  // set a custom template
  LightboxProvider.templateUrl = 'lightbox.html';

  /**
   * Calculate the max and min limits to the width and height of the displayed
   *   image (all are optional). The max dimensions override the min
   *   dimensions if they conflict.
   * @param  {Object} dimensions Contains the properties windowWidth,
   *   windowHeight, imageWidth, imageHeight.
   * @return {Object} May optionally contain the properties minWidth,
   *   minHeight, maxWidth, maxHeight.
   */
  LightboxProvider.calculateImageDimensionLimits = function (dimensions) {
    return {
      'minWidth': 100,
      'minHeight': 100,
      'maxWidth': dimensions.windowWidth - 102,
      'maxHeight': dimensions.windowHeight - 136
    };
  };

  /**
   * Calculate the width and height of the modal. This method gets called
   *   after the width and height of the image, as displayed inside the modal,
   *   are calculated. See the default method for cases where the width or
   *   height are 'auto'.
   * @param  {Object} dimensions Contains the properties windowWidth,
   *   windowHeight, imageDisplayWidth, imageDisplayHeight.
   * @return {Object} Must contain the properties width and height.
   */
  LightboxProvider.calculateModalDimensions = function (dimensions) {
    return {
      'width': Math.max(100, dimensions.imageDisplayWidth + 42),
      'height': Math.max(100, dimensions.imageDisplayHeight + 100)
    };
  };
});

//Controladores
app.controller('mainController', function($scope) {
    $scope.message = 'Hola, Mundo!';
    
});

app.controller('aboutController', function($scope) {
    $scope.message = 'Esta es la página "Acerca de"';

});

app.controller('contactController', function($scope) {
    $scope.message = 'Esta es la página de "Contacto", aquí podemos poner un formulario';
    
});
app.controller('ubicacionController', function($scope) {
    $scope.message = 'Esta es la página de "Contacto", aquí podemos poner un formulario';
    $scope.map = {
    center: {
        latitude: 4.045536,
        longitude: -73.550349

    },
    zoom: 14
  };
});

app.controller('villavicencioController', function($scope){
  $scope.message='Controlador de la vista Villavicencio';
});

//controlador del carousel


function CarouselDemoCtrl($scope){
  $scope.myInterval = 3000;
  $scope.slides = [
    {
      image: 'img/imagen-seccion-cabana-01.jpg' ,
      text: 'Confortables cabañas'
    },
    {
      image: 'img/foto-inicio-01.jpg',
      text: 'Un lugar para relajarte'
    },
    {
      image: 'img/foto-inicio-02.jpg',
      text: 'Espacios abiertos para tí y tú familia'
    },
    {
      image: 'img/foto-inicio-03.jpg',
      text: 'Con la frescura del llano'
    }
  ];
}
//carousel villavo
function CarouselVicio($scope){
  $scope.myInterval = 3000;
  $scope.slides = [
    {
      image: 'img/villavicencio-s1.png'
    },
    {
      image: 'img/catedral-02.jpg'
    },
    {
      image: 'img/los-capachos-02.jpg'
    },
    {
      image: 'img/unicentro-02.jpg'
    }
  ];
}

//datepicker
var DatepickerDemoCtrl = function ($scope) {
  $scope.today = function() {
    $scope.dt = new Date();
  };
  //$scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  /*$scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };*/

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.initDate = new Date('2016-15-20');
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
};

//dropdown navbar 
function DropdownCtrl($scope) {
  $scope.items = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];

  $scope.status = {
    isopen: false
  };

  $scope.toggled = function(open) {
    console.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };
}


//Modal que visualiza las imagenes del thumbnail
var ModalDemoCtrl = function ($scope, $modal, $log) {

  $scope.items = ['img/cabana2', 'item2', 'item3'];

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: ModalInstanceCtrl,
      size: size,
      resolve: {
        items: function () {

          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
};

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};
/*$('.dropdown-toggle').click(function(e) {
    e.preventDefault();
    e.stopPropagation();

    return false;
});

jQuery('nav').on('click', 'a[data-toggle="tab"]',  function(e){
    e.preventDefault();
    alert(this);
});*/



//creamos el modulo y lo asignamos a app, para evitar escribir 
//cada vez angular.module("app"); que sería el getter
//angular.module("app", []); es el setter
//var app = angular.module("app", ['ngRoute']);
//

//realizamos la configuración del enrutado dependiendo de la url
//con el objeto $routeProvider haciendo uso de when
//en este caso, cuando estemos en la página principal, le decimos que
//cargue el archivo templates/index.html y que haga uso del controlador
//indexController, así en todos los casos
/*app.config(function($routeProvider){
    $routeProvider.when("/", {
        templateUrl : "views/home.html"
    })
    .when("/cabana1", {
        templateUrl : "views/cabana1.html"
        
    })
    .when("/home",{
        templateUrl: "views/home.html"
    })    
    .when("/ca", {
        templateUrl : "templates/login.html",
        controller : "loginController"
    })
    //este es digamos, al igual que en un switch el default, en caso que 
    //no hayamos concretado que nos redirija a la página principal
    .otherwise({ reditrectTo : "/" });
})*/