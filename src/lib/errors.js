export class NotAuthenticated extends Error {
  constructor(message){
    if(!message) message = `You are not authenticated`
    super(message)
    this.statusText = `Not Authenticated`
    this.code = 401
  }
}

export class NotFound extends Error {
  constructor(message){
    if(!message) message = `Resource could not be found`
    super(message)
    this.statusText = `Not Found`
    this.code = 404
  }
}

export class NotAllowed extends Error {
  constructor(message){
    if(!message) message = `You do not have access to this resource`
    super(message)
    this.statusText = `Not Allowed`
    this.code = 405
  }
}

export class NotAcceptable extends Error {
  constructor(message){
    if(!message) message = `Your request was not made in an acceptable format`
    super(message)
    this.statusText = `Not Acceptable`
    this.code = 406
  }
}

export class ServerError extends Error {
  constructor(message){
    if(!message) message = `There has been a server error`
    super(message)
    this.statusText = `Server Error`
    this.code = 500
  }
}
