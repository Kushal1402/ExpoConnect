import React, { useEffect } from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";

// material-ui
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Divider,
  Typography,
  InputAdornment,
  Pagination,
  TextField,
  styled,
  tableCellClasses,
  CircularProgress,
  Tooltip,
  Zoom,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// project imports
import useRecursiveTimeout from "Helpers/useRecursiveTimeout";
import MainCard from "ui-component/cards/MainCard";
import { getRecords, getCsvFile } from "../../../store/slices/recordAction";
import EditRecord from "./EditRecord";
import { openSnackbar } from "store/slices/snackbar";

// assets
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ClearIcon from "@mui/icons-material/Clear";
import { IconSearch } from "@tabler/icons";

// third-party
import { connect, useSelector } from "react-redux";
import { saveAs } from 'file-saver';
import { useDispatch } from "store";

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
  const theme = useTheme();
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState("");
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(1);
  const [dense] = React.useState(false);

  // Edit State
  const [openEdit, setOpenEdit] = React.useState(false);
  const [recordData, setRecordData] = React.useState({});

  // Download Loading State
  const [downloadLoad, setDownloadLoad] = React.useState(false);

  useEffect(() => {
    props.getRecords(1, 10, "");
  }, [props])

  useRecursiveTimeout(async () => {
    if (search === "") {
      props.getRecords(page, 10, "");
    }
  }, 60000);

  const record = useSelector((state) => state.record);
  const { records, loading } = record;

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
    {
      id: "action",
      numeric: false,
      disablePadding: false,
      label: "Action",
      sortable: false,
      colspan: "1",
      align: "right"
    }
  ];

  // ==============================|| TABLE - HEADER ||============================== //
  function EnhancedTableHead({
    order,
    orderBy,
  }) {
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
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // ==============================|| Search ||============================== //
  const handleSearch = (event) => {
    const newString = event?.target.value;
    setSearch(newString);
    if (event.target.name === "search" && event.target.value !== "") {
      props.getRecords(1, 10, event.target.value.replace(/\s+/g, ''));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && search.length === 1) {
      props.getRecords(1, 10, '');
    }
  }

  const handleClearSearch = () => {
    setSearch("");
    props.getRecords(1, 10, "");
  };

  // ==============================|| Pagination ||============================== //
  const paginationHandle = async (e, p) => {
    setPage(p)
    await props.getRecords(p, 10, search);
  }

  // ==============================|| CSV Download ||============================== //
  const onExportCSVClick = (e) => {
    e.preventDefault();
    setDownloadLoad(true);

    props.getCsvFile().then((res) => {
      if (res.data.generated_file) {
        saveAs(res.data.generated_file, res.data.file_name);
        setDownloadLoad(false)
      } else {
        setDownloadLoad(false);
        dispatch(
          openSnackbar({
            open: true,
            message: "No csv file found",
            variant: "alert",
            alert: {
              color: "success",
            },
            transition: "Fade",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          })
        )
      }
    }).catch((err) => {
      setDownloadLoad(false)
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
      )
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
            <Grid container>
              <Grid item sx={{ display: "flex", justifyContent: "center", }}>

                <Button
                  variant="contained"
                  startIcon={downloadLoad === true ? null : <FileDownloadIcon />}
                  onClick={(e) => onExportCSVClick(e)}
                  disableElevation
                  sx={{
                    background: "#025DBF",
                    mr: "10px",
                    mt: '1px',
                    width: "200px",
                    height: "40px",
                    borderRadius: "8px",
                    lineHeight: '1.05',
                    textTransform: "none",
                  }}
                  size="small"
                >
                  {downloadLoad === true ? <CircularProgress size={24} color="inherit" /> : `Export as CSV`}
                </Button>

                <TextField
                  type="text"
                  name="search"
                  label={"Search"}
                  value={search}
                  fullWidth
                  onKeyDown={handleKeyDown}
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

              </Grid>
            </Grid>
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
                rowCount={records?.docs?.length}
              />
              <TableBody>
                {loading === false && records?.docs?.length > 0 ?
                  records?.docs?.map((row, i) => (
                    <TableRow hover tabIndex={-1} key={i}>
                      <TableCell align="left">{row.user_name ? row.user_name : "-"}</TableCell>
                      <TableCell align="left">{row.company_name ? row.company_name : '-'}</TableCell>
                      <TableCell align="left">{row.position ? row.position : '-'}</TableCell>
                      <TableCell align="left">{row.contact_number ? `${row.country_code} ${row.contact_number}` : '-'}</TableCell>
                      <TableCell align="left">{row.email ? row.email : '-'}</TableCell>
                      <TableCell align="right">
                        <Tooltip title={"Edit Record"} arrow TransitionComponent={Zoom}>
                          <IconButton
                            aria-label="edit"
                            color="primary"
                            size="medium"
                            onClick={(e) => {
                              setOpenEdit(true)
                              setRecordData(row)
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 12 12" fill="#5DADE2">
                              <path d="M0.000244141 9.84981V11.6151C0.000244141 11.8277 0.172592 12.0001 0.385207 12.0001H2.15432C2.25642 12.0001 2.35434 11.9595 2.42654 11.8873L9.70061 4.61324L7.39029 2.30298L0.113046 9.57749C0.0408194 9.64971 0.000244141 9.74764 0.000244141 9.84981Z" fill="#025DBF" />
                              <path d="M8.34399 1.34957L10.6542 3.65966L11.7784 2.53538C12.0791 2.23471 12.0791 1.74722 11.7784 1.44655L10.5574 0.225505C10.2567 -0.0751284 9.76928 -0.0751747 9.46863 0.225405L8.34399 1.34957Z" fill="#025DBF" />
                            </svg>
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  )) : loading ? (
                    <TableRow>
                      <TableCell colSpan={12} sx={{ textAlign: 'center' }}>
                        <CircularProgress color='inherit' variant='indeterminate' />
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow>
                      <TableCell colSpan={12} sx={{ textAlign: 'center' }}>
                        <Typography variant='body2' component='h6' >No record found</Typography>
                      </TableCell>
                    </TableRow>
                  )}
              </TableBody>
            </Table>
          </TableContainer>

        </Paper>

        <Grid container>
          <Grid item xs={12} sx={{ py: 2 }}>
            {!loading && (
              <Pagination
                count={records.totalPages}
                page={page}
                align="right"
                onChange={paginationHandle}
                sx={{
                  float: "right",
                  "& .Mui-selected": {
                    color: "#ffffff !important",
                    background: `#025DBF !important`,
                  }
                }}
              />
            )}
          </Grid>
        </Grid>

      </MainCard>

      {openEdit === true && (
        <EditRecord
          open={openEdit}
          close={() => {
            setOpenEdit(false)
            setRecordData({})
            props.getRecords(page, 10, "");
          }}
          record_data={recordData}
        />
      )}

    </>
  );
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { getRecords, getCsvFile })(Records);
