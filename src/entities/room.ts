export interface RoomProps {
  owner: string;
  users: string[];
  userStreaming?: string;
}

export class Room {
  private _id: string;
  private props: RoomProps;

  constructor(props: RoomProps, id?: string) {
    this.props = props;
    this._id = id || this.generateId(6);
  }

  get id() {
    return this._id;
  }

  get owner() {
    return this.props.owner;
  }

  set owner(owner: string) {
    this.props.owner = owner;
  }

  get users() {
    return this.props.users;
  }

  set users(users: string[]) {
    this.props.users = users;
  }

  get userStreaming() {
    return this.props.userStreaming;
  }

  set userStreaming(userStreaming: string | undefined) {
    this.props.userStreaming = userStreaming;
  }

  private generateId(length: number) {
    return [...Array(length)]
      .map(
        () =>
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'[
            Math.floor(Math.random() * 62)
          ],
      )
      .join('');
  }
}
