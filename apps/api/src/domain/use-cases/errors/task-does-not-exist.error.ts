export class TaskDoesNotExistError extends Error {
  constructor() {
    super('Task does not exist.')
  }
}
