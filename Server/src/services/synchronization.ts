import fs from "fs";
import User from "../models/user.model";

const logStream = fs.createWriteStream("logs/failure.log", {
  flags: "a",
});

process.on("exit", () => logStream.end());

export async function removeInvalidToken(userId: string): Promise<void> {
  await User.updateOne(
    { _id: userId },
    {
      $set: { "account.bankToken": null },
    }
  );
}

export async function saveTechnicalFailureToFile(
  userId: string
): Promise<void> {
  const log = `${new Date().toISOString()}: Technical Error with fetching transactions related to userId: ${userId}\r\n`;
  logStream.write(log);
}
