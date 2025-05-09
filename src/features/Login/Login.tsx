"use client";

import React, { useEffect } from "react";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuth } from "@/auth";

const schema = z.object({
  userLogin: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export function Login() {
  const { handleLogin, loading } = useAuth();

  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    router.prefetch("/home");
  }, []);

  const onSubmit = async ({ userLogin, password }: FieldValues) => {
    await handleLogin({
      username: userLogin,
      password,
    });
  };

  const isLoading = loading ? (
    <CircularProgress
      color="inherit"
      style={{
        height: 24,
        width: 24,
      }}
    />
  ) : (
    "Entrar"
  );

  return (
    <Container
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
        maxWidth: "none !important",
        alignItems: "center",
        background: "#24438F",
      }}
    >
      <Card sx={{ mt: 2, maxWidth: "400px" }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src="/pepsico-logo.png" width={250} height={69} alt="PepsiCo" />
          <Typography component="h1" variant="h5" marginTop={5}>
            Entre na sua conta
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <Controller
              name="userLogin"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Email"
                  autoComplete="off"
                  autoFocus
                  error={!!errors.email}
                  helperText={errors.email?.message?.toString()}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Senha"
                  type="password"
                  autoComplete="off"
                  error={!!errors.password}
                  helperText={errors.password?.message?.toString()}
                />
              )}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              {isLoading}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
