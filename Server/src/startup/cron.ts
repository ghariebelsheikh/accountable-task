import cron from "cron";
import { sendToQueue } from "../plugins/amqpPlugin";
import { getAccountWithInterval } from "../services/users";

const CronJob = cron.CronJob;
const job1 = new CronJob("*/1 * * * *", () => publishToQueue(1), null, true);
const job3 = new CronJob("*/3 * * * *", () => publishToQueue(3), null, true);
const job6 = new CronJob("*/6 * * * *", () => publishToQueue(6), null, true);

const publishToQueue = async (intervalFetching: 1 | 3 | 6) => {
  const accounts = await getAccountWithInterval(intervalFetching);
  sendToQueue(accounts);
};
