'use strict';

function IyziLinkProduct() {
}

IyziLinkProduct.body = function (data) {
    return typeof data !== 'undefined' ? {
        locale: data['locale'],
        conversationId: data['conversationId'],
        name: data["name"],
        description: data["description"],
        price: data["price"],
        currencyCode: data["currencyCode"],
        encodedImageFile: data["encodedImageFile"],
        addressIgnorable: data["addressIgnorable"],
        installmentRequested: data["installmentRequested"],
        stockEnabled: data["stockEnabled"],
        stockCount: data["stockCount"],
        flexibleLink: data["flexibleLink"],
        presetPriceValues: data["presetPriceValues"],
        categoryType: data["categoryType"]
    } : undefined;
}

module.exports = IyziLinkProduct;