import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  Container,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { signUp } from "../../service/user";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [msg, setMsg] = useState(undefined);
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // 发送注册请求
  const onSubmit = async (data) => {
    try {
      const response = await signUp(data);
      setMsg("注册成功！✨");
      setOpen(true);
      console.log("onsubmit response:", response); //email name token
    } catch (error) {
      console.log("error msg", error.response.data.message);
      // setMsg(error.response.data.message);
      // setOpen(true);
    }
    // //注册成功跳转登录页面
    // navigate("/signin");
  };
  const handleClose = () => {
    setOpen(false);
    navigate("/signin");
  };
  console.log("props", props);
  console.log("errors", errors);
  return (
    <Container component="main" maxWidth="xs">
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(!open)}
        message={msg}
        action={
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        }
      />
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            error={errors?.name ? true : false}
            helperText={errors?.name?.message}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Username"
            {...register("name", {
              required: true,
              minLength: {
                value: 4,
                message: "至少输入4个字符",
              },
            })}
            autoFocus
          />
          <TextField
            error={errors?.email ? true : false}
            helperText={errors?.email?.message}
            {...register("email", {
              required: true,
              pattern: {
                value:
                  /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,3}$/,
                message: "请输入有效邮箱",
              },
            })}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email Address"
            autoFocus
          />
          <TextField
            {...register("password")}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signin" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
