const pool = require('../db')

async function createCal(req, res) {
  try {
    const {
      userId,
      week,
      day1,
      day2,
      day3,
      day4,
      day5,
      day6,
      day7,
      weeklyTarget
    } = req.body

    const newCal = await pool.query(
      'INSERT INTO caltracker (week, day_1, day_2, day_3, day_4, day_5, day_6, day_7, weekly_target, user_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
      [week,
        day1,
        day2,
        day3,
        day4,
        day5,
        day6,
        day7,
        weeklyTarget,
        userId ]
    )
    res.json(newCal.rows[0])
  } catch (err) {
    console.error(err.message)
    res.json(err.message)
  }
}

module.exports = {
  createCal
}