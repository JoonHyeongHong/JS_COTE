const plays = {
  hamlet: { name: "hamlet", type: "tragedy" },
  "as-Like": { name: "As You Like It", type: "comedy" },
  othello: { name: "Othello", type: "tragedy" },
};
//invoices.json
const invoices = [
  {
    customer: "BigCo",
    performances: [
      {
        playID: "hamlet",
        audience: 55,
      },
      {
        playID: "as-Like",
        audience: 35,
      },
      {
        playID: "othello",
        audience: 40,
      },
    ],
  },
];

const statementTest = (invoice, plays) => {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명:${invoice.customer})\n`;
  /**
   * Intl 객체는 각 언어에 맞는 문자비교, 숫자, 시간, 날짜비교를 제공하는 EcmaScript 국제화 API를 위한 namespace 입니다
   *
   *  Intl.NumberFormat은 각 언어에 맞는 숫자 서식을 적용할 수 있는 객체의 생성자입니다
   */

  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;

    switch (play.type) {
      case "tragedy":
        thisAmount = 40000;
        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;
      case "comedy":
        thisAmount = 30000;
        if (perf.audience > 20) {
          thisAmount += 10000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;
      default:
        throw new Error(`알수 없는 장르: ${play.type}`);
    }

    //포인트 적립
    volumeCredits += Math.max(perf.audience - 30, 0);
    //희극 관객 5명 마다 추가 포인트를 제공한다
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

    //청구 내역을 출력한다.
    result += `${play.name}: ${format(thisAmount / 100)} (${
      perf.audience
    }석)\n`;
    totalAmount += thisAmount;
  }
  result += `총액 : ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
};

const usd = (aNumber) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
};

const statement = (invoice, plays) => {
  return renderPlainText(createStatementData(invoice, plays));
};

const createStatementDataTest = (invoice, plays) => {
  const erinchPerformance = (aPerformance) => {
    const result = Object.assign({}, aPerformance); //얕은 복사 수행
    result.play = playFor(result);
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);

    return result;
  };

  const playFor = (aPerformance) => {
    // <--- renderPlainText()에 있던 것을 statement()로 옮김
    return plays[aPerformance.playID];
  };

  const amountFor = (aPerformance) => {
    let result = 0;
    switch (aPerformance.play.type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`알수 없는 장르: ${aPerformance.play.type}`);
    }

    return result;
  };

  const volumeCreditsFor = (aPerformance) => {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === aPerformance.play.type)
      result += Math.floor(aPerformance.audience / 5);
    return result;
  };

  const totalVolumeCredits = (data) => {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
  };

  const totalAmount = (data) => {
    return data.performances.reduce((total, p) => total + p.amount, 0);
  };

  const result = {};
  result.customer = invoice.customer;
  result.performances = invoice.performances.map(erinchPerformance);
  result.totalVolumeCredits = totalVolumeCredits(result);
  result.totalAmount = totalAmount(result);
  return result;
};

class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  get amount() {
    switch (this.play.type) {
      case "tragedy":
        throw "서브클래스에서 처리하도록 설계되었습니다.";
      case "comedy":
        throw "서브클래스에서 처리하도록 설계되었습니다.";
      default:
        throw new Error(`알수 없는 장르: ${this.play.type}`);
    }
  }

  get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0);
  }
}

const createPerformanceCalculator = (aPerformance, aPlay) => {
  switch (aPlay.type) {
    case "tragedy":
      return new TragedyCalculator(aPerformance, aPlay);
    case "comedy":
      return new ComedyCalculator(aPerformance, aPlay);
    default:
      throw new Error(`알 수 없는 장르:${aPlay.type}`);
  }
};

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}

class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }

  get volumeCredits() {
    let result = 0;
    result += Math.max(this.performance.audience - 30, 0);
    result += Math.floor(this.performance.audience / 5);
    return result;
  }
}

const createStatementData = (invoice, plays) => {
  const erinchPerformance = (aPerformance) => {
    const calculator = createPerformanceCalculator(
      aPerformance,
      playFor(aPerformance)
    );
    const result = Object.assign({}, aPerformance); //얕은 복사 수행
    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;

    return result;
  };

  const playFor = (aPerformance) => {
    // <--- renderPlainText()에 있던 것을 statement()로 옮김
    return plays[aPerformance.playID];
  };

  const totalVolumeCredits = (data) => {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
  };

  const totalAmount = (data) => {
    return data.performances.reduce((total, p) => total + p.amount, 0);
  };

  const result = {};
  result.customer = invoice.customer;
  result.performances = invoice.performances.map(erinchPerformance);
  result.totalVolumeCredits = totalVolumeCredits(result);
  result.totalAmount = totalAmount(result);
  return result;
};

const renderPlainText = (data) => {
  let result = `청구 내역 (고객명:${data.customer})\n`;

  for (let perf of data.performances) {
    result += `${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
  }

  result += `총액 : ${usd(data.totalAmount)}\n`;
  result += `적립 포인트: ${data.totalVolumeCredits}점\n`;
  return result;
};

const htmlStatement = (invoice, plays) => {
  return renderHtml(createStatementData(invoice, plays));
};

const renderHtml = (data) => {
  let result = `<h1>청구 내역 (고객명:${data.customer})</h1>\n`;
  result += "<table>\n";
  result += "<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>";
  for (let perf of data.performances) {
    result += `<tr><td>${perf.play.name}</td><td> (${perf.audience}석)\n</td>`;
    result += `<td>${usd(perf.amount)}</td></tr>\n`;
  }
  result += "</table>\n";
  result += `<p>총액 : <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>적립 포인트: <em>${data.totalVolumeCredits}점</em></p>\n`;
  return result;
};

const testCode = (result, wanted) => {
  return result === wanted ? "🟩" : "🟥";
};

console.log(
  testCode(statement(invoices[0], plays), statementTest(invoices[0], plays))
);

const testObjectCode = (result, wanted) => {
  return JSON.stringify(result) === JSON.stringify(wanted) ? "🟩" : "🟥";
};

console.log(
  testObjectCode(
    createStatementDataTest(invoices[0], plays),
    createStatementData(invoices[0], plays)
  )
);

const diff = "A";
