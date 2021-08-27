import { syncTransactions } from "../handlers/transaction.handler";
import { consumeQueue } from "../plugins/amqpPlugin";

export default async function () {
  await consumeQueue(syncTransactions);
}
