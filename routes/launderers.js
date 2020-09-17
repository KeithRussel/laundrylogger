const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const Launderer = require('../models/Launderer');

// @route   GET api/launderers
// @desc    Get all users launderers
// @access  Private
router.get('/', auth, async (req, res) => {
  // res.send('Get all launderers');
  try {
    const launderer = await Launderer.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(launderer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/launderers
// @desc    Add new launderers
// @access  Private
router.post(
  '/',
  [auth, [body('firstName', 'Firstname is Required').not().isEmpty()]],
  async (req, res) => {
    // res.send('Add launderer');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName } = req.body;

    try {
      const newLaunderer = new Launderer({
        firstName,
        lastName,
        user: req.user.id,
      });

      const launderer = await newLaunderer.save(); // Save to database

      res.json(launderer); // Return launderer to client
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/logs/:id
// @desc    Update logs
// @access  Private
router.put('/:id', (req, res) => {
  res.send('Update launderers');
});

// @route   DELETE api/logs/:id
// @desc    Delete logs
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  // res.send('Delete launderers');
  try {
    const launderer = await Launderer.findById(req.params.id);

    if (!launderer) return res.status(404).json({ msg: 'Launderer not found' });

    // Make sure user own the launderer
    if (launderer.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Not authorized user' });

    await Launderer.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Launderer Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
