// import React, { useState, useEffect } from "react";
// import dropin from "braintree-web-drop-in";
// import { ApiURL } from "../../setting/GlobleVariable";

// const Payment = ({ show, onPaymentCompleted }) => {
//   const [braintreeInstance, setBraintreeInstance] = useState(null);
//   const [methodName, setMethodName] = useState(null);

//   useEffect(() => {
//     const initializeBraintree = async () => {
//       try {
//         const response = await fetch(`${ApiURL}/payment/generateClient`, {
//           method: "GET",
//           headers: {
//             token:
//               "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjgwYjUwZmU4ODFjMDQzODFjOWZiZSIsImlhdCI6MTcwNzczNDI3MiwiZXhwIjoxNzA4MzM5MDcyfQ.Ki0evqk_fhutteCm7JdQ4Ub91nXDmP9wZklKNxUnLFw",
//           },
//         });
//         const { clientToken } = await response.json();
//         console.log(clientToken);
//         const instance = await dropin.create({
//           authorization: clientToken,
//           container: "#braintree-drop-in-div",
//           paypal: {
//             flow: "vault",
//             amount: "10.00", // Replace with your actual amount
//             currency: "USD", // Replace with your desired currency
//             enableShippingAddress: false,
//             enableBillingAddress: false,
//             shippingAddressEditable: false,
//             payeeEmail: "your_merchant_account_email@example.com", // Replace with your Braintree merchant account email
//             displayName: "Your Merchant Name", // Replace with your merchant name
//             buttonStyle: {
//               color: "gold", // Customize Venmo button color
//               shape: "rect", // Venmo button shape
//               size: "medium", // Venmo button size
//             },
//           },
//           googlePay: {
//             flow: "vault", // or "checkout"
//             currencyCode: "USD",
//             transactionInfo: {
//               totalPriceStatus: "FINAL",
//               totalPrice: "10.00", // Replace with your actual amount
//               currencyCode: "USD",
//             },
//           },
//           applePay: {
//             flow: "vault", // or "checkout"
//             currencyCode: "USD",
//             transactionInfo: {
//               totalPriceStatus: "FINAL",
//               totalPrice: "10.00", // Replace with your actual amount
//               currencyCode: "USD",
//             },
//           },
//           venmo: {
//             flow: "vault", // or "checkout"
//             currencyCode: "USD",
//             transactionInfo: {
//               totalPriceStatus: "FINAL",
//               totalPrice: "10.00", // Replace with your actual amount
//               currencyCode: "USD",
//             },
//           },
//         });

//         setBraintreeInstance(instance);
//       } catch (error) {
//         console.error("Error initializing Braintree:", error);
//       }
//     };

//     if (show) {
//       initializeBraintree();
//     } else {
//       if (braintreeInstance) {
//         braintreeInstance.teardown().then(() => setBraintreeInstance(null));
//       }
//     }

//     return () => {
//       if (braintreeInstance) {
//         braintreeInstance.teardown().then(() => setBraintreeInstance(null));
//       }
//     };
//   }, [show]);

//   const handlePayment = async () => {
//     if (braintreeInstance) {
//       try {
//         const { nonce } = await braintreeInstance.requestPaymentMethod();
//         console.log(nonce, "payment methods nonce");
//         // // Send the payment nonce to your server for transaction processing
//         // const response = await fetch("http://localhost:3001/checkout", {
//         //   method: "POST",
//         //   headers: {
//         //     "Content-Type": "application/json",
//         //   },
//         //   body: JSON.stringify({
//         //     paymentMethodNonce: nonce,
//         //     amount: "10.00", // Replace with your actual amount
//         //   }),
//         // });

//         // const result = await response.json();

//         // if (result.success) {
//         //   alert("Payment successful!");
//         //   onPaymentCompleted();
//         // } else {
//         //   alert("Payment failed. Please try again.");
//         // }
//       } catch (error) {
//         console.error("Error processing payment:", error);
//         alert("Error processing payment. Please try again.");
//       }
//     }
//   };

//   return (
//     <div style={{ display: `${show ? "block" : "none"}` }}>
//       <div id="braintree-drop-in-div" />
//       <button
//         className="bg-[black] text-[white] px-6 py-2 cursor-pointer disabled:cursor-no-drop"
//         type="button"
//         disabled={!braintreeInstance}
//         onClick={handlePayment}
//       >
//         Pay
//       </button>
//     </div>
//   );
// };

// export default Payment;

// =========================================

import React, { useState, useEffect } from "react";
import dropin from "braintree-web-drop-in";
import { ApiURL } from "../../setting/GlobleVariable";

