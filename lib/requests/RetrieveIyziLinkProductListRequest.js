'use strict';

var BaseRequest = require('./BaseRequest'),
    util = require('util'),
    Pagination = require('./model/Pagination');

function RetrieveIyziLinkProductListRequest(request) {
    BaseRequest.call(this, Pagination.body(request));
}

util.inherits(RetrieveIyziLinkProductListRequest, BaseRequest);

module.exports = RetrieveIyziLinkProductListRequest;
