import amqplib, { Channel } from "amqplib";
import config from "config";

const q = "tasks";

const connect = async () => {
  const connection = await amqplib.connect(config.get("amqp"));
  const channel = await connection.createChannel();
  return channel;
};

const setQueue = async (channel: Channel) => {
  channel.assertQueue(q, {
    durable: true,
  });
};

export const load = async () => {
  const channel = await connect();
  await setQueue(channel);
};

export const sendToQueue = async (messages: any) => {
  const channel = await connect();
  for (const message of messages) {
    channel.sendToQueue(q, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });
  }
};
