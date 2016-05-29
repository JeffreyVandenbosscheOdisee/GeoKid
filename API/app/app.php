<?php

use Silex\Application;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

// == Set environment
$environment = 'prod';

// == Set Defaults
date_default_timezone_set('Europe/Brussels');

// == Config
if($environment === 'prod')
	require __DIR__ . DIRECTORY_SEPARATOR . 'config.php';
else
	require __DIR__ . DIRECTORY_SEPARATOR . 'config_' . $environment . '.php';

// == Bootstrap
require __DIR__ . DIRECTORY_SEPARATOR . 'bootstrap.php';
echo $app['debug'] ;
// == Handle Errors
$app->error(function (\Exception $e, $code) {
	$response = array(
		'status' => 'error',
		'data' => $code . '\n' . $e->getMessage()
	);

	if($app['debug'] === true)
	{
		$response['stacktrace'] = $e->getStacktrace();
	}
	return new JsonResponse($response);
});

// == Handle CORS
// Source: https://github.com/vesparny/silex-simple-rest

// CORS Preflight Request
$app->before(function(Request $request) 
{
   if ($request->getMethod() === "OPTIONS") 
   {
       $response = new Response();
       $response->headers->set("Access-Control-Allow-Origin","*");
       $response->headers->set("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS");
       $response->headers->set("Access-Control-Allow-Headers","Content-Type");
       $response->setStatusCode(200);
       return $response->send();
   }
}, Application::EARLY_EVENT);
// CORS response
$app->after(function(Request $request, Response $response) 
{
   $response->headers->set("Access-Control-Allow-Origin","*");
   $response->headers->set("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS");
});

// == Handle JSON
$app->before(function(Request $request) 
{
    if(strpos($request->headers->get('Content-Type'), 'application/json') === 0) 
    {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : array());
    }
});

// == Mount our Controllers
require_once __DIR__ . DIRECTORY_SEPARATOR . 'routes.php';
foreach($routes as $uri => $controller)
{
	$app->mount('/' . $uri, $controller);
}
