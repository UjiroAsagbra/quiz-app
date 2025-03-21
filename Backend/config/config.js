export default {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/mern-quiz',
  jwtSecret: process.env.JWT_SECRET ,
  jwtExpiration: '1h'
};