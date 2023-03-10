import ICoinGeckoService from "./coingecko.interface";
import * as HTTPUtil from "../util/request";
class CoinGeckoUsd {
  usd: number;
}
class CoinGeckoResponse {
  bitcoin: CoinGeckoUsd;
}
export class CoinGeckoService implements ICoinGeckoService {
  constructor(protected request = new HTTPUtil.Request()) {}

  public readMarketPrice = async (): Promise<number> => {
    const { data } = await this.request.get<CoinGeckoResponse>(
      process.env.PRICES_API ?? "",
      {
        headers: {
          Authorization: "",
        },
      }
    );

    const price = data.bitcoin.usd;
    return price;
  };
}
