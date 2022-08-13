import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import { useNavigate,Link as RouterLink} from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { loginUser, useAuthState, useAuthDispatch } from "../../context";

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
  loginIcon:{
    fontSize:'24px',
    marginBottom:'6px'
  }
}));

export default function SignIn() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { errorMessage } = useAuthState();
  const dispatch = useAuthDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // 发送登录请求
  const onSubmit = async (data) => {
    try{
      const response = await loginUser(dispatch, data);
      console.log("onsubmit response:", response); //email name token     
      if (response) {
        navigate("/");
      }
    } catch (error) {
        console.log("action err", error.response.data.message);
        dispatch({ type: "LOGIN_ERROR", error: error.response.data.message });
        setOpen(true);
      }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Snackbar
        open={open}
        autoHideDuration={6000}       
        message={errorMessage}
        action={
          <IconButton  onClick={()=>setOpen(false)}>
            <CloseIcon />
          </IconButton>
        }
      />
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.loginIcon}>
        🍕{/* <LockOutlinedIcon /> */}
        </div>
        <Typography component="h3" variant="h6">
          登录
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
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
            defaultValue={JSON.parse(localStorage.getItem("currentUser"))?.email||""}
          />
          <TextField
            variant="outlined"
            {...register("password", { required: true })}
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            确认
          </Button>
          <Grid container>
            <Grid item>
              <RouterLink to="/signup" style={{textDecoration:'none'}}>
                点此注册
              </RouterLink>
            </Grid>
           
          </Grid>
        </form>
      </div>
    </Container>
  );
}
