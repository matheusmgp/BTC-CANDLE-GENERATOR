import CandleColor from "../enums/candle-color.enum";

export default class Candle {
  low: number;
  high: number;
  open: number;
  close: number;
  color: CandleColor;
  finalDateTime: Date;
  values: number[];
  currency: string;

  constructor(currency: string) {
    this.currency = currency;
    this.low = Infinity;
    this.high = 0;
    this.close = 0;
    this.open = 0;
    this.values = [];
    this.color = CandleColor.UNDETERMINED;
  }

  addValue(value: number) {
    if (this.arraySize() === 0) {
      this.open = value;
    }
    this.values.push(value);
    this.low > value ? (this.low = value) : null;
    this.high < value ? (this.high = value) : null;
  }

  closeCandle() {
    if (this.arraySize() > 0) {
      this.close = this.getArrayLastPosition();
      this.finalDateTime = new Date();

      if (this.open > this.close) {
        this.color = CandleColor.RED;
      } else if (this.close > this.open) {
        this.color = CandleColor.GREEN;
      }
    }
  }

  toSimpleObject() {
    const { values, ...obj } = this;
    return obj;
  }
  arraySize() {
    return this.values.length;
  }
  getArrayLastPosition() {
    return this.values[this.values.length - 1];
  }
}
