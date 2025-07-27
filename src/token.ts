enum TokenType {
  Star = "STAR",
  Identifier = "IDENTIFIER",
  Select = "SELECT",
  From = "FROM",
  Comma = "COMMA",
  Semicolon = ";",
  Inner = "INNER",
  Join = "JOIN",
}

class Token {
  type: TokenType;
  content: string;

  constructor(type: TokenType, content: string) {
    this.type = type;
    this.content = content;
  }
}

export { Token, TokenType };
