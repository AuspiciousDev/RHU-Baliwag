import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  useTheme,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import { format } from "date-fns-tz";
import React from "react";
import { tokens } from "../../../theme";
import Paper_Totals from "../../../components/Dashboard/Paper_Totals";
import {
  Person2Outlined,
  DvrOutlined,
  MoveToInboxOutlined,
  DescriptionOutlined,
} from "@mui/icons-material";

import LoadingDialogue from "../../../global/LoadingDialogue";
import ErrorDialogue from "../../../global/ErrorDialogue";
import WelcomeDialogue from "../../../global/WelcomeDialogue";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useUsersContext } from "../../../hooks/useUserContext";
import { useInventoriesContext } from "../../../hooks/useInventoryContext";
const ADMIN_Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const { users, userDispatch } = useUsersContext();
  const { stocks, stockDispatch } = useInventoriesContext();

  const [getStudCount, setStudCount] = useState(0);
  const [getSecCount, setSecCount] = useState(0);
  const [activeYear, setActiveYear] = useState([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [loadingDialog, setLoadingDialog] = useState({
    isOpen: false,
  });
  const [errorDialog, setErrorDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
  });
  const [welcomeDialog, setWelcomeDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
  });
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("newLogin"));
    if (items) {
      setWelcomeDialog({
        isOpen: true,
        message: `Welcome,  `,
        type: `${auth.userType}`,
      });
      localStorage.setItem("newLogin", false);
    }
  }, []);

  useEffect(() => {
    const getOverviewDetails = async () => {
      try {
        setLoadingDialog({ isOpen: true });
        const apiUsers = await axiosPrivate.get("/api/user");
        const apiStocks = await axiosPrivate.get("/api/inventory");
        if (apiUsers.status === 200) {
          const json = await apiUsers.data;
          console.log(json);
          userDispatch({ type: "SET_USERS", payload: json });
        }
        if (apiStocks.status === 200) {
          const json = await apiStocks.data;
          console.log(json);
          stockDispatch({ type: "SET_STOCKS", payload: json });
        }
        setLoadingDialog({ isOpen: false });
      } catch (error) {
        console.log(
          "🚀 ~ file: Dashboard.jsx:91 ~ getOverviewDetails ~ error",
          error
        );
        setLoadingDialog({ isOpen: false });
        if (!error?.response) {
          setErrorDialog({
            isOpen: true,
            message: `No server response`,
          });
        } else if (error.response.status === 400) {
          // setErrorDialog({
          //   isOpen: true,
          //   message: `${error.response.data.message}`,
          // });
          console.log(error.response.data.message);
        } else if (error.response.status === 404) {
          setErrorDialog({
            isOpen: true,
            message: `${error.response.data.message}`,
          });
          console.log(error.response.data.message);
        } else if (error.response.status === 409) {
          setErrorDialog({
            isOpen: true,
            message: `${error.response.data.message}`,
          });
          console.log(error.response.data.message);
        } else if (error.response.status === 500) {
          setErrorDialog({
            isOpen: true,
            message: `${error.response.data.message}`,
          });
          console.log(error.response.data.message);
        } else {
          setErrorDialog({
            isOpen: true,
            message: `${error}`,
          });
        }
      }
    };
    getOverviewDetails();
  }, []);

  const tableDetails = ({ val }) => {
    return (
      <TableRow key={val.enrollmentID}>
        <TableCell align="left" sx={{ textTransform: "uppercase" }}>
          <Box display="flex" gap={2} width="60%">
            <Link
              to={`/registrar/student/${val?.LRN}`}
              style={{
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <Paper
                sx={{
                  padding: "2px 20px",
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: colors.whiteOnly[500],
                  alignItems: "center",
                }}
              >
                <Typography
                  fontWeight="bold"
                  sx={{ color: colors.blackOnly[500] }}
                >
                  {val?.LRN}
                </Typography>
              </Paper>
            </Link>
          </Box>
        </TableCell>
        <TableCell sx={{ textTransform: "capitalize" }}>
          {/* {students &&
            students
              .filter((stud) => {
                return stud.LRN === val.LRN;
              })
              .map((stud) => {
                return stud?.middleName
                  ? stud.firstName + " " + stud.middleName + " " + stud.lastName
                  : stud.firstName + " " + stud.lastName;
              })} */}
        </TableCell>
        <TableCell align="left">
          {levels &&
            levels
              .filter((lev) => {
                return lev.levelID === val.levelID.toLowerCase();
              })
              .map((val) => {
                return val.levelNum;
              })}
        </TableCell>
        <TableCell align="left" sx={{ textTransform: "capitalize" }}>
          {/* {sections &&
            sections
              .filter((lev) => {
                return lev.sectionID === val.sectionID.toLowerCase();
              })
              .map((sec) => {
                return sec.sectionName;
              })} */}
        </TableCell>
        <TableCell align="left" sx={{ textTransform: "capitalize" }}>
          {format(new Date(val.createdAt), "MMMM dd, yyyy")}
        </TableCell>
      </TableRow>
    );
  };
  return (
    <Box className="container-layout_body_contents">
      <ErrorDialogue
        errorDialog={errorDialog}
        setErrorDialog={setErrorDialog}
      />
      <LoadingDialogue
        loadingDialog={loadingDialog}
        setLoadingDialog={setLoadingDialog}
      />
      <WelcomeDialogue
        welcomeDialog={welcomeDialog}
        setWelcomeDialog={setWelcomeDialog}
      />
      <Paper
        elevation={2}
        sx={{
          width: "100%",
          margin: "0 0 10px 0",
          padding: { xs: "10px", sm: "0 10px" },
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: { sm: "end" },
              justifyContent: { xs: "center", sm: "start" },
              m: { xs: "20px 0" },
            }}
          >
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{
                borderLeft: `5px solid ${colors.primary[900]}`,
                paddingLeft: 2,
              }}
            >
              DASHBOARD
            </Typography>
          </Box>
        </Box>
      </Paper>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", sm: "2fr 2fr 2fr 2fr" },
          margin: "1em 0em",
        }}
        gap={2}
      >
        <Paper_Totals
          to={"inventory"}
          value={
            stocks
              ? stocks.filter((filter) => {
                  return filter.status === true;
                }).length
              : "0"
          }
          icon={<DescriptionOutlined />}
          description="Total Number of Medicines"
        />
        <Paper_Totals
          to={"request"}
          value={
            // enrollments
            //   ? enrollments.filter((filter) => {
            //       return filter.schoolYearID === activeYear.schoolYearID;
            //     }).length
            //   : "0"
            "0"
          }
          icon={<MoveToInboxOutlined />}
          description="Total Number of Requests"
        />
        <Paper_Totals
          to={"transaction"}
          value={
            // sections
            //   ? sections.filter((filter) => {
            //       return filter.status === true;
            //     }).length
            //   : "0"
            "0"
          }
          icon={<DvrOutlined />}
          description="Total Number of Transactions"
        />
        <Paper_Totals
          to={"user"}
          value={
            users
              ? users.filter((filter) => {
                  return filter.status === true;
                }).length
              : "0"
          }
          icon={<Person2Outlined />}
          description="Total Number of Users"
        />
      </Box>
      <Box height="100%">
        {/* <Typography variant="h4">Recent Students</Typography>
          <Typography>Showing 10 entries</Typography> */}

        <Box
          sx={{
            height: "100%",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "6fr 2fr" },
          }}
        >
          <Paper elevation={2} sx={{ position: "relative", p: 2 }}>
            <Typography
              variant="h4"
              mb={1}
              sx={{
                borderLeft: `5px solid ${colors.secondary[500]}`,
                paddingLeft: 2,
              }}
            >
              Recent Requests
            </Typography>
            <Divider sx={{ mt: 2 }} />
            <TableContainer>
              <Table sx={{ minWidth: "100%" }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Request ID</TableCell>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">Mobile Number</TableCell>
                    <TableCell align="left">Request Date</TableCell>
                    <TableCell align="left">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {activeYear &&
                    enrollments &&
                    enrollments
                      .filter((filter) => {
                        return filter?.schoolYearID === activeYear.schoolYearID;
                      })
                      .map((val) => {
                        return val && tableDetails({ val });
                      })} */}
                </TableBody>
              </Table>
            </TableContainer>
            <Divider />
            <TablePagination
              sx={{
                position: { xs: "", sm: "absolute" },
                bottom: 1,
                right: 1,
              }}
              rowsPerPageOptions={[5, 10]}
              component="div"
              count={
                "0"
                // activeYear
                //   ? enrollments &&
                //     enrollments.filter((filter) => {
                //       return filter?.schoolYearID === activeYear.schoolYearID;
                //     }).length
                //   : 0
              }
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          <Paper
            elevation={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              height: "100%",
              mt: { xs: 2, sm: 0 },
              ml: { xs: 0, sm: 2 },
              padding: { xs: "20px 0 20px 0", sm: 2 },
            }}
          >
            <Box
              sx={{ display: "flex", flexDirection: "column", width: "100%" }}
            >
              <Typography
                variant="h4"
                mb={1}
                sx={{
                  borderLeft: `5px solid ${colors.secondary[500]}`,
                  paddingLeft: 2,
                }}
              >
                Recent Logins
              </Typography>
              {/* <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  mt: 1,
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: 1,
                }}
              >
                {logins &&
                  logins.slice(0, 6).map((val, key) => (
                    <Paper
                      key={key}
                      elevation={2}
                      sx={{
                        height: "100%",
                        color: `${colors.black[100]}`,
                        display: "flex",
                        flexDirection: "row",
                        padding: "10px",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Link
                        to={`/registrar/user/profile/${val?.username}`}
                        style={{
                          alignItems: "center",
                          color: colors.black[100],
                          textDecoration: "none",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            alt="profile-user"
                            sx={{ width: "35px", height: "35px" }}
                            src={val.imgURL}
                            style={{
                              marginRight: "15px",
                              objectFit: "contain",
                              borderRadius: "50%",
                            }}
                          />
                          <Box>
                            <Typography textTransform="capitalize">
                              {val.username}
                            </Typography>
                            <Typography textTransform="capitalize">
                              {format(new Date(val.createdAt), "hh:mm a, EEEE")}
                            </Typography>
                          </Box>
                        </Box>
                      </Link>
                    </Paper>
                  ))}
              </Box> */}
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default ADMIN_Dashboard;
