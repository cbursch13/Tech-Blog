const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      return res.status(400).json({ message: 'No user with this username!' });
    }

    // Verify the posted password with the password stored in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Password invalid!' });
    }

    // Create session variables based on the logged-in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Route to handle user sign-up
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: 'Failed to sign up. Please try again.' });
  }
});

module.exports = router;