import React, { useMemo } from "react";
import { Button, Form, Input, InputPassword } from "../../components/ui";
import styled, { css, useTheme } from "styled-components";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthentication } from "../../providers";
import { useFormUtils } from "../../hooks";
import Title from "antd/es/typography/Title";
import { mediaQuery } from "../../styles";
import { useNavigate } from "react-router";

export const Login = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const { authUser, login, loginLoading } = useAuthentication();

  const onNavigateTo = (url) => navigate(url);

  useMemo(() => {
    authUser && onNavigateTo("/");
  }, [authUser]);

  const schema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required(),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { required, error, errorMessage } = useFormUtils({ errors, schema });

  const onSubmitLogin = ({ email, password }) => login(email, password);

  return (
    <Container>
      <div className="wrapper-login">
        <div className="radial-gradient-item" />
        <div className="wrapper-header">
          <div className="logo-img">
            <img src="/logo.webp" alt="logo tph" />
          </div>
          <Title level={2} style={{ margin: "0" }} color={theme.colors.primary}>
            Bienvenido de nuevo
          </Title>
          <p>Por favor, ingrese los detalles para iniciar sesión</p>
        </div>
        <div className="form-wrapper">
          <Form onSubmit={handleSubmit(onSubmitLogin)}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="Usuario"
                  onChange={onChange}
                  value={value}
                  name={name}
                  error={error(name)}
                  helperText={errorMessage(name)}
                  required={required(name)}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <InputPassword
                  label="Contraseña"
                  onChange={onChange}
                  value={value}
                  name={name}
                  error={error(name)}
                  helperText={errorMessage(name)}
                  required={required(name)}
                />
              )}
            />
            <Button
              block
              size="large"
              type="primary"
              loading={loginLoading}
              htmlType="submit"
            >
              Iniciar sesión
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  ${({ theme }) => css`
    width: 100%;
    min-height: 100vh;
    display: grid;
    place-items: center;
    background: #f9f9f9;
    padding: 1em;

    .wrapper-login {
      padding: 2em 1.5em;
      border-radius: 1.2em;
      width: 100%;
      max-width: 30em;
      background-blend-mode: multiply;
      background: #fff;
      border: 4px solid #fff;
      position: relative;
      display: grid;
      place-items: center;
      z-index: 300;
      overflow: hidden;
      box-shadow: 0 10px 15px -3px rgba(47, 84, 235, 0.07);

      ${mediaQuery.minDesktop} {
        padding: 2em;
      }

      .radial-gradient-item {
        width: 100%;
        height: 20em;
        background: radial-gradient(rgb(47 84 235 / 17%) 0%, transparent 67%);
        margin: auto;
        position: absolute;
        top: -14em;
        z-index: 200;
      }

      .wrapper-header {
        text-align: center;
        display: grid;
        gap: 0.6em;
        position: relative;
        z-index: 300;
        padding: 1em 0 0 0;

        .logo-img {
          img {
            width: 3em;
            height: auto;
          }
        }

        p {
          font-size: 0.9em;
        }
      }

      .form-wrapper {
        width: 100%;
        padding: 1em 0;
      }
    }
  `}
`;
