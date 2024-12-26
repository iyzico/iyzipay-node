'use strict';

var utils = require('../../utils');

function PaymentItem() {}

PaymentItem.body = function(data) {
    return typeof data !== 'undefined'
        ? {
              subMerchantKey: data['subMerchantKey'],
              paymentTransactionId: data['paymentTransactionId'],
              subMerchantPrice: utils.formatPrice(data['subMerchantPrice']),
              withholdingTax: utils.formatPrice(data['withholdingTax'])
          }
        : undefined;
};

module.exports = PaymentItem;
