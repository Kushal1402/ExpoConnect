import { useState, forwardRef } from "react";
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
import CloseIcon from '@mui/icons-material/Close';

// project imports
import AnimateButton from "ui-component/extended/AnimateButton";
import { openSnackbar } from "store/slices/snackbar";
import { getCsvFile } from "../../../store/slices/recordAction";

// third party
import * as Yup from "yup";
import moment from "moment";
import { useFormik } from "formik";
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

const ExportRecord = (props) => {
    const dispatch = useDispatch();

    const { open, cancelClose, confirmClose, getCsvFile } = props;

    const [submitLoader, setSubmitLoader] = useState(false);

    return (
        <div style={{ margin: "auto" }}>
            <BootstrapDialog open={open} onClose={cancelClose} TransitionComponent={Transition}>

                <BootstrapDialogTitle onClose={cancelClose}>
                    Export Records to CSV
                </BootstrapDialogTitle>

                <DialogContent>

                </DialogContent>

                <DialogActions>
                    <Grid container spacing={2} justifyContent='center'>
                        <Grid item>
                            <Button variant='outlined' color='error' disabled={submitLoader} onClick={confirmClose}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item>
                            <AnimateButton>
                                <Button fullWidth type="submit" variant="contained" disabled={submitLoader} sx={{ background: "rgb(25, 118, 210)" }}>
                                    {submitLoader ? <CircularProgress variant="indeterminate" color="inherit" size={24} /> : "Submit"}
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </DialogActions>

            </BootstrapDialog>
        </div>
    )
}
export default connect(null, { getCsvFile })(ExportRecord);