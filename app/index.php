<?php
   session_start();
   
   if(!isset($_SESSION['usuario'])){
   		header("location: ../admin/Login.php");
   }
?> 

<!DOCTYPE html>
<html lang="en">

	<head>
		 <meta charset="utf-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	    <meta name="viewport" content="width=device-width, initial-scale=1">
	    <script type="text/javascript" src="../../js/angular-file-upload-shim.js"></script>    
    	<script type="text/javascript" src="../../js/angular.min.js"></script>
    	<script type="text/javascript" src="../../js/angular-file-upload.min.js"></script>

        <link href="../../css/bootstrap.min.css" rel="stylesheet">
	    <!-- MetisMenu CSS -->
	    <link href="../../css/plugins/metisMenu/metisMenu.min.css" rel="stylesheet">
	    	    <!-- Custom CSS -->
	    <link href="../../css/sb-admin-2.css" rel="stylesheet">
	    <!-- Custom Fonts -->
	    <link href="../../font-awesome-4.1.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
	</head>

	<body ng-app="administracion" ng-controller="AdministracionMain">
		<div id="wrapper">	
			<nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
	            <div class="navbar-header">	                	
	                <a class="navbar-brand" href="index.php">Soluinted Administrador de contenido</a>
	            </div>
	            <!-- /.navbar-header -->

	            <ul class="nav navbar-top-links navbar-right">	
	                <!-- /.dropdown -->
	                <li class="dropdown">
	                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
	                        <i class="fa fa-user fa-fw"></i>  <i class="fa fa-caret-down"></i>
	                    </a>
	                    <ul class="dropdown-menu dropdown-user">	                        
	                        <li class="divider"></li>
	                        <li><a href="login.php" ng-click="cerrarSesion()"><i class="fa fa-sign-out fa-fw"></i> Logout</a>
	                        </li>
	                    </ul>
	                    <!-- /.dropdown-user -->
	                </li>
	                <!-- /.dropdown -->
	            </ul>
	            <!-- /.navbar-top-links -->

	            <div class="navbar-default sidebar" role="navigation">
	                <div class="sidebar-nav navbar-collapse">
	                    <ul class="nav" id="side-menu">
	                        
	                        <li>
	                            <a class="active" href="" ng-click="setPage('categorias')"><i class="fa fa-dashboard fa-fw"></i> Categorias</a>
	                        </li>	                        
	                        <li>
	                            <a href="" ng-click="setPage('productos')"><i class="fa fa-table fa-fw"></i> Elementos</a>
	                        </li>	                        
	                    </ul>
	                </div>
	                <!-- /.sidebar-collapse -->
	            </div>
	            <!-- /.navbar-static-side -->
	        </nav>
	        <div id="page-wrapper">
	        	<div ng-include src='paginaActual.url'></div>
	        </div>
    	</div>	    
	</body>

	<script src="../../js/jquery-1.11.1.js"></script>
	    <script src="../../js/bootstrap.min.js"></script>
	    <script src="../../js/plugins/metisMenu/metisMenu.min.js"></script>    
	    <script src="../../js/sb-admin-2.js"></script>

    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.23/angular.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.0rc1/angular-route.min.js"></script>
    <script type="text/javascript" src="../../controllers/app.js"></script>
    <script type="text/javascript" src="../../controllers/AdministracionMainController.js"></script>    
    <script type="text/javascript" src="../../controllers/administradorController.js"></script>    
    <script type="text/javascript" src="../../controllers/administradorProductosController.js"></script>
	<script type="text/javascript" src="../../js/ui-bootstrap-tpls-0.11.0.js"></script>

</html>
