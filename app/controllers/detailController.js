app.controller('detailController',['$scope','$routeParams','$http', '$filter',
	function($scope,$routeParams,$http, $filter) {
		
		// body...
		$scope.categorias = [];
		$scope.message = 'This is the detail controller';
		$http.get("../app/json/categorias.json").success(function(data){
			$scope.categorias = data;
			// console.log(data);
		});	
		$scope.productos = [];
		$http.get("../app/json/productos.json").success(function(data){
			$scope.productUrl = $routeParams.productUrl;
			// console.log($scope.productUrl);
			$scope.productos = data;
			// console.log($scope.productos);
			var result = $filter('filter')($scope.productos, {nombre_producto:$scope.productUrl})[0];
			$scope.productos=result;
			// console.log($scope.productos);
		});	
		// $scope.productUrl = $routeParams.productUrl;
		// console.log($scope.productUrl);
		// console.log(productos);
		// var result = $filter('filter')($scope.productos, {nombre_producto:"Silla Universitaria NTC"})[0];

  		// $scope.name = result.nombre_producto;
  		// console.log(result.nombre_producto);	


}]);



app.controller('DemoCtrl', function($scope, $timeout) {
            $scope.colors = ["#fc0003", "#f70008", "#f2000d", "#ed0012", "#e80017", "#e3001c", "#de0021", "#d90026", "#d4002b", "#cf0030", "#c90036", "#c4003b", "#bf0040", "#ba0045", "#b5004a", "#b0004f", "#ab0054", "#a60059", "#a1005e", "#9c0063", "#960069", "#91006e", "#8c0073", "#870078", "#82007d", "#7d0082", "#780087", "#73008c", "#6e0091", "#690096", "#63009c", "#5e00a1", "#5900a6", "#5400ab", "#4f00b0", "#4a00b5", "#4500ba", "#4000bf", "#3b00c4", "#3600c9", "#3000cf", "#2b00d4", "#2600d9", "#2100de", "#1c00e3", "#1700e8", "#1200ed", "#0d00f2", "#0800f7", "#0300fc"];

            function addSlide(target, style) {
                var i = target.length;
                target.push({
                    label: 'slide #' + (i + 1),
                    img: 'http://lorempixel.com/450/300/' + style + '/' + (i % 10) ,
                    color: $scope.colors[ (i*10) % $scope.colors.length],
                    odd: (i % 2 === 0)
                });
            };

            function addSlides(target, style, qty) {
                for (var i=0; i < qty; i++) {
                    addSlide(target, style);
                }
            }
            // 2nd ngRepeat demo
            //$scope.slides2 = [];
            $scope.slides2 = [
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
            $scope.slideIndex = 0;
            //addSlides($scope.slides2, 'city', 5);

            // demo with controls
            // $scope.slides4 = [];
            // addSlides($scope.slides4, 'people', 5);
            // $scope.pushSlide = function() {
            //     addSlides($scope.slides4, 'people', 3);
            // }
            // $scope.prev = function() {
            //     $scope.slideIndex--;
            // }
            // $scope.next = function() {
            //     $scope.slideIndex++;
            // }
            // $scope.swipe = true;
            // $scope.toggleSwipe = function() {
            //     $scope.swipe = !$scope.swipe;
            // }           

            // thumbs demo
            $scope.slideIndex2 = 2; 


        });
