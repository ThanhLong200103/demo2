import { Container, Grid2, Typography } from "@mui/material";
import { useState } from "react";
import DataGird from "../components/tableGird";
import { ColumTableOrder } from "../components/order/columns";
import { analyticsOrder, rowsTableOrder } from "../components/order/data";
import AnalyticsOrder from "../components/order/Analytics";
import { HandleLogic } from "../components/hanlde/hanlde";
import { SearchLogic } from "../components/hanlde/search";

export default function () {
  const [valueSearch, setValueSearch] = useState(String);
  const handleEdit = (id: string) => {
    return console.log("id", id);
  };
  const handleDelete = (id: string) => {
    return console.log("id", id);
  };
  const handleCancel = (id: string) => {
    return console.log("id", id);
  };
  const handleRefund = (id: string) => {
    return console.log("id", id);
  };
  const handleComplete = (id: string) => {
    return console.log("id", id);
  };
  const handleAdd = () => {
    console.log(valueSearch);
  };
  const handleImport = () => {
    console.log(valueSearch);
  };
  const handleExport = () => {
    console.log(valueSearch);
  };
  return (
    <>
      <HandleLogic
      title="Đơn hàng"
        checkAdd={false}
        handleAdd={handleAdd}
        handleImport={handleImport}
        handleExport={handleExport}
      ></HandleLogic>
      <SearchLogic
        valueSearch={valueSearch}
        placeholder="Search Order"
        setValueSearch={setValueSearch}
      ></SearchLogic>
      <Container
        sx={{
          width: "100%",
          marginTop: "36px",
        }}
      >
        <Grid2
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1",
          }}
        >
          <Grid2
            size={{ lg: 4, md: 12 }}
            sx={{
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              backgroundColor: "rgba(243, 245, 247, 0.08)",
            }}
          >
            <AnalyticsOrder data={analyticsOrder}></AnalyticsOrder>
          </Grid2>
          <Grid2
            size={{ lg: 7, md: 12 }}
            sx={{
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              backgroundColor: "rgba(243, 245, 247, 0.08)",
            }}
          >
            <Typography variant="h5" sx={{ padding: "8px" }}>
              Tổng số đơn
            </Typography>
            <DataGird
              rows={rowsTableOrder}
              checkbox={true}
              columns={ColumTableOrder({
                handleEdit,
                handleDelete,
                handleCancel,
                handleRefund,
                handleComplete,
              })}
            ></DataGird>
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}
