import jwt, { JwtPayload } from 'jsonwebtoken'
import * as dotenv from 'dotenv';
import { User } from '../../database/models/user';
dotenv.config();
const JWT_KEY: string = process.env.JWT_KEY;

const authenticateJWT = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }
  try {
    const decoded = jwt.verify(token.split(' ')[1], JWT_KEY);
    req.user = req.user = await User.findByPk(decoded.id) as JwtPayload;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

const authorizeRoleAdmin = (isAdmin) => {
  return (req, res, next) => {
    if (req.user.role !== isAdmin) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    next();
  };
};

export { authenticateJWT, authorizeRoleAdmin };
