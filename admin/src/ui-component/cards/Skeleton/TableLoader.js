import { Skeleton, TableCell, TableRow } from "@mui/material";
import React from "react";

export function UsersTableLoader({ rows }) {
  return [...Array(rows)].map((elementInArray, index) => (
    <TableRow hover tabIndex={-1} key={index}>
      <TableCell align="left">
        <Skeleton variant="rectangular" width={40} sx={{ my: 1.5 }} />
      </TableCell>
      <TableCell align="left">
        <Skeleton variant="rectangular" sx={{ my: 1.5 }} />
      </TableCell>
      <TableCell align="left">
        <Skeleton variant="rectangular" sx={{ my: 1.5 }} />
      </TableCell>
      <TableCell align="left">
        <Skeleton variant="rectangular" sx={{ my: 1.5 }} />
      </TableCell>
      <TableCell align="left">
        <Skeleton variant="rectangular" sx={{ my: 1.5 }} />
      </TableCell>
      <TableCell align="left">
        <Skeleton variant="rectangular" width={50} sx={{ my: 1.5 }} />
      </TableCell>
      <TableCell align="left">
        <Skeleton variant="rectangular" sx={{ my: 1.5 }} />
      </TableCell>
    </TableRow>
  ));
}

export function UserTableLoader1({ rows }) {
  return [...Array(rows)].map((elementInArray, index) => (
    <TableRow hover tabIndex={-1} key={index}>
      <TableCell align="left">
        <Skeleton variant="rectangular" width={40} sx={{ my: 1.5 }} />
      </TableCell>
      <TableCell align="left">
        <Skeleton variant="rectangular" sx={{ my: 1.5 }} />
      </TableCell>
      <TableCell align="left">
        <Skeleton variant="rectangular" sx={{ my: 1.5 }} />
      </TableCell>
    </TableRow>
  ));
}

export function UserTableLoader2({ rows }) {
  return [...Array(rows)].map((elementInArray, index) => (
    <TableRow hover tabIndex={-1} key={index}>
      <TableCell align="left">
        <Skeleton variant="rectangular" width={40} sx={{ my: 1.5 }} />
      </TableCell>
      <TableCell align="left">
        <Skeleton variant="rectangular" sx={{ my: 1.5 }} />
      </TableCell>
      <TableCell align="left">
        <Skeleton variant="rectangular" width={40} sx={{ my: 1.5 }} />
      </TableCell>
      <TableCell align="left">
        <Skeleton variant="rectangular" sx={{ my: 1.5 }} />
      </TableCell>
      <TableCell align="left">
        <Skeleton variant="rectangular" width={40} sx={{ my: 1.5 }} />
      </TableCell>
      <TableCell align="left">
        <Skeleton variant="rectangular" sx={{ my: 1.5 }} />
      </TableCell>
      <TableCell align="left">
        <Skeleton variant="rectangular" width={40} sx={{ my: 1.5 }} />
      </TableCell>
      <TableCell align="left">
        <Skeleton variant="rectangular" sx={{ my: 1.5 }} />
      </TableCell>
      <TableCell align="left">
        <Skeleton variant="rectangular" width={40} sx={{ my: 1.5 }} />
      </TableCell>
    </TableRow>
  ));
}

export function UserTableLoader3({ rows }) {
  return [...Array(rows)].map((elementInArray, index) => (
    <TableRow hover tabIndex={-1} key={index}>
      <TableCell align="left">
        <Skeleton variant="rectangular" width={40} sx={{ my: 1.5 }} />
      </TableCell>
      <TableCell align="left">
        <Skeleton variant="rectangular" sx={{ my: 1.5 }} />
      </TableCell>
      <TableCell align="left">
        <Skeleton variant="rectangular" sx={{ my: 1.5 }} />
      </TableCell>
      <TableCell align="left">
        <Skeleton variant="rectangular" sx={{ my: 1.5 }} />
      </TableCell>
      <TableCell align="left">
        <Skeleton variant="rectangular" sx={{ my: 1.5 }} />
      </TableCell>
      <TableCell align="left">
        <Skeleton variant="rectangular" sx={{ my: 1.5 }} />
      </TableCell>
      <TableCell align="left">
        <Skeleton variant="rectangular" sx={{ my: 1.5 }} />
      </TableCell>
    </TableRow>
  ));
}

export function PrimaryTableLoader({ rows }) {
  return [...Array(rows)].map((elementInArray, index) => (
    <TableRow hover tabIndex={-1} key={index}>
      <TableCell align="left">
        <Skeleton variant="rectangular" width={40} sx={{ my: 1.5 }} />
      </TableCell>
      <TableCell align="left">
        <Skeleton variant="rectangular" sx={{ my: 1.5 }} />
      </TableCell>
      <TableCell align="left">
        <Skeleton variant="rectangular" sx={{ my: 1.5 }} />
      </TableCell>
      <TableCell align="left">
        <Skeleton variant="rectangular" width={60} sx={{ my: 1.5 }} />
      </TableCell>
    </TableRow>
  ));
}
