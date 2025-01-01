enum TokenType {
  Star = "STAR",
  Identifier = "IDENTIFIER",
  Select = "SELECT",
  From = "FROM",
}

class Token {
  private type: TokenType;
  private content: string;

  constructor(type: TokenType, content: string) {
    this.type = type;
    this.content = content;
  }
}

export { Token, TokenType };
