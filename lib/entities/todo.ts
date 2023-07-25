export default class Todo {
  constructor(
    readonly userId: string,
    readonly title: string,
    readonly description = '',
    readonly completed = false,
    readonly id?: string,
    readonly createdAt?: Date,
    readonly updatedAt?: Date
  ) {}
}
