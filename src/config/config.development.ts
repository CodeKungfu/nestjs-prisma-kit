export default {
  rootRoleId: 1,
  // nodemailer config
  mailer: {
    host: 'xxx',
    port: 80,
    auth: {
      user: 'xxx',
      pass: 'xxx',
    },
    secure: false, // or true using 443
  },
  // amap config
  amap: {
    key: 'xxx',
  },
  // jwt sign secret
  jwt: {
    secret: process.env.JWT_SECRET || '',
  },
  redis: {
    host: process.env.REDIS_HOST || '', // default value
    port: process.env.REDIS_PORT || 6379, // default value
    password: process.env.REDIS_PASSWORD || '',
    db: process.env.REDIS_DB || 6,
  },
};
