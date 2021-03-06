'use strict';

require('../css/main.css');
require('../css/nojs.css');
require('../css/columns/name-size-date.css');
require('../css/columns/name-size.css');

const {
    registerSW,
} = require('./sw/register');

// prevent additional loading of emitify
window.Emitify = require('emitify/legacy');

module.exports = window.CloudCmd = (config) => {
    window.Promise = window.Promise || require('es6-promise');
    window.Util = require('../common/util');
    window.CloudFunc = require('../common/cloudfunc');
    
    const DOM = require('./dom');
    
    window.DOM = DOM;
    window.CloudCmd = require('./client');

    registerSW(config.prefix);
    
    const prefix = getPrefix(config.prefix);
    
    require('./listeners');
    require('./key');
    require('./sort');
    
    window.CloudCmd.init(prefix, config);
};

function getPrefix(prefix) {
    if (!prefix)
        return '';
   
    if (!prefix.indexOf('/'))
        return prefix;
    
    return '/' + prefix;
}

