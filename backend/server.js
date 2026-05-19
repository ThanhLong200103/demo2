
require('dotenv').config();
const initDB = require("./src/config/innitDB.js")
const port = process.env.PORT
const express = require("express");
const cors = require("cors");
const initPaymentRoutes = require("./src/routers/routerPayment.js");
const initUserRoutes = require("./src/routers/routerUser.js");
const initProductRoutes = require("./src/routers/routerProduct.js");
const initOrderRoutes = require("./src/routers/routerOrder.js");
const app = express();
const corsReact = require("./src/config/cors")
const cookieParser = require('cookie-parser');
const initRouterError = require('./src/routers/routerErorr.js');
const initCategoryRoutes = require('./src/routers/category.js');

const startRedis = require("./src/config/redis.js")
const { initI18n } = require("./src/i18n/i18n.js");
const middleware = require("i18next-http-middleware");
const initAdminRoutes = require('./src/routers/admin.js');

app.use(cors(corsReact));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

(async () => {
    const i18next = await initI18n();
    // console.log("Dữ liệu i18next nhận được là:", i18next);
    app.use(middleware.handle(i18next));
    initAdminRoutes(app)
    initCategoryRoutes(app);
    initPaymentRoutes(app);
    initUserRoutes(app);
    initProductRoutes(app);
    initOrderRoutes(app);
    initRouterError(app);

    await initDB();
    
     await startRedis.connect();
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
})();
