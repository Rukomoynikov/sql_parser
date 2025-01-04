type SelectValue = string[];

class SelectExpression {
  value: SelectValue;

  constructor(value: SelectValue) {
    this.value = value;
  }
}

export { SelectExpression, SelectValue };
