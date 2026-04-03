const UserService = require("../services/userService");
class UserController {
  getAllUser = async (req, res) => {
    try {
      const data = await UserService.getAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  };
  login = async(req , res)=>{
    try {
        const {name , password} = req.body
        const result = await UserService.userLogin({name ,password})
        res.json(result)
    } catch (error) {
      res.status(500).json({ error: error.message });
        
    }
  }
}

module.exports = new UserController()
