import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useDispatch } from "react-redux";
import { resetCart, updateCart } from "./CartItem/cartSlice";
import { useNavigate } from "react-router-dom";

const PaypalCheckoutButton = (props) => {
  const {
    total,
    cartId,
    token,
    statusCart,
    cartItems,
    handleChangeStateModal,
  } = props;

  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleApprove = (orderId) => {
    // Call backend function to fulfill order

    // if response is success
    setPaidFor(true);
    // Refresh user's account or subscription status

    // if response is error
    // alert("Your payment was processed successfully. However, we are unable to fulfill your purchase. Please contact us at support@designcode.io for assistance.");
  };

  const handleCancle = () => {
    handleChangeStateModal(true, "cancel");
  };

  if (paidFor) {
    // Display success message, modal or redirect user to success page
    handleChangeStateModal(true, "payment");
  }

  if (error) {
    // Display error message, modal or redirect user to error page
    alert(error);
  }
  const itemsCart = cartItems.map((item) => {
    const data = {
      name: item.title,
      quantity: JSON.stringify(item.quantity),
      unit_amount: {
        value: parseInt(item.price) * item.quantity,
      },
    };
    return data;
  });
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
                value: total,
              },
              // items: itemsCart,
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        const order = await actions.order.capture();
        console.log("order", order);
        dispatch(updateCart({ cartId, token, status: statusCart, cartItems }));
        handleApprove(data.orderID);
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
