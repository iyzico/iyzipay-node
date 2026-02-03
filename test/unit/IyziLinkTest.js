const should = require('should');
const Iyzipay = require('../../lib/Iyzipay');

describe('IyziLink Product', function () {
    it('should return data.token from successful create response', function (done) {
        const iyzipay = new Iyzipay({
            uri: 'http://uri',
            apiKey: 'apiKey',
            secretKey: 'secretKey'
        });

        const request = {
            conversationId: "123456",
            locale: "en",
            name: "Sample Product",
            description: "10 Books",
            price: "50.00",
            currencyCode: "TRY",
            encodedImageFile: "/9j/4AAQSkZJRgABAQEAYABgAAD...",
            addressIgnorable: true,
            installmentRequested: false,
            stockEnabled: true,
            stockCount: 25,
            flexibleLink: true,
            presetPriceValues: [10.00, 20.00],
            categoryType: "UNKNOWN"
        };

        const mockResponse = {
            status: "success",
            locale: "en",
            systemTime: 1687827915258,
            conversationId: "123456",
            data: {
                token: "WxI",
                url: "https://sandbox.iyzi.link/WxI",
                imageUrl: "https://sandbox-img.iyzi.link/Wx/I.jpg"
            }
        };

        iyzipay.iyziLink._request = function (method, cb) {
            should.equal(method, 'create');
            cb(null, null, mockResponse);
        };

        iyzipay.iyziLink.create(request, function (err, result) {
            should.not.exist(err);
            should.exist(result);
            should.exist(result.data);
            result.data.token.should.equal('WxI');
            done();
        });
    });

    it('should return data.token from successful fastlink response', function (done) {
        const iyzipay = new Iyzipay({
            uri: 'http://uri',
            apiKey: 'apiKey',
            secretKey: 'secretKey'
        });

        const request = {
            conversationId: "123456",
            locale: "en",
            description: "10 Books",
            price: "75.00",
            currencyCode: "TRY"
        };

        const mockResponse = {
            status: "success",
            locale: "en",
            systemTime: 1687827915258,
            conversationId: "123456",
            data: {
                token: "WxI",
                url: "https://sandbox.iyzi.link/WxI",
                imageUrl: "https://sandbox-img.iyzi.link/Wx/I.jpg"
            }
        };

        iyzipay.iyziLink._request = function (method, cb) {
            should.equal(method, 'fastlink');
            cb(null, null, mockResponse);
        };

        iyzipay.iyziLink.fastlink(request, function (err, result) {
            should.not.exist(err);
            should.exist(result);
            should.exist(result.data);
            result.data.token.should.equal('WxI');
            done();
        });
    });

    it('should return data.token from successful update response', function (done) {
        const iyzipay = new Iyzipay({
            uri: 'http://uri',
            apiKey: 'apiKey',
            secretKey: 'secretKey'
        });

        const request = {
            conversationId: "123456",
            locale: "en",
            name: "Updated Product",
            description: "10 Books",
            price: "60.00",
            currencyCode: "TRY",
            encodedImageFile: "/9j/4AAQSkZJRgABAQEAYABgAAD...",
            addressIgnorable: false,
            installmentRequested: true,
            stockEnabled: true,
            stockCount: 12,
            linkToken: "WxI"
        };

        const mockResponse = {
            status: "success",
            locale: "en",
            systemTime: 1687827915258,
            conversationId: "123456",
            data: {
                token: "WxI",
                url: "https://sandbox.iyzi.link/WxI",
                imageUrl: "https://sandbox-img.iyzi.link/Wx/I.jpg"
            }
        };

        iyzipay.iyziLink._request = function (method, cb) {
            should.equal(method, 'update');
            cb(null, null, mockResponse);
        };

        iyzipay.iyziLink.update(request, function (err, result) {
            should.not.exist(err);
            should.exist(result);
            should.exist(result.data);
            result.data.token.should.equal('WxI');
            done();
        });
    });

    it('should update product status', function (done) {
        const iyzipay = new Iyzipay({
            uri: 'http://uri',
            apiKey: 'apiKey',
            secretKey: 'secretKey'
        });

        const request = {
            conversationId: "123456",
            locale: "en",
            status: "PASSIVE",
            linkToken: "WxI"
        };

        const mockResponse = {
            status: "success",
            locale: "en",
            systemTime: 1687827915258,
            conversationId: "123456"
        };

        iyzipay.iyziLink._request = function (method, cb) {
            should.equal(method, 'updateProductStatus');
            cb(null, null, mockResponse);
        };

        iyzipay.iyziLink.updateProductStatus(request, function (err, result) {
            should.not.exist(err);
            should.exist(result);
            result.status.should.equal('success');
            done();
        });
    });

    it('should retrieve product', function (done) {
        const iyzipay = new Iyzipay({
            uri: 'http://uri',
            apiKey: 'apiKey',
            secretKey: 'secretKey'
        });

        const request = {
            conversationId: "123456",
            locale: "en",
            linkToken: "Wx0"
        };

        const mockResponse = {
            status: "success",
            locale: "en",
            systemTime: 1687827915258,
            conversationId: "123456",
            data: {
                name: "sample-name",
                conversationId: "1123456789",
                description: "10 Books",
                price: "50.00000000",
                currencyId: 3,
                currencyCode: "USD",
                token: "Wx0",
                productType: "IYZILINK",
                productStatus: "ACTIVE",
                merchantId: 376927,
                url: "https://sandbox.iyzi.link/Wx0",
                imageUrl: "https://sandbox-img.iyzi.link/Wx/0.jpg",
                addressIgnorable: false,
                soldCount: 0,
                installmentRequested: false,
                stockEnabled: false,
                stockCount: 0,
                presetPriceValues: [
                    "50.00",
                    "75.00",
                    "100.00"
                ],
                flexibleLink: false,
                categoryType: "PHONE"
            }
        };

        iyzipay.iyziLink._request = function (method, cb) {
            should.equal(method, 'retrieve');
            cb(null, null, mockResponse);
        };

        iyzipay.iyziLink.retrieve(request, function (err, result) {
            should.not.exist(err);
            should.exist(result);
            should.exist(result.data);
            result.data.token.should.equal('Wx0');
            done();
        });
    });

    it('should delete product', function (done) {
        const iyzipay = new Iyzipay({
            uri: 'http://uri',
            apiKey: 'apiKey',
            secretKey: 'secretKey'
        });

        const request = {
            conversationId: "123456",
            locale: "en",
            linkToken: "Wx0"
        };

        const mockResponse = {
            status: "success",
            systemTime: 1687825929316,
            locale: "en",
            conversationId: "123456"
        };

        iyzipay.iyziLink._request = function (method, cb) {
            should.equal(method, 'delete');
            cb(null, null, mockResponse);
        };

        iyzipay.iyziLink.delete(request, function (err, result) {
            should.not.exist(err);
            should.exist(result);
            result.status.should.equal('success');
            done();
        });
    });
});
