import server from './server';
import { connectToDB } from './config/database';

connectToDB();

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
