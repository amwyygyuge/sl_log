'use strict'

/**
 * @param {Egg.Application} app - egg application
 */

const createRouter = (router, controller) => {
	router.get('/query', controller.query)
	router.post('/create', controller.create)
	router.post('/update', controller.update)
	router.post('/remove', controller.remove)
	router.post('/detail', controller.detail)
}
module.exports = app => {
	const { router, controller } = app
	const logRouter = router.namespace('/sl_log')
	const userRouter = router.namespace('/user')
	const projectRouter = router.namespace('/project')
	const packageRouter = router.namespace('/package')
	const slProjectRouter = router.namespace('/sl/project')
	const slUserRouter = router.namespace('/sl/user')
	createRouter(slProjectRouter, controller.sl.project)
	createRouter(slUserRouter, controller.sl.user)
	logRouter.get('/query', controller.log.log.query)
	logRouter.get('/count', controller.log.log.count)
	logRouter.post('/create', controller.log.log.create)
	logRouter.post('/remove', controller.log.log.remove)
	userRouter.get('/query', controller.log.user.query)
	userRouter.post('/update', controller.log.user.update)
	userRouter.post('/remove', controller.log.user.remove)
	projectRouter.get('/query', controller.log.project.query)
	projectRouter.post('/update', controller.log.project.update)
	projectRouter.post('/remove', controller.log.project.remove)
	packageRouter.get('/:name/:version', controller.npm.index)
	packageRouter.get('/:name', controller.npm.index)
	router.get('/test/error_test', controller.test.errorTest)
}
