require("dotenv").config();
const initDB = require("./src/config/innitDB.js");
const port = process.env.PORT;
const express = require("express");
const cors = require("cors");
const initPaymentRoutes = require("./src/routers/routerPayment.js");
const initUserRoutes = require("./src/routers/routerUser.js");
const initProductRoutes = require("./src/routers/routerProduct.js");
const initOrderRoutes = require("./src/routers/routerOrder.js");
const app = express();
const websocket = require("./src/socket/index.js");
const corsReact = require("./src/config/cors");
const cookieParser = require("cookie-parser");
const initRouterError = require("./src/routers/routerErorr.js");
const initCategoryRoutes = require("./src/routers/category.js");
const startRedis = require("./src/config/redis.js");
const { initI18n } = require("./src/i18n/i18n.js");
const middleware = require("i18next-http-middleware");
const initAdminRoutes = require("./src/routers/admin.js");
const connectMongo = require("./src/config/mongoDB.js");
const {startRabbitMQ}  = require("./src/rabbitMq/index.js");
const { ProducerRabbitMQ } = require("./src/rabbitMq/producer.js");
const { ConSumerRabbitMQ } = require("./src/rabbitMq/consumer.js");
const startConsumers = require("./src/rabbitMq/startConsumer.js");
const { connectProducerKafka } = require("./src/kafka/index.js");
const ProducerKafka = require("./src/kafka/producer.js");
const StartConsumerKafka = require("./src/kafka/consumer.js");



app.use(cors(corsReact));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

(async () => {
  const i18next = await initI18n();

  // console.log("Dữ liệu i18next nhận được là:", i18next);
  app.use(middleware.handle(i18next));
  const server = websocket(app);
  initAdminRoutes(app);
  initCategoryRoutes(app);
  initPaymentRoutes(app);
  initUserRoutes(app);
  initProductRoutes(app);
  initOrderRoutes(app);
  initRouterError(app);

  await initDB();
  await connectMongo();
  await startRedis.connect();

  //kafka
  await connectProducerKafka();
  //rabit
  await startRabbitMQ();
  // TEST RabbitMQ
  // await ProducerRabbitMQ();
  // await ConSumerRabbitMQ();
  await startConsumers()

  //Test Kafka 
  // await ProducerKafka()
  // await StartConsumerKafka(1)
  //  await StartConsumerKafka(2)

  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})();
