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

    it('should return token from successful fastlink response', function (done) {
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
});
