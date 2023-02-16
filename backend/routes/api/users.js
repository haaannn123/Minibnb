const express = require('express');


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();


// fetch('/api/session', {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
//     },
//     body: JSON.stringify({ credential: 'Demo-lition', password: 'password' })
//   }).then(res => res.json()).then(data => console.log(data));


//   fetch('/api/session', {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
//     },
//     body: JSON.stringify({ credential: 'demo@user.io', password: 'password' })
//   }).then(res => res.json()).then(data => console.log(data));


//   fetch('/api/session', {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
//     },
//     body: JSON.stringify({ credential: 'Demo-lition', password: 'Hello World!' })
//   }).then(res => res.json()).then(data => console.log(data));


// fetch('/api/session', {
//     method: 'DELETE',
//     headers: {
//       "Content-Type": "application/json",
//       "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
//     }
//   }).then(res => res.json()).then(data => console.log(data));

router.post(
    '/',
    async (req, res) => {
      const { email, password, username } = req.body;
      const user = await User.signup({ email, username, password });

      await setTokenCookie(res, user);

      return res.json({
        user: user
      });
    }
  );

  fetch('/api/users', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },
    body: JSON.stringify({
      email: 'spidey@spider.man',
      username: 'Spidey',
      password: 'password'
    })
  }).then(res => res.json()).then(data => console.log(data));
module.exports = router;
