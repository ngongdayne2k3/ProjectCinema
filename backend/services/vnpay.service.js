const vnpayConfig = require('../config/vnpay.config');
const crypto = require('crypto');
const querystring = require('qs');
const dayjs = require('dayjs');

class VNPayService {
    static createPaymentUrl(orderId, amount) {
        const date = dayjs();
        const createDate = date.format('YYYYMMDDHHmmss');
        const ipAddr = vnpayConfig.vnp_IpAddr;

        const tmnCode = vnpayConfig.vnp_TmnCode;
        const secretKey = vnpayConfig.vnp_HashSecret;
        const vnpUrl = vnpayConfig.vnp_Url;
        const returnUrl = vnpayConfig.vnp_ReturnUrl;

        const locale = vnpayConfig.vnp_Locale;
        const currCode = vnpayConfig.vnp_CurrCode;
        const vnpVersion = vnpayConfig.vnp_Version;
        const vnpCommand = vnpayConfig.vnp_Command;

        let vnp_Params = {};
        vnp_Params['vnp_Version'] = vnpVersion;
        vnp_Params['vnp_Command'] = vnpCommand;
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
        vnp_Params['vnp_OrderType'] = 'other';
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;

        vnp_Params = this.sortObject(vnp_Params);

        const signData = querystring.stringify(vnp_Params, { encode: false });
        const hmac = crypto.createHmac("sha512", secretKey);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;

        const url = vnpUrl + '?' + querystring.stringify(vnp_Params, { encode: false });
        return url;
    }

    static sortObject(obj) {
        const sorted = {};
        const str = [];
        let key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                str.push(encodeURIComponent(key));
            }
        }
        str.sort();
        for (key = 0; key < str.length; key++) {
            sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
        }
        return sorted;
    }

    static verifyReturn(params) {
        const secureHash = params['vnp_SecureHash'];
        delete params['vnp_SecureHash'];
        delete params['vnp_SecureHashType'];

        params = this.sortObject(params);
        const signData = querystring.stringify(params, { encode: false });
        const hmac = crypto.createHmac("sha512", vnpayConfig.vnp_HashSecret);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

        return secureHash === signed;
    }
}

module.exports = VNPayService; 