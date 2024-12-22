import app from "./api";
import env from "./utils/config";
import logger from "./utils/logger";

const PORT = env.EXPRESS_PORT;

app.listen(PORT, () => {
  logger.info(`API server is running on http://localhost:${PORT}`);
});
