import { Channel } from "amqplib";

export default interface ISetupRabbitMq {
  init(): Promise<void>;
  sendMessage(payload: any): void;
  getChannel(): any;
}
