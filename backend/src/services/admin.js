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
    getAllOrderAdmin = async(page , pageSize)=>{
        const data = await orderModel.getAllOrderAdmin(page , pageSize)
        return data
    }
    getAllOrderAdmins = async()=>{
        const data = await orderModel.getAllOrderAdmins()
        return data
    }
    getAllProductAdmin = async(page,
  pageSize)=>{
        const data = await ProductModel.getAllProductAdmin(page,
  pageSize)
        return data
    }
    getAllCustomers = async(page,
  pageSize)=>{
        const data = await User.getAllCustomers(page,
  pageSize)
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