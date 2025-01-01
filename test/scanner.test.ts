import { expect, test, describe } from "vitest";
import { Scanner } from "../src/scanner.ts";
import { Token, TokenType } from "../src/token.ts";

describe("Basic examples", () => {
  test("Parsing start", () => {
    let scanner = new Scanner("*");
    let tokens = scanner.tokenize();
    expect(tokens).toEqual([new Token(TokenType.Star, "*")]);
  });

  test("Example with normal query", () => {
    let scanner = new Scanner("SELECT * FROM numbers");
    let tokens = scanner.tokenize();

    expect(tokens).toEqual([
      new Token(TokenType.Select, "SELECT"),
      new Token(TokenType.Star, "*"),
      new Token(TokenType.From, "FROM"),
      new Token(TokenType.Identifier, "numbers"),
    ]);
  });

  test("Example with a lot of whitespaces", () => {
    let scanner = new Scanner("SELECT    *    FROM   ");
    let tokens = scanner.tokenize();

    expect(tokens).toEqual([
      new Token(TokenType.Select, "SELECT"),
      new Token(TokenType.Star, "*"),
      new Token(TokenType.From, "FROM"),
    ]);
  });
});
