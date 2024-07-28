export class NotPartyOwner extends Error {
  constructor() {
    super('You are not the party owner to send an offer to another user.');
  }
}
