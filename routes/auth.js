// var path = require('path');
// var express = require('express');
// var router = express.Router();
// var passport = require('passport')
// {const env = {
//   AUTH0_CLIENT_ID: 'QTo1KPOuS0hYXXzPJILfmDFY44M6iq1c',
//   AUTH0_DOMAIN: 'vladlupu.eu.auth0.com',
//   AUTH0_CALLBACK_URL: 'http://localhost:3000/callback'
// };

// // Render the login template
// router.get('/login', (req, res) => {
//   res.render('login', { env });
// });

// // Perform session logout and redirect to homepage
// router.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect('/');
// });
// }
// Perform the final stage of authentication and redirect to '/user'
// router.get('/callback',
//   passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }), (req, res) => {
//       console.log("callback log")
//     res.redirect('/homepage.html');
//   });

//     app.get('/login', function(req, res) {
//     });
//     app.get('/signup', function(req, res) {
//     });
//     app.post('/signup',
//     function(req, res, next) {
//     passport.authenticate('local-signup', function(err, user, info) {
//         if (err) { return next(err); }
//         if (!user) { return res.redirect('/'); }
//         req.logIn(user, function(err) {
//         if (err) { return next(err); }
//         console.log("asdadasd")
//         });
//     })(req, res, next);
//         return res.sendFile(path.resolve('app/homepage.html'))
    
//     } 
//     // passport.authenticate('local-signup', {
//     //     successRedirect : '/homepage/page', 
//     //     failureRedirect : '/',
//     //     failureFlash : true
//     // }));
//     )
    
//     app.get('/logout', function(req, res, next) {
//         return res.sendFile(path.resolve('app/homepage.html'))        
//     });
//     app.get('/isLoggedIn', isLoggedIn, function(req, res, next){
//         res.send(200).status("este logat")
//     }
//     )
//     app.get('/homepage/page', function(req, res){
//         res.redirect('/homepage.html')
//     })
// };

// function isLoggedIn(req, res, next) {

//     if (req.isAuthenticated())
//         return next();
//     else console.log("nu este logat")
//     res.redirect('/');
// }