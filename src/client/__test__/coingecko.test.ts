import { CoinGeckoService } from "../coingecko.service";
import bitcoinFixture from "../../../test/fixtures/bitcoin.json";
import * as HTTPUtil from "../../util/request";

jest.mock("../../util/request");

describe("CoinGecko client", () => {
  /**
   * Used for instance method's mocks
   */
  const mockedRequest = new HTTPUtil.Request() as jest.Mocked<HTTPUtil.Request>;
  it("should return the current price of bitcoin as a number from CoinGecko service", async () => {
    mockedRequest.get.mockResolvedValue({
      data: bitcoinFixture,
    } as HTTPUtil.Response);

    const coinGecko = new CoinGeckoService(mockedRequest);
    const response = await coinGecko.readMarketPrice();

    expect(typeof response).toBe("number");
  });
  it("should return the current price greater than 0(zero)", async () => {
    mockedRequest.get.mockResolvedValue({
      data: bitcoinFixture,
    } as HTTPUtil.Response);

    const coinGecko = new CoinGeckoService(mockedRequest);
    const response = await coinGecko.readMarketPrice();

    expect(response).toBeGreaterThan(0);
  });
});
