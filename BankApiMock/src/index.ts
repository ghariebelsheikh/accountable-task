import express from "express";
const app = express();

app.get("/transactions", (req, res) => {
  if (req.headers.authorization === "InvalidAccessToken")
    res.status(401).json("Unauthorized Error");
  else if (req.headers.authorization === "Failure")
    res.status(500).json("Technical Error");
  else {
    res.status(200).json({
      transactions: [
        {
          amount: 50,
          currency: "EGP",
        },
        {
          amount: -50,
          currency: "USD",
        },
        {
          amount: 1000,
          currency: "EGP",
        },
        {
          amount: -200,
          currency: "EUR",
        },
      ],
    });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Bank Server Listening on port ${port}`);
});
