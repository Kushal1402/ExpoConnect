import { Grid } from "@mui/material";

import Table1 from "./Records";

const Index = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Table1 />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Index;
