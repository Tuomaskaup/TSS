const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

const { check, body, query, param, validationResult, matchedData } = require("express-validator");

const path = require('path')
const root = path.join(__dirname, '.')

const config = require(path.join(root, 'config', 'config'))

const validators = require(path.join(root, 'validators'))
const middlewares = require(path.join(root, 'middlewares'))
const controllers = require(path.join(root, 'controllers'))

const oldSchedule = require(path.join(root, 'controllers', 'oldSchedule'))

router.route('/sign')
  .post(
    middlewares.user.sign
    , controllers.user.sign)

router.route('/user')
  .all(
    middlewares.jwt.read
    , middlewares.user.hasProperty('role', 'superuser'))
  .get(
    middlewares.user.readFilter
    , controllers.user.readFilter)
  .post(
    middlewares.user.create
    , controllers.user.create)

router.route('/user/:id')
  .all(
    middlewares.jwt.read
    , middlewares.user.hasProperty('role', 'superuser'))
  .get(
    middlewares.user.read
    , controllers.user.read)
  .put(
    middlewares.user.update
    , controllers.user.update)
  .delete(
    middlewares.user.delete
    , controllers.user.delete)


//Track supervision
router.route('/track-supervision')
  .get(
    middlewares.trackSupervision.readFilter
    , controllers.trackSupervision.readFilter)
  .post(
    middlewares.jwt.read
    , middlewares.user.hasProperty('role', 'superuser')
    , middlewares.trackSupervision.create
    , controllers.trackSupervision.create)

router.route('/track-supervision/:scheduled_range_supervision_id/:track_id')
  .get(
    middlewares.trackSupervision.read
    , controllers.trackSupervision.read)
  .put(
    middlewares.jwt.read
    , middlewares.user.hasProperty('role', 'superuser')
    , middlewares.trackSupervision.update
    , controllers.trackSupervision.update)
  .delete(
    middlewares.jwt.read
    , middlewares.user.hasProperty('role', 'superuser')
    , middlewares.trackSupervision.delete
    , controllers.trackSupervision.delete)
    
//Range supervision
router.route('/range-supervision')
  .get(
    middlewares.rangeSupervision.readFilter
    , controllers.rangeSupervision.readFilter)
  .post(
    middlewares.jwt.read
    , middlewares.user.hasProperty('role', 'superuser')
    , middlewares.rangeSupervision.create
    , controllers.rangeSupervision.create)

router.route('/range-supervision/:scheduled_range_supervision_id')
  .get(
    middlewares.rangeSupervision.read
    , controllers.rangeSupervision.read)
  .put(
    middlewares.jwt.read
    , middlewares.user.hasProperty('role', 'superuser')
    , middlewares.rangeSupervision.update
    , controllers.rangeSupervision.update)
  .delete(
    middlewares.jwt.read
    , middlewares.user.hasProperty('role', 'superuser')
    , middlewares.rangeSupervision.delete
    , controllers.rangeSupervision.delete)


router.route('/reservation')
  .get(controllers.reservation.read)
  .post(middlewares.jwt.read
        , middlewares.user.hasProperty('role', 'superuser')
        , controllers.reservation.create)

router.route('/reservation/:id')
  .get(controllers.reservation.readStrict)
  .put(middlewares.jwt.read
       , middlewares.user.hasProperty('role', 'superuser')
       , controllers.reservation.update)
  .delete(middlewares.jwt.read
          , middlewares.user.hasProperty('role', 'superuser')
          , controllers.reservation.delete)

router.route('/schedule')
  .get(controllers.schedule.read)
  .post(middlewares.jwt.read
        , middlewares.user.hasProperty('role', 'superuser')
        , controllers.schedule.create)

router.route('/schedule/:id')
  .get(controllers.schedule.readStrict)
  .put(middlewares.jwt.read
       , middlewares.user.hasProperty('role', 'superuser')
       , controllers.schedule.update)
  .delete(middlewares.jwt.read
          , middlewares.user.hasProperty('role', 'superuser')
          , controllers.schedule.delete)

/*
*  Track
*/
router.route('/track')
  .get(
    validators.track.readAll
    , middlewares.track.read
    , controllers.track.read)
  .post(
    middlewares.jwt.read
    , middlewares.user.hasProperty('role', 'superuser')
    , validators.track.create
    , middlewares.track.create
    , controllers.track.create)

router.route('/track/:track_id')
  .all(
    middlewares.jwt.read
    , middlewares.user.hasProperty('role', 'superuser'))
  .get(
    validators.track.read
    , middlewares.track.read
    , controllers.track.read)
  .put(
    validators.track.update
    , middlewares.track.update
    , controllers.track.update)
  .delete(
    validators.track.delete
    , middlewares.track.delete
    , controllers.track.delete)

//newer get with padded functionality
router.get("/datesupreme/:date", oldSchedule.getScheduleDate);

module.exports = router;
