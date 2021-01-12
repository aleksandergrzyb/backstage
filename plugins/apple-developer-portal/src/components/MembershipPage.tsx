/*
 * Copyright 2021 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';
import { BackstageTheme } from '@backstage/theme';
import { useForm } from 'react-hook-form';
import {
  Typography,
  Grid,
  FormControl,
  TextField,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { InfoCard, Header, Page, Content } from '@backstage/core';
import requestAppleProgramInvitation from './AppleDeveloperPortalAPI';

const useStyles = makeStyles<BackstageTheme>(theme => ({
  form: {
    alignItems: 'flex-start',
    display: 'flex',
    flexFlow: 'column nowrap',
  },
  buttons: {
    marginTop: theme.spacing(2),
  },
  select: {
    minWidth: 120,
  },
}));

export default function MembershipPage() {
  const classes = useStyles();
  const { register, handleSubmit, errors, formState } = useForm();
  const hasErrors = !!errors.firstName || !!errors.lastName || !!errors.email;
  const dirty = formState?.isDirty;
  const [checkboxState, setCheckboxState] = React.useState({
    checked: false,
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxState({
      ...checkboxState,
      [event.target.name]: event.target.checked,
    });
  };
  const onSubmit = handleSubmit(data => {
    requestAppleProgramInvitation(
      data.firstName,
      data.lastName,
      data.email,
      checkboxState.checked,
    );
    // Error handling
  });

  return (
    <Page themeId="tool">
      <Header title="Apple Developer Portal"></Header>
      <Content>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <InfoCard title="Request an invite to Apple Developer Program">
              <Typography variant="body1">
                This form allows you to request an invite to Apple Developer
                Program.
              </Typography>
              <form className={classes.form}>
                <FormControl>
                  <TextField
                    id="firstName"
                    variant="outlined"
                    label="First name"
                    error={errors.firstName}
                    name="firstName"
                    margin="normal"
                    inputRef={register({
                      required: true,
                    })}
                  />
                  {errors.firstName && (
                    <FormHelperText error={true}>
                      First name is required
                    </FormHelperText>
                  )}

                  <TextField
                    id="lastName"
                    variant="outlined"
                    label="Last name"
                    error={errors.lastName}
                    name="lastName"
                    margin="normal"
                    inputRef={register({
                      required: true,
                    })}
                  />
                  {errors.lastName && (
                    <FormHelperText error={true}>
                      Last name is required
                    </FormHelperText>
                  )}

                  <TextField
                    id="email"
                    variant="outlined"
                    label="Email"
                    error={errors.email}
                    name="email"
                    margin="normal"
                    inputRef={register({
                      required: true,
                      pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                  />
                  {errors.email && (
                    <FormHelperText error={true}>
                      Correct email address is required
                    </FormHelperText>
                  )}

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkboxState.checked}
                        onChange={handleChange}
                        name="checked"
                        color="primary"
                      />
                    }
                    label="Access to Provisioning Profiles"
                  />
                  <FormHelperText>
                    Tick this checkbox if you're planning on debugging apps
                    directly from your Xcode. If you don't know what this is,
                    don't select it.
                  </FormHelperText>
                </FormControl>

                <div className={classes.buttons}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.buttonSpacing}
                    disabled={!dirty || hasErrors}
                    onClick={onSubmit}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </InfoCard>
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
}
