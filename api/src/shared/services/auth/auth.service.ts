import * as dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_KEY: string = process.env.JWT_KEY;

class PasswordService {
  public hashPassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  public compare(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }

  verify = (token: string): any => jwt.verify(token, JWT_KEY);

  generateToken = (payload: any): string =>
    jwt.sign(payload, JWT_KEY, {
      expiresIn: '24h'
    });
}

export default new PasswordService();
