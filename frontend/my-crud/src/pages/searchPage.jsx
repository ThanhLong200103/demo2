import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { RepositoryFactory } from "../services/FactoryService";
import ProductComponent from "../components/ProductComponent";

export default function SearchPage() {
    const {name} = useParams();
    const [product , setProduct] = useState([])
    // console.log("name",name)
    useEffect(
        ()=>{
            const getProduct = async ()=>{
                const data = await RepositoryFactory.get("product").searchProduct(name)
                console.log(data);
                setProduct(data)
            }
            getProduct()
        },[name]
    )

    return(
        <>
        <div>
        <ProductComponent products={product}></ProductComponent>
        </div>
        </>
    )
};
