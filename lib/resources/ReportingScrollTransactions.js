'use strict';

var IyzipayResource = require('../IyzipayResource');

function ReportingScrollTransactions() {
    this._config = arguments[0];
    this._api = {
        retrieve: {
            path: '/v2/reporting/payment/scroll-transactions',
            method: 'GET',
            queryString: 'RetrieveScrollTransactionsRequest'
        }
    }
};

ReportingScrollTransactions.prototype = new IyzipayResource();

module.exports = ReportingScrollTransactions;
