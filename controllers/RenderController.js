function renderHome(req, res) {
  res.render('home')
}

function renderSignUp(req, res) {
  res.render('sign-up')
}

function renderLogin(req, res) {
  res.render('login')
}

function renderJoinVip(req, res) {
  if (req.user.vip) {
    return res.redirect('/')
  }

  res.render('join-vip')
}

function renderNewMessage(req, res) {
  res.render('new-message')
}

export default {
  renderHome,
  renderSignUp,
  renderLogin,
  renderJoinVip,
  renderNewMessage,
}
