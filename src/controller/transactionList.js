const pool = require('../db');

const getAllTransactions = async () => {
  const result = await pool.query(`
   SELECT guest.name,
         rent_transaction.id as transaction_id,
         rent_transaction.booking_code,
         rent_transaction.start_time,
         rent_transaction.end_time,
         guest.phone_number,
         guest.address,
         rent_transaction.price,
         ARRAY_AGG(bike.name) AS bikes,
         CASE 
           WHEN rent_transaction_detail.status = 'ongoing' AND rent_transaction.end_time < NOW()
             THEN 'waktu habis dan belum dikembalikan'
           WHEN rent_transaction_detail.status = 'ongoing' AND rent_transaction.end_time > NOW()
             THEN 'masih disewa'
           ELSE 'selesai'
         END AS status
    FROM rent_transaction
    JOIN guest ON guest.id = rent_transaction.guest_id
    JOIN rent_transaction_detail ON rent_transaction_detail.rent_transaction_id = rent_transaction.id
    JOIN bike ON bike.id = rent_transaction_detail.bike_id
    GROUP BY guest.name,
           rent_transaction.id,
           rent_transaction.booking_code,
           rent_transaction.start_time,
           rent_transaction.end_time,
           guest.phone_number,
		   guest.address,
           rent_transaction.price,
           rent_transaction_detail.status
    order by rent_transaction.end_time asc
`);

  const totalPrices = await pool.query(`
    SELECT sum(rent_transaction.price) as total
          FROM rent_transaction
  `);

  return {
    'data'  : result.rows,
    'total' : Number(totalPrices.rows[0].total)
  };
};

module.exports = { getAllTransactions };