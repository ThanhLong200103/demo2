const AddressUserModel = require("../models/addressUser");
const AppError = require("../utils/AppError");

class AddressUserService {
    getAllAddressUser = async (userId)=>{
        const data = await AddressUserModel.getAllAddressUser(userId);
        const datadefault = await AddressUserModel.getAllAddressUserDefault(userId);
        return [data , datadefault];
    }
    getOneAddressUser = async (userId, id)=>{
        const data = await AddressUserModel.getOneAddressUser(userId, id);
        return data;
    }
    createAddressUser = async (data ,conn)=>{
        console.log("Data:", data);
        if(data.is_default){
            await AddressUserModel.updateDefaultAddress( data.userId, conn);
        }
       
        const create = await AddressUserModel.createAddressUser(data ,conn);
        return create;
    }
    editAddressUser = async (data ,conn)=>{
        if(data.is_default){
            await AddressUserModel.updateDefaultAddress( data.userId, conn);
        }
         else{
            const defaultAddress = await AddressUserModel.getAllAddressUserDefault(data.userId , conn);
            console.log("defaultAddress:", defaultAddress);
            if(defaultAddress.length ===1){
              throw new  AppError("Bạn phải có ít nhất một địa chỉ mặc định", 422);
            }
        }
        const edit = await AddressUserModel.editAddressUser(data, conn);
        return edit;
    }
    deleteAddressUser = async (id ,userId ,conn)=>{
        const data = await this.getOneAddressUser(userId,id)
        if(data.is_default){
            throw new AppError("Không thể xóa mặc định",422)
        }
        const res = await AddressUserModel.deleteAddressUser(id, userId ,conn);
        return res;
    }
}
    module.exports = new AddressUserService();