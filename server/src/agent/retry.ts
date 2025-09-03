export async function retryWithBackoff<T>(
  fn: () => Promise<T>, // The function to retry (generic type T for return value)
  maxRetries = 3
): Promise<T> {
  // Loop through the retries attempts
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn(); // Try to execute the function
    } catch (error: any) {
      if (error.status === 429 && attempt < maxRetries) {
        // Calculate exponential backoff delay: 2^attempt seconds, max 30 seconds
        const delay = Math.min(Math.pow(2, attempt) * 1000, 30000);
        console.log(`Rate limit hit. Retrying in ${delay / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue; // Go to next iteration (retry)
      }
      throw error; // If not rate limit or out of retries, throw the error
    }
  }
  throw new Error('Max retries reached'); // If all retries fail, throw an error
}
