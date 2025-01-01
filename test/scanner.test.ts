import { expect, test, describe } from "vitest";
import { Scanner } from "../src/scanner.ts";
import { Token } from "../src/token.ts";

describe("Basic examples", () => {
  test("Parsing start", () => {
    let scanner = new Scanner("*");
    let tokens = scanner.tokenize();
    expect(tokens).toEqual([new Token("STAR", "*")]);
  });

  test("Example with normal query", () => {
    let scanner = new Scanner("SELECT * FROM numbers");
    let tokens = scanner.tokenize();

    expect(tokens).toEqual([
      new Token("SELECT", "SELECT"),
      new Token("STAR", "*"),
      new Token("FROM", "FROM"),
      new Token("IDENTIFIER", "numbers"),
    ]);
  });

  test("Example with a lot of whitespaces", () => {
    let scanner = new Scanner("SELECT    *    FROM   ");
    let tokens = scanner.tokenize();

    expect(tokens).toEqual([
      new Token("SELECT", "SELECT"),
      new Token("STAR", "*"),
      new Token("FROM", "FROM"),
    ]);
  });
});

// describe("Where operator", () => {
//   test("Example with a lot of whitespaces", () => {
//     let scanner = new Scanner("SELECT * FROM WHERE");
//     let tokens = scanner.tokenize();

//     expect(tokens).toEqual([
//       new Token("SELECT", "SELECT"),
//       new Token("STAR", "*"),
//       new Token("FROM", "FROM"),
//     ]);
//   });
// });
