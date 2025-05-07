import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });
};

export const generateVerificationToken = (userId) => {
  return jwt.sign({ userId }, process.env.VERIFICATION_SECRET, {
    expiresIn: '1h'
  });
};

export const verifyToken = (token, isVerification = false) => {
  try {
    const secret = isVerification ? 
      process.env.VERIFICATION_SECRET : 
      process.env.JWT_SECRET;
      
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};
    