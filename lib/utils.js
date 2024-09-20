'use strict';

var crypto = require('crypto');

var utils = module.exports = {
    apiMethod: {
        RETRIEVE: 'retrieve',
        RETRIEVE_LIST: 'retrieveList',
        CREATE: 'create',
        DELETE: 'delete',
        UPDATE: 'update'
    },
    generateAuthorizationHeader: function (iyziWsHeaderName, apiKey, separator, secretKey, body, randomString) {
        return iyziWsHeaderName + ' ' + apiKey + separator + utils.generateHash(apiKey, randomString, secretKey, body);
    },
    generateAuthorizationHeaderV2: function (iyziWsHeaderName, apiKey, separator, secretKey, uri, body, randomString) {
        return iyziWsHeaderName + ' ' + utils.generateHashV2(apiKey, separator, uri, randomString, secretKey, body);
    },
    generateHash: function (apiKey, randomString, secretKey, body) {
        var shaSum = crypto.createHash('sha1');
        shaSum.update(apiKey + randomString + secretKey + body, 'utf8');
        return shaSum.digest('base64');
    },
    generateHashV2: function (apiKey, separator, uri, randomString, secretKey, body) {
        var signature = crypto
            .createHmac('sha256', secretKey)
            .update(randomString + uri + JSON.stringify(body))
            .digest('hex');

        var authorizationParams = [
            'apiKey' + separator + apiKey,
            'randomKey' + separator + randomString,
            'signature' + separator + signature
        ];
        return new Buffer.from(authorizationParams.join('&')).toString('base64');
    },
    generateRandomString: function (size) {
        return process.hrtime()[0] + Math.random().toString(size).slice(2);
    },
    formatPrice: function (price) {
        if (('number' !== typeof price && 'string' !== typeof price) || !isFinite(price)) {
            return price;
        }
        var resultPrice = parseFloat(price).toString();
        if (-1 === resultPrice.indexOf('.')) {
            return resultPrice + '.0';
        }
        return resultPrice;
    },
    mergeObjects: function (obj1, obj2) {
        var mergedObject = {};
        for (var key in obj1) {
            if (obj1.hasOwnProperty(key)) {
                mergedObject[key] = obj1[key];
            }
        }
        for (var key in obj2) {
            if (obj2.hasOwnProperty(key)) {
                mergedObject[key] = obj2[key];
            }
        }
        return mergedObject;
    },
    calculateHmacSHA256Signature: (params, secretKey) => {
        const dataToCheck = params.join(':');

        return crypto
            .createHmac('sha256', secretKey)
            .update(dataToCheck)
            .digest('hex');
    }
};
