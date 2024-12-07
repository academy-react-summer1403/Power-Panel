export const formatCostWithUnit = (cost) => {
    const numericCost = parseFloat(cost);
  
    if (numericCost >= 1000000000) {
      return `${(numericCost / 1000000000).toFixed(0)} میلیارد`;
    } else if (numericCost >= 1000000) {
      return `${(numericCost / 1000000).toFixed(0)} میلیون`;
    } else {
      return `${(numericCost / 1000)} هزار`;
    }
  };
  