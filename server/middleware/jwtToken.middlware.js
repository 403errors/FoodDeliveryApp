const jwt = require('jsonwebtoken');

const jwtVerify = async (req, res, next) => {
  try {
   
    if (!req.headers.authorization) {
      console.log(`Unauthorized: No token provided. ${req.url}`);
      return res.status(400).json({
        message: `Unauthorized to access`
      });
    }

    if (req.headers && req.headers.authorization) {

   
      let token = req.headers.authorization.split(' ')[1]; // Corrected typo here
      const decoded = jwt.verify(token, process.env.SCRETE_KEY); // Corrected typo here
      if (!decoded) {
        return res.status(401).json({ // Changed status code to 401 for unauthorized access
          message: 'Unauthorized access'
        });
      }
      req.user = decoded;
      // console.log(req.user,"JWT user");
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(`Something went wrong ${error}`); // Changed status code to 500 for internal server error
  }
};

module.exports = jwtVerify;
