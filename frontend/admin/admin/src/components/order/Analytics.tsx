import { Typography } from "@mui/material";
import { StyledPieChatDashboard } from "../Dashboard/styled";
type dataOrder = {
  id: number;
  value: number;
  label: string;
};

type Props = {
  data: dataOrder[];
};
export default function AnalyticsOrder({ data = [] }: Props) {
  return (

    <>
      <Typography variant="h5" sx={{padding:"8px"}}>Thống kê</Typography>
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
      slotProps={{
        legend: {
          direction: "column",
          position: {
            vertical: "bottom",
            horizontal: "middle",
            
          },
        },
      }}
       margin={{
    bottom: 100,
  }}
      height={240}
      width={300}
    />
    </>
  );
}
