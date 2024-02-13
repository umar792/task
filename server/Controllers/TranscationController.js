const TransactionModal = require("../models/Transcation");
const ErrorHandler = require("../utils/errorHandler");
// =============================================
const TevoClient = require("ticketevolution-node");
// const API_TOKEN = "eebbfa6848026f8e3f6b1ac5f87e1e46";
// const API_SECRET_KEY = "iEzrOJOJ0RTDqRXOnHAZX5ceyfdGITbNy1qd2EXV";
const API_TOKEN = "10cbbac87aa33cf9818fc1046bca0044";
const API_SECRET_KEY = "7bThxZPz3L+KdAdGsjcM9c99mCoyvXt3jH2MDy0/";
const X_Signature = "z0g8oHXZyOi7Is0qM0KWVvgY9VQLRSadommuh0q6nuQ=";
const moment = require("moment");
const S3Client = require("./s3_list");
const Promise = require("bluebird");
const OrderModal = require("../models/OrderModal");

const tevoClient = new TevoClient({
  apiToken: API_TOKEN,
  apiSecretKey: API_SECRET_KEY,
});

module.exports = {
  // ---- create Transaction
  createtranscation: async (req, res, next) => {
    try {
      const {
        transactionId,
        orderId,
        orderAmount,
        transactionAmount,
        transactionStatus,
        eventVenue,
        eventDetails,
        orderStatus,
        eventName,
        quantity,
        row,
      } = req.body;

      const UserId = req.user._id;
      const Transaction = await TransactionModal.create({
        transactionId,
        orderId,
        orderAmount,
        transactionAmount,
        transactionStatus,
        eventDetails,
        eventVenue,
        eventDate: Date.now(),
        orderStatus,
        row,
        eventName,
        quantity,
        user_id: UserId,
      });
      res.status(200).json({
        success: true,
        Transaction,
      });
    } catch (error) {
      next(new ErrorHandler(error.message, 400));
    }
  },

  //   ----- get all transaction of the user
  allTrnscations: async (req, res, next) => {
    try {
      const transactions = await TransactionModal.find({
        user_id: req.user._id,
      });
      res.status(200).json({
        success: true,
        transactions,
      });
    } catch (error) {
      next(new ErrorHandler(error.message, 400));
    }
  },

  //   ---------- checking tickets
  findAll: async (req, res, next) => {
    let per_page = 21;
    //   typeof req.query.per_page !== "undefined" ? req.query.per_page : 10;
    let date = moment();
    // let lat = req.query.lat;
    let lon = -118.3275139;
    // let lon = req.query.lon;
    let lat = 33.9845124;
    //Search based on longitude lattitude
    if (typeof lat !== "undefined" && typeof lon !== "undefined") {
      tevoClient
        .getJSON(
          "https://api.sandbox.ticketevolution.com/v9/events/search?per_page=" +
            per_page +
            "&page=" +
            req.params.id +
            "&occurs_at.gte=" +
            encodeURIComponent(date.toISOString()) +
            "&lat=" +
            lat +
            "&lon=" +
            lon,
          {
            Headers: {
              "X-Token": API_TOKEN,
            },
          }
        )
        .then((json) => {
          // getImageUrlFromAws(json.events).then(function (array) {
          //   json.events = array;
          // });
          return res.send(json);
        })
        .catch((err) => {
          return res.send("error is here: " + err);
        });
    } else {
      //General search with date asc
      tevoClient
        .getJSON(
          "https://api.sandbox.ticketevolution.com/v9/events/search?per_page=" +
            per_page +
            "&page=" +
            req.params.id +
            "&occurs_at.gte=" +
            encodeURIComponent(date.toISOString())
          //   {
          //     Headers: {
          //       "X-Token": API_TOKEN,
          //     },
          //   }
        )
        .then((json) => {
          // getImageUrlFromAws(json.events).then(function (array) {
          //   json.events = array;
          // });
          return res.send(json);
        })
        .catch((err) => {
          return res.send("error ok: " + err);
        });
    }
  },
  // ----- details
  EventDetails: async (req, res) => {
    const EventId = req.params.id;
    const url =
      "https://api.sandbox.ticketevolution.com/v9/listings?event_id=" + EventId;
    tevoClient
      .getJSON(url)
      .then((json) => {
        // console.log(json);
        return res.send(json);
      })
      .catch((err) => {
        return res.send("error: " + err);
      });
  },

  // ----- search event by name
  EventSearch: async (req, res) => {
    const date = moment();
    // let lat = req.query.lat;
    let lon = -118.3275139;
    // let lon = req.query.lon;
    let lat = 33.9845124;
    tevoClient
      .getJSON(
        `https://api.sandbox.ticketevolution.com/v9/events?q=${req.params.name}&fuzzy=true&per_page=` +
          100 +
          "&page=" +
          1 +
          "&occurs_at.gte=" +
          encodeURIComponent(date.toISOString()) +
          "&lat=" +
          lat +
          "&lon=" +
          lon
      )
      .then((json) => {
        return res.send(json);
      })
      .catch((err) => {
        return res.send("error is here: " + err);
      });
  },
  // ---- search by category
  EventSearchByCategory: async (req, res) => {
    const date = moment();
    // let lat = req.query.lat;
    let lon = -118.3275139;
    // let lon = req.query.lon;
    let lat = 33.9845124;
    tevoClient
      .getJSON(
        `https://api.sandbox.ticketevolution.com/v9/events?category_id=${req.params.id}&category_tree=true&per_page=` +
          100 +
          "&page=" +
          1 +
          "&occurs_at.gte=" +
          encodeURIComponent(date.toISOString()) +
          "&lat=" +
          lat +
          "&lon=" +
          lon
      )
      .then((json) => {
        return res.send(json);
      })
      .catch((err) => {
        return res.send("error is here: " + err);
      });
  },

  //   ------ ticket group
  TicketGroup: async (req, res, next) => {
    const event_id = req.params.id;
    if (!event_id) {
      return next(new ErrorHandler("event_id is required", 400));
    }
    const url = `https://api.sandbox.ticketevolution.com/v9/listings/${event_id}`;
    tevoClient
      .getJSON(url)
      .then((json) => {
        return res.send(json);
      })
      .catch((err) => {
        return res.send("error: " + err);
      });
  },

  //   --------- now orders
  createOrder: async (req, res) => {
    const { id, price, qty, type, amount, service_fee, tax, payments, name } =
      req.body;

    const orderData = {
      orders: [
        {
          shipped_items: [
            {
              items: [
                {
                  ticket_group_id: id,
                  quantity: qty,
                  price: price,
                },
              ],
              type: type,
              ship_to_name: "Jackie Martinoski",
              email_address_attributes: {
                address: "jackie@ticketevolution.com",
              },
            },
          ],
          payments: [
            {
              type: "evopay",
            },
          ],
          service_fee: 0,
          tax: 0,
          seller_id: 2760,
          buyer_id: 3161,
          buyer_reference_number: "3161",
          external_notes: "These notes will be visible to all parties",
          internal_notes:
            "These notes will be visible only to your office (1937)",
        },
      ],
    };

    const url = "https://api.sandbox.ticketevolution.com/v9/orders";
    try {
      const response = await tevoClient.postJSON(url, orderData);

      // try {
      //   var neworder = await OrderModal.create({
      //     totalAmount: 200,
      //     orderItems: [
      //       {
      //         items: [
      //           {
      //             ticket_group_id: id,
      //             splits: qty,
      //             price: price,
      //             name: name,
      //           },
      //         ],
      //         type: type,
      //         shiptoName: req.user.firstName,
      //         shiptoEmail: req.user.email,
      //         payments: "evopay",
      //         service_fee: 20,
      //         tax: 20,
      //       },
      //     ],
      //   });
      // } catch (error) {
      //   return next(new ErrorHandler(error.message, 400));
      // }
      // console.log(neworder);
      return res.status(200).send(response);
    } catch (err) {
      return res.send("Error: " + err);
    }
  },

  // ----- multiple ticket order
  createOrdermultiple: async (req, res) => {
    // console.log(JSON.stringify(req.body.cartdata));
    const orderData = {
      orders: req.body.cartdata,
    };
    const url = "https://api.sandbox.ticketevolution.com/v9/orders";
    try {
      const response = await tevoClient.postJSON(url, orderData);
      return res.status(200).send(response);
    } catch (err) {
      return res.send("Error: " + err);
    }
  },

  //   ----- create client
  createClient: async (req, res, next) => {
    const url = "https://api.sandbox.ticketevolution.com/v9/clients";
    tevoClient
      .postJSON(url, req.body)
      .then((json) => {
        // existingUser.billing_address_id =
        //   json.clients[0].primary_billing_address.id;
        // existingUser.client_id = json.clients[0].id;
        // existingUser.email_address_id =
        //   json.clients[0].primary_email_address.id;
        // existingUser.shipping_address_id =
        //   json.clients[0].primary_shipping_address.id;
        // existingUser.phone_number_id = json.clients[0].phone_numbers[0].id;
        // existingUser.save((err, user) => {
        //   if (err) {
        //     res.status(500).send(err, "Error occurred during update Profile");
        //   }
        // });
        return res.send(json);
      })
      .catch((err) => {
        return res.send("error: " + err);
      });
  },

  //   ===== companies
  allcompanies: async (req, res) => {
    tevoClient
      .getJSON(`https://api.sandbox.ticketevolution.com/v9/companies`)
      .then((json) => {
        return res.send(json);
      })
      .catch((err) => {
        return res.send("error  is here: " + err);
      });
  },
  // -- get image
  getImageurl: async (req, res) => {
    const url =
      "https://s3.amazonaws.com/media.sandbox.ticketevolution.com/configurations/static_maps/688/large.jpg?1424367148";

    try {
      const response = await tevoClient.getJSON(url);
      return res.status(200).send(response);
    } catch (err) {
      return res.send("Error: " + err);
    }
  },
};

let getImageUrlFromAws = async function (events) {
  let s3Client = new S3Client();
  let imageFolder = "images/event/device/";
  let s3Bucket = "instapass-events";
  return await Promise.map(events, function (data, i) {
    return s3Client
      .validSignedURL(
        s3Bucket,
        imageFolder + "desktop/" + data.performances[0].performer.slug + ".jpg"
      )
      .then(function (desktopUrlFromAws) {
        data.desktopUrl = desktopUrlFromAws;
        return data;
      })
      .then(function (data) {
        return s3Client
          .validSignedURL(
            s3Bucket,
            imageFolder +
              "tablet/" +
              data.performances[0].performer.slug +
              ".jpg"
          )
          .then(function (tabletUrlResponseFromAws) {
            data.tabletUrl = tabletUrlResponseFromAws;
            return data;
          });
      });
  });
};
