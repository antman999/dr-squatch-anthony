export const addItemTags = (products) => {
  const scentMap = {
    birchwood: ["WOODSY", "FRESH"],
    pine: ["WOODSY", "CITRUS"],
    alpine: ["HERBAL"],
    bay: ["RICH", "SPICED"],
  };
  for (let item of products) {
    let scents = [];
    for (let includedItems of item.products_included) {
      for (let scent of Object.keys(scentMap)) {
        if (includedItems.includes(scent)) {
          for (let scentValue of scentMap[scent]) {
            if (!scents.includes(scentValue)) {
              scents.push(scentValue);
            }
          }
        }
      }
    }
    item.scents = scents;
  }
  return products;
};
