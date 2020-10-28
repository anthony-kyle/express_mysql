const express = require('express')
const router = express.Router()

const dbConf = {
  host: 'localhost',
  user: 'anthonyk_vuelive',
  password: 'y4uI@^q#9@*2K0lIx3s$nVHh1',
  database: 'anthonyk_vue'
  // insecureAuth: true
}

function makeDBConn () {
  const mysql = require('mysql')
  return mysql.createConnection(dbConf)
}

router.post('/', (req, res, next) => {
  const conn = makeDBConn()
  const sql = 'INSERT INTO `cars` SET ?'
  conn.query(sql, req.body, (err, results, fields) => {
    conn.end()
    if (err) {
      next(err)
    } else {
      res.json([true, results.insertId])
    }
  })
})

router.get('/', (req, res, next) => {
  const conn = makeDBConn()
  const sql = 'SELECT * FROM cars'
  conn.query(sql, (err, results, fields) => {
    conn.end()
    if (err) {
      next(err)
    } else {
      res.json([true, results])
    }
  })
})

router.patch('/:id', (req, res, next) => {
  const conn = makeDBConn()
  let sql = 'UPDATE `cars`'
  sql += ' SET `brand` = ?, `model` = ?,'
  sql += ' `engine` = ?, `gearbox` = ?'
  sql += ' WHERE `id` = ?'
  conn.query(
    sql,
    [
      req.body.brand, 
      req.body.model,
      req.body.engine,
      req.body.gearbox,
      req.params.id
    ],
    (err, results, fields) => {
      conn.end()
      if (err) {
        next(err)
      } else {
        res.json([true])
      }
    }
  )
})

router.delete('/:id', (req, res, next) => {
  const conn = makeDBConn()
  const sql = 'DELETE FROM `cars` WHERE `id` = ?'
  conn.query(sql, [req.params.id], (err, results, fields) => {
    conn.end()
    if (err) {
      next(err)
    } else {
      res.json([true])
    }
  })
})

router.use((err, req, res, next) => {
  res.send([false, 'ErrorHandlingMiddleWare: ' + err.message])
})

module.exports = router
