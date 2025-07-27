import { expect, test, describe } from "vitest";
import { Scanner } from "../src/scanner.ts";
import { Token, TokenType } from "../src/token.ts";

describe("Basic examples", () => {
  test("Parsing start", () => {
    const scanner = new Scanner("*");
    const tokens = scanner.tokenize();
    expect(tokens).toEqual([new Token(TokenType.Star, "*")]);
  });

  test("Example with normal query", () => {
    const scanner = new Scanner("SELECT * FROM numbers;");
    const tokens = scanner.tokenize();

    expect(tokens).toEqual([
      new Token(TokenType.Select, "SELECT"),
      new Token(TokenType.Star, "*"),
      new Token(TokenType.From, "FROM"),
      new Token(TokenType.Identifier, "numbers"),
      new Token(TokenType.Semicolon, ";"),
    ]);
  });

  test("Example with normal query", () => {
    const scanner = new Scanner("SELECT id, data FROM numbers");
    const tokens = scanner.tokenize();

    expect(tokens).toEqual([
      new Token(TokenType.Select, "SELECT"),
      new Token(TokenType.Identifier, "id"),
      new Token(TokenType.Comma, ","),
      new Token(TokenType.Identifier, "data"),
      new Token(TokenType.From, "FROM"),
      new Token(TokenType.Identifier, "numbers"),
    ]);
  });

  test("Example with a lot of whitespaces", () => {
    const scanner = new Scanner("SELECT    *    FROM   ");
    const tokens = scanner.tokenize();

    expect(tokens).toEqual([
      new Token(TokenType.Select, "SELECT"),
      new Token(TokenType.Star, "*"),
      new Token(TokenType.From, "FROM"),
    ]);
  });

  test("Example with inner joins and order", () => {
    const scanner = new Scanner(
      "SELECT * \
      FROM categories \
      INNER JOIN products \
      ON categories.category_id = products.category_id \
      ORDER BY products.product_name;",
    );
    const tokens = scanner.tokenize();

    expect(tokens).toEqual([
      new Token(TokenType.Select, "SELECT"),
      new Token(TokenType.Star, "*"),
      new Token(TokenType.From, "FROM"),
      new Token(TokenType.Identifier, "categories"),
    ]);
  });
});
