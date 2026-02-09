'use strict';

var IyzipayResource = require('../IyzipayResource');

function ReportingBouncedPayments() {
    this._config = arguments[0];
    this._api = {
        retrieve: {
            path: '/reporting/settlement/bounced',
            method: 'POST',
            requestModel: 'RetrieveBouncedPaymentsRequest'
        }
    }
};

ReportingBouncedPayments.prototype = new IyzipayResource();

module.exports = ReportingBouncedPayments;
