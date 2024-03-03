import React, { useState } from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";

// material-ui
import {
  Grid,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Divider,
  Modal,
  Typography,
  InputAdornment,
  Pagination,
  TextField,
  styled,
  tableCellClasses,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { IconSearch } from "@tabler/icons";
import ClearIcon from "@mui/icons-material/Clear";
import { Edit, } from '@mui/icons-material/';
import MuiTooltip from "@mui/material/Tooltip";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CloseIcon from "@mui/icons-material/Close";

// project imports
import MainCard from "ui-component/cards/MainCard";
import { getUsers, EditSingleUser, UserDelete } from "../../../store/slices/subscribersAction";
import { useDispatch } from "store";
import { openSnackbar } from "store/slices/snackbar";
import { UserTableLoader3 } from "ui-component/cards/Skeleton/TableLoader";

// assets

// third-party
import { connect, useSelector } from "react-redux";
import moment from "moment";

// ==============================|| TABLE - DATA TABLE ||============================== //
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#5DADE2",
    color: "white",
    fontWeight: 800,
    lineHeight: "18px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const Records = (props) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [search, setSearch] = React.useState("");
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(1);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);

  const [editModal, setEditModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  const [editData, setEditData] = useState({})
  const [deleteData, setDeleteData] = useState({})
  const [deleteID, setDeleteID] = useState("")

  // loader
  const [deleteLoading, setDeleteLoading] = useState(false)

  const rows = [
    { user_name: "Test User", company_name: "Zomato", position: "Developer", phone_number: "+91 9876543210", email: "test@gmail.com" },
    { user_name: "John Doe", company_name: "Google", position: "Tester", phone_number: "+91 1234657890", email: "user@gmail.com" },
    { user_name: "Nikhil", company_name: "Mircosoft", position: "Business", phone_number: "+91 7894561320", email: "unknown@gmail.com" },
  ]

  const subscriber = useSelector((state) => state.subscriber);

  const { userList, loading } = subscriber;

  const handleChange = (e, p) => {
    setPage(p);
    props.getUsers(p, rowsPerPage, "");
  };

  const handleClearSearch = () => {
    setSearch("");
    props.getUsers(1, rowsPerPage, "");
  };

  // table data
  // const rows = userList.docs;

  // table filter
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const getComparator = (order, orderBy) =>
    order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  // table header
  const headCells = [
    {
      id: "name",
      numeric: true,
      disablePadding: false,
      label: "Name",
      sortable: false,
      colSpan: "1",
      align: 'left'
    },
    {
      id: "company_name",
      numeric: true,
      disablePadding: false,
      label: "Company Name",
      sortable: false,
      colSpan: "1",
      align: 'left'
    },
    {
      id: "position",
      numeric: true,
      disablePadding: false,
      label: "Position",
      sortable: false,
      colSpan: "1",
      align: 'left'
    },
    {
      id: "phone_number",
      numeric: true,
      disablePadding: false,
      label: "Phone Number",
      sortable: false,
      colSpan: "1",
      align: 'left'
    },
    {
      id: "email",
      numeric: true,
      disablePadding: false,
      label: "Email",
      sortable: true,
      colSpan: "1",
      align: 'left'
    },
  ];

  // ==============================|| TABLE - HEADER ||============================== //

  function EnhancedTableHead({
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  }) {
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <StyledTableCell
              colSpan={headCell.colSpan}
              key={headCell.id}
              align={headCell.align}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{
                padding: " 16px",
                background: "#5DADE2",
                align: "left",
              }}
            >
              {headCell.label}
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    // numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    // onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  // ==============================|| Status Change ||============================== //

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleSearch = async (event) => {
    const newString = event?.target.value;
    setSearch(newString);
  };

  const onFieldKeyPress = (e) => {
    if (e.target.name === "search") {
      if (e.key === "Enter") {
        props.getUsers(1, rowsPerPage, e.target.value.replace(/\s+/g, ''));
      }
    }
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleClickEditOpen = (data) => {
    setEditModal(true)
    setEditData(data)
  }

  const handleClickDeleteOpen = (data) => {
    setDeleteModal(true)
    setDeleteID(data._id)
    setDeleteData(data)
  }

  //delete the user
  const handledelete = () => {
    const newData = { status: 3 };
    const { page } = userList;

    setDeleteLoading(true);

    props.UserDelete(deleteID).then((res) => {
      setDeleteModal(false)
      props.getUsers(page, rowsPerPage, "").then((response) => {
        setDeleteLoading(false);
        // setGameTableData(response?.data?.result?.docs)
      })
      let message = "";
      dispatch(
        openSnackbar({
          open: true,
          message: 'User Account deleted successfully',
          variant: "alert",
          alert: {
            color: "success",
          },
          transition: "Fade",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        })
      );
    });
    // setEditModal(false);
  };

  const handleStatusChange = (data) => {

    const newData = data.status === 1 ? 2 : 1;
    const { page } = userList;

    const statusData = {
      "userId": data._id,
      "status": data.status === 1 ? 2 : 1
    }

    props.EditSingleUser(statusData).then((res) => {
      props.getUsers(page, rowsPerPage, search).then((response) => {
        // setGameTableData(response?.data?.result?.docs)
      })
      let message = "";
      dispatch(
        openSnackbar({
          open: true,
          message: data.status === 1 ? "Status change successfully" : "Status change successfully",
          variant: "alert",
          alert: {
            color: "success",
          },
          transition: "Fade",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        })
      );
    }).catch((err) => {
      dispatch(
        openSnackbar({
          open: true,
          message: err.response.data.message,
          variant: "alert",
          alert: {
            color: "error",
          },
          transition: "Fade",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        })
      );
    });
  };

  return (
    <>
      <MainCard
        content={false}
        title={
          <Typography sx={{ color: "#616161", fontSize: "18px" }} variant="h5">
            Exhibition Form Records
          </Typography>
        }
        secondary={
          <>
            <TextField
              type="text"
              name="search"
              label={"Search by name"}
              value={search}
              fullWidth
              // onKeyPress={(e) => onFieldKeyPress(e)}
              onChange={handleSearch}
              startAdornment={
                <InputAdornment position="start">
                  <IconSearch stroke={1.5} size="1rem" />
                </InputAdornment>
              }
              InputProps={{
                endAdornment: (
                  <IconButton
                    sx={{ display: search ? "" : "none" }}
                    onClick={handleClearSearch}
                  >
                    <ClearIcon />
                  </IconButton>
                ),
              }}
              sx={{
                width: "100%",
                [theme.breakpoints.down("sm")]: {
                  // mb:1
                  width: "100%",
                },
              }}
              size="small"
            />
          </>
        }
      >

        <Paper sx={{ width: "100%" }}>
          <Divider />
          {/* table */}
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {rows.length > 0 &&
                  stableSort(rows, getComparator(order, orderBy)).map(
                    (row, index) => {
                      /** Make sure no display bugs if row isn't an OrderData object */
                      if (typeof row === "number") return null;

                      return (
                        <TableRow tabIndex={-1} key={index}>
                          <TableCell align="left">{row.user_name ? row.user_name : "-"}</TableCell>
                          <TableCell align="left">{row.company_name ? row.company_name : '-'}</TableCell>
                          <TableCell align="left">{row.position ? row.position : '-'}</TableCell>
                          <TableCell align="left">{row.phone_number ? row.phone_number : '-'}</TableCell>
                          <TableCell align="left">{row.email ? row.email : '-'}</TableCell>
                        </TableRow>
                      );
                    }
                  )}
                {/* {loading && <UserTableLoader3 rows={10} />} */}
                {!loading && rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <Grid item xs={12} display="flex" justifyContent="center">
                        <Typography gutterBottom sx={{ m: 2 }}>
                          No Records Found
                        </Typography>
                      </Grid>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

        </Paper>

        <Grid item xs={12} sx={{ p: 3 }}>
          <Grid container justifyContent="space-between" spacing={2}>
            <Grid item>
              {!loading && (
                <Pagination
                  count={userList.totalPages}
                  color="primary"
                  page={page}
                  onChange={handleChange}
                />
              )}
            </Grid>
          </Grid>
        </Grid>

      </MainCard>

      {/* Delete Box */}
      <Dialog
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ p: 3 }}
      >
        {deleteModal && (
          <>
            <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>
              Are you sure ?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description" style={{ textAlign: 'center' }}>
                <Typography variant="body2" component="span">
                  Are you sure want to delete {deleteData.firstName} {deleteData.lastName}?
                </Typography>
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ pr: 2.5 }}>
              <Button
                sx={{
                  color: theme.palette.error.dark,
                  borderColor: theme.palette.error.dark,
                }}
                disabled={deleteLoading}
                onClick={() => setDeleteModal(false)}
                color="secondary"
              >
                Cancel
              </Button>

              {deleteLoading === true ? (
                <Button
                  onClick={handledelete}
                  autoFocus
                  variant="contained"
                  disabled
                  sx={{
                    mr: 2,
                    pl: 2,
                    background: theme.palette.error.main,
                    "&:hover": { background: theme.palette.error.dark },
                  }}
                >
                  Ok
                </Button>
              ) : (
                <Button
                  onClick={handledelete}
                  autoFocus
                  variant="contained"
                  sx={{
                    mr: 2,
                    pl: 2,
                    background: theme.palette.error.main,
                    "&:hover": { background: theme.palette.error.dark },
                  }}
                >
                  Ok
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>

    </>
  );
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { getUsers, EditSingleUser, UserDelete })(Records);
