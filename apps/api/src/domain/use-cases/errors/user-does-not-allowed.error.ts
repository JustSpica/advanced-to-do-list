export class UserDoesNotAllowedError extends Error {
  constructor() {
    super('User does not allowed.')
  }
}
