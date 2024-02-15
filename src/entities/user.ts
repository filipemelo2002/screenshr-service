export interface UserProps {
  id: string;
  nickname: string;
  color: string;
}

export class User {
  private props: UserProps;

  constructor(props: UserProps) {
    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  set id(id: string) {
    this.props.id = id;
  }

  get nickname() {
    return this.props.nickname;
  }

  set nickname(nickname: string) {
    this.props.nickname = nickname;
  }

  get color() {
    return this.props.color;
  }

  set color(color: string) {
    this.props.color = color;
  }
}
