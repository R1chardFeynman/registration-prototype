import { Grid, Typography } from "@material-ui/core";
import { CommonContainer } from "components/common/components/CommonContainer";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useStore } from "stores";

export const Profile = observer(() => {
  const history = useHistory();
  const location = history.location;
  const {
    ModalStore: { openModal },
    UserStore: { filledFields },
  } = useStore();
  useEffect(() => {
    if (location?.state?.registered) {
      openModal("RegistrationSuccess");
      history.replace(location.pathname, {});
    }
  }, [location]);

  return (
    <CommonContainer maxWidth="md">
      <Grid container spacing={3}>
        {filledFields.map((el) => (
          <Grid item key={el.label} sm={6} xs={12}>
            <Typography variant="h5">{el.label}</Typography>
            <Typography variant="subtitle1">{el.value}</Typography>
          </Grid>
        ))}
      </Grid>
    </CommonContainer>
  );
});
