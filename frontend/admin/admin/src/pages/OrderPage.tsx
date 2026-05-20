import {
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid2,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import DataGird from "../components/tableGird";
import { ColumTableOrder } from "../components/order/columns";
import {
  getAllOrder,
  getAllOrderStatus,
  updateStatusOrder,
} from "../components/order/data";
import AnalyticsOrder from "../components/order/Analytics";
import { HandleLogic } from "../components/hanlde/hanlde";
import { SearchLogic } from "../components/hanlde/search";
import type { ListStatus, OrderStatusUpdate, OrderType } from "../types/order";
import BasicModal from "../components/modal";
import FormEditOrder from "../components/order/formEdit";

export default function () {
  const [valueSearch, setValueSearch] = useState<string>("");
  const [statusOrder, setStatusOrder] = useState<ListStatus>([]);
  const [dataOrder, setDataOrder] = useState<OrderType[]>([]);
  const [analytics, setAnalytics] = useState([
    { id: 0, value: 0, label: "" },
    { id: 1, value: 0, label: "" },
    { id: 2, value: 0, label: "" },
  ]);
  const [updateStatus, setUpdateStatus] = useState<OrderStatusUpdate>();
  const [showEdit, setShowEdit] = useState(false);
  const [id, setId] = useState<string>();
  const handleEdit = (id: string) => {
    setShowEdit(true);
    setId(id);
  };
  const handleClose = () => {
    setShowEdit(false);
  };
  const handleDelete = (id: string) => {
    return console.log("id", id);
  };
  const handleCancel = async (id: string) => {
    try {
      setUpdateStatus({
        status: "cancelled",
        id: id,
      });
      if (!updateStatus) return;
      await updateStatusOrder(updateStatus);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRefund = async (id: string) => {
    try {
      setUpdateStatus({
        status: "returned",
        id: id,
      });
      if (!updateStatus) return;
      await updateStatusOrder(updateStatus);
    } catch (error) {
      console.log(error);
    }
  };
  const handleComplete = async (id: string) => {
    try {
      setUpdateStatus({
        status: "completed",
        id: id,
      });
      if (!updateStatus) return;
      await updateStatusOrder(updateStatus);
    } catch (error) {
      console.log(error);
    }
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
  const handleStatusChange = (status: string) => {
    setStatusOrder((prev) => {
      if (prev.includes(status)) {
        return prev.filter((s) => s !== status);
      }

      return [...prev, status];
    });
  };
  useEffect(() => {
    const effectData = async () => {
      try {
        if (statusOrder.length === 0) {
          const dataOrder = await getAllOrder();
          console.log(dataOrder);
          console.log(statusOrder);
          setDataOrder(dataOrder);
        } else {
          const dataOrder = await getAllOrderStatus(statusOrder);
          console.log(dataOrder);
          console.log(statusOrder);
          setDataOrder(dataOrder);
        }
      } catch (error) {
        console.log(error);
      }
    };
    effectData();
  }, [statusOrder]);

  useEffect(() => {
    try {
      const effectData = async () => {
        const dataOrder = await getAllOrder();
        const today = new Date();
        const result = dataOrder.filter((item) => {
          const date = new Date(item.created_at);

          return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
          );
        });
        console.log("Ngày:", result);

        const resultMonth = dataOrder.filter((item) => {
          const date = new Date(item.created_at);

          return (
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
          );
        });
        console.log("Tháng:", resultMonth);

        const toatlOrderPending = dataOrder.filter((item) => {
          return item.status == "pending";
        });
        console.log(toatlOrderPending);
        setAnalytics([
          {
            id: 0,
            value: result.length,
            label: "Tổng đơn hàng hôm nay",
          },
          {
            id: 1,
            value: resultMonth.length,
            label: "Tổng đơn tháng",
          },
          {
            id: 2,
            value: toatlOrderPending.length,
            label: "Đơn hàng chưa xử lý",
          },
        ]);
      };
      effectData();
    } catch (error) {
      console.log(error);
    }
  }, []);
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
            <AnalyticsOrder data={analytics}></AnalyticsOrder>
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
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={statusOrder.includes("pending")}
                    onChange={() => handleStatusChange("pending")}
                  />
                }
                label="pending"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={statusOrder.includes("completed")}
                    onChange={() => handleStatusChange("completed")}
                  />
                }
                label="completed"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={statusOrder.includes("cancelled")}
                    onChange={() => handleStatusChange("cancelled")}
                  />
                }
                label="cancelled"
              />
            </FormGroup>
            <DataGird
              rows={dataOrder}
              checkbox={true}
              columns={ColumTableOrder({
                handleEdit,
                handleDelete,
                handleCancel,
                handleRefund,
                handleComplete,
              })}
            ></DataGird>
            <BasicModal open={showEdit} handleClose={handleClose}>
              <Typography variant="h5">
                Chỉnh sửa giá tiền
                <FormEditOrder
                  id={id ?? ""}
                  handleClose={handleClose}
                ></FormEditOrder>
              </Typography>
            </BasicModal>
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}
