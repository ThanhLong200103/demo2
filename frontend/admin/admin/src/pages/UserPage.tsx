import { Container, Typography } from "@mui/material";
import DataGird from "../components/tableGird";
import { ColumTable } from "../components/User/columns";
import { useEffect, useState } from "react";
import { HandleLogic } from "../components/hanlde/hanlde";
import { SearchLogic } from "../components/hanlde/search";
import { getAllUserPages } from "../components/User/data";
import type { UserType } from "../types/user";
import BasicModal from "../components/modal";
import FormUserEdit from "../components/User/FromEdit";
import FormUserCreate from "../components/User/FromCreate";
import UserDelete from "../components/User/DiaLogDelete";

export default function UserPage() {
  const [user, setUser] = useState<UserType[]>([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [id, setId] = useState<string>();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const handleEdit = (id: string) => {
    setShowEdit(true);
    setId(id);
  };
  const handleClose = () => {
    setShowEdit(false);
    setShowAdd(false);
  };
  const handleDelete = (id: string) => {
    setShowDelete(true);
    setId(id);
  };
  const [valueSearch, setValueSearch] = useState(String);

  const handleAdd = () => {
    setShowAdd(true);
  };
  const handleImport = () => {
    console.log(valueSearch);
  };
  const handleExport = () => {
    console.log(valueSearch);
  };

  useEffect(() => {
    const effectData = async () => {
      try {
        setLoading(true);
        const data = await getAllUserPages(
          paginationModel.page + 1,
          paginationModel.pageSize,
        );
        setUser(data.data);
        setRowCount(data.total);
      } catch (error) {
        console.log(false);
      } finally {
        setLoading(false);
      }
    };
    effectData();
  }, [paginationModel]);
  return (
    <>
      <HandleLogic
        checkAdd={true}
        handleAdd={handleAdd}
        handleImport={handleImport}
        handleExport={handleExport}
        title="Customers"
      ></HandleLogic>
      <BasicModal open={showAdd} handleClose={handleClose}>
        <Typography variant="h5">
          Thêm người dùng
          <FormUserCreate handleClose={handleClose}></FormUserCreate>
        </Typography>
      </BasicModal>
      <SearchLogic
        valueSearch={valueSearch}
        placeholder="Search Customers"
        setValueSearch={setValueSearch}
      ></SearchLogic>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "90%",
          marginTop: "36px",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: "16px" }}>
          Tổng số lượng khách hàng
        </Typography>
        <DataGird
          rows={user}
          checkbox={true}
          columns={ColumTable({ handleEdit, handleDelete })}
          loading={loading}
          rowCount={rowCount}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        ></DataGird>
        <BasicModal open={showEdit} handleClose={handleClose}>
          <Typography variant="h5">
            Chỉnh sửa người dùng
            <FormUserEdit
              id={id ?? ""}
              handleClose={handleClose}
            ></FormUserEdit>
          </Typography>
        </BasicModal>
        <UserDelete
          open={showDelete}
          setOpen={setShowDelete}
          id={id ?? ""}
        ></UserDelete>
      </Container>
    </>
  );
}
