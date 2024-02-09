export class registerPerson {
  constructor(
    public firstname: string,
    public lastname: string,
    public email: string,
    public password: string,
    public userImage: File | undefined
  ) {}
}

export class loginPerson {
  constructor(public email: string, public password: string) {}
}

export class ShowPersons {
  constructor(
    public userID: string,
    public userFirstname: string,
    public userLastname: string,
    public userImg: string
  ) {}
}
