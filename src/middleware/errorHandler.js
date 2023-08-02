export const errorHandler = async(err,req,res,next) => {
  console.log(err)
  if(err.errors) console.log(err.errors[0])
  res.status(err.code || 500).send({ error: err.message })
}
