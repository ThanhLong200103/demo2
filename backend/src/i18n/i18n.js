// i18next v26+ is ESM-only, so we use dynamic import()
let i18next;

async function initI18n() {
  const i18nextModule = await import("i18next");
  const BackendModule = await import("i18next-fs-backend");
  const MiddlewareModule = await import("i18next-http-middleware");

  i18next = i18nextModule.default;
  const Backend = BackendModule.default;
  const middleware = MiddlewareModule.default;

  await i18next
    .use(Backend)
    .use(middleware.LanguageDetector)
    .init({
      fallbackLng: "vi",
      preload: ["en", "vi"],
      ns: ["notification", "auth"],
      backend: {
        loadPath: "./src/locale/{{lng}}/{{ns}}.json"
      },
      detection: {
        order: ["header"],
        lookupHeader: "accept-language"
      }
    });

  return i18next;
}

module.exports = { initI18n };
