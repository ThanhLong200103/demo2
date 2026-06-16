import { useLocation } from "react-router-dom";

export default function BuyNowPage(params) {
    const location = useLocation()
    console.log(location)
    const{totalPrice ,productId ,quantityHandle ,priceProduct ,attributeId} = location.state || null;
    return(
        <>
       <div>
         {productId}
       </div>
        </>
    )
};
