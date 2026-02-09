'use strict';

var IyzipayResource = require('../IyzipayResource');

function ReportingTransactionDetails() {
    this._config = arguments[0];
    this._api = {
        retrieve: {
            path: '/v2/reporting/payment/details',
            method: 'GET',
            queryString: 'RetrieveTransactionDetailsRequest'
        }
    }
};

ReportingTransactionDetails.prototype = new IyzipayResource();

module.exports = ReportingTransactionDetails;
