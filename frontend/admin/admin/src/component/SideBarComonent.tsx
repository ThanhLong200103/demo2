import {
  Container,
  Grid,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

export default function SideBarComonent() {
  return (
    <>
      <Container
        sx={{
          height: "100%",
          width: "25%",
          borderRight: "1px solid #ccc",
          position: "absolute",
        }}
      >
        <Grid size={12}>
          <div>
            <ImageList>
              <ImageListItem>
                <img
                  src="//theme.hstatic.net/200000690725/1001078549/14/logo.png?v=1069"
                  alt="Torano"
                  style={{ maxHeight: "70px" }}
                />
              </ImageListItem>
            </ImageList>
          </div>
        </Grid>
        <Grid container>
          <List>
            <ListItem>
              <ListItemButton>
                <ListItemText primary="" />
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton>
                <ListItemText primary="Staff" />
              </ListItemButton>
            </ListItem>
             <ListItem>
              <ListItemButton>
                <ListItemText primary="Order" />
              </ListItemButton>
            </ListItem>
             <ListItem>
              <ListItemButton>
                <ListItemText primary="Product" />
              </ListItemButton>
            </ListItem>
             <ListItem>
              <ListItemButton>
                <ListItemText primary="User" />
              </ListItemButton>
            </ListItem>
             <ListItem>
              <ListItemButton>
                <ListItemText primary="System" />
              </ListItemButton>
            </ListItem>
          </List>
        </Grid>
      </Container>
    </>
  );
}
