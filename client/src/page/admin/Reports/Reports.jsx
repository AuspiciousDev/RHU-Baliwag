import React, { useEffect, useState } from "react";
import { tokens } from "../../../theme";
import ConfirmDialogue from "../../../global/ConfirmDialogue";
import SuccessDialogue from "../../../global/SuccessDialogue";
import ErrorDialogue from "../../../global/ErrorDialogue";
import ValidateDialogue from "../../../global/ValidateDialogue";
import LoadingDialogue from "../../../global/LoadingDialogue";
import { useInventoriesContext } from "../../../hooks/useInventoryContext";
import { DataGrid, GridToolbar, GridToolbarContainer } from "@mui/x-data-grid";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  InputBase,
  Paper,
  Typography,
  Divider,
  ButtonBase,
  useTheme,
  Avatar,
  Tabs,
  Tab,
  FormControl,
  TextField,
} from "@mui/material";
import { format } from "date-fns-tz";

import {
  CheckCircle,
  DeleteOutline,
  ArchiveOutlined,
} from "@mui/icons-material";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Paper_Active from "../../../components/global/Paper_Active";
import Paper_Icon from "../../../components/global/Paper_Icon";
import useAuth from "../../../hooks/useAuth";
import PropTypes from "prop-types";
import { darken, lighten } from "@mui/material/styles";
import { useTransactionsContext } from "../../../hooks/useTransactionContext";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
const getHoverBackgroundColor = (color, mode) =>
  mode === "dark" ? darken(color, 0.5) : lighten(color, 0.5);

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbar />
    </GridToolbarContainer>
  );
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ width: "100%" }}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const Reports = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dispenses, setDispenses] = useState([]);
  const [items, setItems] = useState({});
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const { stocks, stockDispatch } = useInventoriesContext();
  const { transactions, transactionDispatch } = useTransactionsContext();
  const [value, setValue] = React.useState(0);
  const [DateFilter, setDateFilter] = useState(new Date());
  const [DateFilterEnd, setDateFilterEnd] = useState(null);
  const [DateFilterError, setDateFilterError] = useState(false);
  const handleDate = (newValue) => {
    setDateFilter(newValue);
    setDateFilterError(false);
  };
  const handleEndDate = (newValue) => {
    setDateFilterEnd(newValue);
    setDateFilterError(false);
  };
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [successDialog, setSuccessDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [errorDialog, setErrorDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
  });
  const [validateDialog, setValidateDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
  });
  const [loadingDialog, setLoadingDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setDateFilter(null);
    setDateFilterEnd(null);
  };
  const [page, setPage] = React.useState(15);
  useEffect(() => {
    const getUsersDetails = async () => {
      try {
        setLoadingDialog({ isOpen: true });

        const response = await axiosPrivate.get("/api/transaction/reportGen");
        if (response.status === 200) {
          const json = await response.data;
          console.log(json);
          setDispenses(json);
        }
        setLoadingDialog({ isOpen: false });
      } catch (error) {
        setLoadingDialog({ isOpen: false });
        if (!error?.response) {
          setErrorDialog({
            isOpen: true,
            message: `No server response`,
          });
        } else if (error.response.status === 400) {
          setErrorDialog({
            isOpen: true,
            message: `${error.response.data.message}`,
          });
          console.log(error.response.data.message);
        } else if (error.response.status === 404) {
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
          console.log(error);
        }
      }
    };
    getUsersDetails();
  }, [value, transactionDispatch]);

  const handleWeek = () => {
    let currentDate = new Date(DateFilter);
    console.log(
      "🚀 ~ file: Reports.jsx:185 ~ handleWeek ~ currentDate:",
      currentDate
    );

    let newCurrDate = new Date(DateFilterEnd);
    console.log(
      "🚀 ~ file: Reports.jsx:188 ~ handleWeek ~ newCurrDate:",
      newCurrDate
    );

    let startDate = new Date(currentDate.getFullYear(), 0, 1);
    let days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
    let weekNumber = Math.ceil(days / 7);

    let newStartDate = new Date(newCurrDate.getFullYear(), 0, 1);
    let newDays = Math.floor(
      (newCurrDate - newStartDate) / (24 * 60 * 60 * 1000)
    );
    let newWeekNumber = Math.ceil(newDays / 7);
    console.log(
      "🚀 ~ file: Reports.jsx:180 ~ handleWeek ~ newWeekNumber:",
      newWeekNumber
    );

    if (newWeekNumber === weekNumber) {
      return true;
    } else {
      return false;
    }
  };

  // useEffect(() => {
  //   try {
  // const existingItem = transactions
  //   .filter((fill) => {
  //     return (
  //       format(new Date(fill?.createdAt), "MMMM dd yyyy") !==
  //       format(new Date(), "MMMM dd yyyy")
  //     );
  //   })
  //   .map((val) => {
  //     return val.items.map((va1) => {
  //       return va1.medID, va1.quantity;
  //     });
  //   });
  // console.log(
  //   "🚀 ~ file: Reports.jsx:181 ~ useEffect ~ existingItem:",
  //   existingItem
  // );
  //     let object = [...map.entries()].reduce((obj, [key, value]) => {
  //       obj[key] = value;
  //       return obj;
  //     }, {});
  //   } catch {}
  // }, [value, loadingDialog, transactionDispatch]);

  const columns = [
    {
      field: "medID",
      headerName: "Medicine ID",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Typography textTransform="uppercase" fontWeight={600}>
            {params.value}
          </Typography>
        );
      },
    },

    {
      field: "genericName",
      headerName: "Generic Name",
      align: "center",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "brandName",
      headerName: "Brand Name",
      align: "center",
      headerAlign: "center",
      width: 200,
      valueFormatter: (params) => (params?.value ? params?.value : "-"),
    },

    {
      field: "quantity",
      headerName: "Quantity",
      align: "center",
      headerAlign: "center",
      width: 150,
    },

    {
      field: "createdAt",
      headerName: "Date Released",
      align: "center",
      headerAlign: "center",
      width: 180,
      valueFormatter: (params) =>
        format(new Date(params?.value), "MMMM dd, yyyy"),
    },
  ];

  return (
    <Box className="container-layout_body_contents">
      <ConfirmDialogue
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <SuccessDialogue
        successDialog={successDialog}
        setSuccessDialog={setSuccessDialog}
      />
      <ErrorDialogue
        errorDialog={errorDialog}
        setErrorDialog={setErrorDialog}
      />
      <ValidateDialogue
        validateDialog={validateDialog}
        setValidateDialog={setValidateDialog}
      />
      <LoadingDialogue
        loadingDialog={loadingDialog}
        setLoadingDialog={setLoadingDialog}
      />

      <Paper
        elevation={2}
        sx={{
          width: "100%",
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
                borderLeft: `5px solid ${colors.secondary[500]}`,
                paddingLeft: 2,
                textTransform: "uppercase",
              }}
            >
              Reports
            </Typography>
          </Box>
        </Box>
      </Paper>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          mt: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <greenOnly
            position="static"
            sx={{ backgroundColor: colors.greenOnly[100] }}
            enableColorOnDark
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="full width tabs example"
              variant="fullWidth"
            >
              <Tab
                label="Daily"
                {...a11yProps(0)}
                sx={{ fontWeight: "bold" }}
              />
              <Tab
                label="Weekly"
                {...a11yProps(1)}
                sx={{ fontWeight: "bold" }}
              />
              <Tab
                label="Monthly"
                {...a11yProps(2)}
                sx={{ fontWeight: "bold" }}
              />
            </Tabs>
          </greenOnly>
        </Box>
        <TabPanel value={value} index={0}>
          <Box sx={{ m: 1, mt: 2, mb: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Date of Filter"
                inputFormat="MMMM DD, YYYY"
                value={DateFilter}
                onChange={handleDate}
                renderInput={(params) => (
                  <TextField
                    autoComplete="off"
                    disabled
                    {...params}
                    error={DateFilterError}
                  />
                )}
              />
            </LocalizationProvider>
          </Box>
          <Box
            sx={{
              height: "100%",
              width: "100%",
              "& .super-app-theme--Low": {
                bgcolor: "#F68181",
                "&:hover": {
                  bgcolor: (theme) =>
                    getHoverBackgroundColor(
                      theme.palette.warning.main,
                      theme.palette.mode
                    ),
                },
              },
            }}
          >
            <DataGrid
              rows={
                dispenses
                  ? dispenses
                      .filter((fill) => {
                        return (
                          format(new Date(fill?.createdAt), "MMMM dd yyyy") ===
                          format(new Date(DateFilter), "MMMM dd yyyy")
                        );
                      })
                      .map((val) => {
                        return val;
                      })
                  : []
              }
              getRowId={(row) => row?._id}
              columns={columns}
              pageSize={page}
              onPageSizeChange={(newPageSize) => setPage(newPageSize)}
              rowsPerPageOptions={[15, 50]}
              pagination
              sx={{
                height: "700px",
                "& .MuiDataGrid-cell": {
                  textTransform: "capitalize",
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: "bold",
                },
              }}
              initialState={{
                columns: {
                  columnVisibilityModel: {
                    // status: auth.userType === "admin" ? true : false,
                  },
                },
              }}
              components={{
                Toolbar: CustomToolbar,
              }}
              // getRowClassName={(params) =>
              //   `super-app-theme--${params.row.quantity > 20 ? "High" : "Low"}`
              // }
            />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box sx={{ display: "flex", gap: 2, m: 1, mt: 2, mb: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Start Date"
                inputFormat="MM/DD/YYYY"
                value={DateFilter}
                onChange={handleDate}
                renderInput={(params) => (
                  <TextField
                    autoComplete="off"
                    disabled
                    {...params}
                    error={DateFilterError}
                  />
                )}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="End Date"
                inputFormat="MM/DD/YYYY"
                value={DateFilterEnd}
                onChange={handleEndDate}
                renderInput={(params) => (
                  <TextField autoComplete="off" disabled {...params} />
                )}
              />
            </LocalizationProvider>
          </Box>

          <Box
            sx={{
              height: "100%",
              width: "100%",
              "& .super-app-theme--Low": {
                bgcolor: "#F68181",
                "&:hover": {
                  bgcolor: (theme) =>
                    getHoverBackgroundColor(
                      theme.palette.warning.main,
                      theme.palette.mode
                    ),
                },
              },
            }}
          >
            <DataGrid
              rows={
                dispenses
                  ? dispenses
                      .filter((fill) => {
                        return (
                          format(new Date(fill?.createdAt), "MMMM dd yyyy") >=
                            format(new Date(DateFilter), "MMMM dd yyyy") &&
                          format(new Date(fill?.createdAt), "MMMM dd yyyy") <=
                            format(new Date(DateFilterEnd), "MMMM dd yyyy")
                        );
                      })
                      .map((val) => {
                        return val;
                      })
                  : []
              }
              getRowId={(row) => row?._id}
              columns={columns}
              pageSize={page}
              onPageSizeChange={(newPageSize) => setPage(newPageSize)}
              rowsPerPageOptions={[15, 50]}
              pagination
              sx={{
                height: "700px",
                "& .MuiDataGrid-cell": {
                  textTransform: "capitalize",
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: "bold",
                },
              }}
              initialState={{
                columns: {
                  columnVisibilityModel: {
                    // status: auth.userType === "admin" ? true : false,
                  },
                },
              }}
              components={{
                Toolbar: CustomToolbar,
              }}
              // getRowClassName={(params) =>
              //   `super-app-theme--${
              //     params.row.quantity > params.row.quantity ? "High" : "Low"
              //   }`
              // }
            />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Box sx={{ m: 1, mt: 2, mb: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                views={["year", "month"]}
                label="Select Month"
                inputFormat="MMMM"
                value={DateFilter}
                onChange={handleDate}
                renderInput={(params) => (
                  <TextField
                    autoComplete="off"
                    disabled
                    {...params}
                    error={DateFilterError}
                  />
                )}
              />
            </LocalizationProvider>
          </Box>
          <Box
            sx={{
              height: "100%",
              width: "100%",
              "& .super-app-theme--Low": {
                bgcolor: "#F68181",
                "&:hover": {
                  bgcolor: (theme) =>
                    getHoverBackgroundColor(
                      theme.palette.warning.main,
                      theme.palette.mode
                    ),
                },
              },
            }}
          >
            <DataGrid
              rows={
                dispenses && DateFilter
                  ? dispenses
                      .filter((fill) => {
                        return (
                          format(new Date(fill?.createdAt), "MMMM yyyy") ===
                          format(new Date(DateFilter), "MMMM yyyy")
                        );
                      })
                      .map((val) => {
                        return val;
                      })
                  : []
              }
              getRowId={(row) => row?._id}
              columns={columns}
              pageSize={page}
              onPageSizeChange={(newPageSize) => setPage(newPageSize)}
              rowsPerPageOptions={[15, 50]}
              pagination
              sx={{
                height: "700px",
                "& .MuiDataGrid-cell": {
                  textTransform: "capitalize",
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: "bold",
                },
              }}
              initialState={{
                columns: {
                  columnVisibilityModel: {
                    // lotNum: false,
                    // createdAt: false,
                    // updatedAt: false,
                    // _id: false,
                    // createdBy: false,
                    // status: false,
                    // // status: auth.userType === "admin" ? true : false,
                  },
                },
              }}
              components={{
                Toolbar: CustomToolbar,
              }}
              // getRowClassName={(params) =>
              //   `super-app-theme--${params.row.quantity > 20 ? "High" : "Low"}`
              // }
            />
          </Box>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default Reports;
