var assert = require('assert'),
    should = require('should'),
    utils = require('../../lib/utils');

describe('Iyzipay', function () {

    var iyziWsHeaderName;
    var iyziWsHeaderNameV2;
    var apiKey;
    var secretKey;
    var separator;
    var randomString;
    var uri;
    var body;

    before(function () {
        iyziWsHeaderName = "IYZWS";
        iyziWsHeaderNameV2 = 'IYZWSv2';
        apiKey = "api_key";
        secretKey = "secret_key";
        separator = ":";
        randomString = "random_string";
        uri = "uri";
        body = "body";
    });

    it('should return api methods', function (done) {
        var apiMethods = {
            RETRIEVE: 'retrieve',
            RETRIEVE_LIST: 'retrieveList',
            CREATE: 'create',
            DELETE: 'delete',
            UPDATE: 'update'
        };
        should.deepEqual(apiMethods, utils.apiMethod);
        done();
    });

    it('should generate authorization header', function (done) {
        var header = utils.generateAuthorizationHeader(iyziWsHeaderName, apiKey, separator, secretKey, body, randomString);
        header.should.be.equal("IYZWS api_key:ikF+xhjLA0/xsvl+eJjoHWkwh5g=");
        done();
    });

    it('should generate authorization header v2', function (done) {
        var header = utils.generateAuthorizationHeaderV2(iyziWsHeaderNameV2, apiKey, separator, secretKey, uri, body, randomString);
        header.should.be.equal("IYZWSv2 YXBpS2V5OmFwaV9rZXkmcmFuZG9tS2V5OnJhbmRvbV9zdHJpbmcmc2lnbmF0dXJlOjAxNzUwODkyMWEyOWVlNTYwMWJjZDFmYmU4M2VmZDJlMmJlNDNhZjAyZWNlZmYzMGNmMmU5MWE1MzlhYWIzNTU=");
        done();
    });

    it('should generate hash', function (done) {
        var hash = utils.generateHash(apiKey, randomString, secretKey, body);
        hash.should.be.equal("ikF+xhjLA0/xsvl+eJjoHWkwh5g=");
        done();
    });

    it('should generate hash v2', function (done) {
        var hash = utils.generateHashV2(apiKey, separator, uri, randomString, secretKey, body);
        hash.should.be.equal("YXBpS2V5OmFwaV9rZXkmcmFuZG9tS2V5OnJhbmRvbV9zdHJpbmcmc2lnbmF0dXJlOjAxNzUwODkyMWEyOWVlNTYwMWJjZDFmYmU4M2VmZDJlMmJlNDNhZjAyZWNlZmYzMGNmMmU5MWE1MzlhYWIzNTU=");
        done();
    });

    it('should generate random string', function (done) {
        var randomString = utils.generateRandomString(8);
        randomString.should.not.be.null;
        done();
    });

    it('should convert non-float price', function (done) {
        var price = utils.formatPrice('22');
        price.should.be.equal('22.0');
        done();
    });

    it('should convert float price', function (done) {
        var price = utils.formatPrice('23.0');
        price.should.be.equal('23.0');
        done();
    });

    it('should eliminate floating zeros', function (done) {
        var price = utils.formatPrice('15.340000');
        price.should.be.equal('15.34');
        done();
    });

    it('should not eliminate leading zero', function (done) {
        var price = utils.formatPrice('0.12345');
        price.should.be.equal('0.12345');
        done();
    });

    it('should eliminate leading zero containing only one zero', function (done) {
        var price = utils.formatPrice('22.00');
        price.should.be.equal('22.0');
        done();
    });

    it('should not eliminate zeros in floating value', function (done) {
        var price = utils.formatPrice('23.00450067');
        price.should.be.equal('23.00450067');
        done();
    });

    it('should be undefined', function (done) {
        var data = [];
        var price = utils.formatPrice(data['price']);
        should.not.exist(price);
        done();
    });

    it('should return same price if given price is invalid', function (done) {
        var price = utils.formatPrice(NaN);
        price.should.be.NaN;
        done();
    });

    it('should convert integer to string', function (done) {
        var price = utils.formatPrice(23);
        price.should.be.equal('23.0');
        done();
    });

    it('should convert float to string', function (done) {
        var price = utils.formatPrice(23.12);
        price.should.be.equal('23.12');
        done();
    });

    it('should merge objects', function (done) {
        var obj1 = {a: 1},
            obj2 = {b: 2};
        var mergedObject = utils.mergeObjects(obj1, obj2);
        mergedObject['a'].should.be.equal(1);
        mergedObject['b'].should.be.equal(2);
        done();
    });
});
