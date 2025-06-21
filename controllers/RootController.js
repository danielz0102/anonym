import MessagesModel from '#models/MessagesModel.js'

async function renderHome(req, res) {
  const messages = await MessagesModel.getAll(req.user?.vip)
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

function renderJoinAdmin(req, res) {
  if (req.user.admin) {
    return res.redirect('/')
  }

  res.render('join-admin')
}

export default {
  renderHome,
  renderSignUp,
  renderLogin,
  renderJoinVip,
  renderNewMessage,
  renderJoinAdmin,
}
