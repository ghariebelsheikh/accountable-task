import { consumeQueue, load } from "./amqp";
import { saveTransactions } from "./handler";

const connectToMQ = async () => {
  try {
    await load();
    console.log("Connected to AMQP successfully");
  } catch (e) {
    console.log("Error Connecting to AMQP");
  }
};

const consume = async () => {
  await consumeQueue(saveTransactions);
};

connectToMQ();
consume();
