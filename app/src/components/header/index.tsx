import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Stack,
} from "@mui/material";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#222831",
          padding: "20px 10%",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            LOGO
          </IconButton>
          <Stack flexDirection="row" flex={1}>
            <Typography variant="h6" component="div" sx={{ margin: "0 10px" }}>
              Home
            </Typography>
            <Typography variant="h6" component="div" sx={{ margin: "0 10px" }}>
              Jobs
            </Typography>
            <Typography variant="h6" component="div" sx={{ margin: "0 10px" }}>
              Candidates
            </Typography>
            <Typography variant="h6" component="div" sx={{ margin: "0 10px" }}>
              Contact
            </Typography>
          </Stack>

          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
