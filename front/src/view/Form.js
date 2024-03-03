import { Fragment, useState } from 'react';

// mui import
import { Divider, Grid, Stack, Typography, Card, Box, Button, TextField, Popper } from "@mui/material";
import MuiAutocomplete from "@mui/material/Autocomplete";

// project imports
import CountryCodeArr from "../helper/CountryCodeArr";
import ButtonLoader from "../ui-component/ButtonLoader";
import AuthWrapper1 from "../ui-component/FormWrapper";

// third-party
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 } from "uuid";

const Form = () => {

    const [submitLoader, setSubmitLoader] = useState(false);

    const formik = useFormik({
        initialValues: {
            user_name: "",
            company_name: "",
            postion: "",
            country_code: "",
            contact_number: "",
            email: "",
        },
        // validationSchema: {},
        onSubmit: (values) => {
            console.log(values, "values")
            alert("Form submitted succesfully")
        },
    });

    return (
        <Fragment>
            <AuthWrapper1>

                <Grid
                    container
                    direction="column"
                    justifyContent="flex-end"
                    sx={{ minHeight: "100vh" }}
                >
                    <Grid item xs={12}>
                        <Grid
                            container
                            justifyContent="center"
                            alignItems="flex-start"
                            sx={{ minHeight: "calc(100vh - 68px)" }}
                        >
                            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                                <Card
                                    sx={{
                                        border: '1px solid rgba(144, 202, 249, 0.46)',
                                        color: 'rgb(97, 97, 97)',
                                        ':hover': { boxShadow: '0 2px 14px 0 rgb(33 150 243 / 10%)' },
                                        maxWidth: { xs: 400, lg: 475 },
                                        margin: { xs: 2.5, md: 3 },
                                        marginTop: "0 !important",
                                        marginBottom: "0 !important",
                                        '& > *': {
                                            flexGrow: 1,
                                            flexBasis: '50%'
                                        }
                                    }}
                                >
                                    <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>
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
                                                        <Stack
                                                            alignItems="center"
                                                            justifyContent="center"
                                                            spacing={1}
                                                        >
                                                            <Typography
                                                                // color={theme.palette.secondary.main}
                                                                color="rgb(103, 58, 183)"
                                                                gutterBottom
                                                                variant='h3'
                                                                sx={{
                                                                    margin: "0px 0px 0.35em",
                                                                    fontSize: "1.5rem",
                                                                    fontWeight: "700",
                                                                    lineHeight: "1.2",
                                                                }}
                                                            >
                                                                Exhibition Form
                                                            </Typography>
                                                        </Stack>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid item sx={{ width: '100%' }}>
                                                <Divider sx={{ flexGrow: 1, borderWidth: '0px 0px thin', width: "100%", borderColor: 'rgb(238, 238, 238)' }} orientation="horizontal" />
                                            </Grid>

                                            <Grid item xs={12}>

                                                <form noValidate onSubmit={formik.handleSubmit} id="exhibition-visitor-detail-form">

                                                    <Grid container spacing={2}>

                                                        {/* Name */}
                                                        <Grid item xs={12} sm={12}>
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
                                                                sx={{
                                                                    borderRadius: "8px",
                                                                }}
                                                                placeholder="Name"
                                                                fullWidth
                                                                size="small"
                                                            />
                                                        </Grid>

                                                        {/* Company Name */}
                                                        <Grid item xs={12} sm={12}>
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
                                                                sx={{
                                                                    borderRadius: "8px",
                                                                }}
                                                                placeholder="Company Name"
                                                                fullWidth
                                                                size="small"
                                                            />
                                                        </Grid>

                                                        {/* Position */}
                                                        <Grid item xs={12} sm={12}>
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
                                                                sx={{
                                                                    borderRadius: "8px",
                                                                }}
                                                                placeholder="Position"
                                                                fullWidth
                                                                size="small"
                                                            />
                                                        </Grid>

                                                        {/* Contact Number */}
                                                        <Grid container xs={12} md={12} justifyContent="space-between">
                                                            <Grid item xs={12} sx={{ mt: "17px", ml: "18px", }}>
                                                                <Typography variant="h5" sx={{ fontSize: "0.875rem", color: "rgb(33, 33, 33)", lineHeight: "1.75", }} fullWidth>
                                                                    Phone number<span style={{ color: "red" }}>*</span>
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={4} sx={{ mt: "3px", ml: 2 }}>
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
                                                                    size='small'
                                                                />
                                                            </Grid>
                                                            <Grid item xs={7} sx={{ mt: "3px" }}>
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
                                                                    placeholder="Phone"
                                                                    fullWidth
                                                                    size='small'
                                                                />
                                                            </Grid>
                                                        </Grid>

                                                        {/* Email */}
                                                        <Grid item xs={12} sm={12}>
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
                                                                sx={{
                                                                    borderRadius: "8px",
                                                                }}
                                                                placeholder="Email"
                                                                fullWidth
                                                                size="small"
                                                            />
                                                        </Grid>

                                                    </Grid>


                                                    <Box sx={{ mt: 2 }}>
                                                        <Button
                                                            // disableElevation
                                                            fullWidth
                                                            size="large"
                                                            type="submit"
                                                            variant="contained"
                                                            // color="secondary"
                                                            sx={{ background: "rgb(103, 58, 183)" }}
                                                        >
                                                            {submitLoader ? <ButtonLoader /> : "Submit"}
                                                        </Button>
                                                    </Box>

                                                </form>

                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </AuthWrapper1>
        </Fragment >
    )
}

export default Form