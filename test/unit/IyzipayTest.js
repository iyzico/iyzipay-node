var assert = require('assert'),
    should = require('should'),
    Iyzipay = require('../../lib/Iyzipay');

describe('Iyzipay', function () {

    it('should initialize iyzipay via config', function (done) {
        var iyzipay = new Iyzipay({
            uri: 'http://uri',
            apiKey: 'apiKey',
            secretKey: 'secretKey'
        });
        iyzipay.should.not.be.null;
        done();
    });

    it('should initialize iyzipay via environment variables without config', function (done) {
        process.env['IYZIPAY_URI'] = 'http://uri';
        process.env['IYZIPAY_API_KEY'] = 'apiKey';
        process.env['IYZIPAY_SECRET_KEY'] = 'secretKey';

        var iyzipay = new Iyzipay();
        iyzipay.should.not.be.null;

        delete process.env['IYZIPAY_URI'];
        delete process.env['IYZIPAY_API_KEY'];
        delete process.env['IYZIPAY_SECRET_KEY'];
        done();
    });

    it('should throw exception on empty "uri"', function (done) {
        assert.throws(function () {
            var iyzipay = new Iyzipay({
                apiKey: 'apiKey',
                secretKey: 'secretKey'

            });
        }, /uri cannot be empty/);
        done();
    });

    it('should throw exception on empty "apiKey"', function (done) {
        assert.throws(function () {
            var iyzipay = new Iyzipay({
                uri: 'http://uri',
                secretKey: 'secretKey'

            });
        }, /apiKey cannot be empty/);
        done();
    });

    it('should throw exception on empty "secretKey"', function (done) {
        assert.throws(function () {
            var iyzipay = new Iyzipay({
                uri: 'http://uri',
                apiKey: 'apiKey'

            });
        }, /secretKey cannot be empty/);
        done();
    });

    it('should remove trailing slash from uri', function (done) {
        var iyzipay = new Iyzipay({
            uri: 'http://uri/',
            apiKey: 'apiKey',
            secretKey: 'secretKey'
        });
        iyzipay._config.uri.should.equal('http://uri');
        done();
    });

    it('should remove trailing slash and preserve protocol', function (done) {
        var iyzipay = new Iyzipay({
            uri: 'https://sandbox-api.iyzipay.com/',
            apiKey: 'apiKey',
            secretKey: 'secretKey'
        });
        iyzipay._config.uri.should.equal('https://sandbox-api.iyzipay.com');
        done();
    });
});