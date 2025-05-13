import UserRepository from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import { v4 as uuidv4 } from "uuid";
import { sendEmail } from "../utils/email.utils.js";
import { sendInvitationEmail } from "../utils/email.utils.js";
import { generateToken } from "../utils/token.utils.js";
import { createError } from "../utils/error.utils.js";
import { UserStatus } from "../utils/constants.utils.js";
import { sendVerificationEmail } from "../utils/email.utils.js";
import { generateVerificationToken } from "../utils/token.utils.js";
import { verifyToken } from "../utils/token.utils.js";
import UserVerification from "../models/userVerification.model.js";
import { UserVerificationStatus } from "../utils/constants.utils.js";
import { where } from "sequelize";

export default class AuthController {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async register(req, res) {
        const { email, password, firstName, lastName } = req.body;

        try {
            const existingUser = await this.userRepository.getUserByEmail(email);

            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    msg: "User already exists",
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await this.userRepository.createUser({
                email,
                password: hashedPassword,
                firstName,
                lastName,
                userName: email.split("@")[0],
            });

            // const verificationToken = generateVerificationToken(user.id);
            // await sendVerificationEmail(user.email, verificationToken);

            return res.status(201).json({
                success: true,
                msg: "User registered successfully",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                msg: "Internal server error",
                error: error.message,
            });
        }
    }

    async verifyEmail(req, res) {
        const {email} = req.body;

        try{
            const user = await this.userRepository.getUserByEmail(email);
            if(!user){
                return res.status(404).json({
                    success: false,
                    msg: "User not found",
                });
            }
            await sendVerificationEmail(email);

            return res.status(201).json({
                success: true,
                msg: "Email verification link sent",
            });
        }catch(error){
            return res.status(500).json({
                success: false,
                msg: "Failed to send email verification link",
                error: error.message,
            });
        }
    }

    async verifyEmailFinalStep(req, res){
        const {email} = req.params;
        try{
            await this.userRepository.updateUserByEmail(email, {isVerified: true});
            res.redirect(`${process.env.FRONTEND_URL}/verification-success`);
        }catch(error){
            console.error(error);
            res.redirect(`${process.env.FRONTEND_URL}/verification-fail`);
        }
    }

    async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await this.userRepository.getUserByEmail(email);

