<?php

$routes = array();

// $routes['uri'] = controller();
$routes['/'] = new skeleton\Controllers\ExampleController();
$routes['/playgrounds'] = new skeleton\Controllers\PlaygroundController();