const Payment = ({ show, onPaymentCompleted }) => {
  const [braintreeInstance, setBraintreeInstance] = useState(null);
  const [methodName, setMethodName] = useState("");

  useEffect(() => {
    const initializeBraintree = async () => {
      if (show === true) {
        try {
          const response = await fetch(`${ApiURL}/payment/generateClient`, {
            method: "GET",
            headers: {
              token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjgwYjUwZmU4ODFjMDQzODFjOWZiZSIsImlhdCI6MTcwNzczNDI3MiwiZXhwIjoxNzA4MzM5MDcyfQ.Ki0evqk_fhutteCm7JdQ4Ub91nXDmP9wZklKNxUnLFw",
            },
          });
          const { clientToken } = await response.json();

          setBraintreeInstance(instance);
          var instance = await dropin.create({
            authorization: clientToken,
            container: "#braintree-drop-in-div",
            card: {
              flow: "vault",
              amount: "10.00", // Replace with your actual amount
              currency: "USD",
            },
            paypal: {
              flow: "vault",
              amount: "10.00", // Replace with your actual amount
              currency: "USD", // Replace with your desired currency
              enableShippingAddress: false,
              enableBillingAddress: false,
              shippingAddressEditable: false,
              payeeEmail: "your_merchant_account_email@example.com", // Replace with your Braintree merchant account email
              displayName: "Your Merchant Name", // Replace with your merchant name
              buttonStyle: {
                color: "gold", // Customize Venmo button color
                shape: "rect", // Venmo button shape
                size: "medium", // Venmo button size
              },
            },
            googlePay: {
              flow: "vault", // or "checkout"
              currencyCode: "USD",
              transactionInfo: {
                totalPriceStatus: "FINAL",
                totalPrice: "10.00", // Replace with your actual amount
                currencyCode: "USD",
              },
            },
            applePay: {
              flow: "vault", // or "checkout"
              currencyCode: "USD",
              transactionInfo: {
                totalPriceStatus: "FINAL",
                totalPrice: "10.00", // Replace with your actual amount
                currencyCode: "USD",
              },
            },
            venmo: {
              flow: "vault", // or "checkout"
              currencyCode: "USD",
              transactionInfo: {
                totalPriceStatus: "FINAL",
                totalPrice: "10.00", // Replace with your actual amount
                currencyCode: "USD",
              },
            },
          });
          setBraintreeInstance(instance);

          instance.on("paymentMethodRequestable", async (event) => {
            // This event is triggered when a payment method is available
            // Handle logic for enabling or disabling the "Pay Now" button
            // console.log(
            //   "Payment method is requestable:",
            //   event.paymentMethodIsRequestable
            // );
            if (event?.type === "CreditCard" && methodName !== "pay") {
              console.log("call again");
              if (methodName === "pay") {
                return;
              }
              setMethodName(event?.type);
            } else {
              try {
                // Ensure handlePayment is called only once
                const { nonce } =
                  await braintreeInstance.requestPaymentMethod();
                console.log(nonce, "payment methods nonce");
                // await handlePayment();
                // setBraintreeInstance(null);
              } catch (error) {
                console.error("Error handling payment:", error);
              }
            }
          });

          instance.on("noPaymentMethodRequestable", () => {
            // This event is triggered when no payment method is available
            // Handle logic for disabling the "Pay Now" button
            console.log("No payment method is requestable");
          });

          instance.on("paymentOptionSelected", (event) => {
            // This event is triggered when the user selects a payment method
            // You can update the selected payment method
            setMethodName(event.paymentOption.id);
          });
        } catch (error) {
          console.error("Error initializing Braintree:", error);
        }
      }
    };

    if (show === true) {
      initializeBraintree();
    } else {
      if (braintreeInstance) {
        braintreeInstance.teardown().then(() => setBraintreeInstance(null));
      }
    }

    return () => {
      if (braintreeInstance) {
        braintreeInstance.teardown().then(() => setBraintreeInstance(null));
      }
    };
  }, [show]);

  const handlePayment = async () => {
    if (braintreeInstance) {
      try {
        console.log("call");
        // const { nonce } = await braintreeInstance.requestPaymentMethod();
        // console.log(nonce, "payment methods nonce");
        // Send the payment nonce to your server for transaction processing
        // const response = await fetch("http://localhost:3001/checkout", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     paymentMethodNonce: nonce,
        //     amount: "10.00", // Replace with your actual amount
        //   }),
        // });

        // const result = await response.json();

        // if (result.success) {
        //   alert("Payment successful!");
        //   onPaymentCompleted();
        // } else {
        //   alert("Payment failed. Please try again.");
        // }
      } catch (error) {
        console.error("Error processing payment:", error);
        alert("Error processing payment. Please try again.");
      }
    }
  };

  console.log(braintreeInstance);

  return (
    <div style={{ display: `${show ? "block" : "none"}` }}>
      <div id="braintree-drop-in-div" />

      {methodName == "CreditCard" && (
        <button
          className="bg-[black] text-[white] px-6 py-2 cursor-pointer"
          type="primary"
          disabled={!braintreeInstance}
          onClick={() => {
            if (braintreeInstance) {
              braintreeInstance.requestPaymentMethod((error, payload) => {
                if (error) {
                  console.error(error);
                } else {
                  const paymentMethodNonce = payload.nonce;
                  console.log("payment method nonce", payload.nonce);
                  setMethodName("pay");
                  console.log("clear");
                  // TODO: use the paymentMethodNonce to
                  //  call you server and complete the payment here

                  // ...

                  alert(`Payment completed with nonce=${paymentMethodNonce}`);
                  onPaymentCompleted();
                }
              });
            }
          }}
        >
          {"Pay"}
        </button>
      )}
    </div>
  );
};

export default Payment;
