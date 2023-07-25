import { Router } from 'express'

import AuthCallback from '../controller/AuthController'
import { authenticateToken } from '../middleware/AuthenticateToken'
const AuthRouter = Router()

AuthRouter.post('/login', AuthCallback.login)
AuthRouter.post('/loginbysocial', AuthCallback.loginBySocial)
AuthRouter.post('/register', AuthCallback.register)
AuthRouter.post('/registerbysocial', AuthCallback.registerBySocial)
AuthRouter.get('/me', authenticateToken, AuthCallback.me)

export default AuthRouter
