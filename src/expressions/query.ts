import { SelectExpression } from "./select_expression";

interface QueryParams {
  select: SelectExpression;
  from: string;
}

class Query {
  select: SelectExpression;
  from: string;

  constructor(params: QueryParams) {
    this.select = params.select;
    this.from = params.from;
  }
}

export { Query };
