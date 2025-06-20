import { validationResult, matchedData } from 'express-validator'
import MessagesModel from '#models/MessagesModel.js'

async function create(req, res) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.render('new-message', {
      errors: errors.array().map((error) => error.msg),
      formData: {
        title: req.body.title,
        content: req.body.content,
      },
    })
  }

  const messageData = matchedData(req)
  await MessagesModel.create({
    userId: req.user.id,
    title: messageData.title,
    content: messageData.content,
  })

  res.redirect('/')
}

export default {
  create,
}
