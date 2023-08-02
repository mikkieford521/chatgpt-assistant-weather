const errorCatcher = fn => async(req,res,next) => {
  try {
    await fn(req,res,next)
  } catch (err) {
    // console.log(err.message)
    // console.log(err.stack)
    // console.log(`ERRORCATCHER ---`,JSON.stringify({
    //   method: req?.method,
    //   path: req?.path,
    //   headers: req?.headers,
    //   body: req?.body,
    //   data: req?.data,
    // }),`---`,JSON.stringify({
    //   body: res?.body,
    //   data: res?.data,
    // }))
    next(err)
  }
}

export { errorCatcher }
