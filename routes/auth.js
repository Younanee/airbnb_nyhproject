module.exports = function(app, passport) {
  app.post('/', passport.authenticate('local', {
    successRedirect : 'back', // redirect to the secure profile section
    failureRedirect : 'back', // redirect back to the signup page if there is an error
    //failureFlash : true // allow flash messages
  }));

//   app.get('/auth/facebook',
//     passport.authenticate('facebook', { scope : 'email' })
//   );

//   app.get('/auth/facebook/callback',
//     passport.authenticate('facebook', {
//       failureRedirect : '/signin',
//       failureFlash : true // allow flash messages
//     }),
//     function(req, res, next) {
//       req.flash('success', '로그인되었습니다.');
//       res.redirect('/');
//     }
//   );

  app.get('/signout', function(req, res) {
    //req.logout();
    delete req.session.user;
    req.flash('success', '로그아웃 되었습니다.');
    res.redirect('/');
  });
};
