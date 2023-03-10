import "./util/module-alias";
import { config } from "dotenv";
import { GerenateCandles } from "./messages/generate-candles";
import { CoinGeckoService } from "./client/coingecko.service";
import { SetupRabbitMq } from "./rabbitmq-setup";

config();
new GerenateCandles(
  new CoinGeckoService(),
  new SetupRabbitMq()
).generateCandles();
