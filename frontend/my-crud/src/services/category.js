import BaseService from "./BaseService";
export default class CategoryService extends BaseService {
    getCategory = async ()=>{
        return await this.http.get("/categorys")
    }
};
