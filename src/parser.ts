import { Token, TokenType } from "./token.ts";
import { Query } from "./expressions/query.ts";
import {
  SelectExpression,
  type SelectValue,
} from "./expressions/select_expression.ts";

interface ParserParams {
  tokens: Token[];
}

class Parser {
  private tokens: Token[] = [];
  private current = 0;

  constructor(params: ParserParams) {
    this.tokens = params.tokens;
  }

  parse(): Query {
    return new Query({
      select: this.select(),
      from: this.from(),
    });
  }

  select(): SelectExpression {
    const tokenType =
      this.tokens[this.current] && this.tokens[this.current].type;

    if (tokenType == TokenType.Select) {
      this.current++;
      const value: SelectValue = [];

      while (
        this.tokens[this.current] &&
        (this.tokens[this.current].type === TokenType.Identifier ||
          this.tokens[this.current].type === TokenType.Star)
      ) {
        value.push(this.tokens[this.current].content);

        this.current++;
      }

      return new SelectExpression(value);
    }

    throw new Error("SELECT expresion is expected");
  }

  from(): string {
    const tokenType =
      this.tokens[this.current] && this.tokens[this.current].type;

    if (tokenType == TokenType.From) {
      this.current++;

      if (this.tokens[this.current].type === TokenType.Identifier) {
        return this.tokens[this.current].content;
      }
    }

    throw new Error("FROM expresion is expected");
  }
}

export { Parser };
