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
  const { entryId, typeId, userId, item, amount, createdAt } = req.body;
  const sql = `
    insert into "entries" ("entryId", "typeId", "userId", "item", "amount", "createdAt")
    values ($1, $2, $3, $4, $5, $6)
    returning *
  `;
  const params = [entryId, typeId, userId, item, amount, createdAt];
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
