import { Container, Typography } from "@mui/material";
import DataGird from "../components/tableGird";
import { ColumTable } from "../components/user/columns";
import { useEffect, useState } from "react";
import { HandleLogic } from "../components/hanlde/hanlde";
import { SearchLogic } from "../components/hanlde/search";
import { deleteUser, getAllUser } from "../components/user/data";
import type { UserType } from "../types/user";
import BasicModal from "../components/modal";
import FormUserEdit from "../components/user/FromEdit";
import FormUserCreate from "../components/user/FromCreate";
import UserDelete from "../components/user/DiaLogDelete";

export default function UserPage() {
  const [user, setUser] = useState<UserType[]>([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [id, setId] = useState<string>();
  const handleEdit = (id: string) => {
    setShowEdit(true);
    setId(id);
  };
  const handleClose = () => {
    setShowEdit(false);
    setShowAdd(false)
  };
  const handleDelete =  (id: string) => {
    setShowDelete(true)
    setId(id)
  };
  const [valueSearch, setValueSearch] = useState(String);

  const handleAdd = () => {
    setShowAdd(true)
  };
  const handleImport = () => {
    console.log(valueSearch);
  };
  const handleExport = () => {
    console.log(valueSearch);
  };

  useEffect(() => {
    const effectData = async () => {
      const data = await getAllUser();
      setUser(data);
    };
    effectData();
  }, []);
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
            <FormUserCreate
             
              handleClose={handleClose}
            ></FormUserCreate>
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
        <UserDelete open={showDelete} setOpen={setShowDelete} id={id??""}></UserDelete>
      </Container>
    </>
  );
}
