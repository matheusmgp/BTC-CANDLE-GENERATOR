import ISetupRabbitMq from "@src/rabbitmq-setup";
import ICoinGeckoService from "../client/coingecko.interface";
import Period from "../enums/period.enum";
import Candle from "../models/candle.model";

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
        const loopTimes = Period.THIRTY_SECONDS / Period.TEN_SECONDS;
        const candle = new Candle("BTC");

        console.log("Generating new candle");
        console.log("----------------------------------------------");
        for (let i = 0; i < loopTimes; i++) {
          const price: number = await this.service.readMarketPrice();
          candle.addValue(price);
          console.log(`Market price #${i + 1} of ${loopTimes} -> $ ${price}`);
          //aguarda 10 segundos ate a proxima request
          await new Promise((r) => setTimeout(r, Period.TEN_SECONDS));
        }
        candle.closeCandle();
        console.log("Candle Closed");
        const candleObj = candle.toSimpleObject();
        console.log(candleObj);
        console.log("----------------------------------------------");
        const candleJson = JSON.stringify(candleObj);

        this.rabbitmqSetup.sendMessage(Buffer.from(candleJson));

        console.log("Candle sent to queue.");
      }
    }
  };
}