            if (!user) {
                return res.status(401).json({
                    success: false,
                    msg: "Invalid credentials",
                });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    msg: "Invalid credentials",
                });
            }

            const token = generateToken(user.id);
            return res.status(200).json({
                success: true,
                token,
                user,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                msg: "Internal server error",
            });
        }
    }
    async resendVerificationEmail(req, res) {
        const { email } = req.body;

        try {
            const user = await this.userRepository.getUserByEmail(email);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    msg: "User not found",
                });
            }

            if (user.status === UserStatus.ACTIVE) {
                return res.status(400).json({
                    success: false,
                    msg: "User already verified",
                });
            }

            const verificationToken = generateVerificationToken(user.id);
            await sendVerificationEmail(user.email, verificationToken);

            return res.status(200).json({
                success: true,
                msg: "Verification email resent successfully",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                msg: "Internal server error",
            });
        }
    }
    async forgotPassword(req, res) {
        const { email } = req.body;

        try {
            const user = await this.userRepository.getUserByEmail(email);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    msg: "User not found",
                });
            }

            const resetToken = generateVerificationToken(user.id);
            await sendEmail(user.email, resetToken);

            return res.status(200).json({
                success: true,
                msg: "Password reset email sent successfully",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                msg: "Internal server error",
            });
        }
    }
    async resetPassword(req, res) {
        const { token, newPassword } = req.body;

        try {
            const decoded = verifyToken(token);

            if (!decoded) {
                return res.status(400).json({
                    success: false,
                    msg: "Invalid or expired token",
                });
            }

            const user = await this.userRepository.getUserById(decoded.userId);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    msg: "User not found",
                });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await this.userRepository.updateUser(user.id, {
                password: hashedPassword,
            });

            return res.status(200).json({
                success: true,
                msg: "Password reset successfully",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                msg: "Internal server error",
            });
        }
    }
    async getUserProfile(req, res) {
        try {
            const userId = req.user.id;
            const user = await this.userRepository.getUserById(userId);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    msg: "User not found",
                });
            }

            return res.status(200).json({
                success: true,
                user,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                msg: "Internal server error",
            });
        }
    }
    async updateUserProfile(req, res) {
        const { firstName, lastName, userName } = req.body;

        try {
            const userId = req.user.id;
            const user = await this.userRepository.getUserById(userId);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    msg: "User not found",
                });
            }

            await this.userRepository.updateUser(userId, {
                firstName,
                lastName,
                userName,
            });

            return res.status(200).json({
                success: true,
                msg: "User profile updated successfully",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                msg: "Internal server error",
            });
        }
    }
    async deleteUserAccount(req, res) {
        try {
            const userId = req.user.id;
            const user = await this.userRepository.getUserById(userId);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    msg: "User not found",
                });
            }

            await this.userRepository.deleteUser(userId);

            return res.status(200).json({
                success: true,
                msg: "User account deleted successfully",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                msg: "Internal server error",
            });
        }
    }
    async getAllUsers(req, res) {
        try {
            const users = await this.userRepository.getAllUsers();
            return res.status(200).json({
                success: true,
                users,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                msg: "Internal server error",
            });
        }
    }
    async smartSearch(req, res) {
        try {
            const query = req.query.query;
            const {groupId} = req.query;
            const users = await this.userRepository.smartSearch(query, groupId);
            return res.status(200).json({
                success: true,
                users,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                msg: "Internal server error",
                error: error.message
            });
        }
    }
    async inviteUser(req, res) {
        const { email, groupName } = req.body;
        const inviterName = req.user.userName;

        try {
            await sendInvitationEmail(email, groupName, inviterName);
            return res.status(200).json({
                success: true,
                msg: "Invitation email sent successfully",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                msg: "Internal server error",
            });
        }
    }
    async getUserById(req, res) {
        const { userId } = req.params;

        try {
            const user = await this.userRepository.getUserById(userId);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    msg: "User not found",
                });
            }

            return res.status(200).json({
                success: true,
                user,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                msg: "Internal server error",
            });
        }
    }
    async updateUser(req, res) {
        const { userId } = req.params;
        const { firstName, lastName, userName } = req.body;

        try {
            const user = await this.userRepository.getUserById(userId);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    msg: "User not found",
                });
            }

            await this.userRepository.updateUser(userId, {
                firstName,
                lastName,
                userName,
            });

            return res.status(200).json({
                success: true,
                msg: "User updated successfully",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                msg: "Internal server error",
            });
        }
    }
    async deleteUser(req, res) {
        const { userId } = req.params;

        try {
            const user = await this.userRepository.getUserById(userId);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    msg: "User not found",
                });
            }

            await this.userRepository.deleteUser(userId);

            return res.status(200).json({
                success: true,
                msg: "User deleted successfully",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                msg: "Internal server error",
            });
        }
    }
    async searchUsers(req, res) {
        const { query } = req.query;

        try {
            const users = await this.userRepository.searchUsers(query);
            return res.status(200).json({
                success: true,
                users,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                msg: "Internal server error",
            });
        }
    }
    async getUserByEmail(req, res) {
        const { email } = req.params;

        try {
            const user = await this.userRepository.getUserByEmail(email);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    msg: "User not found",
                });
            }

            return res.status(200).json({
                success: true,
                user,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                msg: "Internal server error",
            });
        }
    }
    async getUserByUserName(req, res) {
        const { userName } = req.params;

        try {
            const user = await this.userRepository.getUserByUserName(userName);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    msg: "User not found",
                });
            }

            return res.status(200).json({
                success: true,
                user,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                msg: "Internal server error",
            });
        }
    }
    async getUserById(req, res) {
        const { userId } = req.params;

        try {
            const user = await this.userRepository.getUserById(userId);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    msg: "User not found",
                });
            }

            return res.status(200).json({
                success: true,
                user,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                msg: "Internal server error",
            });
        }
    }
};