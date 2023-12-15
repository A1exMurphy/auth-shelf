const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
  console.log('start GET query');

  const query = 
    `
    SELECT * FROM "item";
    `
    pool.query(query)
    .then((result) => {
      // console.log(result.rows, "query response to GET")
      res.send(result.rows)
    })
    .catch((err) => {
      console.log(err, "error in GET query")
      res.sendStatus(500)
    })
    });

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
  const insertShelfItem = 
    `
    INSERT INTO "item" (
      "description",
      "image_url",
      "user_id")
      VALUES ($1, $2, $3);
    `
    shelfItemValues = [req.body.description, req.body.image_url, req.user.id];
    console.log(shelfItemValues, "item to be POSTed");

    pool.query(insertShelfItem, shelfItemValues)
    .then((result) => {
      // console.log(result.rows, "query response to GET")
      res.sendStatus(201)
    })
    .catch((err) => {
      console.log(err, "error in POST query")
      res.sendStatus(500)
    })
    });

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {
  console.log('start DELETE query');

  const submitDeleteItem = 
    `
    DELETE FROM "item" 
      WHERE "item"."id" = $1 AND "item"."user_id" = $2;
    `
    itemToDeleteValues = [req.params.id, req.user.id]
    console.log(itemToDeleteValues, "item ID and user ID");

    pool.query(submitDeleteItem, itemToDeleteValues)
    .then((result) => {
      // console.log(result.rows, "query response to GET")
      res.send(result.rows)
    })
    .catch((err) => {
      console.log(err, "error in GET query")
      res.sendStatus(500)
    })
    });

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  console.log('start PUT query', req.user, '= req.user');

  const submitUpdateItem = 
    `
    UPDATE "item" 
    	SET "description"=$2, "image_url"=$3
      WHERE "item"."id" = $1;
    `
    itemToUpdateValues = [req.params.id, req.user.description, req.user.image_url]
    console.log(itemToUpdateValues, "item ID and values to update");

    pool.query(submitUpdateItem, itemToUpdateValues)
    .then((result) => {
      // console.log(result.rows, "query response to GET")
      res.send(result.rows)
    })
    .catch((err) => {
      console.log(err, "error in PUT query")
      res.sendStatus(500)
    })
    });
    
/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
