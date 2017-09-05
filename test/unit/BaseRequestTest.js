var assert = require('assert'),
    should = require('should'),
    BaseRequest = require('../../lib/requests/BaseRequest');

describe('BaseRequest', function () {

    before(function () {
        request = new BaseRequest;
    });

    it('should generate request string for basic request', function (done) {
        var requestString = request._generateRequestString({
            name: "John",
            surname: "Doe"
        });
        requestString.should.be.equal("[name=John,surname=Doe]");
        done();
    });

    it('should generate request string for request that has array values', function (done) {
        var requestString = request._generateRequestString({
            name: "John",
            surname: "Doe",
            friends: [{name: "Johnny"}, {name: "Mike"}]
        });
        requestString.should.be.equal("[name=John,surname=Doe,friends=[[name=Johnny], [name=Mike]]]");
        done();
    });
});
