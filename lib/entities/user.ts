export default class User {
  constructor(
    readonly id: string,
    readonly email: string,
    readonly name: string,
    readonly createdAt?: Date,
    readonly updatedAt?: Date
  ) {}
}
