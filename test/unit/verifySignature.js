const utils = require('../../lib/utils');

module.exports = function verifySignature(params, secretKey, signature) {
    const calculatedSignature = utils.calculateHmacSHA256Signature(params, secretKey);
    const verified = signature === calculatedSignature;
    console.log('Signature verified:', verified);
};