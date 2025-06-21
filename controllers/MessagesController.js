import MessagesModel from '#models/MessagesModel.js'

async function create(req, res) {
  const message = req.body

  await MessagesModel.create({
    userId: req.user.id,
    title: message.title,
    content: message.content,
  })

  res.redirect('/')
}

async function deleteMsg(req, res) {
  const { id } = req.params
  await MessagesModel.deleteMsg(Number(id))
  res.redirect('/')
}

export default {
  create,
  deleteMsg,
}
