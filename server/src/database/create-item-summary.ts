import { Item } from '../schema/Item';

export async function createItemSummary(item: Item): Promise<string> {
  // Return Promise for async compatibility (though this function is synchronous)
  return new Promise((resolve, reject) => {
    try {
      const manufacturerDetails = `Made in ${item.manufacturer_address.country}`;
      const categories = item.categories.join(', ');
      const userReviews = item.user_reviews
        .map(
          (review) =>
            `Rated ${review.rating} on ${review.review_date}: ${review.comment}`
        )
        .join(' ');
      const basicInfo = `${item.item_name} ${item.item_description} from the brand ${item.brand}`;
      const price = `At full price it costs: ${item.prices.full_price} USD, On sale it costs: ${item.prices.sale_price} USD`;
      const notes = item.notes;

      // Combine all information into comprehensive summary for vector search
      const summary = `${basicInfo}. Manufacturer: ${manufacturerDetails}. Categories: ${categories}. Reviews: ${userReviews}. Price: ${price}. Notes: ${notes}`;

      resolve(summary);
    } catch (error) {
      reject(`Error creating item summary: ${error}`);
    }
  });
}
