const calc = {
  "*": (a, b) => Number(a) * Number(b),
  "+": (a, b) => Number(a) + Number(b),
  "-": (a, b) => Number(a) - Number(b),
};
function solution(expression) {
  const regex = new RegExp(/\d+|\S/, "g");
  const regexExpression = expression.match(regex);
  let max = Number.MIN_SAFE_INTEGER;
  const operator = ["*", "+", "-"];

  const getMax = (expression, operator) => {
    if (expression.length === 1)
      return (max = Math.max(max, Math.abs(expression[0])));
    if (operator.length === 0) return 0;

    operator.forEach((op, idx) => {
      const newOperator = [...operator];
      const newExpression = [...expression];
      while (newExpression.indexOf(op) > 0) {
        const index = newExpression.indexOf(op);
        const result = calc[op](
          newExpression[index - 1],
          newExpression[index + 1]
        );
        newExpression.splice(index - 1, 3, result);
      }

      newOperator.splice(idx, 1);
      getMax(newExpression, newOperator);
    });
  };

  getMax(regexExpression, operator);
  return max;
}
