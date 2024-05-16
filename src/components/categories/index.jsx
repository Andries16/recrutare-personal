import { Code } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";

export default function Categories() {
  return (
    <Stack sx={{ padding: "150px 200px" }}>
      <Typography fontSize={70} sx={{ marginTop: "100px" }}>
        {" "}
        Cele mai populare categorii
      </Typography>

      <Stack
        flexDirection="row"
        sx={{ color: "black !important", marginTop: "50px" }}
      >
        {[1, 2, 3, 4, 5, 6, 7].map((el) => (
          <Stack
            sx={{
              background: "white",
              height: "100px",
              width: "10%",
              borderRadius: "40px",
              alignItems: "center",
              justifyContent: "space-around",
              padding: "20px",
              margin: "10px",
            }}
            key={el}
          >
            <Code fontSize="large" />
            <Typography fontSize={14} fontWeight="light">
              Developpement
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
