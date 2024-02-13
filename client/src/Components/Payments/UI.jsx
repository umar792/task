import React, { useState } from "react";
import Payment from "./Payment";

function UI() {
  const [showBraintreeDropIn, setShowBraintreeDropIn] = useState(false);
  const [numberOfProducts, setNumberOfProducts] = useState(1);

  const PRICE = 50;

  return (
    <div className="container mx-auto ">
      <div className="col">
        <div className="row">{/* ... Your existing header columns */}</div>
        <div className="row">
          {/* ... Your existing product information columns */}
          <div className="col">
            <button
              onClick={() => {
                setShowBraintreeDropIn(true);
              }}
              disabled={showBraintreeDropIn}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {"Go to Checkout"}
            </button>
          </div>
        </div>
      </div>
      <Payment
        show={showBraintreeDropIn}
        onPaymentCompleted={() => {
          setShowBraintreeDropIn(false);
          setNumberOfProducts(1);
        }}
      />
    </div>
  );
}

export default UI;
