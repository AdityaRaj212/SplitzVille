import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const UserVerification = sequelize.define('UserVerification', {
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  verificationToken: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('PENDING', 'VERIFIED', 'EXPIRED'),
    defaultValue: 'PENDING'
  }
}, {
  timestamps: true,
  paranoid: true
});

export default UserVerification;
