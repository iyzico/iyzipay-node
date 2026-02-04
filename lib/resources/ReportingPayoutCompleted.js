'use strict';

var IyzipayResource = require('../IyzipayResource');

function ReportingPayoutCompleted() {
    this._config = arguments[0];
    this._api = {
        retrieve: {
            path: '/reporting/settlement/payoutcompleted',
            method: 'POST',
            requestModel: 'RetrievePayoutCompletedRequest'
        }
    }
};

ReportingPayoutCompleted.prototype = new IyzipayResource();

module.exports = ReportingPayoutCompleted;
