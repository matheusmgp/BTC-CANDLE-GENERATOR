import { CoinGeckoService } from "../coingecko.service";
import bitcoinFixture from "../../../test/fixtures/bitcoin.json";
import * as HTTPUtil from "../../util/request";

jest.mock("../../util/request");

describe("CoinGecko client", () => {
  /**
   * Used for static method's mocks
   */
  const MockedRequestClass = HTTPUtil.Request as jest.Mocked<
    typeof HTTPUtil.Request
  >;
  /**
   * Used for instance method's mocks
   */
  const mockedRequest = new HTTPUtil.Request() as jest.Mocked<HTTPUtil.Request>;
  it("should return the current price of BTC from CoinGecko service", async () => {
    mockedRequest.get.mockResolvedValue({
      data: bitcoinFixture,
    } as HTTPUtil.Response);

    const coinGecko = new CoinGeckoService(mockedRequest);
    const response = await coinGecko.readMarketPrice();
    console.log(response);
    expect(typeof response).toBe("number");
  });
});
