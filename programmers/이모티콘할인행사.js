function solution(users, emoticons) {
  let answer = [0, 0];
  const discount = [40, 30, 20, 10];
  const emoticonDiscount = new Array(emoticons.length).fill(0);

  const getPlusUsersandSell = (emoticonDiscount) => {
    let serviceUsers = 0;
    let sell = 0;
    users.forEach((user) => {
      let totalPrice = 0;
      emoticons.forEach((emoticon, idx) => {
        if (user[0] <= discount[emoticonDiscount[idx]]) {
          totalPrice +=
            (emoticon * (100 - discount[emoticonDiscount[idx]])) / 100;
        }
      });
      if (user[1] <= totalPrice) {
        serviceUsers++;
      } else {
        sell += totalPrice;
      }
    });
    return [serviceUsers, sell];
  };

  const getAnswer = (index, emoticonDiscount) => {
    if (index === emoticons.length) {
      let [plusServiceUsers, sell] = getPlusUsersandSell(emoticonDiscount);

      if (plusServiceUsers > answer[0]) {
        answer[0] = plusServiceUsers;
        answer[1] = sell;
      } else if (plusServiceUsers === answer[0]) {
        answer[1] = Math.max(sell, answer[1]);
      }
      return 0;
    }

    for (let i = 0; i < discount.length; i++) {
      const newEmoticonDiscount = [...emoticonDiscount];
      newEmoticonDiscount[index] = i;
      getAnswer(index + 1, newEmoticonDiscount);
    }
  };

  getAnswer(0, emoticonDiscount);

  return answer;
}
