import { Stack, Typography } from "@mui/material";

export default function Slide() {
  return (
    <Stack
      sx={{ bgcolor: "#222831", padding: "200px 200px 100px" }}
      flexDirection="row"
    >
      <Stack sx={{ width: "60%", padding: "50px", justifyContent: "center" }}>
        <Typography fontSize={70}>Angajează</Typography>
        <Typography fontSize={70} sx={{ color: "#76ABAE" }}>
          Top 3% experți
        </Typography>
        <Typography fontSize={20} sx={{ marginTop: "20px" }}>
          Am livrat o soluție de lucru uimitoare și rapidă Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Quia sint quasi nemo atque, laborum
          neque soluta veritatis veniam cumque illum repudiandae harum aliquam
          eum mollitia earum odit odio pariatur commodi.
        </Typography>
      </Stack>
      <Stack sx={{ width: "40%", padding: "0 30px" }}>
        <img
          src="https://static1.squarespace.com/static/5a1bacd79f8dce42bdccfcd3/5a1baf6a651f3e7e228e14bb/5e6b98f0a55453445ec313b2/1610155842004/IMG_1746.JPG?format=1500w"
          alt=""
          style={{
            height: "130%",
            filter:
              "brightness(1.3) invert(0.17) saturate(2.6) sepia(0.25) url('#squiggly-1')",
            marginBottom: "-400px",
          }}
        />
      </Stack>
    </Stack>
  );
}
