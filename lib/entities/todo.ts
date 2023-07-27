export default class Todo {
  constructor(
    readonly userId: string,
    public title: string,
    public description = '',
    public completed = false,
    readonly id?: string,
    readonly createdAt?: Date,
    readonly updatedAt?: Date,
  ) {}
}
