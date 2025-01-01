class Token {
  private type: string;
  private content: string;

  constructor(type: string, content: string) {
    this.type = type;
    this.content = content;
  }
}

export { Token };
