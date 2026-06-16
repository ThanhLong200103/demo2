import BaseService from "./BaseService";
export default class AddressUserService extends BaseService{
    async getAllAddressUser(){
        return await this.http.get("getAllAddress")
    }
    async deleteAddressUser(id){
        return await this.http.put(`DeleteAddress/${id}`)
    }
    async createAddressUser(data){
        return await this.http.post("Createaddress",data)
    }
    async editAddressUser(data){
        return await this.http.put("Editaddress",data)
    }

}
