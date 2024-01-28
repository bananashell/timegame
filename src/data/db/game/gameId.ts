export class GameId {
  private _userId: string;
  private _salt: string;

  constructor({ userId, salt }: { userId: string; salt: string }) {
    this._userId = userId;
    this._salt = salt;
  }

  public static parse(gameId: string): GameId {
    const [userId, salt] = gameId.split("|");
    return new GameId({ userId, salt });
  }

  public get userId(): string {
    return this._userId;
  }

  public get salt(): string {
    return this._salt;
  }

  public toString(): string {
    return `${this._userId}|${this._salt}`;
  }
}
