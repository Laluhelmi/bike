
const pool = require('../db');

const getAllGuests = async () => {
  const result = await pool.query(`
  select * from guest
`);

  return result.rows;
};


module.exports = { getAllGuests };