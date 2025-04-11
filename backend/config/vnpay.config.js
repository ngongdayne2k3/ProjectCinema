const vnpayConfig = {
    vnp_TmnCode: process.env.VNPAY_TMNCODE || "YOUR_TMNCODE",
    vnp_HashSecret: process.env.VNPAY_HASHSECRET || "YOUR_HASHSECRET",
    vnp_Url: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
    vnp_ReturnUrl: process.env.VNPAY_RETURN_URL || "http://localhost:3000/payment/vnpay_return",
    vnp_Api: "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction",
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_CurrCode: "VND",
    vnp_Locale: "vn",
    vnp_IpAddr: "127.0.0.1"
};

module.exports = vnpayConfig; 