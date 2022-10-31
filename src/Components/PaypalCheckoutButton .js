import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

const PaypalCheckoutButton = (props) => {
  const { total, cartItems, handleChangeStateModal } = props;

  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const [orderData, setOrderData] = useState({});
  const handleApprove = (order) => {
    // Call backend function to fulfill order

    // if response is success
    setPaidFor(true);
    setOrderData(order);
    // Refresh user's account or subscription status
    // if response is error
    // alert(
    //   "Your payment was processed successfully. However, we are unable to fulfill your purchase. Please contact us at support@designcode.io for assistance."
    // );
  };

  const handleCancle = () => {
    handleChangeStateModal(true, "cancel");
  };

  if (paidFor) {
    // Display success message, modal or redirect user to success page
    handleChangeStateModal(true, "payment", orderData);
  }

  if (error) {
    // Display error message, modal or redirect user to error page
    alert(error);
  }

  return (
    <PayPalButtons
      style={{
        color: "gold",
        layout: "vertical",
        height: 40,
        tagline: false,
        shape: "pill",
      }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: "Pay for clothes",
              amount: {
                currency_code: "USD",
                value: total,
                breakdown: {
                  item_total: {
                    currency_code: "USD",
                    value: total,
                  },
                },
              },
              items: cartItems.map((item) => {
                return {
                  name: item.title,
                  quantity: item.quantity,
                  unit_amount: {
                    value:
                      Math.round(parseFloat(item.price) * item.quantity * 100) /
                      100,
                    currency_code: "USD",
                  },
                };
              }),
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        const order = await actions.order.capture();
        console.log("order", order);
        handleApprove(order);
      }}
      onError={(err) => {
        setError(err);
        console.error("PayPal Checkout onError", err);
      }}
      onCancel={() => {
        // Display cancel message, modal or redirect user to cancel page or back to cart
        handleCancle();
      }}
      onClick={(data, actions) => {
        // Validate on button click, client or server side
        const hasAlreadyBoughtCourse = false;

        if (hasAlreadyBoughtCourse) {
          setError(
            "You already bought this product. Go to your account to view your list of products."
          );

          return actions.reject();
        } else {
          return actions.resolve();
        }
      }}
    />
  );
};

export default PaypalCheckoutButton;
