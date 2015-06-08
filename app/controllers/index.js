exports.render = function(req, res) {
    res.render('index', {
      title: 'BK LST',
      user: req.user ? req.user.username : ''
    });
};