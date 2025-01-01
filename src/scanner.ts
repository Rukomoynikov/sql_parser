import { Token, TokenType } from "./token";

class Scanner {
  private source: string;
  private current = 0;
  private tokens: Token[] = [];

  constructor(source: string) {
    this.source = source;
  }

  tokenize(): Token[] {
    while (this.current < this.source.length) {
      let char = this.source[this.current++];
      let token = this.getToken(char);
      if (token) this.tokens.push(token);
    }

    return this.tokens;
  }

  operator() {
    return {
      select: true,
      from: true,
    };
  }

  getToken(char: string): Token | null {
    switch (char) {
      case "*":
        return new Token(TokenType.Star, char);
      case " ":
        return null;
      default:
        let keyword = this.keyword();

        if (keyword != null) {
          let [tokenType, keywordString] = keyword;
          return new Token(tokenType, keywordString);
        }

        let identifier = this.identifier();

        if (identifier) {
          return new Token(TokenType.Identifier, identifier);
        }
    }

    return null;
  }

  keyword(): [TokenType, string] | null {
    let r = this.current;

    let keywords = {
      select: TokenType.Select,
      from: TokenType.From,
    };

    while (r < this.source.length && this.source[r] != " ") {
      r++;
      let substr = this.source.substring(this.current - 1, r + 1);
      let tokenType = keywords[substr.toLowerCase()];

      if (tokenType) {
        this.current = r + 1;
        return [tokenType, substr];
      }
    }

    return null;
  }

  identifier() {
    let r = this.current;

    while (this.isWordCharacter(this.source[r])) {
      r++;
    }

    let substr = this.source.substring(this.current - 1, r);

    if (substr) {
      this.current = r;
      return substr;
    }

    return null;
  }

  isWordCharacter(char: string): boolean {
    if (!char) return false;

    return (
      char.toUpperCase().charCodeAt(0) >= 65 &&
      char.toUpperCase().charCodeAt(0) <= 90
    );
  }
}

export { Scanner };
