const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const User = require('../models/User');
const Log = require('../models/Log');

// @route   GET api/logs
// @desc    Get all users logs
// @access  Private
router.get('/', auth, async (req, res) => {
  // res.send('Get all logs');
  try {
    const logs = await Log.find({ user: req.user.id }).sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/logs
// @desc    Add new logs
// @access  Private
router.post(
  '/',
  [auth, [body('message', 'Message is required').not().isEmpty()]],
  async (req, res) => {
    // res.send('Add logs');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { message, kilo, attention, launderer } = req.body;

    try {
      const newLog = new Log({
        message,
        kilo,
        attention,
        launderer,
        user: req.user.id,
      });

      const log = await newLog.save(); // Save to database

      res.json(log); // Return log to client
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/logs/:id
// @desc    Update logs
// @access  Private
router.put('/:id', auth, async (req, res) => {
  // const date = Date.now();
  const { message, kilo, attention, launderer, date } = req.body;

  // Build log object
  const logFields = {};
  if (message) logFields.message = message;
  if (kilo) logFields.kilo = kilo;
  if (attention) logFields.attention = attention;
  if (launderer) logFields.launderer = launderer;
  if (date) logFields.date = date;

  console.log(req.body.attention);

  try {
    let log = await Log.findById(req.params.id);

    if (!log) return res.status(404).json({ msg: 'Log not found' });

    // Make sure user owns log
    if (log.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    log = await Log.findByIdAndUpdate(
      req.params.id,
      { $set: logFields },
      { new: true }
    );

    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/logs/:id
// @desc    Delete logs
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const log = await Log.findById(req.params.id);

    if (!log) return res.status(404).json({ msg: 'Log not found' });

    // Make sure user own the log
    if (log.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Not authorized' });

    await Log.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Log removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
  // res.send('Delete logs');
});

module.exports = router;
