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

const typeMap = {
  'Food & Drink': 1,
  Entertainment: 2,
  'Bills & Utilities': 3,
  Health: 4,
  Housing: 5,
  Shopping: 6,
  Transportation: 7,
  Other: 8,
  default: 8
};

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
  const { typeId, userId, item, amount, dateOfExpense } = req.body;
  const sql = `
    insert into "entries" ("typeId", "userId", "item", "amount", "dateOfExpense")
    values ($1, $2, $3, $4, $5)
    returning *
  `;
  const params = [typeId, userId, item, amount, dateOfExpense];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.put('/api/entries/:entryId', (req, res, next) => {
  const { typeId, userId, item, amount } = req.body;
  const entryId = parseInt(req.params.entryId);
  const sql = `
    update "entries"
    set "typeId" = $1, "userId" = $2, "item" = $3, "amount" = $4
    where "entryId" = $5
    returning *
  `;
  const params = [typeId, userId, item, amount, entryId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.delete('/api/entries/:entryId', (req, res, next) => {
  const entryId = parseInt(req.params.entryId);
  const sql = `
    delete from "entries"
    where "entryId" = $1
    returning *
  `;
  const params = [entryId];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length > 0) {
        res.status(201).json('Entry deleted');
      } else {
        res.status(404).json('no such entry');
      }
    })
    .catch(err => next(err));
});

app.get('/api/entries/monthlyTotal', (req, res, next) => {
  const sql = `
    SELECT SUM(amount) AS monthlyTotal
    FROM entries
    WHERE DATE_TRUNC('month', "entries"."dateOfExpense") = DATE_TRUNC('month', NOW());
  `;
  db.query(sql)
    .then(result => {
      res.status(200).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/entries/monthlyCategoryTotals', (req, res, next) => {
  const sql = `
    SELECT "typeId", SUM("amount") AS "totalAmount"
    FROM "entries"
    WHERE DATE_TRUNC('month', "entries"."dateOfExpense") = DATE_TRUNC('month', NOW())
    GROUP BY "typeId";
  `;
  db.query(sql)
    .then(result => {
      const categoryTotals = {};
      result.rows.forEach(row => {
        const categoryName = Object.keys(typeMap).find(key => typeMap[key] === row.typeId);
        categoryTotals[String(categoryName)] = row.totalAmount;
      });
      res.status(200).json(categoryTotals);
    })
    .catch(err => next(err));
});

app.get('/api/entries/yearlyTotal', (req, res, next) => {
  const sql = `
    SELECT SUM(amount) AS yearlyTotal
    FROM entries
    WHERE DATE_TRUNC('year', "entries"."dateOfExpense") = DATE_TRUNC('year', NOW());
  `;
  db.query(sql)
    .then(result => {
      res.status(200).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/entries/yearlyCategoryTotals', (req, res, next) => {
  const sql = `
    SELECT "typeId", SUM("amount") AS "totalAmount"
    FROM "entries"
    WHERE DATE_TRUNC('year', "entries"."dateOfExpense") = DATE_TRUNC('year', NOW())
    GROUP BY "typeId";
  `;
  db.query(sql)
    .then(result => {
      const categoryTotals = {};
      result.rows.forEach(row => {
        const categoryName = Object.keys(typeMap).find(key => typeMap[key] === row.typeId);
        categoryTotals[String(categoryName)] = row.totalAmount;
      });
      res.status(200).json(categoryTotals);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
