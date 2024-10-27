import app from "./app";
import client from "./db/db";



client.connect()
  .then((result:string) => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err:string) => {
    console.error(err);
  });
