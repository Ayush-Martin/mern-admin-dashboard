import cors from "cors";

const FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN || "http://localhost:4000";
const corsOptions = {
  origin: FRONTEND_DOMAIN,
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export default cors(corsOptions);
