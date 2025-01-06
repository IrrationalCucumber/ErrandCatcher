const axios = require("axios");

module.exports = async function processPayment(
  authKey,
  amount,
  name,
  email,
  phone,
  type,
  description,
  success_url,
  cancel_url
) {
  const options = {
    method: "POST",
    url: "https://api.paymongo.com/v1/checkout_sessions",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      authorization: authKey,
    },
    data: {
      data: {
        attributes: {
          send_email_receipt: true,
          // show_description: false,
          show_line_items: false,
          line_items: [
            {
              currency: "PHP",
              amount: amount,
              name: type,
              quantity: 1,
            },
          ],
          payment_method_types: ["gcash", "card", "paymaya"],
          description: description,
          success_url: success_url,
          cancel_url: cancel_url,
          billing: { name: name, email: email, phone: phone },
        },
      },
    },
  };

  // axios
  //   .request(options)
  //   .then(function (response) {
  //     console.log(response.data);
  //   })
  //   .catch(function (error) {
  //     console.error(error);
  //   });

  const res = await axios.request(options);
  return res.data;
};

// sample data url page
// "https://checkout.paymongo.com/cs_b2sTMy1so8EWM5BcWZQXaAVU_client_oFUje1Y7dD8q6E4LpuBprWGi#cGtfdGVzdF9TQXo2UlYxblQ0Q2NXb0RxdGhaUjl2aVU="

// {
//   "data": {
//     "id": "cs_b2sTMy1so8EWM5BcWZQXaAVU",
//     "type": "checkout_session",
//     "attributes": {
//       "billing": {
//         "address": {
//           "city": null,
//           "country": null,
//           "line1": null,
//           "line2": null,
//           "postal_code": null,
//           "state": null
//         },
//         "email": null,
//         "name": null,
//         "phone": null
//       },
//       "billing_information_fields_editable": "enabled",
//       "cancel_url": null,
//       "checkout_url": "https://checkout.paymongo.com/cs_b2sTMy1so8EWM5BcWZQXaAVU_client_oFUje1Y7dD8q6E4LpuBprWGi#cGtfdGVzdF9TQXo2UlYxblQ0Q2NXb0RxdGhaUjl2aVU=",
//       "client_key": "cs_b2sTMy1so8EWM5BcWZQXaAVU_client_oFUje1Y7dD8q6E4LpuBprWGi",
//       "customer_email": null,
//       "description": "sample test",
//       "line_items": [
//         {
//           "amount": 250000,
//           "currency": "PHP",
//           "description": null,
//           "images": [],
//           "name": "gcash",
//           "quantity": 1
//         }
//       ],
//       "livemode": false,
//       "merchant": "Errand Catcher ",
//       "payments": [],
//       "payment_intent": {
//         "id": "pi_ZgjdHh55Ht3wDCSwqN226xDb",
//         "type": "payment_intent",
//         "attributes": {
//           "amount": 250000,
//           "capture_type": "automatic",
//           "client_key": "pi_ZgjdHh55Ht3wDCSwqN226xDb_client_SxR9cD4K1XvGsxkBDVkNpMp1",
//           "currency": "PHP",
//           "description": "sample test",
//           "livemode": false,
//           "statement_descriptor": "Errand Catcher ",
//           "status": "awaiting_payment_method",
//           "last_payment_error": null,
//           "payment_method_allowed": [
//             "gcash"
//           ],
//           "payments": [],
//           "next_action": null,
//           "payment_method_options": null,
//           "metadata": null,
//           "setup_future_usage": null,
//           "created_at": 1716257849,
//           "updated_at": 1716257849
//         }
//       },
//       "payment_method_types": [
//         "gcash"
//       ],
//       "reference_number": null,
//       "send_email_receipt": false,
//       "show_description": true,
//       "show_line_items": true,
//       "status": "active",
//       "success_url": null,
//       "created_at": 1716257849,
//       "updated_at": 1716257849,
//       "metadata": null
//     }
//   }
// }
