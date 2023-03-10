import client, { Connection, Channel, ConsumeMessage } from "amqplib";
import ISetupRabbitMq from "./rabbitmq-interface";

export class SetupRabbitMq implements ISetupRabbitMq {
  constructor() {}

  private consumer: any;
  private producer: any;
  private connection: Connection;
  private channel: Channel;
  private QUEUE: string = "candles";

  public async init(): Promise<void> {
    await this.getConnection();
    await this.createChannel();
    await this.channel.assertQueue(this.QUEUE);
  }
  public sendMessage(payload: any): void {
    const message = JSON.stringify(payload);
    this.channel.sendToQueue(this.QUEUE, Buffer.from(Buffer.from(message)));
  }
  private async getConnection(): Promise<void> {
    this.connection = await client.connect(
      `amqp://dev:senhadev@127.0.0.1:5672`
    );
  }
  private async createChannel(): Promise<void> {
    this.channel = await this.connection.createChannel();
  }
  private setConsumer() {
    this.consumer =
      (channel: Channel) =>
      (msg: ConsumeMessage | null): void => {
        if (msg) {
          console.log(msg.content.toString());
          this.channel.ack(msg);
        }
      };
  }
  public getChannel(): any {
    return this.channel;
  }
}
