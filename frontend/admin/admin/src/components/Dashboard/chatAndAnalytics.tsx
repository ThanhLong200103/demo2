import { Grid2, Typography } from "@mui/material";
import { StyledBarChart, StyledPieChatDashboard } from "./styled";
type chatData = {
  label: string;
  value: number;
};
type Props = {
  data?: any[];
  chartData?: chatData[];
};
export default function ChatAndAnalytics({ data = [], chartData = [] }: Props) {
  return (
    <Grid2
      container
      sx={{
        paddingTop: "63px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Grid2
        size={{ md: 5, xs: 12 }}
        sx={{ backgroundColor: "rgba(243, 245, 247, 0.08)", padding: "18px" , boxShadow:"0 4px 12px rgba(0,0,0,0.2)"}}
      >
        <Typography variant="h6">Tỉ lệ trạng thái đơn hàng</Typography>
        <StyledPieChatDashboard
          sx={{
            textAlign: "start",
          }}
          series={[
            {
              data,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            },
          ]}
          height={250}
          width={400}
        />
      </Grid2>
      <Grid2
        size={{ md: 6, xs: 12 }}
        sx={{ backgroundColor: "rgba(243, 245, 247, 0.08)", padding: "18px" ,boxShadow:"0 4px 12px rgba(0,0,0,0.2)"}}
      >
        <Typography variant="h6" >Doanh thu</Typography>
        <StyledBarChart
          xAxis={[
            {
              scaleType: "band",
              data: chartData.map((item: chatData) => item.label),
            },
          ]}
          series={[
            {
              data: chartData.map((item: chatData) => item.value),
            },
          ]}
          width={500}
          height={250}
        
        />
      </Grid2>
    </Grid2>
  );
}
