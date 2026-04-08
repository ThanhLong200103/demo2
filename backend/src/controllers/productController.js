const ProductService = require("../services/productService")

class ProductController {
    getAllProduct = async (req , res)=>{
        try{
            const data = await ProductService.getAllProduct()
        res.json(data)
        }catch (err)
        {
      res.status(500).json({ error: err.message });

        }
    } 
    getProduct = async (req , res) =>{
        try{
            const {id} = req.params
            // console.log(id)
        const data = await ProductService.getProduct(id)
        res.json(data)

        }catch(err){
      res.status(500).json({ error: err.message });

        }
    }
    deleteProduct  = async (req,res) =>{
        try {
             const {id} = req.params
        const data = await ProductService.deleteProduct(id)
        res.json(data)

        } catch (error) {
      res.status(500).json({ error: err.message });
            
        }
    }
    editProduct = async (req, res) =>{
        try {
             const {id} = req.params
             const {name, price, img, quantity} = req.body
        const data = await ProductService.editProduct({name, price, img, quantity ,id})
        res.json(data)
        } catch (error) {
      res.status(500).json({ error: err.message });
            
        }
    }
    createProduct = async(req,res)=>{
        try {
        
             const {name, price, img, quantity} = req.body
        const data = await ProductService.createProduct({name, price, img, quantity})
        res.json(data)
        } catch (error) {
      res.status(500).json({ error: err.message });
            
        }
    }
} 
module.exports = new ProductController();