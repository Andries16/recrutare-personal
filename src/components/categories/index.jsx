import {
  Code,
  AccountBalance,
  AttachMoney,
  PeopleAlt,
  Fastfood,
  AssignmentInd,
  Calculate,
} from "@mui/icons-material";
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
        {[
          { title: "It, Programare", icon: <Code fontSize="large" /> },
          { title: "Achiziții", icon: <AttachMoney fontSize="large" /> },
          { title: "Manageri", icon: <PeopleAlt fontSize="large" /> },
          {
            title: "Alimentatia Publică",
            icon: <Fastfood fontSize="large" />,
          },
          {
            title: "Joburi fără experiență",
            icon: <AssignmentInd fontSize="large" />,
          },
          {
            title: "Bănci, Credite",
            icon: <AccountBalance fontSize="large" />,
          },
          { title: "Contabilitate", icon: <Calculate fontSize="large" /> },
        ].map((el) => (
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
            {el.icon}
            <Typography fontSize={14} fontWeight="light">
              {el.title}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
