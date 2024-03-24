import { Fragment, useState } from 'react';

// mui import
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Popper from "@mui/material/Popper";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import MuiAutocomplete from "@mui/material/Autocomplete";

// project imports
import CompanyLogo from "../assets/logo.png";
import FooterImg from "../assets/Footer.png";
import CountryCodeArr from "../helper/CountryCodeArr";
import ButtonLoader from "../ui-component/ButtonLoader";
import AuthWrapper1 from "../ui-component/FormWrapper";
import { AddRecord } from '../actions/formApi';

// third-party
import { useFormik } from "formik";
import * as Yup from "yup";

const Form = () => {

    const [submitLoader, setSubmitLoader] = useState(false);

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [errOpen, setErrOpen] = useState(false)
    const [errMsg, setErrMsg] = useState("")

    const validationSchema = Yup.object({
        user_name: Yup.string().required("Name is required").max(52, "Name should be not more than 52 characters"),
        company_name: Yup.string().required("Company name is required"),
        position: Yup.string().max(52, "Position should be not more than 52 characters"),
        contact_number: Yup.string().required("Phone number is required").min(5, "Phone number must min 5 characters").max(16, 'Phone number should be not more than 16 characters'),
        country_code: Yup.mixed().when("contact_number", {
            is: (value) => value?.length,
            then: (schema) => schema.required("Country code is required"),
            otherwise: (schema) => schema.nullable(),
        }),
        email: Yup.string().email('Email must be valid').required("Email is required"),
    })

    const formik = useFormik({
        initialValues: {
            user_name: "",
            company_name: "",
            position: "",
            country_code: "",
            contact_number: "",
            email: "",
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {

            setSubmitLoader(true);

            const data = {
                user_name: values.user_name,
                company_name: values.company_name,
                position: values.position,
                country_code: values.country_code,
                contact_number: values.contact_number,
                email: values.email,
            };

            AddRecord(data).then((res) => {
                // console.log(res);
                setOpen(true)
                setMessage(res?.data?.message)
                setSubmitLoader(false);
                resetForm();
            }).catch((err) => {
                console.log("err", err);
                setSubmitLoader(false);
                setErrOpen(true)
                setErrMsg(err?.response?.data?.message)
            })

        },
    });

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false)
        setMessage("")
        setErrOpen(false)
        setErrMsg("")
    }

    return (
        <Fragment>
            <AuthWrapper1>

                <Grid
                    container
                    direction="column"
                    justifyContent="flex-end"
                    sx={{ minHeight: "92vh" }}
                >
                    <Grid item xs={12}>
                        <Grid
                            container
                            justifyContent="center"
                            alignItems="flex-start"
                            sx={{ minHeight: "calc(100vh - 68px)" }}
                        >
                            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                                <Box sx={{ p: { xs: 2, sm: 3, xl: 5 }, width: { xs: "auto", sm: "400px" } }}>
                                    <Grid
                                        container
                                        spacing={2}
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Grid item xs={12} sx={{ pt: "12px !important" }}>
                                            <Grid
                                                container
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Grid item>
                                                    <img src={CompanyLogo} alt="FAIRCHEM" />
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12}>

                                            <form noValidate onSubmit={formik.handleSubmit} id="exhibition-visitor-detail-form">

                                                <Grid container spacing={2}>

                                                    {/* Name */}
                                                    <Grid item xs={12} sm={12} sx={{ pt: "12px !important" }}>
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                fontSize: "0.875rem",
                                                                color: "rgb(33, 33, 33)",
                                                                lineHeight: "1.75",
                                                            }}
                                                            gutterBottom
                                                        >
                                                            Name<span style={{ color: "red" }}>*</span>
                                                        </Typography>
                                                        <TextField
                                                            type="text"
                                                            name="user_name"
                                                            value={formik.values.user_name}
                                                            onChange={formik.handleChange}
                                                            InputProps={{ sx: { borderRadius: 2 } }}
                                                            placeholder="Name"
                                                            fullWidth
                                                            size="small"
                                                        />
                                                        {formik.touched.user_name &&
                                                            formik.errors.user_name && (
                                                                <Typography
                                                                    component="p"
                                                                    variant="caption"
                                                                    sx={{ color: "red" }}
                                                                    className="invalid-text "
                                                                >
                                                                    {formik.errors.user_name}
                                                                </Typography>
                                                            )}
                                                    </Grid>

                                                    {/* Company Name */}
                                                    <Grid item xs={12} sm={12} sx={{ pt: "12px !important" }}>
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                fontSize: "0.875rem",
                                                                color: "rgb(33, 33, 33)",
                                                                lineHeight: "1.75",
                                                            }}
                                                            gutterBottom
                                                        >
                                                            Company Name<span style={{ color: "red" }}>*</span>
                                                        </Typography>
                                                        <TextField
                                                            type="text"
                                                            name="company_name"
                                                            value={formik.values.company_name}
                                                            onChange={formik.handleChange}
                                                            InputProps={{ sx: { borderRadius: 2 } }}
                                                            placeholder="Company Name"
                                                            fullWidth
                                                            size="small"
                                                        />
                                                        {formik.touched.company_name &&
                                                            formik.errors.company_name && (
                                                                <Typography
                                                                    component="p"
                                                                    variant="caption"
                                                                    sx={{ color: "red" }}
                                                                    className="invalid-text "
                                                                >
                                                                    {formik.errors.company_name}
                                                                </Typography>
                                                            )}
                                                    </Grid>

                                                    {/* Position */}
                                                    <Grid item xs={12} sm={12} sx={{ pt: "12px !important" }}>
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                fontSize: "0.875rem",
                                                                color: "rgb(33, 33, 33)",
                                                                lineHeight: "1.75",
                                                            }}
                                                            gutterBottom
                                                        >
                                                            Position
                                                        </Typography>
                                                        <TextField
                                                            type="text"
                                                            name="position"
                                                            value={formik.values.position}
                                                            onChange={formik.handleChange}
                                                            InputProps={{ sx: { borderRadius: 2 } }}
                                                            placeholder="Position"
                                                            fullWidth
                                                            size="small"
                                                        />
                                                        {formik.touched.position &&
                                                            formik.errors.position && (
                                                                <Typography
                                                                    component="p"
                                                                    variant="caption"
                                                                    sx={{ color: "red" }}
                                                                    className="invalid-text "
                                                                >
                                                                    {formik.errors.position}
                                                                </Typography>
                                                            )}
                                                    </Grid>

                                                    {/* Contact Number */}
                                                    <Grid container xs={12} md={12} justifyContent="space-between">
                                                        <Grid item xs={12} sx={{ mt: "12px", ml: "18px", }}>
                                                            <Typography variant="h5" sx={{ fontSize: "0.875rem", color: "rgb(33, 33, 33)", lineHeight: "1.75", }} fullWidth>
                                                                Phone Number<span style={{ color: "red" }}>*</span>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={5} sx={{ mt: "3px", ml: 2 }}>
                                                            <MuiAutocomplete
                                                                id="country_code"
                                                                name="country_code"
                                                                onChange={(e, value) => {
                                                                    formik.setFieldValue("country_code", value.phone);
                                                                }}
                                                                options={CountryCodeArr}
                                                                disableClearable={true} // hides the clear button
                                                                value={formik.values.country_code}
                                                                PopperComponent={(props) => (
                                                                    <Popper
                                                                        {...props}
                                                                        placement="bottom-start"
                                                                        class="country-code-popup"
                                                                    // style={{ width: 172,  }}
                                                                    />
                                                                )}
                                                                renderOption={(props, option) => (
                                                                    <Box component="li" {...props} key={option.label} sx={{ fontSize: "12px" }}>
                                                                        <img
                                                                            loading="lazy"
                                                                            width="20"
                                                                            style={{ paddingRight: "5px" }}
                                                                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                                            // srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
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
                                                                size='small'
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
                                                        <Grid item xs={6} sx={{ mt: "3px" }}>
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
                                                                size='small'
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

                                                    {/* Email */}
                                                    <Grid item xs={12} sm={12} sx={{ pt: "12px !important" }}>
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                fontSize: "0.875rem",
                                                                color: "rgb(33, 33, 33)",
                                                                lineHeight: "1.75",
                                                            }}
                                                            gutterBottom
                                                        >
                                                            Email<span style={{ color: "red" }}>*</span>
                                                        </Typography>
                                                        <TextField
                                                            type="email"
                                                            name="email"
                                                            value={formik.values.email}
                                                            onChange={formik.handleChange}
                                                            InputProps={{ sx: { borderRadius: 2 } }}
                                                            placeholder="Email"
                                                            fullWidth
                                                            size="small"
                                                        />
                                                        {formik.touched.email &&
                                                            formik.errors.email && (
                                                                <Typography
                                                                    component="p"
                                                                    variant="caption"
                                                                    sx={{ color: "red" }}
                                                                    className="invalid-text "
                                                                >
                                                                    {formik.errors.email}
                                                                </Typography>
                                                            )}
                                                    </Grid>

                                                </Grid>


                                                <Box sx={{ mt: 2 }}>
                                                    <Button
                                                        className='submit-btn'
                                                        fullWidth
                                                        size="large"
                                                        type="submit"
                                                        variant="contained"
                                                    >
                                                        {submitLoader ? <ButtonLoader /> : "Submit"}
                                                    </Button>
                                                </Box>


                                                <Grid item xs={12} sx={{ pt: 4 }}>
                                                    <Grid
                                                        container
                                                        alignItems="center"
                                                        justifyContent="center"
                                                    >
                                                        <Grid item>
                                                            <img src={FooterImg} alt="FAIRCHEM" />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                            </form>

                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </AuthWrapper1>

            <Snackbar open={open} autoHideDuration={4000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert autoHideDuration={4000} onClose={handleSnackbarClose} severity="success" variant="filled" >
                    {message}
                </Alert>
            </Snackbar>

            <Snackbar open={errOpen} autoHideDuration={4000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert autoHideDuration={4000} onClose={handleSnackbarClose} severity="error" variant="filled" >
                    {errMsg}
                </Alert>
            </Snackbar>
        </Fragment>
    )
}

export default Form