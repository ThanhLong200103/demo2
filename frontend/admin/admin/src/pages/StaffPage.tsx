import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DataGird from "../components/tableGird";
import {
  ColumTableStaff,
 
} from "../components/staff/tableStaff/columnStaff";

import { HandleLogic } from "../components/hanlde/hanlde";
import { SearchLogic } from "../components/hanlde/search";
import BasicModal from "../components/modal";
import type { UserType } from "../types/user";
import { GetCustomes } from "../components/staff/data";
import FormCustomers from "../components/staff/FormAdd";
import FormCustomersEdit from "../components/staff/FormEdit";
import StaffDelete from "../components/staff/DiaLogDelete";
export default function StaffPage() {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [id, setID] = useState<string>();
  const [customers, setCustomer] = useState<Array<UserType>>();
  const [openDelete, setOpenDelete] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const handleEdit = (id: string) => {
    setShowEdit((s) => !s);
    setID(id);
  };
  const handleDelete = (id: string) => {
    setOpenDelete((d) => !d);
    setID(id);
  };
  const [valueSearch, setValueSearch] = useState(String);

  const handleAdd = () => {
    setShowAdd((show) => !show);
  };
  const handleImport = () => {
    console.log(valueSearch);
  };
  const handleExport = () => {
    console.log(valueSearch);
  };
  const handelClose = () => {
    setShowAdd(false);
    setShowEdit(false);
  };
  useEffect(() => {
    const effectData = async () => {
      try {
        setLoading(true);
        const data = await GetCustomes(
          paginationModel.page + 1,
          paginationModel.pageSize,
        );
        setCustomer(data.data);
        setRowCount(data.total);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    effectData();
  }, [paginationModel]);

  return (
    <>
      <HandleLogic
        title="Staff"
        checkAdd={true}
        handleAdd={handleAdd}
        handleImport={handleImport}
        handleExport={handleExport}
      ></HandleLogic>
      <SearchLogic
        valueSearch={valueSearch}
        placeholder="Search Staff"
        setValueSearch={setValueSearch}
      ></SearchLogic>
      <BasicModal open={showAdd} handleClose={handelClose}>
        <Typography variant="h5">
          {" "}
          Thêm nhân viên
          <FormCustomers handleClose={handelClose}></FormCustomers>
        </Typography>
      </BasicModal>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "90%",
          marginTop: "36px",
        }}
      >
        <DataGird
          rows={customers}
          checkbox={true}
          columns={ColumTableStaff({ handleEdit, handleDelete })}
          loading={loading}
          rowCount={rowCount}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        ></DataGird>
        <BasicModal open={showEdit} handleClose={handelClose}>
          <Typography variant="h5">
            {" "}
            Chỉnh sửa nhân viên
            <FormCustomersEdit
              id={id ?? ""}
              handleClose={handelClose}
            ></FormCustomersEdit>
          </Typography>
        </BasicModal>
        <StaffDelete
          open={openDelete}
          setOpen={setOpenDelete}
          id={id ?? ""}
        ></StaffDelete>
      </Container>
      <Container
        sx={{
          width: "90%",
          marginTop: "36px",
        }}
      >
        <Typography variant="h5" sx={{ padding: "18px" }}>
          Lịch sử hoạt động
        </Typography>
        {/* <DataGird
          rows={productEmployees}
          checkbox={false}
          columns={ColumTableStaffActivity()}
        ></DataGird> */}
      </Container>
    </>
  );
}
