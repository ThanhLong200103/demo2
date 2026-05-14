import { Container, Grid2 } from "@mui/material";
import ButtonDasdboard from "../components/dashboard/ButtonDashBoard";
import ChatAndAnalytics from "../components/dashboard/chatAndAnalytics";
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import RerentActivityDashBoard from "../components/dashboard/RerentActivity/RerentActivityDashBoard";
export default function DashboardPage() {
  const data = [
    { id: 0, value: 10, label: "Status A" },
    { id: 1, value: 15, label: "Status B" },
    { id: 2, value: 20, label: "Status C" },
    { id: 3, value: 20, label: "Status D" },

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
  return (
    <>
      <Container>
        <Grid2 container>
          <ButtonDasdboard
            text="You made an extra {1} this year"
            title="Tổng doanh thu"
            total={1}
            icon={<PaidRoundedIcon></PaidRoundedIcon>}
          ></ButtonDasdboard>
          <ButtonDasdboard
            text="You made an extra {1} this year"
            title="Tổng đơn hàng"
            total={2}
          ></ButtonDasdboard>
          <ButtonDasdboard
            text="You made an extra {1} this year"
            title="Tổng khách hàng"
            total={3}
          ></ButtonDasdboard>
          <ButtonDasdboard
            text="You made an extra {1} this year"
            title="Đơn Hàng chờ xử lý"
            total={4}
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
        <RerentActivityDashBoard></RerentActivityDashBoard>
      </Container>
    </>
  );
}
