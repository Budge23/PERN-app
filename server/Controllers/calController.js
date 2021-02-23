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
      dailyTarget
    } = req.body

    const newCal = await pool.query(
      'INSERT INTO caltracker (week, day_1, day_2, day_3, day_4, day_5, day_6, day_7, daily_target, user_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING week, day_1, day_2, day_3, day_4, day_5, day_6, day_7, daily_target, user_id',
      [week,
        day1,
        day2,
        day3,
        day4,
        day5,
        day6,
        day7,
        dailyTarget,
        userId
      ]
    )
    res.json(newCal.rows[0])
    
  } catch (err) {
    console.error(err.message)
    res.json(err.message)
  }
}

async function updateCal(req, res) {
  const {
    week,
    day1,
    day2,
    day3,
    day4,
    day5,
    day6,
    day7,
    dailyTarget
  } = req.body

  const calId = req.params.calId

  try {
    const userCal = await pool.query(
      'UPDATE caltracker SET week=($1), day_1=($2), day_2=($3), day_3=($4), day_4=($5), day_5=($6), day_6=($7), day_7=($8), daily_target=($9) WHERE cal_id=($10) RETURNING week, day_1, day_2, day_3, day_4, day_5, day_6, day_7, daily_target',
      [week, day1, day2, day3, day4, day5, day6, day7, dailyTarget, calId]
    )
    res.json(userCal)
  } catch (err) {
    console.error(err.message)
    res.json(err.message)
  }
}

async function deleteCal(req, res) {
  const calId = req.params.calId

  try {
    const delCal = await pool.query(
      'DELETE FROM caltracker WHERE cal_id=($1)',
      [calId]
    )
    res.json(delCal)
  } catch (err) {
    console.error(err.message)
    res.json(err.message)
  }
}

module.exports = {
  createCal,
  updateCal,
  deleteCal
}