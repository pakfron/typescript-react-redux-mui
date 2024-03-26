import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function Navbar({}: Props) {
  const navigate = useNavigate();
  return (
    <AppBar className="bg-white" position="static">
      <Toolbar className="justify-between">
        <Typography className="text-black">Logo</Typography>
        <Button
          className="bg-[#FF6624] hover:bg-[#e55b20] text-white font-bold"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}
