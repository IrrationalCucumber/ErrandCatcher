const axios = require("axios");

module.exports = async function getProcessPayment(authKey, sessionId) {
  const options = {
    method: "GET",
    url: `https://api.paymongo.com/v1/checkout_sessions/${sessionId}`,
    headers: {
      accept: "application/json",
      authorization: authKey,
    },
  };

  try {
    const res = await axios.request(options);
    return res.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
