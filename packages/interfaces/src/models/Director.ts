// An interface that matches the server's API response for a Director

export interface IDirector {
  readonly id: string;
  readonly createdAt: string;
  name: string;
}
