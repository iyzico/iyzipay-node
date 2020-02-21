'use strict';

var utils = require('../../utils');

function PaymentItem() {}

PaymentItem.body = function(data) {
    return typeof data !== 'undefined'
        ? {
              subMerchantKey: data['subMerchantKey'],
              paymentTransactionId: data['paymentTransactionId'],
              subMerchantPrice: utils.formatPrice(data['subMerchantPrice'])          }
        : undefined;
};

module.exports = PaymentItem;
