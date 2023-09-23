import { app } from "./app.js";
import { connectDB } from "./database/db.js";
const Port = process.env.PORT || 4000;

connectDB();

app.listen(Port, () => {
  console.log(`Server is working on ${Port}`);
});
