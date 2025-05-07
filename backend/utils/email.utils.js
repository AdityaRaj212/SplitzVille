import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

// export const sendVerificationEmail = async (email, token) => {
//   const verificationUrl = `${process.env.BACKEND_URL}/api/auth/verify-email-final-step/${email}`;
  
//   await transporter.sendMail({
//     from: `"SplitzVille" <${process.env.SMTP_FROM}>`,
//     to: email,
//     subject: 'Email Verification for SplitzVille',
//     html: `Click <a href="${verificationUrl}">here</a> to verify your email`
//   });
// };

export const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.BACKEND_URL}/api/auth/verify-email-final-step/${email}`;
  
  await transporter.sendMail({
    from: `"SplitzVille" <${process.env.SMTP_FROM}>`,
    to: email,
    subject: 'Verify Your SplitzVille Account',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; color: #333333;">
        <div style="background: linear-gradient(to right, #3B82F6, #6366F1); padding: 20px; text-align: center;">
          <img src="https://res.cloudinary.com/dus15opim/image/upload/v1746640770/s3suekfr8zxievhquulb.png" alt="SplitzVille Logo" style="height: 60px;">
        </div>
        
        <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 4px 4px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
          <h1 style="color: #3B82F6; font-size: 24px; margin-bottom: 20px; text-align: center;">Verify Your Email</h1>
          
          <div style="text-align: center; margin: 30px 0;">
            <img src="https://res.cloudinary.com/dus15opim/image/upload/v1746640789/pa1ynak7im44ukgfykpb.jpg" alt="Verification" style="width: 180px;">
          </div>
          
          <p style="font-size: 16px; line-height: 1.5; margin-bottom: 25px; text-align: center;">
            Thanks for signing up! Please verify your email address to access all SplitzVille features and start splitting expenses with friends.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" style="background: linear-gradient(to right, #3B82F6, #6366F1); color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Verify My Email</a>
          </div>
          
          <p style="font-size: 14px; color: #666666; margin-top: 25px;">
            If the button doesn't work, copy and paste this link into your browser:
            <a href="${verificationUrl}" style="color: #3B82F6; word-break: break-all;">${verificationUrl}</a>
          </p>
          
          <p style="font-size: 14px; color: #666666; margin-top: 25px;">
            If you didn't sign up for SplitzVille, you can safely ignore this email.
          </p>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #666666; font-size: 12px;">
          <p>© ${new Date().getFullYear()} SplitzVille. All rights reserved.</p>
 
          <div style="margin-top: 15px;">
            <a href="${process.env.FRONTEND_URL}/social/twitter" style="margin: 0 5px;"><img src="https://res.cloudinary.com/dus15opim/image/upload/v1746640764/onaz7wh2wywcjmnsg8z7.png" alt="Twitter" style="width: 24px;"></a>
            <a href="${process.env.FRONTEND_URL}/social/facebook" style="margin: 0 5px;"><img src="https://res.cloudinary.com/dus15opim/image/upload/v1746641139/kyv5fhuzirvljecbbey8.jpg" alt="Facebook" style="width: 24px;"></a>
            <a href="${process.env.FRONTEND_URL}/social/instagram" style="margin: 0 5px;"><img src="https://res.cloudinary.com/dus15opim/image/upload/v1746641140/yal4szlpkzgw6zalytjy.jpg" alt="Instagram" style="width: 24px;"></a>
          </div>
        </div>
      </div>
    `
  });
};

        //  <div style="margin-top: 10px;">
        //     <a href="${process.env.FRONTEND_URL}/terms" style="color: #3B82F6; text-decoration: none; margin: 0 10px;">Terms</a>
        //     <a href="${process.env.FRONTEND_URL}/privacy" style="color: #3B82F6; text-decoration: none; margin: 0 10px;">Privacy</a>
        //     <a href="${process.env.FRONTEND_URL}/contact" style="color: #3B82F6; text-decoration: none; margin: 0 10px;">Contact</a>
        //   </div>


export const sendEmail = async (email, token) => {
  const resetUrl = `${process.env.BACKEND_URL}/reset-password/${token}`;
  
  await transporter.sendMail({
    from: `"SplitzVille" <${process.env.SMTP_FROM}>`,
    to: email,
    subject: 'Password Reset',
    html: `Click <a href="${resetUrl}">here</a> to reset your password`
  });
};
