import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enHeader from "../locales/en/header.json";
import viHeader from "../locales/vi/header.json";
import enSearch from "../locales/en/search.json";
import viSearch from "../locales/vi/search.json";
import enCart from "../locales/en/cart.json";
import viCart from "../locales/vi/cart.json";
import enFooter from "../locales/en/footer.json";
import viFooter from "../locales/vi/footer.json";
import enDetail from "../locales/en/detail.json";
import viDetail from "../locales/vi/detail.json";
import enAuth from "../locales/en/auth.json";
import viAuth from "../locales/vi/auth.json";
import enProduct from "../locales/en/product.json";
import viProduct from "../locales/vi/product.json";
export const resources = {
  en: {
    header: enHeader,
    search: enSearch,
    cart : enCart,
    footer : enFooter,
    detail : enDetail,
    auth : enAuth,
    product : enProduct
  },
    vi: {
    header: viHeader,
    search: viSearch,
    cart : viCart,
    footer : viFooter,
    detail : viDetail,
    auth : viAuth,
    product : viProduct
  }
};
localStorage.setItem("i18nextLng", "vi");
const i18nextlng = localStorage.getItem("i18nextLng")
export const defaultNS = "header";
i18n.use(initReactI18next).init({
  resources,
  lng: i18nextlng|| "vi",
  ns: ["header", "search" ,"cart", "footer", "detail", "auth", "product"],
  defaultNS ,
  fallbackLng: i18nextlng|| "vi",
    interpolation: {
    escapeValue: false,
    }
});

export default i18n;
