const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const incidentManagement = require('../controllers/incident-management');
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/incident-management')
  .post( incidentManagement.add);

router.route('/incident-management/all')
  .get( incidentManagement.fetchAll);

router.route('/incident-management/:id')
  .get( incidentManagement.fetchSingle);

router.route('/incident-management/delete/:id')
  .delete( incidentManagement.delete);

router.route('/incident-management/update/:id')
  .put( incidentManagement.update);

module.exports = router;