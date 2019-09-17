# Ordor

Ordor is a web application mainly made with Vue.js and Java  
with the goal to make customers order their things by scanning a QR-code.

## Detailed explanation

Ordor is a web application that aims to support the workflow of a venue by providing a service  
that a customer of the regarding venue can scan a QR-code in the venue and by this order her/his wishes  
without the need of a waitress/waiter being present during this process.

The order will be submitted to the Ordor instance of the venue and can be processed from there by the venue.

Before the order gets accepted, the customer can choose for a payment method.  
If the customer chooses to pay with a payment card or any other non-cash way,  
the customer can pay her/his bill for that order upfront.

## Getting started

### Requirements

To run the whole application you'll need to run these repositories too:

- [Ordor API](https://github.com/Laerolf/order-api)
- [Ordor Websocket](https://github.com/Laerolf/ordor-websocket)

The project also needs a database:

- [MongoDB](https://www.mongodb.com/download-center/community)

### Initial setup
This repository is the frontend-application of Ordor.

Run it by following these steps:

1. Install [MongoDB](https://www.mongodb.com/download-center/community)

2. Start the database:

```
mongod --port 27017 --dbpath "C:\Program Files\MongoDB\Server\4.0\data\ordorSet" --replSet ordorSet
```

3. Install the requirements and fire up the application for the first time:
```
yarn
yarn serve
```

### General startup

1. Start the database:

```
mongod --port 27017 --dbpath "C:\Program Files\MongoDB\Server\4.0\data\ordorSet" --replSet ordorSet
```

2. Start the application:

```
yarn serve
```

## License

This repository has [no license](https://choosealicense.com/no-permission/) for a reason.

