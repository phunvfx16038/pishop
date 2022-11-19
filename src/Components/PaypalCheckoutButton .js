import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

const PaypalCheckoutButton = (props) => {
  const { total, handleChangeStateModal, cartItems } = props;
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const [orderData, setOrderData] = useState({});
  const math = cartItems.map((item) => {
    const test = {
      name: item.title,
      quantity: item.quantity,
      unit_amount: {
        value: item.price,
        currency_code: "USD",
        breakdown: {
          item_total: {
            value: item.price * item.quantity,
            currency_code: "USD",
          },
        },
      },
    };
    console.log(test);
    return test;
  });
  console.log(math);

  const handleApprove = (order) => {
    setPaidFor(true);
    setOrderData(order);
  };

  const handleCancle = () => {
    handleChangeStateModal(true, "cancel");
  };

  if (paidFor) {
    handleChangeStateModal(true, "payment", orderData);
  }

  if (error) {
    alert(error);
  }
  console.log(cartItems);
  console.log(total);
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
              items: math,
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
        handleCancle();
      }}
      onClick={(data, actions) => {
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
