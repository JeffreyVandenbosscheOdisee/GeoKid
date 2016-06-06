<?php

namespace skeleton\Controllers;

use Silex\Application;
use Silex\ControllerProviderInterface;
use Silex\ControllerCollection;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;


class AchievementsController implements ControllerProviderInterface {
	
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
			->match('/check', array($this, 'checkachievements'))
			->method('GET|POST');

		$controllers
			->match('/get', array($this, 'getachievement'))
			->method('GET|POST');

		return $controllers;
	}

	/**
	 * Returns the action's response
	 * @param  Application 	$app 	An Application instance
	 * @return string           	A html string rendered by twig
	 */
	public function index(Application $app) 
	{
		return new JsonResponse(array(
			'example1123',
			'example2'
			)
		);
	}

	public function checkachievements(Application $app, Request $request) 
	{
		$subaccountId = $request->get('subaccountsId');
		$type = $request->get('type');

		if($type == "Playgrounds"){
			$count= $app['db.playgrounds_has_subaccounts']->countvisitedplaygrounds($subaccountId);
		}
		else{
			$count= $app['db.tasks']->countcompletedtasks($subaccountId);
		}
		
		$achievement = $app['db.achievements']->findAchievement($count,$type);
		if($achievement != false){
			$InDB = $app['db.achievements_has_subaccounts'] -> findsubAccAchievement($achievement['Id'], $subaccountId);
			
			if(!$InDB){
				$subaccount = $app['db.subaccounts']->findSubAccount($subaccountId);
				$photos = null;
				$di = new \DirectoryIterator($app['achievements.base_path']);
				foreach ($di as $file) {
					if ($file->getExtension() == 'png') {
						if($achievement['Id'] == current(explode('-', $file->getFileName()))){		
							$photos = array(
								'url' => $app['achievements.base_url'] . '/' . $file,
								'title' => $file->getFileName()
							);
							
						}
					}
				};
				$achievement['photo'] = $photos;
				$achievement['NameUser'] = $subaccount['Name'];
				$data['SubAccounts_Id'] = $subaccountId;
				$data['Achievements_Id'] = $achievement['Id'];
				$done = $app['db.achievements_has_subaccounts']->insert($data);
			}
			else{
				$achievement = false;
			}
			
		}
		return new JsonResponse($achievement);
	}

	public function getachievement(Application $app, Request $request) 
	{
		$AuthKey = $request->headers->get('AuthKey');
		$masteracc = $app['db.masteraccounts']->findMasteraccountOnAuthKey($AuthKey);
		if($masteracc != null){

			$subaccountId = $request->get('subaccountId');
			$achievements = $app['db.achievements_has_subaccounts']->findsubAccAchievements($subaccountId);
				$achievements2 = [];
			foreach ($achievements as $achievement) {
					$photos = null;
					$di = new \DirectoryIterator($app['achievements.base_path']);
					foreach ($di as $file) {

						if ($file->getExtension() == 'png') {
							if($achievement['Id'] == current(explode('-', $file->getFileName()))){
								$photos = array(
									'url' => $app['achievements.base_url'] . '/' . $file,
									'title' => $file->getFileName()
								);
								
							}
						}
					};
					$achievement['photo']= $photos;

					array_push($achievements2, $achievement);

				}
			return new JsonResponse($achievements2);
		}
		return new JsonResponse(false);

	}
}