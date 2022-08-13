import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  // Link,
  Grid,
  Typography,
  Container,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import { useNavigate,Link } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import {signUpUser} from "../../context/actions"
import { useAuthDispatch ,useAuthState} from "../../context";

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

export default function SignUp(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dispatch = useAuthDispatch();
  const {errorMessage} =useAuthState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // 发送注册请求
  const onSubmit = async (data) => {
    try {
      const response = await signUpUser(dispatch,data) 
      localStorage.setItem("currentUser", JSON.stringify(response))
      setOpen(true);
    } catch (error) {
      console.log("error msg", error.response.data.message);
      dispatch({ type: "MESSAGE", error: error.response.data.message });
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
    if(localStorage.getItem("currentUser")){
      navigate("/signin");
    }
  };
  console.log("props", props);
  console.log("errors", errors);
  return (
    <Container component="main" maxWidth="xs">
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(!open)}
        message={errorMessage}
        action={
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        }
      />
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.loginIcon}>
        👋{/* <LockOutlinedIcon /> */}
        </div>
        <Typography component="h3" variant="h6">
          注册
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
              <Link to="/signin" style={{textDecoration:'none'}} >
                点此登录
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
