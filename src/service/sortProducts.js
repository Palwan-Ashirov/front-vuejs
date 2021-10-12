export let sortCards = (card, selectedSort) => {
  const sorted = card.slice();
  
  const parseStrToInt = (element) => {
    const parsedInteger = parseInt(element.split(" ").join(""));
    return parsedInteger;
  }
  const sortByPriceMax = (d1, d2) =>
  parseStrToInt(d1.price) > parseStrToInt(d2.price) ? 1 : -1;

  const sortByPriceMin = (d1, d2) =>
  parseStrToInt(d1.price) < parseStrToInt(d2.price) ? 1 : -1;
  
    const sortByname = (d1, d2) =>
    d1.name.toLowerCase() > d2.name.toLowerCase() ? 1 : -1;
  switch (selectedSort) {
    case "По цене max":
      return sorted.sort(sortByPriceMax);
    case "По цене min":
      return sorted.sort(sortByPriceMin);
    case "По наименованию":
      return sorted.sort(sortByname);
    default:
      return card;
  }
};
