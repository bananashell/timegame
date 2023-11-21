import { describe, it, expect, beforeAll } from "bun:test";
import { randomizeArrayWithSalt } from "./randomizeArrayWithSalt";

describe("randomizeArrayWithSalt", () => {
  let data: number[];
  beforeAll(() => {
    data = Array.from({ length: 1000 }, (_, index) => index + 1);
  });

  it("gives the same order for the same salt", () => {
    const SALT = "averylongsaltthatishardtoread" as const;

    const actual = randomizeArrayWithSalt(data, SALT);
    const expected = randomizeArrayWithSalt(data, SALT);

    expect(actual).toEqual(expected);
  });

  it("gives the different orders for the different salts", () => {
    const SALT = "averylongsaltthatishardtoread" as const;
    const SALT2 = "a" as const;

    const actual = randomizeArrayWithSalt(data, SALT);
    const expected = randomizeArrayWithSalt(data, SALT2);

    expect(actual).not.toEqual(expected);
  });
});
