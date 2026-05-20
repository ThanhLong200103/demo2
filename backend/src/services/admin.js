const orderModel = require("../models/orderModel");
const paymentModel = require("../models/paymentModel");
const ProductModel = require("../models/ProductModel");
const User = require("../models/UserModel");

class AdminService {
    getAllPays = async ()=>{
        const data = await paymentModel.getAllPays();
        //  console.log(data)
        return data
    }
    getAllOrderAdmin = async()=>{
        const data = await orderModel.getAllOrderAdmin()
        return data
    }
    getAllProductAdmin = async()=>{
        const data = await ProductModel.getAllProductAdmin()
        return data
    }
    getAllCustomers = async()=>{
        const data = await User.getAllCustomers()
        return data
    }
    createCustomers = async (data)=>{
        const res = await User.createCustomer(data)
        return res
    }
    getOneCustomer = async (id)=>{
        const res = await User.getOneCustomer(id)
        return res
    }
    editCustomer = async(data)=>{
         const res = await User.editCustomer(data)
        return res
    }
    deteleCustomer = async(id)=>{
        const res = await User.deteleCustomer(id)
        return res
    }

    getOneUser = async(id)=>{
        const res = await User.getOneUser(id)
        return res
    }
    updateUser = async(data)=>{
        const res = await User.updateUser(data)
        return res
    }
    deleteUser = async(id)=>{
        const res = await User.deleteUser(id)
        return res
    }
}

module.exports=new AdminService()