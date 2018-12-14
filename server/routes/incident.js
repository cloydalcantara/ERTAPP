const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const incident = require('../controllers/incident');
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/incident')
  .post( incident.add);

router.route('/incident/all')
  .get( incident.fetchAll);

router.route('/incident/:id')
  .get( incident.fetchSingle);

router.route('/incident/delete/:id')
  .delete( incident.delete);

router.route('/incident/update/:id')
  .put( incident.update);

router.route('/incident/delete/:id')
  .delete( incident.delete);

module.exports = router;