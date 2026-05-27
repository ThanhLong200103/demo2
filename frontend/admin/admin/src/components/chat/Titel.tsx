import { Grid2, Typography } from "@mui/material";
import ButtonCustomer from "../user/ButtonUser";
import AddIcon from "@mui/icons-material/Add";


type Props = {

  handleAdd: () => void;

};
export default function TitelChat({ handleAdd }: Props) {

    return (
        <>
        <Grid2 container sx={{
            display:"flex",
            justifyContent:"space-between",
            margin:"0 36px"
        }}>
            <Grid2 size={6}>
                <Typography variant="h4">Chat</Typography>
            </Grid2>
            <Grid2 size={6}  sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}>
              <ButtonCustomer
              text="Add"
              icon={<AddIcon />}
              sx={{
                backgroundColor:
                  "rgba(25, 118, 210, 0.08)",
                  
              }}
              onClick={handleAdd}
            />
            </Grid2>

        </Grid2>
        
        </>
    )
};
