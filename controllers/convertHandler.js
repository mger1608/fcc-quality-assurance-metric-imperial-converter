function ConvertHandler() {
  
  this.getNum = function(input) {
    // If there's no number, return 1
    if (/^[a-zA-Z]+$/.test(input)) {
      return 1;
    }
    
    // Find the first occurrence of a letter to split number from unit
    const letterIndex = input.match(/[a-zA-Z]/) ? input.match(/[a-zA-Z]/).index : input.length;
    const numStr = input.substring(0, letterIndex);
    
    // Check for double fraction (invalid)
    if ((numStr.match(/\//g) || []).length > 1) {
      return undefined;
    }
    
    // Handle fraction
    if (numStr.includes('/')) {
      const [numerator, denominator] = numStr.split('/');
      // Check for invalid denominator
      if (parseFloat(denominator) === 0) {
        return undefined;
      }
      return parseFloat(numerator) / parseFloat(denominator);
    }
    
    // Handle regular number
    const result = parseFloat(numStr);
    return isNaN(result) ? undefined : result;
  };
  
  this.getUnit = function(input) {
    // Find the first occurrence of a letter
    const letterIndex = input.match(/[a-zA-Z]/) ? input.match(/[a-zA-Z]/).index : -1;
    if (letterIndex === -1) return undefined;
    
    const unit = input.substring(letterIndex);
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
    
    // Check if unit is valid (case insensitive)
    const unitLower = unit.toLowerCase();
    if (!validUnits.map(u => u.toLowerCase()).includes(unitLower)) {
      return undefined;
    }
    
    // Return normalized unit
    if (unitLower === 'l') return 'L';
    return unitLower;
  };
  
  this.getReturnUnit = function(initUnit) {
    if (!initUnit) return undefined;
    
    const unitMap = {
      'gal': 'L',
      'l': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs',
      'L': 'gal'
    };
    
    return unitMap[initUnit.toLowerCase()];
  };

  this.spellOutUnit = function(unit) {
    if (!unit) return undefined;
    
    const unitNames = {
      'gal': 'gallons',
      'l': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms',
      'L': 'liters'
    };

  return unitNames[unit.toLowerCase()];
  };
  
  this.convert = function(initNum, initUnit) {
    if (initNum === undefined || initUnit === undefined) return undefined;
    
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const unit = initUnit.toLowerCase();

    switch(unit) {
      case 'gal':
        return initNum * galToL;
      case 'l':
      case 'L':
        return initNum / galToL; // L is treated as liters
      case 'mi':
        return initNum * miToKm;
      case 'km':
        return initNum / miToKm;
      case 'lbs':
        return initNum * lbsToKg;
      case 'kg':
        return initNum / lbsToKg;
      default:
        return undefined;
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    // Handle errors for invalid inputs
    if (initNum === undefined && initUnit === undefined) {
    return 'invalid number and unit';
    }
    if (initNum === undefined) {
      return 'invalid number';
    }
    if (initUnit === undefined) {
      return 'invalid unit';
    }

    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;

