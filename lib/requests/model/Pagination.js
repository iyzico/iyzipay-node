'use strict';

function Pagination() {
}

Pagination.body = function (data) {
    return typeof data !== 'undefined' ? {
        locale: data['locale'],
        conversationId: data['conversationId'],
        page: data['page'],
        count: data['count']
    } : undefined;
};

module.exports = Pagination;
