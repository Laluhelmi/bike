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
         jsonb_agg(
            jsonb_build_object(
              'id'    , bike.id,
              'name'  , bike.name,
              'status',
               CASE 
                WHEN rent_transaction_detail.status = 'finished' THEN 'sudah dikembalikan'
                ELSE 'masih disewa'
              END
            )
          ) AS bikes
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
           rent_transaction.price
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