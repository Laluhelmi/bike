const pool = require('../db');

const insertTransaction = async (req) => {

  const { name, address, phoneNumber, price, startTime, endTime, bikeIds } = req.payload;

  const guestQuery = await pool.query(
    'INSERT INTO guest (name, address, phone_number) VALUES ($1, $2, $3) RETURNING id',
    [name, address, phoneNumber]
  );

  const guestId = guestQuery.rows[0].id;

  const transactionQuery = await pool.query(
    `INSERT INTO rent_transaction (booking_code, start_time, end_time, guest_id, price)
     VALUES (substring(md5(random()::text), 1, 8), $1 , $2 ,$3 ,$4)
     RETURNING id
     `,
    [startTime, endTime, guestId, price]);

  const transactionId = transactionQuery.rows[0].id;
  const values        = [];
  const placeholders  = bikeIds.map((value, i) => {
    const idx  = (i * 2) + 1;
    const idx2 = idx + 1;
    values.push(value, transactionId);
    return `($${idx}, $${idx2})`;
  }).join(', ');

  await pool.query(
    `INSERT INTO rent_transaction_detail (bike_id, rent_transaction_id)
     VALUES ${placeholders}
    `, values);
  return {
    'result' : 'success'
  };
};

const changeTransactionStatus = async (req) => {

  const transactionId = req.payload.transactionId;

  await pool.query(
    `UPDATE rent_transaction_detail
	        SET status='finished'
	        WHERE rent_transaction_detail.rent_transaction_id = $1`,
    [transactionId]
  );

  await pool.query(
    `UPDATE rent_transaction
        SET end_time = now()
	         WHERE id  = $1`,
    [transactionId]
  );

  return {
    'result' : 'success'
  };

};



module.exports = { insertTransaction, changeTransactionStatus };