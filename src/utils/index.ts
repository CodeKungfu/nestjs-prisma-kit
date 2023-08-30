import jwt from 'jsonwebtoken';
const secretkey = '12333jindfadsf=='; //密钥

// 生成token
export const sign = (data = {}) => {
  return jwt.sign(data, secretkey, {
      expiresIn: 60 * 60 * 24 * 30, // 24h * 30
  });
};
