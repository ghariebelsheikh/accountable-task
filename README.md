<h1> Accountable Task </h1>

## Contents

- Introduction
- Tools
- Structure
- How To Run
- API Documentation

## Introduction

for Accountable task , it is required to fetch users transactions for a bank account following these instructions:

- Each user has one bank account connected
- For each bank account, I must fetch new transactions at regular intervals and store them in DB
- This operation should be done in the background as a scheduled job
- Users can have a custom transaction fetching interval as every hour every 3 hours and every 6 hours the default value is every hour (for testing it will be on minute not hour)
- bank API can be a mock API to simulate basic GET requests. So, I can create a mock API endpoint to return random transaction data.
- API implementation should be robust to support thousands of scheduled jobs
- Handle errors from bank API. There are 2 possible errors
  - technicalFailure means the bank is unavailable that should be logged to a file. In that case, retry to fetch transactions next time.
  - authorizationFailed means the access token is no longer valid. In that case, don't fetch new transactions until the user has manually updated his connection to get a new token.
- Each time a bank throws a technical failure error, you must log the attempt in a file and save it on the disk. So we can trace all failures from banks with this file
- I must use a queue system like rabbitMQ to run the synchronizations
- The user should be able to see his all fetched transactions paginated

## Tools

- Nodejs
- Express
- TypeScript
- MongoDB and Mongoose as ODM
- RabbitMQ as message queue system

## Structure

- ### Bank API Mock:

  - Mock api interface for users to enable any other service to fetch transactions.

- ### Server:

  - Restful api interface for end-users to authenticate, add banks accounts (one for each bank) and get latest transactions based on their interval

  - run scheduled cron job to scan the accounts that the system should fetch their related transactions based on the interval set by the user and publish them to rabbitMQ queue

  - It also provides restful api interface for workers to store the transactions fetched in the background and store the tasks of synchronization status.

  - ### API End Points

  USER:

  - register : To register new user
  - login : To login user
  - set account: To connect account to the user as each user has one bank account connected i empbeded the account schema to user

  TRANSACTION:

  - get transactions: To fetch all transactions paginated to user
  - save transaction : That will call from the worker to save the transaction to DB

  SYNCHRONIZATION:

  - get synchronizzation: To fetch all synchronizations
  - save synchronization: That will call from the worker to save the synchronization to DB

- ### Worker:

  - It is more than one instance that listen to task queue waiting for the accounts to fetch their related transactions from the bank API.

## How To Run

Change directory to the project's root (where `docker-compose.yml` is ) and run the following command

$ docker-compose up --scale worker=5

- the option `scale` refer to the number of instances that will be run of certain service

- Server will run by default on port `3000`, and is accessible from `http://localhost:3000`
- Bank API Mock will run by default on port `4000`, and is accessible from `http://localhost:4000`

## API Documentation

- find the attached accountable.postman_collection.json file from the project's root directory
