<?php

$routes = array();

// $routes['uri'] = controller();
$routes['/'] = new skeleton\Controllers\ExampleController();
$routes['/playgrounds'] = new skeleton\Controllers\PlaygroundController();
$routes['/auth'] = new skeleton\Controllers\AuthenticationController();
$routes['/account/{masteraccId}'] = new skeleton\Controllers\AccountController();
$routes['/account/{masteraccId}/subaccounts'] = new skeleton\Controllers\SubAccountController();
$routes['/task'] = new skeleton\Controllers\TaskController();