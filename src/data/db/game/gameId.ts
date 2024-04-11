import { GameType, gameTypes } from "@/gameEngine/gameState";

export class GameId {
  private _userId: string;
  private _salt: string;
  private _gameType: GameType;

  constructor({
    userId,
    salt,
    gameType,
  }: {
    userId: string;
    salt: string;
    gameType: GameType;
  }) {
    this._userId = userId;
    this._salt = salt;
    this._gameType = gameType;
  }

  public static parse(gameId: string): GameId {
    const [userId, salt, gameType] = gameId.split("|");
    const parsedGameType = gameTypes.parse(gameType);

    return new GameId({ userId, salt, gameType: parsedGameType });
  }

  public static tryParse(
    gameId: string | unknown,
  ):
    | { success: true; result: GameId }
    | { success: false; result: { message: string } } {
    if (typeof gameId !== "string") {
      return { success: false, result: { message: "GameId must be a string" } };
    }

    try {
      const [userId, salt, gameType] = gameId.split("|");
      const parsedGameType = gameTypes.parse(gameType);

      const id = new GameId({ userId, salt, gameType: parsedGameType });
      return { success: true, result: id };
    } catch (e) {
      return {
        success: false,
        result: {
          message:
            e &&
            typeof e === "object" &&
            "message" in e &&
            typeof e.message === "string"
              ? e.message
              : "Unable to parse GameID",
        },
      };
    }
  }

  public get userId(): string {
    return this._userId;
  }

  public get salt(): string {
    return this._salt;
  }

  public get gameType(): GameType {
    return this._gameType;
  }

  public toString(): string {
    return `${this._userId}|${this._salt}|${this._gameType}`;
  }
}
