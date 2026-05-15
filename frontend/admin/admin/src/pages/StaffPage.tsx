import { Container, Typography } from "@mui/material";
import { useState } from "react";
import DataGird from "../components/tableGird";
import { ColumTableStaff, ColumTableStaffActivity } from "../components/staff/tableStaff/columnStaff";
import { employees, productEmployees } from "../components/staff/tableStaff/rows";
import { HandleLogic } from "../components/hanlde/hanlde";
import { SearchLogic } from "../components/hanlde/search";
export default function StaffPage() {
  const handleEdit = (id: string) => {
    return console.log("id", id);
  };
  const handleDelete = (id: string) => {
    return console.log("id", id);
  };
  const [valueSearch, setValueSearch] = useState(String);
  
  const handleAdd = ()=>{
    console.log(valueSearch)
  }
  const handleImport = ()=>{
    console.log(valueSearch)

  }
  const handleExport = ()=>{
    console.log(valueSearch)

  }
  return (
    <>
      <HandleLogic title="Staff" checkAdd={true} handleAdd={handleAdd} handleImport={handleImport} handleExport={handleExport} ></HandleLogic>
      <SearchLogic valueSearch={valueSearch} placeholder="Search Staff" setValueSearch={setValueSearch} ></SearchLogic>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "90%",
          marginTop: "36px",
        }}
      >
        <DataGird
          rows={employees}
          checkbox={true}
          columns={ColumTableStaff({ handleEdit, handleDelete })}
        ></DataGird>
      </Container>
      <Container
      sx={{
         
          width: "90%",
          marginTop: "36px",
        }}>
          <Typography variant="h5" sx={{padding:"18px"}}>Lịch sử hoạt động</Typography>
        <DataGird
          rows={productEmployees}
          checkbox={false}
          columns={ColumTableStaffActivity()}
        ></DataGird>
      </Container>
    </>
  );
}
