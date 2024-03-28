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
  IconButton,
  Divider,
  Typography,
  InputAdornment,
  Pagination,
  TextField,
  styled,
  tableCellClasses,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { IconSearch } from "@tabler/icons";
import ClearIcon from "@mui/icons-material/Clear";

// project imports
import useRecursiveTimeout from "Helpers/useRecursiveTimeout";
import MainCard from "ui-component/cards/MainCard";
import { getRecords } from "../../../store/slices/recordAction";

// assets

// third-party
import { connect, useSelector } from "react-redux";

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
  const [search, setSearch] = React.useState("");
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(1);
  const [dense] = React.useState(false);

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
                    </TableRow>
                  )) : loading ? (
                    <TableRow>
                      <TableCell colSpan={12} sx={{ textAlign: 'center' }}>
                        <CircularProgress color='inherit' variant='indeterminate' />
                      </TableCell>
                    </TableRow>
                  )
                    : (
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

    </>
  );
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { getRecords })(Records);
