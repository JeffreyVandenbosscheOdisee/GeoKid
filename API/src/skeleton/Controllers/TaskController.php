<?php

namespace skeleton\Controllers;

use Silex\Application;
use Silex\ControllerProviderInterface;
use Silex\ControllerCollection;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;


class TaskController implements ControllerProviderInterface {
	
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
			->match('/complete', array($this, 'completedtask'))
			->method('GET|POST');

		return $controllers;
	}

	/**
	 * Returns the action's response
	 * @param  Application 	$app 	An Application instance
	 * @return string           	A html string rendered by twig
	 */
	public function completedtask(Application $app, Request $request) 
	{
		$subaccountIds = $request->get('subaccountsId');
		$playgroundId = $request->get('playgroundId');
		$taskid = $request->get('taskId');
		$data['Playgrounds_Id']= $playgroundId;
		$data['Tasks_Id']= $taskid;

		foreach ($subaccountIds as $value){
			$data['SubAccounts_Id']= $value;
			$done = $app['db.tasks']->insert($data);
		}
		return new JsonResponse();
	}
}