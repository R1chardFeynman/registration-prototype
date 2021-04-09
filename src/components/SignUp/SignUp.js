import {
  Button,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { Form } from "components/SignUp/Form";
import { Input } from "components/SignUp/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from "react-router";
import { observer } from "mobx-react-lite";
import { useStore } from "stores";
import { CommonContainer } from "components/common/components/CommonContainer";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const onlyLettersRegEx = /^$|[A-Za-z]+$|^[А-Яа-я]+$/g;
const emailRegEx = /^[a-zA-Z_1-9]+@[a-z]+\.(com|ru)/g;
const passwordRegEx = /(?=.*[A-ZА-Я]).{8,}/g;
const phoneNumberRegEx = /(\+7|8)\d{10}/g;
const required = "Необходимо ввести";

const schema = yup.object().shape({
  username: yup
    .string()
    .required(`${required} имя пользователя`)
    .matches(
      onlyLettersRegEx,
      "Имя пользователя может включать в себя только буквы латинского или русского алфавита"
    ),
  phoneNumber: yup
    .string()
    .required(`${required} номер телефона`)
    .matches(phoneNumberRegEx, "Некорректный номер телефона"),
  email: yup
    .string()
    .required(`${required} email`)
    .matches(emailRegEx, "Некорректный email"),
  password: yup
    .string()
    .required(`${required} пароль`)
    .matches(
      passwordRegEx,
      "Пароль должен содержать хотя бы одну заглавную букву и быть не короче 8 символов"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли не совпадают"),
  firstName: yup
    .string()
    .notRequired()
    .matches(
      onlyLettersRegEx,
      "Имя может включать в себя только буквы латинского или русского алфавита"
    ),
  lastName: yup
    .string()
    .matches(
      onlyLettersRegEx,
      "Фамилия может включать в себя только буквы латинского или русского алфавита"
    ),
  about: yup
    .string()
    .matches(/^.{0,200}$/g, "Превышено максимальное количество символов (200)"),
});

export const SignUp = observer(() => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const history = useHistory();
  const { setUser } = useStore().UserStore;

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  const onSubmit = async (data) => {
    const { confirmPassword, ...rest } = data;
    setUser(rest);
    await sleep(1000);
    localStorage.setItem("user", JSON.stringify(rest));
    history.replace("/profile", { registered: true });
  };
  return (
    <CommonContainer maxWidth="sm">
      <Typography component="h2" variant="h5">
        Регистрация
      </Typography>
      <Form
        noValidate
        className={classes.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Input
              error={!!errors?.username}
              helperText={errors?.username?.message}
              {...register("username")}
              name="username"
              label="Имя пользователя"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              {...register("phoneNumber")}
              name="phoneNumber"
              defaultValue="+7"
              label="Номер телефона"
              error={!!errors?.phoneNumber}
              helperText={errors?.phoneNumber?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              {...register("password")}
              error={!!errors?.password}
              helperText={errors?.password?.message}
              name="password"
              type="password"
              label="Пароль"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              {...register("confirmPassword")}
              name="confirmPassword"
              label="Подтвердите пароль"
              type="password"
              error={!!errors?.confirmPassword}
              helperText={errors?.confirmPassword?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              {...register("email")}
              name="email"
              label="E-mail"
              error={!!errors?.email}
              helperText={errors?.email?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              {...register("firstName")}
              error={!!errors?.firstName}
              helperText={errors?.firstName?.message}
              name="firstName"
              label="Имя"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              {...register("lastName")}
              error={!!errors?.lastName}
              helperText={errors?.lastName?.message}
              name="lastName"
              label="Фамилия"
            />
          </Grid>
          <Grid item>
            <FormLabel component="legend">Пол</FormLabel>
            <Controller
              name="gender"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <RadioGroup row aria-label="Пол" {...field} name="gender">
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Мужской"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Женский"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Другое"
                  />
                </RadioGroup>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              variant="outlined"
              {...register("about")}
              error={!!errors?.about}
              helperText={errors?.about?.message}
              multiline
              label="О себе"
              name="about"
              fullWidth
              rows={8}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className={classes.submit}
          disabled={!!Object.keys(errors).length}
          color="primary"
        >
          Зарегистрироваться
        </Button>
      </Form>
    </CommonContainer>
  );
});
