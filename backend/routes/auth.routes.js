import express from 'express';
import AuthController from '../controllers/auth.controller.js';
// import authMiddleware from '../middlewares/auth.js';

const router = express.Router();
const authController = new AuthController();

// Registration & Login
router.post('/register', (req, res) => authController.register(req, res));
router.post('/login', (req, res) => authController.login(req, res));

// Email verification
router.get('/verify-email', (req, res) => authController.verifyEmail(req, res));
router.get('/verify-email-final-step/:email', (req, res) => authController.verifyEmailFinalStep(req, res));
router.post('/resend-verification', (req, res) => authController.resendVerificationEmail(req, res));

// Password reset
router.post('/forgot-password', (req, res) => authController.forgotPassword(req, res));
router.post('/reset-password', (req, res) => authController.resetPassword(req, res));

// User profile (protected)
router.get('/profile', /*authMiddleware,*/ (req, res) => authController.getUserProfile(req, res));
router.put('/profile', /*authMiddleware,*/ (req, res) => authController.updateUserProfile(req, res));
router.delete('/profile', /*authMiddleware,*/ (req, res) => authController.deleteUserAccount(req, res));

// User management (admin or advanced user features)
router.get('/users', /*authMiddleware,*/ (req, res) => authController.getAllUsers(req, res));
router.get('/users/:userId', /*authMiddleware,*/ (req, res) => authController.getUserById(req, res));
router.put('/users/:userId', /*authMiddleware,*/ (req, res) => authController.updateUser(req, res));
router.delete('/users/:userId', /*authMiddleware,*/ (req, res) => authController.deleteUser(req, res));

// Search and lookup
router.get('/search', /*authMiddleware,*/ (req, res) => authController.searchUsers(req, res));
router.get('/email/:email', /*authMiddleware,*/ (req, res) => authController.getUserByEmail(req, res));
router.get('/username/:userName', /*authMiddleware,*/ (req, res) => authController.getUserByUserName(req, res));

export default router;
