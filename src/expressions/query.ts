import { SelectExpression } from "./select_expression";

interface QueryParams {
  select: SelectExpression;
}

class Query {
  select: SelectExpression;

  constructor(params: QueryParams) {
    this.select = params.select;
  }
}

export { Query };
