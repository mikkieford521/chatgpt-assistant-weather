export const logging = (req,res,next) => {
  console.log(`${req.method.toUpperCase()} ${req.path} ${JSON.stringify(req?.body || ``).slice(0,1000)}`)
  next()
}
