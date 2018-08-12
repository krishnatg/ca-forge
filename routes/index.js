'use strict';
const fs = require('fs');
const express = require('express');
let debug = require('debug')('ca-forge:routes:index');
let router = express.Router();
fs.readdirSync(__dirname).forEach(function(file){
    if(file === 'index.js'){
        return;
    }
    let name = file.substr(0, file.indexOf('.'));
    require('./' + name)(router);
    debug(name);
});
module.exports = router;
