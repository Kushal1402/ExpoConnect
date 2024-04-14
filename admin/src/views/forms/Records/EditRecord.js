import { useState, forwardRef } from "react";
import PropTypes from "prop-types";

// material-ui
import {
    Grid,
    Box,
    Slide,
    Button,
    IconButton,
    TextField,
    Typography,
    styled,
    FormControl,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Autocomplete,
    Popper
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

// project imports
import CountryCodeArr from "Helpers/CountryCodeArr";
import AnimateButton from "ui-component/extended/AnimateButton";
import { updateRecord } from "../../../store/slices/recordAction";
import { useDispatch } from "store";
import { openSnackbar } from "store/slices/snackbar";

// assets

// third-party
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";

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
    <DialogTitle sx={{ m: 0, p: "4px 20px", display: 'flex', justifyContent: "space-between", color: "#000000" }} {...other}>
        {children}
        {onClose ? (
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{ padding: 0, color: "red" }}
            >
                <CloseIcon />
            </IconButton>
        ) : null}
    </DialogTitle>
);
BootstrapDialogTitle.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node
};

const EditRecord = (props) => {

    const dispatch = useDispatch();
    const { open, close, record_data, updateRecord } = props

    const [submitLoader, setSubmitLoader] = useState(false);

    const validationSchema = Yup.object({
        user_name: Yup.string().required("User name is required").max(52, "User name should be not more than 52 characters"),
        company_name: Yup.string().required("Company name is required").max(100, "Maximum 100 characters are allowed"),
        position: Yup.string().max(52, "Position should be not more than 52 characters"),
        contact_number: Yup.string().required("Phone number is required").min(5, "Phone number must min 5 characters").max(16, 'Phone number should be not more than 16 characters'),
        country_code: Yup.mixed().when("contact_number", {
            is: (value) => value?.length,
            then: (schema) => schema.required("Country code is required"),
            otherwise: (schema) => schema.nullable(),
        }),
        email: Yup.string().email('Email must be valid').required("Email is required"),
    })

    const onSubmit = (values, { resetForm }) => {
        console.log("values", values);

        setSubmitLoader(true);

        const data = {
            user_name: values.user_name,
            company_name: values.company_name,
            position: values.position,
            country_code: values.country_code,
            contact_number: values.contact_number,
            email: values.email
        };
        console.log("data:", data)

        updateRecord(data, record_data._id).then((res) => {
            console.log(res, "res");
            close();
            setSubmitLoader(false);
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
            resetForm();
        }).catch((error) => {
            console.log(error, "error")
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
        })
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            user_name: record_data?.user_name,
            company_name: record_data?.company_name,
            position: record_data?.position,
            country_code: record_data?.country_code,
            contact_number: record_data?.contact_number,
            email: record_data?.email
        },
        validationSchema,
        onSubmit
    });

    return (
        <div style={{ margin: "auto" }}>
            <BootstrapDialog open={open} onClose={close} TransitionComponent={Transition}>

                <BootstrapDialogTitle onClose={close}>
                    Edit Record
                </BootstrapDialogTitle>

                <Formik>
                    <form noValidate onSubmit={(e) => formik.handleSubmit(e)} id="record-edit-form">
                        <DialogContent dividers>

                            <Grid container spacing={1}>

                                {/* User Name */}
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <FormControl fullWidth>
                                        <Typography variant="body1" gutterBottom sx={{ color: "#000000", fontSize: { sm: "0.825rem", md: "0.85rem", lg: "0.95rem" } }}>
                                            User Name
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="User Name"
                                            name="user_name"
                                            type="text"
                                            value={formik.values.user_name ? formik.values.user_name : ""}
                                            onChange={formik.handleChange}
                                            error={Boolean(formik.touched.user_name && formik.errors.user_name)}
                                        />
                                        {formik.touched.user_name && formik.errors.user_name && (
                                            <Typography component="p" variant="caption" sx={{ color: "red" }}>
                                                {formik.errors.user_name}
                                            </Typography>
                                        )}
                                    </FormControl>
                                </Grid>

                                {/* Company name */}
                                <Grid item xs={12} sm={12} sx={{ pt: "12px !important" }}>
                                    <FormControl fullWidth>
                                        <Typography variant="body1" gutterBottom sx={{ color: "#000000", fontSize: { sm: "0.825rem", md: "0.85rem", lg: "0.95rem" } }}>
                                            Company Name
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="Company Name"
                                            name="company_name"
                                            type="text"
                                            value={formik.values.company_name ? formik.values.company_name : ""}
                                            onChange={formik.handleChange}
                                            error={Boolean(formik.touched.company_name && formik.errors.company_name)}
                                        />
                                        {formik.touched.company_name && formik.errors.company_name && (
                                            <Typography component="p" variant="caption" sx={{ color: "red" }}>
                                                {formik.errors.company_name}
                                            </Typography>
                                        )}
                                    </FormControl>
                                </Grid>

                                {/* Position */}
                                <Grid item xs={12} sm={12} sx={{ pt: "12px !important" }}>
                                    <FormControl fullWidth>
                                        <Typography variant="body1" gutterBottom sx={{ color: "#000000", fontSize: { sm: "0.825rem", md: "0.85rem", lg: "0.95rem" } }}>
                                            Position
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="Position"
                                            name="position"
                                            type="text"
                                            value={formik.values.position ? formik.values.position : ""}
                                            onChange={formik.handleChange}
                                            error={Boolean(formik.touched.position && formik.errors.position)}
                                        />
                                        {formik.touched.position && formik.errors.position && (
                                            <Typography component="p" variant="caption" sx={{ color: "red" }}>
                                                {formik.errors.position}
                                            </Typography>
                                        )}
                                    </FormControl>
                                </Grid>

                                {/* Contry Code - Contact Number */}
                                <Grid item xs={12} sm={12} sx={{ pt: "12px !important" }}>
                                    <Grid container spacing={1} justifyContent="space-between">
                                        <Grid item xs={12}>
                                            <Typography variant="body1" sx={{ fontSize: "0.875rem", color: "rgb(33, 33, 33)", lineHeight: "1.75", }} fullWidth>
                                                Phone Number
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Autocomplete
                                                id="country_code"
                                                name="country_code"
                                                options={CountryCodeArr}
                                                value={formik.values.country_code}
                                                onChange={(e, value) => {
                                                    formik.setFieldValue("country_code", value.phone);
                                                }}
                                                disableClearable={true} // hides the clear button
                                                defaultValue={formik.values.country_code ? formik.values.country_code : ""}
                                                renderOption={(props, option) => (
                                                    <Box component="li" {...props} key={option.label} sx={{ fontSize: "12px" }}>
                                                        <img
                                                            loading="lazy"
                                                            width="20"
                                                            style={{ paddingRight: "5px" }}
                                                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                            alt="flag-pic"
                                                        />
                                                        {option.label} {option.phone}
                                                    </Box>
                                                )}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Country Code"
                                                        inputProps={{
                                                            ...params.inputProps,
                                                            autoComplete: "new-number", // disable autocomplete and autofill
                                                        }}
                                                    />
                                                )}
                                                sx={{
                                                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                                        borderRadius: "8px",
                                                    },
                                                    '& .MuiFormLabel-root': {
                                                        fontSize: '14px',
                                                        marginTop: "0px",
                                                        color: "#a4a4a4"
                                                    },
                                                }}
                                            />
                                            {formik.touched.country_code &&
                                                formik.errors.country_code && (
                                                    <Typography
                                                        component="p"
                                                        variant="caption"
                                                        sx={{ color: "red" }}
                                                        className="invalid-text "
                                                    >
                                                        {formik.errors.country_code}
                                                    </Typography>
                                                )}
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                type="number"
                                                sx={{
                                                    "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button":
                                                    {
                                                        WebkitAppearance: "none",
                                                        margin: 0,
                                                    },
                                                    "input[type=number]": {
                                                        MozAppearance: "textfield",
                                                    },
                                                }}
                                                name="contact_number"
                                                value={formik.values.contact_number}
                                                onChange={formik.handleChange}
                                                InputProps={{ sx: { borderRadius: 2 } }}
                                                placeholder="Phone"
                                                fullWidth
                                            />
                                            {formik.touched.contact_number &&
                                                formik.errors.contact_number && (
                                                    <Typography
                                                        component="p"
                                                        variant="caption"
                                                        sx={{ color: "red" }}
                                                        className="invalid-text "
                                                    >
                                                        {formik.errors.contact_number}
                                                    </Typography>
                                                )}
                                        </Grid>
                                    </Grid>
                                </Grid>

                                {/* Email */}
                                <Grid item xs={12} sm={12} sx={{ pt: "12px !important" }}>
                                    <FormControl fullWidth>
                                        <Typography variant="body1" gutterBottom sx={{ color: "#000000", fontSize: { sm: "0.825rem", md: "0.85rem", lg: "0.95rem" } }}>
                                            Email
                                        </Typography>
                                        <TextField
                                            type="email"
                                            name="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            placeholder="Email"
                                            fullWidth
                                        />
                                        {formik.touched.email && formik.errors.email && (
                                            <Typography component="p" variant="caption" sx={{ color: "red" }} className="invalid-text">
                                                {formik.errors.email}
                                            </Typography>
                                        )}
                                    </FormControl>
                                </Grid>
                            </Grid>

                        </DialogContent>

                        <DialogActions>
                            <Grid container spacing={2} justifyContent='center'>
                                <Grid item>
                                    <AnimateButton>
                                        <Button fullWidth type="submit" variant="contained" disabled={submitLoader} sx={{ background: "rgb(25, 118, 210)" }}>
                                            {submitLoader ? <CircularProgress variant="indeterminate" color="inherit" size={24} /> : "Submit"}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                                <Grid item>
                                    <Button variant='outlined' color='error' disabled={submitLoader} onClick={close}>
                                        Cancel
                                    </Button>
                                </Grid>
                            </Grid>
                        </DialogActions>
                    </form>
                </Formik>

            </BootstrapDialog>
        </div>
    )
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { updateRecord })(EditRecord);