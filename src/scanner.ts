import { Token } from "./token";

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
        return new Token("STAR", char);
      case " ":
        return null;
      default:
        let keyword = this.keyword();

        if (keyword) {
          return new Token(keyword, keyword);
        }

        let identifier = this.identifier();

        if (identifier) {
          return new Token("IDENTIFIER", identifier);
        }
    }

    return null;
  }

  keyword(): string | null {
    let r = this.current;

    let keywords = {
      select: true,
      from: true,
    };

    while (r < this.source.length && this.source[r] != " ") {
      r++;
      let substr = this.source.substring(this.current - 1, r + 1);

      if (keywords[substr.toLowerCase()]) {
        this.current = r + 1;
        return substr;
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
