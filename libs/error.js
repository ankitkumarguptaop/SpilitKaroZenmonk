class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequest";
    this.statusCode = 400;
  }
}

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFound";
    this.statusCode = 404;
  }
}

class UnAuthorized extends Error {
  constructor(message) {
    super(message);
    this.name = "UnAuthorized";
    this.statusCode = 401;
  }
}

class NoContent extends Error {
  constructor(message) {
    super(message);
    this.name = "NoContent";
    this.statusCode = 204;
  }
}

class ForBidden extends Error {
  constructor(message) {
    super(message);
    this.name = "ForBidden";
    this.statusCode = 403;
  }
}

module.exports = {
  ForBidden,
  NoContent,
  UnAuthorized,
  NotFound,
  BadRequest,
};
