
const pool = require('../db');

const getRunningBike = async () => {
  const result = await pool.query(`
  select 
        bike.id as bike_id,
        bike.name as nama_sepeda,
        rent_transaction.start_time,
        rent_transaction.end_time,
        guest.name,
        rent_transaction.price,
        case 
            when rent_transaction_detail.status = 'ongoing' and rent_transaction.end_time < now()
            then 'waktu habis dan belum dikembalikan'
            else 'belum lewat'
        end as status_label
        from bike
        join rent_transaction_detail on bike.id = rent_transaction_detail.bike_id
        join rent_transaction on rent_transaction_detail.rent_transaction_id = rent_transaction.id
        join guest on rent_transaction.guest_id = guest.id
        where rent_transaction_detail.status = 'ongoing'
`);

  return result.rows;
};

const getAvailableBikes = async () => {
  const result = await pool.query(`
  SELECT bike.id, bike.name
         FROM bike
         LEFT JOIN rent_transaction_detail
         ON bike.id = rent_transaction_detail.bike_id
         WHERE rent_transaction_detail.bike_id IS NULL or rent_transaction_detail.status = 'finished'
`);

  return result.rows;
};

module.exports = { getRunningBike, getAvailableBikes };