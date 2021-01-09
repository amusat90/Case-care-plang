const express = require('express');
const router = express.Router();

const passport = require('passport');

const UsersController = require('../../controllers/UsersController');

router.get('/test', (req, res) => {
    return res.json({msg: 'User API route functional'});
});

router.get('/list', passport.authenticate('jwt', {session: false}), UsersController.list);
router.post('/register', UsersController.register);
router.post('/login', UsersController.login);
router.post('/update', passport.authenticate('jwt', {session: false}), UsersController.updateUser);
router.post('/delete', passport.authenticate('jwt', {session: false}), UsersController.deleteUsers);

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