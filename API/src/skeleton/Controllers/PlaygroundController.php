<?php

namespace skeleton\Controllers;

use Silex\Application;
use Silex\ControllerProviderInterface;
use Silex\ControllerCollection;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;


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
			->get('/{id}/tasks', array($this, 'detailtasks'))
			->assert('id', '\d+');

		$controllers
			->get('/{id}/', array($this, 'detail'))
			->assert('id', '\d+');

		$controllers
			->match('/{id}/visit', array($this, 'visit'))
			->method('GET|POST')
			->assert('id', '\d+');

		$controllers
			->match('/visitedplaygrounds', array($this, 'visitedplaygrounds'))
			->method('GET|POST')
			->assert('id', '\d+');

		$controllers
			->match('/{id}/favorite', array($this, 'favorite'))
			->method('GET|POST')
			->assert('id', '\d+');

		$controllers
			->match('/{id}/undofavorite', array($this, 'undofavorite'))
			->method('GET|POST')
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
		return new JsonResponse($playgrounds);
	}

	public function detailtasks(Application $app, $id) 
	{
		$playground = $app['db.playgrounds']->findSpecficPlaygroundWithTasks($id);
		// var_dump($playgrounds);
		return new JsonResponse($playground);
	}

	public function detail(Application $app, $id) 
	{
		$playground = $app['db.playgrounds']->findSpecficPlayground($id);
		// var_dump($playgrounds);
		return new JsonResponse($playground);
	}

	public function visit(Application $app, $id, Request $request) 
	{
		$masteraccId = $request->get('masteraccId');
		$data['Playgrounds_Id'] = $id;
		$data['MasterAccounts_Id'] = $masteraccId;

		$playground = $app['db.Favorite_Parks_MasterAccount']->insert($data);
		return new JsonResponse($playground);
	}

	public function visitedplaygrounds(Application $app, Request $request) 
	{
		$masteraccId = $request->get('masteraccId');


		$playground = $app['db.Favorite_Parks_MasterAccount']->findallVisitedPlayground($masteraccId);
		return new JsonResponse($playground);
	}

	public function favorite(Application $app, $id, Request $request) 
	{
		$masteraccId = $request->get('masteraccId');
		$data['Playgrounds_Id'] = $id;
		$data['MasterAccounts_Id'] = $masteraccId;

		$playground = $app['db.Favorite_Parks_MasterAccount']->findVisitedPlayground($id, $masteraccId);
		$playground['Favorite_playground'] = 1;
		$data = $app['db.Favorite_Parks_MasterAccount']->update($playground, array('MasterAccounts_Id' => $masteraccId, 'Playgrounds_Id' => $id ));
		return new JsonResponse($data);
	}

	public function undofavorite(Application $app, $id, Request $request) 
	{
		$masteraccId = $request->get('masteraccId');
		$data['Playgrounds_Id'] = $id;
		$data['MasterAccounts_Id'] = $masteraccId;

		$playground = $app['db.Favorite_Parks_MasterAccount']->findVisitedPlayground($id, $masteraccId);
		$playground['Favorite_playground'] = 0;
		$data = $app['db.Favorite_Parks_MasterAccount']->update($playground, array('MasterAccounts_Id' => $masteraccId, 'Playgrounds_Id' => $id ));
		return new JsonResponse($data);
	}
}