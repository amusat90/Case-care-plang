const express = require('express');
const router = express.Router();

const passport = require('passport');

const UsersController = require('../../controllers/UsersController');

router.get('/test', (req, res) => {
    return res.json({msg: 'User API route functional'});
});

router.get('/list', UsersController.getList);
router.post('/register', UsersController.register);
router.post('/login', UsersController.login);

/** @route GET api/users/current
 *  @desc Return current user
 *  @access Private
 */
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = router;