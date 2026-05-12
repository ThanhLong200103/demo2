import { Button, Container, Grid } from "@mui/material";


export default function DashboardPage() {
    return(
        <>
        <Container>
            <Grid container className="d-flex justify-content-between">
                <Grid size={3}   >
                <Button>
                    <div>
                    <p className="fw-light">Tổng doanh thu</p>
                    <div className="d-flex justify-content-center gap-2">
                        <h5>0</h5> 
                        <p>Thống kê</p>
                    </div>
                    <p>You made an extra {} this year</p>
                    </div></Button>
                </Grid >
                <Grid size={3} >
                <Button>Tổng đơn hàng</Button>
                </Grid>
                <Grid  size ={3} >
                <Button>Tổng khách hàng</Button>
                </Grid>
                <Grid size={3} >
                <Button>Đơn hàng chờ xủ lý</Button>
                </Grid>
            </Grid>
        </Container>
        </>
    )
};
