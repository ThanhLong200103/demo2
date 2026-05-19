import { Container, Grid2 } from "@mui/material";
import ButtonDasdboard from "../components/dashboard/ButtonDashBoard";
import ChatAndAnalytics from "../components/dashboard/chatAndAnalytics";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import RerentActivityDashBoard from "../components/dashboard/RerentActivity/RerentActivityDashBoard";
import { useEffect, useState } from "react";
import { Order, Product, Revenue, User } from "../components/dashboard/data";
import type { OrderType } from "../types/order";
import type { UserType } from "../types/user";

export default function DashboardPage() {
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [order, setOrder] = useState<Array<OrderType>>();
  const [users, setUsers] = useState<Array<UserType>>();
  const [orderPending, setOrderPending] = useState<Array<OrderType>>([]);
  const [orderCancel, setOrderCancel] = useState<Array<OrderType>>([]);

  const [orderCompelete, setOrderCompelete] = useState<Array<OrderType>>([]);

  const [orderTimes, setOrdertimes] = useState<Array<OrderType>>([]);

  const data = [
    { id: 0, value: orderCompelete.length, label: "Completed" },
    { id: 1, value: orderCancel.length, label: "Cancelled" },
    { id: 2, value: orderPending.length, label: "Pending" },
  ];
  const chartData = [
    { label: "T1", value: 2400 },
    { label: "T2", value: 1398 },
    { label: "T3", value: -9800 },
    { label: "T4", value: 3908 },
    { label: "T5", value: 4800 },
    { label: "T6", value: -3800 },
    { label: "T7", value: 4300 },
    { label: "T8", value: 5200 },
    { label: "T9", value: 5200 },
    { label: "T10", value: 5200 },
    { label: "T11", value: 5200 },
    { label: "T12", value: 5200 },
  ];

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const result = await Revenue();
        setTotalRevenue(result.amount);
        const order = await Order();
        setOrder(order);
        const users = await User();
        setUsers(users);
        console.log(users)

        const pendingOrders = order.filter(
          (o: OrderType) => o.status === "pending",
        );
        const cancelOrders = order.filter(
          (o: OrderType) => o.status === "cancelled",
        );
        const compeleteOrders = order.filter(
          (o: OrderType) => o.status === "completed",
        );

        setOrderPending(pendingOrders);
        setOrderCancel(cancelOrders);
        setOrderCompelete(compeleteOrders);

        const ordertime = order.sort(
          (a, b) =>
           ( new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
        );

        let arrayOrderNew = []
        for (let index = 0; index < 9; index++) {
          arrayOrderNew.push(ordertime[index])
        }
        setOrdertimes(arrayOrderNew)
        const products = await Product();
        console.log(order);
        console.log("Danh sách data:", result.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchRevenue();
  }, []);
  return (
    <>
      <Container>
        <Grid2 container>
          <ButtonDasdboard
            text="You made an extra {1} this year"
            title="Tổng doanh thu"
            total={totalRevenue.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
            icon={<PaidRoundedIcon></PaidRoundedIcon>}
          ></ButtonDasdboard>
          <ButtonDasdboard
            text="You made an extra {1} this year"
            title="Tổng đơn hàng"
            total={order?.length?.toString() || "0"}
          ></ButtonDasdboard>
          <ButtonDasdboard
            text="You made an extra {1} this year"
            title="Tổng khách hàng"
            total={users?.length?.toString() || "0"}
          ></ButtonDasdboard>
          <ButtonDasdboard
            text="You made an extra {1} this year"
            title="Đơn Hàng chờ xử lý"
            total={orderPending?.length?.toString() || "0"}
          ></ButtonDasdboard>
        </Grid2>
      </Container>
      <Container
        sx={{
          maxWidth: "100vh",
        }}
      >
        <ChatAndAnalytics data={data} chartData={chartData}></ChatAndAnalytics>
      </Container>
      <Container>
        <RerentActivityDashBoard rows={orderTimes}></RerentActivityDashBoard>
      </Container>
    </>
  );
}
