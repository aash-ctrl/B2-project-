/**
 * @api {get} /cars Get All Cars
 * @apiName GetCars
 * @apiGroup Cars
 *
 * @apiSuccess {Object[]} cars List of cars.
 * @apiSuccess {Number} id Car ID.
 * @apiSuccess {String} name Car name.
 * @apiSuccess {String} type Car type.
 * @apiSuccess {Number} price_per_day Price per day.
 */
app.get('/cars', (req, res) => {
  db.all('SELECT * FROM cars', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});