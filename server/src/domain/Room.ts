import { User } from "./User";

class Room {
  private users: User[] = [];

  public listUsers(): User[] {
    return this.users;
  }

  public addUser(): User {
    const random_x = Math.floor(Math.random() * 100);
    const random_y = Math.floor(Math.random() * 100);
    const user = new User([random_x, random_y]);
    this.users.push(user);
    return user;
  }

  public removeUser(user: User) {
    this.users = this.users.filter(ref => ref != user);
  }
}

export { Room };
