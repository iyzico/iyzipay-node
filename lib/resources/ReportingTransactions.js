'use strict';

var IyzipayResource = require('../IyzipayResource');

function ReportingTransactions() {
    this._config = arguments[0];
    this._api = {
        retrieve: {
            path: '/v2/reporting/payment/transactions',
            method: 'GET',
            queryString: 'RetrieveTransactionsRequest'
        }
    }
};

ReportingTransactions.prototype = new IyzipayResource();

module.exports = ReportingTransactions;