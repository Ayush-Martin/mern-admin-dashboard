import cors from "cors";

const corsOptions = {
  origin: "http://localhost:4000",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export default cors(corsOptions);
