import pino from "pino";

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport:
    process.env.NODE_ENV === "development"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "yyyy-mm-dd HH:MM:ss.l",
            ignore: "pid,hostname",
          },
        }
      : undefined,
});

export function handleError(
  error: unknown,
  context: string = "An error occurred"
) {
  if (error instanceof Error) {
    logger.error(
      {
        err: error,
        stack: error.stack,
      },
      context
    );
  } else {
    logger.error(
      {
        err: JSON.stringify(error),
      },
      `${context}: Non-Error object`
    );
  }
}

export default logger;
