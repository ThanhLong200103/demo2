import { useState } from "react";
import { HandleLogic } from "../components/hanlde/hanlde";
import { SearchLogic } from "../components/hanlde/search";
import { Container, Grid2 } from "@mui/material";
import CheckBoxProduct from "../components/product/checkbox";
import { colorProduct, sizeProduct } from "../components/product/data";

export default function ProductPage() {
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
      title="Sản phẩm"
        checkAdd={true}
        handleAdd={handleAdd}
        handleImport={handleImport}
        handleExport={handleExport}
      ></HandleLogic>
      <SearchLogic
        valueSearch={valueSearch}
        placeholder="Search Product"
        setValueSearch={setValueSearch}
      ></SearchLogic>
      <Container>
        <Grid2 container sx={{
        
          width: "90%",
          marginTop: "36px",
        }}>
            <CheckBoxProduct size ={sizeProduct} color={colorProduct} >

            </CheckBoxProduct>
        </Grid2>
      </Container>
    </>
  );
}
