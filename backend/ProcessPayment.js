const axios = require("axios");

module.exports = async function processPayment(
  authKey,
  amount,
  name,
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
          send_email_receipt: false,
          // show_description: false,
          show_line_items: false,
          line_items: [
            {
              currency: "PHP",
              amount: amount,
              name: name,
              quantity: 1,
            },
          ],
          payment_method_types: ["gcash", "card", "paymaya"],
          description: description,
          success_url: success_url,
          cancel_url: cancel_url,
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