import { Container, Typography } from "@mui/material";
import DataGird from "../components/tableGird";
import { ColumTable } from "../components/user/columns";
import { useState } from "react";
import { HandleLogic } from "../components/hanlde/hanlde";
import { SearchLogic } from "../components/hanlde/search";
import { dataUser } from "../components/user/data";

export default function UserPage() {
  const handleEdit = (id: string) => {
    return console.log("id", id);
  };
  const handleDelete = (id: string) => {
    return console.log("id", id);
  };
  const [valueSearch, setValueSearch] = useState(String);

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
        checkAdd={true}
        handleAdd={handleAdd}
        handleImport={handleImport}
        handleExport={handleExport}
        title="Customers"
      ></HandleLogic>
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
          Lịch sử hoạt động
        </Typography>
        <DataGird
          rows={dataUser}
          checkbox={true}
          columns={ColumTable({ handleEdit, handleDelete })}
        ></DataGird>
      </Container>
    </>
  );
}
