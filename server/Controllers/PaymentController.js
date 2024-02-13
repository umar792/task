var braintree = require("braintree");
const ErrorHandler = require("../utils/errorHandler");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  // merchantId: "vy62r3kv6k9fhx3v",
  // publicKey: "9pg438q6vn93wd2p",
  // privateKey: "9e7fcd472ab031105113b53f50877445",
  merchantId: "2b35gwytxkrh8rqf",
  publicKey: "gnxvhjhgjwwk5jk8",
  privateKey: "9348d3bae509cc79659a95d2a47dab84",
});

module.exports = {
  // --- generate the clientToken
  generateToken: async (req, res, next) => {
    try {
      const clientToken = await gateway.clientToken.generate();
      res.status(200).json({
        success: true,
        clientToken: clientToken.clientToken,
      });
    } catch (error) {
      next(new ErrorHandler(error, 400));
    }
  },
};
