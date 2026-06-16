const express = require('express');
const { handleDuplicate } = require('../core/handleMysql');
const router = express.Router();

let initRouterError = (app) => {
  app.use((err, req, res, next) => {
    if(err.code ==="ER_DUP_ENTRY"){
        err = handleDuplicate(err)
    }
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    
    res.status(err.statusCode).json({ 
        status: err.status,
        message: err.message,
        error: err.fields || null,
        // statusCode: err.statusCode
     });
  });
};


module.exports = initRouterError;