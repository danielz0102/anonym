import MessagesModel from '#models/MessagesModel.js'

async function renderHome(req, res) {
  const messages = await MessagesModel.getAll()
  res.render('home', { messages })
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
