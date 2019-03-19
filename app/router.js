'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
	const { router, controller } = app
	const logRouter = router.namespace('/sl_log')
	const userRouter = router.namespace('/user')
	const projectRouter = router.namespace('/project')
	const packageRouter = router.namespace('/package')

	logRouter.get('/query', controller.log.query)
	logRouter.get('/count', controller.log.count)
	logRouter.post('/create', controller.log.create)
	logRouter.post('/remove', controller.log.remove)
	userRouter.get('/query', controller.user.query)
	userRouter.post('/update', controller.user.update)
	userRouter.post('/remove', controller.user.remove)
	projectRouter.get('/query', controller.project.query)
	projectRouter.post('/update', controller.project.update)
	projectRouter.post('/remove', controller.project.remove)
	packageRouter.get('/:name/:version', controller.npm.index)
	packageRouter.get('/:name', controller.npm.index)
	router.get('/test/error_test', controller.test.errorTest)
}
