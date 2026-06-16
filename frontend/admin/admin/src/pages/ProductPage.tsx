import { useEffect, useState } from "react";
import { HandleLogic } from "../components/hanlde/hanlde";
import { SearchLogic } from "../components/hanlde/search";
import { Container, Grid2 } from "@mui/material";
import CheckBoxProduct from "../components/product/checkbox";
import { colorProduct, sizeProduct } from "../components/product/data";
import { ColumTableProduct } from "../components/product/colums";
import DataGird from "../components/tableGird";
import BasicModal from "../components/modal";
import { Product } from "../components/Dashboard/data";

import type { ProductType } from "../types/product";

export default function ProductPage() {
  const [valueSearch, setValueSearch] = useState(String);
  const [open, setOpen] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);
  const handleAdd = () => {
    console.log(valueSearch);
    setOpen(true);
    console.log("show modal:", open);
  };
  const handleImport = () => {
    console.log(valueSearch);
  };
  const handleExport = () => {
    console.log(valueSearch);
  };
  const handleEdit = (id: string) => {
    return console.log("id", id);
  };
  const handleDelete = (id: string) => {
    return console.log("id", id);
  };
  const handleClose = () => {
    setOpen(false);
    console.log(open);
  };
  useEffect(() => {
    const effectData = async () => {
      try {
        setLoading(true);
        const data = await Product(
          paginationModel.page + 1,
          paginationModel.pageSize,
        );
        setRowCount(data.total);
        setProducts(data.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    effectData();
  }, [paginationModel]);
  return (
    <>
      <HandleLogic
        title="Sản phẩm"
        checkAdd={true}
        handleAdd={handleAdd}
        handleImport={handleImport}
        handleExport={handleExport}
      ></HandleLogic>
      <BasicModal open={open} handleClose={handleClose}>
        <p></p>
      </BasicModal>
      <SearchLogic
        valueSearch={valueSearch}
        placeholder="Search Product"
        setValueSearch={setValueSearch}
      ></SearchLogic>
      <Container>
        <Grid2
          container
          sx={{
            width: "90%",
            marginTop: "36px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <CheckBoxProduct
            size={sizeProduct}
            color={colorProduct}
          ></CheckBoxProduct>
          <Grid2
            size={{ lg: 8, md: 12 }}
            sx={{
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              backgroundColor: "rgba(243, 245, 247, 0.08)",
              padding: "0 18px",
            }}
          >
            <DataGird
              rows={products}
              checkbox={true}
              columns={ColumTableProduct({ handleEdit, handleDelete })}
              loading={loading}
              rowCount={rowCount}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
            ></DataGird>
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}
