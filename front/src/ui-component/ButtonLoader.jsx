import { CircularProgress } from '@mui/material';

const ButtonLoader = () => {
    return (
        <>
            <CircularProgress variant="indeterminate" color="inherit" size={24} />
        </>
    )
}

export default ButtonLoader;