export default interface ICoinGeckoService {
  readMarketPrice(): Promise<number>;
}
