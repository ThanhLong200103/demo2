const { run } = require("node:test");
const AddressUserService = require("../services/addressUser")
const cachAsync = require("../utils/cachAsync");
const runInTransaction = require("../utils/runTransaction");

class AddressUserController {
    createAddressUser = cachAsync(
        async (req , res) =>{
            const {home_number , district , province ,is_default} = req.body;
            const userId = req.user.id;
            // console.log("userId:", req.user.id);
            const data = await runInTransaction(async (conn) => {
                return await AddressUserService.createAddressUser({userId, home_number , 	district , province ,is_default} ,conn);
            })
            res.json(data)
        }
    )
    editAddressUser = cachAsync(
        async (req , res) =>{
            const {home_number ,district , province ,is_default , id} = req.body;
            const userId = req.user.id;
            const data = await runInTransaction(async (conn) => {
                return await AddressUserService.editAddressUser({id ,userId, home_number , 	district , province ,is_default} ,conn);
            })
            res.json(data)
        }
    )

    getAllAddressUser = cachAsync(
        async (req , res) =>{
            const userId = req.user.id;
            const data = await AddressUserService.getAllAddressUser(userId);
            res.json(data)
        }
    )
    getOneAddressUser = cachAsync(
        async (req , res) =>{
            const {id} = req.params;  
            const userId = req.user.id;
            const data = await AddressUserService.getOneAddressUser(userId, id);
            res.json(data)
        }
    )
        deleteAddressUser = cachAsync(
        async (req , res) =>{
                const {id} = req.params;
                const useId = req.user.id;
                const data = await runInTransaction(async(conn)=>{
                    return  await AddressUserService.deleteAddressUser(id ,useId ,conn)
                });
                res.json(data)
        }
        )

}
module.exports = new AddressUserController()