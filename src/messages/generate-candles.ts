import ICoinGeckoService from "../client/coingecko.interface";
import Period from "../enums/period.enum";
import Candle from "../models/candle.model";
import ISetupRabbitMq from "../rabbitmq-interface";

export class GerenateCandles {
  constructor(
    private readonly service: ICoinGeckoService,
    private readonly rabbitmqSetup: ISetupRabbitMq
  ) {}
  public generateCandles = async () => {
    await this.rabbitmqSetup.init();
    const messageChannel = this.rabbitmqSetup.getChannel();

    if (messageChannel) {
      while (true) {
        const loopTimes = Period.FIVE_MINUTES / Period.TEN_SECONDS;
        const candle = new Candle("BTC");

        console.log("----------------------------------------------");
        console.log("Generating new candle");
        console.log("----------------------------------------------");
        for (let i = 0; i < loopTimes; i++) {
          const price = await this.service.readMarketPrice();
          candle.addValue(price);
          console.log(`Market price ${i + 1} of ${loopTimes}`);
          //aguarda 10 segundos ate a proxima request
          await new Promise((r) => setTimeout(r, Period.TEN_SECONDS));
        }
        candle.closeCandle();
        console.log("----------------------------------------------");
        console.log("Candle Closed");
        const candleObj = candle.toSimpleObject();
        console.log(candleObj);
        console.log("----------------------------------------------");
        const candleJson = JSON.stringify(candleObj);

        messageChannel.sendToQueue(
          process.env.QUEUE_NAME ?? "candles",
          Buffer.from(candleJson)
        );
        console.log("Candle sent to queue.");
      }
    }
  };
}
