const AttributesModel = require("../models/attributes")

class AttributeService {
    getAttributes = async (productId)=>{
        const data = await AttributesModel.getAttribute(productId);
        return data
    }

    getOneAttributes = async (data) =>{
        const relust = await AttributesModel.getOneAttribute(data);
        return relust
    }

}

module.exports = new AttributeService ()