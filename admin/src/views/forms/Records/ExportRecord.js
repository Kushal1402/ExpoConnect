import { useState, forwardRef } from "react";
import PropTypes from "prop-types";

// material-ui
import {
    Grid,
    Slide,
    Button,
    styled,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField,
    FormHelperText,
    Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

// project imports
import AnimateButton from "ui-component/extended/AnimateButton";
import { openSnackbar } from "store/slices/snackbar";
import { getCsvFile } from "../../../store/slices/recordAction";

// third party
import * as Yup from "yup";
import moment from "moment";
import { useFormik } from "formik";
import { connect, useDispatch } from "react-redux";
import { saveAs } from 'file-saver';

const Transition = forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-paper": {
        maxWidth: "450px",
        width: '100%',
    },
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

    const formik = useFormik({
        initialValues: {
            filter_value: "",
            start_date: "",
            end_date: "",
        },
        validationSchema: Yup.object({
            filter_value: Yup.string()
                .required("Record filter value is required")
                .oneOf(["all", "selected"], "Please select any of the record filter value"),
            start_date: Yup.date().when("filter_value", {
                is: "selected",
                then: Yup.date()
                    .typeError("Start date is invalid or empty")
                    .required("Start date is required")
                    .max(new Date(), "Start date must be less than or equal to today"),
                else: Yup.date().nullable(),
            }),
            end_date: Yup.date().when("filter_value", {
                is: "selected",
                then: Yup.date()
                    .typeError("End date is invalid or empty")
                    .required("End date is required")
                    .min(Yup.ref("start_date"), "End date must be greater than start date")
                    .max(new Date(), "End date must be less than or equal to today"),
                else: Yup.date().nullable(),
            }),
        }),
        onSubmit: async (values, { resetForm }) => {
            // console.log("🚀 ~ file: ExportRecord.js ~ ExportRecord ~ values", values)
            setSubmitLoader(true);

            getCsvFile({ start_date: values.start_date ? moment(values.start_date).format("MM-DD-YYYY") : null, end_date: values.end_date ? moment(values.end_date).format("MM-DD-YYYY") : null }).then((res) => {
                // console.log("🚀 ~ file: ExportRecord.js getCsvFile ~ res", res);
                if (res.data.generated_file) {
                    saveAs(res.data.generated_file, res.data.file_name);
                    setSubmitLoader(false);
                } else {
                    setSubmitLoader(false);
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: "No csv file found",
                            variant: "alert",
                            alert: {
                                color: "error",
                            },
                            transition: "Fade",
                            anchorOrigin: { vertical: "top", horizontal: "right" },
                        })
                    );
                }
                confirmClose();
                resetForm();
            }).catch((error) => {
                setSubmitLoader(false);
                dispatch(
                    openSnackbar({
                        open: true,
                        message: error.response.data.message,
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
    });

    const handleChange = (event) => {
        // console.log("🚀 ~ handleChange ~ event:", event)
        formik.setFieldValue("filter_value", event.target.value);

        if (event.target.value === "all") {
            formik.setFieldValue("start_date", "");
            formik.setFieldValue("end_date", "");
        }
    };

    const HandleStartDateChange = (newValue) => {
        formik.setFieldValue("start_date", newValue);

        const date = moment(newValue, 'DD/MM/YYYY');
        const now = moment(formik.values.end_date, 'DD/MM/YYYY');

        if (date.isAfter(now)) {
            const newEndDate = date.clone().add(1, 'day');
            formik.setFieldValue("start_date", newEndDate);
        }
        else if (date.isBefore(now)) {
            const newEndDate = date.clone().add(1, 'day');
            formik.setFieldValue("start_date", newEndDate);
        }
    }

    // console.log(formik.errors, "formik.values", formik.values)
    return (
        <div style={{ margin: "auto" }}>
            <BootstrapDialog open={open} onClose={cancelClose} TransitionComponent={Transition}>

                <BootstrapDialogTitle onClose={cancelClose}>
                    Export Records to CSV
                </BootstrapDialogTitle>

                <form noValidate onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
                    <DialogContent dividers>

                        <Grid container spacing={0.5}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <FormControl error={Boolean(formik.errors.filter_value)}>
                                    <RadioGroup
                                        aria-labelledby="record-selection-form"
                                        name="filter_value"
                                        value={formik.values.filter_value}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel sx={{ "& .MuiFormControlLabel-label": { fontSize: "1rem" } }} value="all" control={<Radio />} label="Export all record" />
                                        <FormControlLabel sx={{ "& .MuiFormControlLabel-label": { fontSize: "1rem" } }} value="selected" control={<Radio />} label="Select date & export" />
                                    </RadioGroup>
                                    {formik.touched.filter_value && formik.errors.filter_value && (
                                        <FormHelperText sx={{ ml: 0.5, mt: 0, fontSize: "0.875rem" }}>{formik.errors.filter_value}</FormHelperText>
                                    )}

                                    {formik.values.filter_value === "selected" && (
                                        <>
                                            <Grid container alignItems="center" justifyContent="right" spacing={1}>
                                                {/* Start Date */}
                                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        <DatePicker
                                                            id="start_date"
                                                            name="start_date"
                                                            label="Start Date"
                                                            maxDate={new Date()}
                                                            fullWidth
                                                            renderInput={(props) => (
                                                                <TextField
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    {...props}
                                                                    error={false}
                                                                    color="secondary"
                                                                />
                                                            )}
                                                            value={formik.values.start_date}
                                                            onChange={(newValue) => HandleStartDateChange(newValue)}
                                                        />
                                                    </LocalizationProvider>
                                                </Grid>

                                                {/* End Date */}
                                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        <DatePicker
                                                            id="end_date"
                                                            name="end_date"
                                                            label="End Date"
                                                            fullWidth
                                                            minDate={formik.values.start_date}
                                                            maxDate={new Date()}
                                                            renderInput={(props) => (
                                                                <TextField
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    {...props}
                                                                    error={false}
                                                                    color="secondary"
                                                                />
                                                            )}
                                                            value={formik.values.end_date}
                                                            onChange={(newValue) => formik.setFieldValue("end_date", newValue)}
                                                        />
                                                    </LocalizationProvider>
                                                </Grid>
                                            </Grid>

                                            <Grid container alignItems="center" justifyContent="right" spacing={1}>
                                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                                    {formik.touched.start_date && formik.errors.start_date && (
                                                        <Typography component="p" variant="caption" sx={{ color: "red" }} className="invalid-text ">
                                                            {formik.errors.start_date}
                                                        </Typography>
                                                    )}
                                                </Grid>

                                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                                    {formik.touched.end_date && formik.errors.end_date && (
                                                        <Typography component="p" variant="caption" sx={{ color: "red" }} className="invalid-text ">
                                                            {formik.errors.end_date}
                                                        </Typography>
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>

                    </DialogContent>

                    <DialogActions>
                        <Grid container spacing={2} justifyContent='center'>
                            <Grid item>
                                <Button variant='outlined' color='error' disabled={submitLoader} onClick={cancelClose} sx={{ borderRadius: "8px", }}>
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <AnimateButton>
                                    <Button fullWidth type="submit" variant="contained" disabled={submitLoader} sx={{ background: "#025DBF", borderRadius: "8px", }}>
                                        {submitLoader ? <CircularProgress variant="indeterminate" color="inherit" size={24} /> : "Download"}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </DialogActions>
                </form>

            </BootstrapDialog>
        </div>
    )
}
export default connect(null, { getCsvFile })(ExportRecord);