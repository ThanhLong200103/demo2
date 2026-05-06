import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axiosClient from "../api/axios";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { RepositoryFactory } from "../services/FactoryService";


export default function VnpayPage(params) {
    const location = useLocation();
    console.log(location.state)
    const { orderId, totalPrice } = location.state || {};
    const [link, setLink] = useState("");
    useEffect(() => {
        const redirectToVnpay = async () => {
            try {
                
                const linkPay = await RepositoryFactory.get("vnpay").createUrlPayment({
                    id: orderId,
                    total_price: totalPrice
                });
                setLink(linkPay.paymentUrl);
                console.log(linkPay.paymentUrl);
            } catch (error) {
                console.log(error);
                toast.error("Lỗi khi tạo link thanh toán VNPAY");
            }
        }
        redirectToVnpay();
    },[]);
    return(
        <div>
            <h1>Đang chuyển hướng đến cổng thanh toán VNPAY...</h1>
            <p>Tổng số tiền: {totalPrice?.toLocaleString()} đ</p>
            <Button  href={link} target="_blank" as="a" >
                Thanh Toán
            </Button>
            
        </div>
    )
};
