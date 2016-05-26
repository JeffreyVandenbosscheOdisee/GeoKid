<?php

namespace skeleton\Controllers;

use Silex\Application;
use Silex\ControllerProviderInterface;
use Silex\ControllerCollection;
use Symfony\Component\HttpFoundation\JsonResponse;

class PlaygroundController implements ControllerProviderInterface {
	
	/**
	 * Returns routes to connect to the given application.
	 * @param Application $app 			An Application instance
	 * @return ControllerCollection 	A ControllerCollection instance
	 */
	public function connect(Application $app) 
	{
		// Create new ControllerCollection
		$controllers = $app['controllers_factory'];

		// Example routes
		$controllers
			->get('/', array($this, 'index'));

		$controllers
			->get('/{id}/', array($this, 'detail'))
			->assert('id', '\d+');

		return $controllers;
	}

	/**
	 * Returns the action's response
	 * @param  Application 	$app 	An Application instance
	 * @return string           	A html string rendered by twig
	 */
	public function index(Application $app) 
	{
		$playgrounds = $app['db.playgrounds']->findAllPlaygrounds();
		// var_dump($playgrounds);
		return new JsonResponse($playgrounds
		);
	}

	public function detail(Application $app, $id) 
	{
		$playground = $app['db.playgrounds']->findSpecficPlayground($id);
		// var_dump($playgrounds);
		return new JsonResponse($playground);
	}
}