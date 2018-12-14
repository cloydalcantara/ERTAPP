const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const safety = require('../controllers/safety');
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/safety')
  .post( safety.add);

router.route('/safety/all')
  .get( safety.fetchAll);

router.route('/safety/:id')
  .get( safety.fetchSingle);

router.route('/safety/delete/:id')
  .delete( safety.delete);

router.route('/safety/update/:id')
  .put( safety.update);

router.route('/safety/delete/:id')
  .delete( safety.delete);

module.exports = router;