# Telegram Membership API Microservice

A microservice to check if a user is a member of a Telegram group, with caching support via Redis.

**Note:** The Telegram bot must be an administrator in the group you want to verify.

---

## Installation and Setup

1. **Create a Telegram Bot**  
   If you don't already have a Telegram bot, create one via [BotFather](https://core.telegram.org/bots#botfather) and add it as an administrator to the groups you want to monitor.

2. **Clone the Repository or Use Docker Compose**  
   Clone this repository:

   ```bash
   git clone https://github.com/yourusername/tg-membership-api.git
   cd tg-membership-api
   ```

   Alternatively, use the provided `docker-compose.yml` example directly.

3. **Create a `.env` File**  
   Copy `env.example` to `.env`:

   ```bash
   cp env.example .env
   ```

4. **Configure `.env`**  
   Open the `.env` file and configure the required settings:

   - `TELEGRAM_BOT_API_KEY`: Your Telegram bot API token.
   - `APP_API_KEY`: API key for request authorization (optional).
   - `CACHE_REQUESTS`: Enable caching (true/false).
   - `REDIS_*`: Redis configuration (host, port, password, etc.).

   For more details on the `.env` settings, refer to the [Configuration](#configuration) section.

5. **Start the Service**  
   Run the service using Docker Compose:
   ```bash
   docker-compose up -d
   ```

---

## Usage

### API Endpoints

1. **Check Membership**  
   **Endpoint:** `GET /check`  
   **Parameters:**

   - `userId` (required): The Telegram user ID to check.
   - `chatId` (required): The Telegram group or channel ID (or username, e.g., `@examplegroup`).

   **Headers:**

   - `x-api-key`: Your API key (if `APP_API_KEY` is configured in `.env`).

   **Example Request:**

   ```bash
   curl -X GET "http://localhost:3000/check?userId=123456789&chatId=@examplegroup" \
   -H "x-api-key: your-api-key"
   ```

   **Response:**

   ```json
   {
     "userId": 123456789,
     "chatId": "@examplegroup",
     "isInGroup": true
   }
   ```

---

## Configuration

Below is a list of `.env` settings with their descriptions:

| Variable               | Description                                                           | Default      |
| ---------------------- | --------------------------------------------------------------------- | ------------ |
| `TELEGRAM_BOT_API_KEY` | The API token for your Telegram bot.                                  | **Required** |
| `APP_API_KEY`          | API key for securing requests (leave empty to disable authorization). | (empty)      |
| `EXPRESS_PORT`         | Port on which the service runs.                                       | `3000`       |
| `CACHE_REQUESTS`       | Enable Redis caching (`true`/`false`).                                | `false`      |
| `CACHE_TTL`            | Time-to-live for cache entries (in seconds).                          | `3600`       |
| `REDIS_HOST`           | Redis server hostname.                                                | `127.0.0.1`  |
| `REDIS_PORT`           | Redis server port.                                                    | `6379`       |
| `REDIS_PASSWORD`       | Password for Redis (leave empty if not required).                     | (empty)      |
| `REDIS_DB`             | Redis database number.                                                | `0`          |

---

## Notes

- Ensure your bot has admin rights in the groups you're monitoring.
- Use a strong API key to secure requests.
- Redis caching is optional but improves performance for frequently repeated checks.

---

Feel free to contribute or report issues!
