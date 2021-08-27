import { load } from "../plugins/amqpPlugin";

export default async function () {
  try {
    await load();
    console.log("Connected to AMQP successfully");
  } catch (e) {
    console.log("Error Connecting to AMQP");
  }
}
