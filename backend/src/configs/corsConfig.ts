import cors from "cors";

const corsOptions = {
  origin: "http://localhost:4000",
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default cors(corsOptions);
