import { RiAedElectrodesFill } from "react-icons/ri";
import BaseService from "./BaseService";
export default class CategoryService extends BaseService {
    getCategory = async ()=>{
        return await this.http.get("/categorys")
    }
    getCategoryProduct = async (idCategory)=>{
        return await this.http.get(`/categorys/${idCategory}`)
    }
};
