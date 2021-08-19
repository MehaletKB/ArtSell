
/* eslint-disable camelcase */
module.exports = {
  format_date: (date) =>
    // Format date as MM/DD/YYYY
    date.toLocaleDateString(),
  format_amount: (amount) =>
    // format large numbers with commas
    parseInt(amount, 10).toLocaleString(),
};
