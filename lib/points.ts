import { Item, Receipet } from "@/types/recipet";

export const calculatePoints = (receipet: Receipet): number => {
  let points = 0;

  //One point for every alphanumeric character in the retailer name.
  for (let i = 0; i < receipet.retailer.length; i++) {
    if (/[a-zA-Z0-9]/.test(receipet.retailer[i])) {
      points += 1;
    }
  }
  console.log("title points: ", points);

  //50 points if the total is a round dollar amount with no cents.
  const total: string[] = receipet.total.split(".");
  if (Number(total[1]) == 0) {
    console.log("50 points");
    points += 50;
  }

  //25 points if the total is a multiple of 0.25
  if (Number(receipet.total) % 0.25 === 0) {
    console.log("25 points");
    points += 25;
  }

  //5 points for every two items on the receipt.
  if (receipet.items) {
    let itemValue = Math.floor(receipet.items.length / 2);
    console.log("points: ", itemValue * 5);
    points = points + itemValue * 5;
  }

  //If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer.
  // The result is the number of points earned.

  for (const item of receipet.items) {
    const typedItem = item as Item;
    if (typedItem.shortDescription.trim().length % 3 == 0) {
      const numPoints = Number(item.price) * 0.2;
      console.log("numPoints: ", numPoints);
      points += Math.ceil(numPoints);
      console.log("points: ", Math.ceil(numPoints));
    }
  }

  //6 points if the day in the purchase date is odd.
  const purchaseDay = receipet.purchaseDate.split("-")[2];
  if (Number(purchaseDay) % 2 !== 0) {
    points += 6;
    console.log("6 points");
  }

  //10 points if the time of purchase is after 2:00pm and before 4:00pm.
  const purchaseTime = receipet.purchaseTime.split(":");

  if (
    Number(purchaseTime[0]) >= 14 &&
    Number(purchaseTime[1]) > 0 &&
    Number(purchaseTime[0]) < 16
  ) {
    points += 10;
    console.log("10 points");
  }

  return points;
};
