const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const agencyRegistration = require('../controllers/agency-registration');
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/agency-registration')
  .post(agencyRegistration.add);

router.route('/agency-registration/registered')
  .get(agencyRegistration.fetchRegistered);

  router.route('/agency-registration/all')
  .get(agencyRegistration.fetchAll);

router.route('/agency-registration/:id')
  .get(agencyRegistration.fetchSingle);

router.route('/agency-registration/delete/:id')
  .delete(agencyRegistration.delete);

router.route('/agency-registration/update/:id')
  .put(agencyRegistration.update);
  

module.exports = router;