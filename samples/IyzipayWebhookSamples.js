var should = require("should"),
  Iyzipay = require("../lib/Iyzipay"),
  options = require("./data/options");

describe("Iyzipay Webhook API Test", function () {
  var iyzipay;

  before(function (done) {
    iyzipay = new Iyzipay(options);
    done();
  });

  describe("webhook", function () {
    it("should update merchant webhook url", function (done) {
      var request = {
        locale: Iyzipay.LOCALE.TR,
        conversationId: "123456789",
        webhookUrl: "https://magaza.com/rest/V1/iyzico/webhook/aB3xK9"
      };
      iyzipay.webhook.update(request, function (err, result) {
        console.log(err, result);
        result.status.should.equal("success");
        result.merchantNotificationUpdateStatus.should.equal("UPDATED");
        done();
      });
    });
  });
});
