import React, { useState, forwardRef } from 'react';
import PropTypes from "prop-types";

// material-ui
import {
    Grid,
    Slide,
    Button,
    Typography,
    styled,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
} from "@mui/material";

// project imports
import AnimateButton from "ui-component/extended/AnimateButton";
import { deleteRecords } from "../../../store/slices/recordAction";
import { openSnackbar } from "store/slices/snackbar";

// assets
import DeleteIcon from "assets/images/DeleteIcon.svg";

// third-party
import { connect, useDispatch } from "react-redux";

const Transition = forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuDialogContent-root': {
        padding: theme.spacing(2)
    },
    '& .MuDialogActions-root': {
        padding: theme.spacing(1)
    }
}));
const BootstrapDialogTitle = ({ children, onClose, ...other }) => (
    <DialogTitle sx={{ m: 0, p: "4px 20px", display: 'flex', justifyContent: "center", color: "#000000" }} {...other}>
        {children}
    </DialogTitle>
);
BootstrapDialogTitle.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node
};

const DeleteConfirmPopup = (props) => {
    const dispatch = useDispatch();

    // console.log("🚀 ~ DeleteConfirmPopup ~ props:", props)

    const { open, cancelClose, confirmClose, record_ids, deleteRecords } = props;

    const [submitLoader, setSubmitLoader] = useState(false);

    const handleSubmit = () => {
        setSubmitLoader(true);
        let delete_id = record_ids;

        deleteRecords({ id: delete_id }).then((res) => {
            // console.log("res", res);
            setSubmitLoader(false);
            confirmClose();
            dispatch(
                openSnackbar({
                    open: true,
                    message: res.data.message,
                    variant: "alert",
                    alert: {
                        color: "success",
                    },
                    transition: "Fade",
                    anchorOrigin: { vertical: "top", horizontal: "right" },
                })
            );
        }).catch((err) => {
            console.log("err", err);
            setSubmitLoader(false);
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
    }

    return (
        <div style={{ margin: "auto" }}>
            <BootstrapDialog open={open} onClose={cancelClose} TransitionComponent={Transition}>

                <BootstrapDialogTitle>
                    <img src={DeleteIcon} alt="" />
                </BootstrapDialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography
                            sx={{
                                textAlign: "center",
                                fontSize: "16px",
                                fontWeight: 500,
                                color: "#252525",
                                pt: 3
                            }}
                        >
                            Do you want to permanently delete {record_ids && record_ids.length ? record_ids.length : ""} record(s) ?
                        </Typography>
                    </DialogContentText>
                </DialogContent>

                <DialogActions sx={{ pr: 4.5, pl: 4.5, pb: 2, pt: 0.8 }}>
                    <Grid container spacing={2} justifyContent='center'>
                        <Grid item>
                            <Button variant='outlined' color='error' disabled={submitLoader} onClick={cancelClose} sx={{ borderRadius: "8px", }}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item>
                            <AnimateButton>
                                <Button fullWidth type="submit" variant="contained" disabled={submitLoader} onClick={() => handleSubmit()} sx={{ background: "#025DBF", borderRadius: "8px", }}>
                                    {submitLoader ? <CircularProgress variant="indeterminate" color="inherit" size={24} /> : "Confirm"}
                                </Button>
                            </AnimateButton>
                        </Grid>

                    </Grid>
                </DialogActions>

            </BootstrapDialog>
        </div >
    )
}

export default connect(null, { deleteRecords })(DeleteConfirmPopup)