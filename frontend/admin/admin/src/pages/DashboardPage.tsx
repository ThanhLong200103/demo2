import { Container, Grid } from "@mui/material";
import ButtonDasdboard from "../components/Dashboard/ButtonDashBoard";


export default function DashboardPage() {
    return(
        <>
        <Container>
            <Grid container>
                <ButtonDasdboard text="You made an extra {} this year" title="Tổng doanh thu" total={0}></ButtonDasdboard>
             <ButtonDasdboard text="You made an extra {} this year" title="Tổng đơn hàng" total={0}></ButtonDasdboard>
                <ButtonDasdboard text="You made an extra {} this year" title="Tổng khách hàng" total={0}></ButtonDasdboard>
                <ButtonDasdboard text="You made an extra {} this year" title="Đơn Hàng chờ xử lý" total={0}></ButtonDasdboard>
            </Grid>
        </Container>
        </>
    )
};
