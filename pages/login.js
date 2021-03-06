import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { signIn, getSession } from "next-auth/react";
import * as yup from "yup";
// MUI
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
// COMPONENTS
import Footer from "components/Layout/Footer";

export async function getServerSideProps(ctx) {
  const isUser = await getSession(ctx);
  if (isUser) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }
  return {
    props: { isUser },
  };
}

export default function Login(props) {
  console.log(props);
  const [error, setError] = useState(null);
  const router = useRouter();

  const validationSchema = yup.object({
    username: yup.string("Masukan Username").required("Harus Diisi"),
    password: yup.string("Masukan password").required("Password Harus Diisi"),
  });

  const handleSubmit = (values) => {
    setError(null);
    signIn("credentials", {
      username: values.username,
      password: values.password,
      callbackUrl: "https://demo.spd.bawaslu.go.id/admin",
    });
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const getQueryRouter = router.query;
  useEffect(() => {
    const getError = getQueryRouter.error;
    if (getError) setError(getError);
  }, [getQueryRouter]);

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(/images/bg.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "white" }}>
              <Image src="/images/logo.png" layout="fill" alt="PPID" />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in PPID Bawaslu
            </Typography>
            {error &&
              (error == "CredentialsSignin" ? (
                <Alert severity="error">
                  Salah Memasukan Username/Password
                </Alert>
              ) : (
                <Alert severity="error">{error}</Alert>
              ))}
            <Box sx={{ mt: 1 }}>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </form>
              <Grid container>
                <Grid item xs>
                  <Button variant="text" onClick={() => router.reload("/")}>
                    Kembali
                  </Button>
                </Grid>
                <Button
                  type="button"
                  variant="text"
                  size="small"
                  onClick={() => signIn("google")}
                >
                  Sudah Daftar Email? Login Dengan Google
                </Button>
              </Grid>
              <Footer />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
