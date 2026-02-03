const should = require('should');
const Iyzipay = require('../lib/Iyzipay');
const utils = require('../lib/utils');
const path = require('path');
const options = require('./data/options');

describe('IyziLink API Test', function () {
    let iyzipay;

    before(function (done) {
        iyzipay = new Iyzipay(options);
        done();
    });

    describe('IyziLink Product', function () {
        it('should create an IyziLink product', function (done) {
            const request = {
                conversationId: "123456",
                locale: "en",
                name: "Sample Product",
                description: "10 Books",
                price: "50.00",
                currencyCode: "TRY",
                encodedImageFile: utils.encodeFileBase64(path.join(__dirname, 'images', 'image.png')),
                addressIgnorable: true,
                installmentRequested: false,
                stockEnabled: true,
                stockCount: 25,
                presetPriceValues: [10.00, 20.00],
                categoryType: "UNKNOWN"
            };

            iyzipay.iyziLink.create(request, function (err, result) {
                console.log('err:', err);
                console.log('result:', result);
                should.not.exist(err);
                should.exist(result);
                should.exist(result.data.token);
                done();
            });
        });

        it('should create an IyziLink fastlink', function (done) {
            const request = {
                conversationId: "123456789",
                locale: "tr",
                description: "10 Books",
                price: "75.00",
                currencyCode: "TRY"
            };

            iyzipay.iyziLink.fastlink(request, function (err, result) {
                console.log('err:', err);
                console.log('result:', result);
                should.not.exist(err);
                should.exist(result);
                done();
            });
        });

        it('should update an IyziLink product', function (done) {
            const request = {
                locale: "en",
                conversationId: "123456",
                name: "Updated Product",
                description: "10 Books",
                price: "60.00",
                currencyCode: "TRY",
                encodedImageFile: utils.encodeFileBase64(path.join(__dirname, 'images', 'image.png')),
                addressIgnorable: false,
                installmentRequested: true,
                stockEnabled: true,
                stockCount: 12,
                linkToken: "AAI0pA"
            };

            iyzipay.iyziLink.update(request, function (err, result) {
                console.log('err:', err);
                console.log('result:', result);
                should.not.exist(err);
                should.exist(result);
                done();
            });
        });

        it('should update an IyziLink product status', function (done) {
            const request = {
                conversationId: "123456",
                locale: "en",
                status: "PASSIVE",
                linkToken: "AAI0pA"
            };

            iyzipay.iyziLink.updateProductStatus(request, function (err, result) {
                console.log('err:', err);
                console.log('result:', result);
                should.not.exist(err);
                should.exist(result);
                done();
            });
        });

        it('should retrieve an IyziLink product', function (done) {
            const request = {
                locale: "en",
                conversationId: "123456",
                linkToken: "AAI0pA"
            };

            iyzipay.iyziLink.retrieve(request, function (err, result) {
                console.log('err:', err);
                console.log('result:', result);
                should.not.exist(err);
                should.exist(result);
                done();
            });
        });

        it('should delete an IyziLink product', function (done) {
            const request = {
                locale: "en",
                conversationId: "123456",
                linkToken: "AAI0pA"
            };

            iyzipay.iyziLink.delete(request, function (err, result) {
                console.log('err:', err);
                console.log('result:', result);
                should.not.exist(err);
                should.exist(result);
                done();
            });
        });

        it('should retrieve IyziLink product list', function (done) {
            const request = {
                locale: "en",
                conversationId: "123456",
                page: 1,
                count: 10
            };

            iyzipay.iyziLink.retrieveList(request, function (err, result) {
                console.log('err:', err);
                console.log('result:', result);
                should.not.exist(err);
                should.exist(result);
                done();
            });
        });
    });
});