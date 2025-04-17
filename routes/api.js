'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get(function (req, res) {
    let input = req.query.input;
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    
    if (initNum === undefined && initUnit === undefined) {
      return res.json("invalid number and unit");
    }
    if (initNum === undefined) {
      return res.json("invalid number");
    }
    if (initUnit === undefined) {
      return res.json("invalid unit");
    }
    
    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    
    return res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
    });
  });
};
