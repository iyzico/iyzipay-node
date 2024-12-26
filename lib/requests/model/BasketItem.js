'use strict';

var utils = require('../../utils');

function BasketItem() {
}

BasketItem.body = function (data) {

    return typeof data !== 'undefined' ? {
        id: data["id"],
        price: utils.formatPrice(data["price"]),
        name: data["name"],
        category1: data["category1"],
        category2: data["category2"],
        itemType: data["itemType"],
        subMerchantKey: data["subMerchantKey"],
        subMerchantPrice: utils.formatPrice(data["subMerchantPrice"]),
        withholdingTax: utils.formatPrice(data['withholdingTax'])
    } : undefined
};

module.exports = BasketItem;