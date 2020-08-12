Iyzipay = require("../lib/Iyzipay"),
options = require("./data/options");
const fs = require('fs');
const path = require('path');
describe('iyzilink',function(){

    var iyzipay;

    before(function (done) {
        iyzipay = new Iyzipay(options);
        done();
    });

    it('create product',function (done) {

       var request = {
           locale: Iyzipay.LOCALE.TR,
           conversationId: '123456789',
           name: 'Deneme',
           description: 'description deneme',
           price: 75.34,
           currency: Iyzipay.CURRENCY.TRY,
           addressIgnorable: true,
           soldLimit: 1,
           installmentRequest: false,
           base64EncodedImage: Buffer.from(fs.readFileSync(path.join(__dirname ,'data','sandbox.png'))).toString('base64')
       };

       iyzipay.iyzilink.create(request, function (err, result) {
           console.log(err, result);
           done();
       });
    })
})