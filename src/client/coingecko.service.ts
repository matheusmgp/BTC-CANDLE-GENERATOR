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
    const response = await this.request.get<CoinGeckoResponse>(
      `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`,
      {
        headers: {
          Authorization: "",
        },
      }
    );
    console.log(response);
    const price = response.data.bitcoin.usd;
    return price;
  };
}
