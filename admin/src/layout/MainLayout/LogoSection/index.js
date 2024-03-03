import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Link } from '@mui/material';

// project imports
import { DASHBOARD_PATH } from 'config';
import Logo from 'ui-component/Logo';
import { Grid } from "@mui/material";

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    // <Link component={RouterLink} to={DASHBOARD_PATH}>
    <Grid item sx={{ textAlign: 'center' }}>
        <Logo />
    </Grid>
    // </Link>
);

export default LogoSection;
