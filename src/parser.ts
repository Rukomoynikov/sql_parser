import { Token, TokenType } from "./token.ts";
import { Query } from "./expressions/query.ts";
import { SelectExpression, type SelectValue } from "./expressions/select_expression.ts";

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
    return new Query({ select: this.select() });
  }

  select(): SelectExpression {
    const tokenType =
      this.tokens[this.current] && this.tokens[this.current].type;

    if (tokenType == TokenType.Select) {
      this.current++
      const value: SelectValue = []

      while (this.tokens[this.current] && (this.tokens[this.current].type === TokenType.Identifier || this.tokens[this.current].type === TokenType.Star)) {
        console.log(this.tokens[this.current])
        value.push(this.tokens[this.current].content)

        this.current++
      }

      this.current--

      return new SelectExpression(value);
    }
  }
}

export { Parser };
