const moment = require("moment");

const isDate = (value, {req, location, path}) =>{

    if(!value) return false;
    else{
        const date = new moment(value);
        return date.isValid()
    }
}

module.exports = {isDate}