import React from "react";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import welcome2 from "../../assets/welcome2.svg";
const Home = () => {
  return (
    <Box
      className="container-page"
      sx={{
        flexDirection: "column",
        paddingLeft: 5,
        paddingRight: 5,
        background:
          "linear-gradient(180deg, rgba(124,223,184,0.5) 0%, rgba(255,255,255,1) 25%)",
      }}
    >
      <Navbar />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <img src={welcome2} alt="" style={{ width: "500px" }} />
      </Box>
    </Box>
  );
};

export default Home;
