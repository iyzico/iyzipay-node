'use strict';

var fs = require('fs');

function Iyzipay(config) {
    if (!(this instanceof Iyzipay)) {
        return new Iyzipay(config);
    }

    if (typeof config === 'undefined') {
        config = {
            uri: null,
            apiKey: null,
            secretKey: null
        }
    }
    this._config = {
        uri: config.uri || process.env.IYZIPAY_URI,
        apiKey: config.apiKey || process.env.IYZIPAY_API_KEY,
        secretKey: config.secretKey || process.env.IYZIPAY_SECRET_KEY
    };

    this._validateIyzipayOptions(this._config);

    this._initResources();
}

Iyzipay.prototype._initResources = function () {
    var _self = this;
    var modelsPath = __dirname + '/resources';
    fs.readdirSync(modelsPath).forEach(function (fileName) {
        if (~fileName.indexOf('.js')) {
            var resource = require(modelsPath + '/' + fileName);
            var resourceName = fileName.split('.js')[0];
            _self[resourceName[0].toLowerCase() + resourceName.substring(1)] = new resource(_self._config);
        }
    });
};

Iyzipay.prototype._validateIyzipayOptions = function (config) {
    if (typeof config['uri'] === 'undefined' || config['uri'] === '') throw new TypeError('uri cannot be empty');
    if (typeof config['apiKey'] === 'undefined' || config['apiKey'] === '') throw new TypeError('apiKey cannot be empty');
    if (typeof config['secretKey'] === 'undefined' || config['secretKey'] === '') throw new TypeError('secretKey cannot be empty');
};

Iyzipay.LOCALE = {
    TR: 'tr',
    EN: 'en'
};

Iyzipay.PAYMENT_GROUP = {
    PRODUCT: 'PRODUCT',
    LISTING: 'LISTING',
    SUBSCRIPTION: 'SUBSCRIPTION'
};

Iyzipay.BASKET_ITEM_TYPE = {
    PHYSICAL: 'PHYSICAL',
    VIRTUAL: 'VIRTUAL'
};

Iyzipay.PAYMENT_CHANNEL = {
    MOBILE: 'MOBILE',
    WEB: 'WEB',
    MOBILE_WEB: 'MOBILE_WEB',
    MOBILE_IOS: 'MOBILE_IOS',
    MOBILE_ANDROID: 'MOBILE_ANDROID',
    MOBILE_WINDOWS: 'MOBILE_WINDOWS',
    MOBILE_TABLET: 'MOBILE_TABLET',
    MOBILE_PHONE: 'MOBILE_PHONE'
};

Iyzipay.SUB_MERCHANT_TYPE = {
    PERSONAL: 'PERSONAL',
    PRIVATE_COMPANY: 'PRIVATE_COMPANY',
    LIMITED_OR_JOINT_STOCK_COMPANY: 'LIMITED_OR_JOINT_STOCK_COMPANY'
};

Iyzipay.CURRENCY = {
    TRY: 'TRY',
    EUR: 'EUR',
    USD: 'USD',
    IRR: 'IRR',
    GBP: 'GBP',
    NOK: 'NOK',
    RUB: 'RUB',
    CHF: 'CHF'
};

Iyzipay.APM_TYPE = {
    SOFORT: 'SOFORT',
    IDEAL: 'IDEAL',
    QIWI: 'QIWI',
    GIROPAY: 'GIROPAY'
};

Iyzipay.REFUND_REASON = {
    DOUBLE_PAYMENT : 'double_payment',
    BUYER_REQUEST : 'buyer_request',
    FRAUD : 'fraud',
    OTHER : 'other'
};

Iyzipay.PLAN_PAYMENT_TYPE = {
    RECURRING: "RECURRING"
};

Iyzipay.SUBSCRIPTION_PRICING_PLAN_INTERVAL = {
    DAILY: 'DAILY',
    WEEKLY: 'WEEKLY',
    MONTHLY: 'MONTHLY',
    YEARLY: 'YEARLY'
};

Iyzipay.SUBSCRIPTION_UPGRADE_PERIOD = {
    NOW: 'NOW'
};

Iyzipay.SUBSCRIPTION_STATUS = {
    EXPIRED: 'EXPIRED',
    UNPAID: 'UNPAID',
    CANCELED: 'CANCELED',
    ACTIVE: 'ACTIVE',
    PENDING: 'PENDING',
    UPGRADED: 'UPGRADED'
};

Iyzipay.SUBSCRIPTION_INITIAL_STATUS = {
    ACTIVE : 'ACTIVE',
    PENDING : 'PENDING'
};

module.exports = Iyzipay;
