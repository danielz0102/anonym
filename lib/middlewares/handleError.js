//eslint-disable-next-line no-unused-vars
export function handleError(err, req, res, next) {
  console.error(err.stack)
  const status = err.status || 500
  const message = err.friendlyMessage || 'Internal Error'

  res.status(status).render('error', {
    title: `Error ${status}`,
    message: message,
  })
}
