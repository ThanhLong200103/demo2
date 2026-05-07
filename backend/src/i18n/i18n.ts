const i18next = require("i18next");
const Backend = require( "i18next-fs-backend");
const i18nextMiddleware = require ("i18next-http-middleware");




// console.log("Check i18next:", i18next);
// console.log("Check Backend:", Backend);
// console.log("Check Middleware:", i18nextMiddleware);
i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: "vi",
    preload: ["en", "vi"],
    ns: ["Notification"],
   backend: {
      loadPath: "./src/locale/{{lng}}/{{ns}}.json"
    },
    detection: {
      order: ["header"],
      lookupHeader: "accept-language"
    }
  });

module.exports = i18next;