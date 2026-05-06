import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enHeader from "../locales/en/header.json";
import viHeader from "../locales/vi/header.json";
import enSearch from "../locales/en/search.json";
import viSearch from "../locales/vi/search.json";
import enCart from "../locales/en/cart.json";
import viCart from "../locales/vi/cart.json";
export const resources = {
  en: {
    header: enHeader,
    search: enSearch,
    cart : enCart
  },
    vi: {
    header: viHeader,
    search: viSearch,
    cart : viCart
  }
};
export const defaultNS = "header";
i18n.use(initReactI18next).init({
  resources,
  lng: "vi",
  ns: ["header", "search" ,"cart"],
  defaultNS ,
  fallbackLng: "vi",
    interpolation: {
    escapeValue: false,
    }
});

export default i18n;
