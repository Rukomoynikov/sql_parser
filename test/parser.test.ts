import { expect, test, describe } from "vitest";
import { Parser } from "../src/parser.ts";
import { Token, TokenType } from "../src/token.ts";
import { Query } from "../src/expressions/query.ts";
import { SelectExpression } from "../src/expressions/select_expression.ts";

describe("Basic examples", () => {
  test("Parsing start", () => {
    const parser = new Parser({
      tokens: [
        new Token(TokenType.Select, "SELECT"),
        new Token(TokenType.Star, "*"),
        new Token(TokenType.From, "FROM"),
        new Token(TokenType.Identifier, "numbers"),
      ],
    });

    const expression = parser.parse();

    expect(expression).toEqual(
      new Query({ select: new SelectExpression(["*"]), from: "numbers" }),
    );
  });
});
