import React, { useEffect, useState } from "react";
import ConfirmDialogue from "../../../global/ConfirmDialogue";
import SuccessDialogue from "../../../global/SuccessDialogue";
import ErrorDialogue from "../../../global/ErrorDialogue";
import ValidateDialogue from "../../../global/ValidateDialogue";
import LoadingDialogue from "../../../global/LoadingDialogue";
import DecisionDialogue from "../../../global/DecisionDialogue";
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  Delete,
  CheckCircle,
  Cancel,
  Add,
  Search,
  DeleteOutline,
  AccessTime,
} from "@mui/icons-material";
import { tokens } from "../../../theme";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useRequestsContext } from "../../../hooks/useRequestContext";

import { DataGrid, GridToolbar, GridToolbarContainer } from "@mui/x-data-grid";
import Paper_Status from "../../../components/global/Paper_Status";
import Paper_Icon from "../../../components/global/Paper_Icon";
import { format } from "date-fns-tz";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbar />
    </GridToolbarContainer>
  );
}
const RequestDetails = () => {
  const { reqID } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const { requests, requestDispatch } = useRequestsContext();

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  let [items, setItems] = useState([]);

  const [page, setPage] = React.useState(15);

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

  useEffect(() => {
    const getUsersDetails = async () => {
      try {
        setLoadingDialog({ isOpen: true });

        const response = await axiosPrivate.get(`/api/request/search/${reqID}`);
        if (response.status === 200) {
          const json = await response.data;
          setFirstName(json?.firstName || "");
          setMiddleName(json?.middleName || "");
          setLastName(json?.lastName || "");
          setEmail(json?.email || "");
          setMobile(json?.mobile || "");
          setAddress(json?.address || "");
          setCity(json?.city || "");
          setProvince(json?.province || "");
          setItems(json?.items || []);
          setCreatedAt(json?.createdAt || []);
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
  }, [requestDispatch]);

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
                borderLeft: `5px solid ${colors.primary[900]}`,
                paddingLeft: 2,
                textTransform: "uppercase",
              }}
            >
              Request &#62; details
            </Typography>
          </Box>
        </Box>
      </Paper>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          p: 2,
          mt: 2,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: " 1fr 1fr",
            paddingTop: 1,
            paddingBottom: 1,
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.75em 0.5em",
              alignItems: "center",
              justifyContent: "center",
              "& >.MuiTypography-root ": {
                textTransform: "capitalize",
                fontSize: "14pt",
              },
            }}
          >
            <Typography textAlign="end">Request ID : </Typography>
            <Typography fontWeight={600}>{reqID || "-"}</Typography>

            <Typography textAlign="end">Client Name : </Typography>
            <Typography fontWeight={600}>
              {middleName
                ? firstName + " " + middleName.charAt(0) + ". " + lastName
                : firstName + " " + lastName}
            </Typography>

            <Typography textAlign="end">Mobile : </Typography>
            <Typography fontWeight={600}>
              {mobile ? "09" + mobile : "-"}
            </Typography>
            <Typography textAlign="end">Email : </Typography>
            <Typography
              fontWeight={600}
              sx={{ textTransform: "lowercase !important" }}
            >
              {email}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.75em 0.5em",
              alignItems: "center",
              justifyContent: "center",
              "& >.MuiTypography-root ": {
                textTransform: "capitalize",
                fontSize: "14pt",
              },
            }}
          >
            <Typography textAlign="end">Address : </Typography>
            <Typography fontWeight={600}>{address}</Typography>

            <Typography textAlign="end">City : </Typography>
            <Typography fontWeight={600}>{city}</Typography>

            <Typography textAlign="end">Province : </Typography>
            <Typography fontWeight={600}>{province}</Typography>
            <Typography textAlign="end">Request Date : </Typography>
            <Typography fontWeight={600}>
              {createdAt &&
                format(new Date(createdAt), "hh:mm a - MMMM dd, yyyy")}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ m: "1em 0" }} />
        <Box>
          <Typography
            variant="h3"
            textTransform="uppercase"
            sx={{ margin: "15px 0 10px 0" }}
          >
            Item Details
          </Typography>
          <Box
            sx={{
              borderTop: `solid 1px ${colors.primary[500]}`,
              mt: 2,
              height: "200px",
            }}
          >
            <TableContainer>
              <Table sx={{ minWidth: "100%" }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Lot Number</TableCell>
                    <TableCell align="left">Generic Name</TableCell>
                    <TableCell align="left">Brand Name</TableCell>
                    <TableCell align="left">Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items &&
                    items.map((val, key) => {
                      return (
                        <TableRow
                          sx={{
                            "& > td ": {
                              textTransform: "capitalize",
                            },
                          }}
                        >
                          <TableCell>{val?.lotNum}</TableCell>
                          <TableCell>{val?.genericName}</TableCell>
                          <TableCell>{val?.brandName}</TableCell>
                          <TableCell>{val?.quantity}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default RequestDetails;
