import {
  Container,
  Grid2,
  Typography,
} from "@mui/material";
import ButtonCustomer from "../components/user/ButtonUser";
import AddIcon from "@mui/icons-material/Add";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import SearchIcon from "@mui/icons-material/Search";
import SearchUserPage from "../components/user/SreachUser";
import DataGird from "../components/tableGird";

export default function UserPage() {
  const rows = [
  {
    id: "USR001",
    name: "Nguyễn Văn An",
    phone: "0901234567",
    email: "an.nguyen@example.com",
    status: "ACTIVE",
  },
  {
    id: "USR002",
    name: "Trần Thị Bình",
    phone: "0912345678",
    email: "binh.tran@example.com",
    status: "PENDING",
  },
  {
    id: "USR003",
    name: "Lê Hoàng Nam",
    phone: "0923456789",
    email: "nam.le@example.com",
    status: "INACTIVE",
  },
  {
    id: "USR004",
    name: "Phạm Minh Khoa",
    phone: "0934567890",
    email: "khoa.pham@example.com",
    status: "ACTIVE",
  },
  {
    id: "USR005",
    name: "Đỗ Thị Lan",
    phone: "0945678901",
    email: "lan.do@example.com",
    status: "ACTIVE",
  },
  {
    id: "USR006",
    name: "Vũ Quốc Huy",
    phone: "0956789012",
    email: "huy.vu@example.com",
    status: "PENDING",
  },
  {
    id: "USR007",
    name: "Bùi Gia Hân",
    phone: "0967890123",
    email: "han.bui@example.com",
    status: "INACTIVE",
  },
  {
    id: "USR008",
    name: "Ngô Minh Tâm",
    phone: "0978901234",
    email: "tam.ngo@example.com",
    status: "ACTIVE",
  },
  {
    id: "USR009",
    name: "Lý Thanh Tùng",
    phone: "0989012345",
    email: "tung.ly@example.com",
    status: "ACTIVE",
  },
  {
    id: "USR010",
    name: "Mai Khánh Linh",
    phone: "0990123456",
    email: "linh.mai@example.com",
    status: "PENDING",
  },
  {
    id: "USR011",
    name: "Hoàng Đức Anh",
    phone: "0901122334",
    email: "anh.hoang@example.com",
    status: "ACTIVE",
  },
  {
    id: "USR012",
    name: "Phan Nhật Quang",
    phone: "0912233445",
    email: "quang.phan@example.com",
    status: "INACTIVE",
  },
  {
    id: "USR013",
    name: "Tạ Mỹ Duyên",
    phone: "0923344556",
    email: "duyen.ta@example.com",
    status: "ACTIVE",
  },
  {
    id: "USR014",
    name: "Đặng Quốc Bảo",
    phone: "0934455667",
    email: "bao.dang@example.com",
    status: "PENDING",
  },
  {
    id: "USR015",
    name: "Cao Gia Minh",
    phone: "0945566778",
    email: "minh.cao@example.com",
    status: "ACTIVE",
  },
  {
    id: "USR016",
    name: "Nguyễn Hải Yến",
    phone: "0956677889",
    email: "yen.nguyen@example.com",
    status: "INACTIVE",
  },
  {
    id: "USR017",
    name: "Trương Tuấn Kiệt",
    phone: "0967788990",
    email: "kiet.truong@example.com",
    status: "ACTIVE",
  },
  {
    id: "USR018",
    name: "Lâm Ngọc Ánh",
    phone: "0978899001",
    email: "anh.lam@example.com",
    status: "PENDING",
  },
  {
    id: "USR019",
    name: "Đinh Văn Phúc",
    phone: "0989900112",
    email: "phuc.dinh@example.com",
    status: "ACTIVE",
  },
  {
    id: "USR020",
    name: "Võ Hữu Thành",
    phone: "0909988776",
    email: "thanh.vo@example.com",
    status: "INACTIVE",
  },
  {
    id: "USR021",
    name: "Kiều Thanh Hà",
    phone: "0918877665",
    email: "ha.kieu@example.com",
    status: "ACTIVE",
  },
  {
    id: "USR022",
    name: "Huỳnh Gia Bảo",
    phone: "0927766554",
    email: "bao.huynh@example.com",
    status: "PENDING",
  },
  {
    id: "USR023",
    name: "Châu Minh Đức",
    phone: "0936655443",
    email: "duc.chau@example.com",
    status: "ACTIVE",
  },
  {
    id: "USR024",
    name: "Tôn Nữ Quỳnh Anh",
    phone: "0945544332",
    email: "quynhanh.ton@example.com",
    status: "INACTIVE",
  },
  {
    id: "USR025",
    name: "Phùng Quốc Việt",
    phone: "0954433221",
    email: "viet.phung@example.com",
    status: "ACTIVE",
  },
];
  return (
    <>
      <Container sx={{ marginTop: "46px" }}>
        <Grid2 container>
          <Grid2 size={6}>
            <Typography variant="h4">Customers</Typography>
            <Grid2
              sx={{
                marginTop: "8px",
              }}
            >
              <ButtonCustomer
                text="Import"
                icon={<FileUploadOutlinedIcon />}
              ></ButtonCustomer>
              <ButtonCustomer
                text="Export"
                icon={<FileDownloadOutlinedIcon />}
              ></ButtonCustomer>
            </Grid2>
          </Grid2>
          <Grid2
            size={6}
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <ButtonCustomer
              text="add"
              icon={<AddIcon />}
              sx={{
                backgroundColor: "rgba(25, 118, 210, 0.08)",
              }}
            ></ButtonCustomer>
          </Grid2>
        </Grid2>
      </Container>
      <Container>
        <SearchUserPage placeholder="Search customer" icon={<SearchIcon />} ></SearchUserPage>
      </Container>
      <Container sx={{
        display:"flex",
        justifyContent:"center",
        width:"90%",
        marginTop:"36px"
      }}>
        <DataGird rows={rows} checkbox={true}></DataGird>
      </Container>
    </>
  );
}
