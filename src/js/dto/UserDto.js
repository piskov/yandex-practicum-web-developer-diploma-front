/**
 * Data transfer object for the user identity.
 */
export default class UserDto {
  constructor(name, email, password) {
    this.email = email;
    this.name = name;
    this.password = password;
  }
}
