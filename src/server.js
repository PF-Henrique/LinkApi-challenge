import { listen } from "./app";

const PORT = process.env.APP_PORT || 3333;
listen(PORT, () =>
  console.log(`🟢  Server listening at http://localhost:${PORT}`)
);
