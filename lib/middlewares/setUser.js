export function setUser(req, res, next) {
  res.locals.currentUser = req.user
  next()
}
