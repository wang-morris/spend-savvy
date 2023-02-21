require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
// const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const pg = require('pg');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

const jsonMiddleware = express.json();

app.use(jsonMiddleware);
app.use(staticMiddleware);

app.get('/api/entries', (req, res, next) => {
  const sql = `
  select *
    from "entries"
  `;
  db.query(sql)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/entries', (req, res, next) => {
  const { typeId, userId, item, amount } = req.body;
  const sql = `
    insert into "entries" ("typeId", "userId", "item", "amount")
    values ($1, $2, $3, $4)
    returning *
  `;
  const params = [typeId, userId, item, amount];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
