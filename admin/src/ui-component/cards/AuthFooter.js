// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="center">
        <Typography variant='h2'>
            &#169;
        </Typography>
        <Typography variant="h2" component={Link} href="https://expo-connect.vercel.app/" target="_blank" underline="hover">
            ExpoConnect
        </Typography>
    </Stack>
);

export default AuthFooter;
