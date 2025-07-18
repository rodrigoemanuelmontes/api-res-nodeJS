
import jwt from 'jsonwebtoken';

export const login = async (email, password) => {
  if (email === 'rodrigomontes167@gmail.com' && password === 'admin123') { 
    return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  }
  const err = new Error('Credenciales inválidas');
  err.status = 401;
  throw err;
};