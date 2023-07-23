import React, { useContext, useEffect, useState } from 'react'
import { VisibilityOff, Visibility, Password, FiberNew, FunctionsOutlined, SnippetFolder } from '@mui/icons-material';
import { Box, Grid, Button, TextField, FormGroup, FormControlLabel, TextareaAutosize, Checkbox, InputLabel, MenuItem, FormControl, Select, Switch, SelectChangeEvent, RadioGroup, FormLabel, Radio, OutlinedInput, InputAdornment, IconButton, Input, FilledInput } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { Route, Routes, useNavigate, useLocation } from 'react-router';
import styled from "styled-components";
import { GlobalContext } from '../context/GlobalState';

export default function LoginForm() {

    const { getUserToken } = useContext(GlobalContext);
    const { register, control, handleSubmit, formState: { errors }, setError } = useForm();
    const [values, setValues] = React.useState<any>({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    // const { GetAccessToken } = authAction;
    const navigate = useNavigate();

    const login = (e: Event) => {
        e.preventDefault();
        var requestUrl =
            'https://thescholarsclubportal.b2clogin.com' +
            "/" +
            'thescholarsclubportal.onmicrosoft.com' +
            "/oauth2/v2.0/authorize?" +
            "p=" +
            'B2C_1_signin' +
            "&client_id=" +
            '8d9a0d0f-f31c-47fa-b981-003852bd4482' +
            "&nonce=defaultNonce" +
            "&redirect_uri=" +
            'http://localhost:3000' +
            "/login" +
            "&scope=" +
            'https://thescholarsclubportal.onmicrosoft.com/api/access_as_user offline_access' +
            "&response_type=code" +
            "&prompt=login";
        window.open(requestUrl, '_self');
    };

    let location = useLocation();
    useEffect(() => {
        var code = new URLSearchParams(location.search);
        console.log(code.get("code"));
        if (code.get("code") !== null) {
            let code1 = code.get("code");
            getAccessToken(code1);
        }
    }, []);


    const getAccessToken = (code: any) => {
        fetch(`https://localhost:7124/api/login/GetUserTokens?code=${code}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        }).then(async (res) => {
            let user = await res.json();
            console.log(user)
        })
    }
    // Click Event Function
    const onSubmit = async (employer: any) => {
        // GenerateJwtToken(employer);
        const res = await fetch(`http://localhost:5000/emplist?email=${employer.email}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        });
        let user = await res.json();
        if (user.length > 0) {
            if (user.password == user[0].password) {
                getAccessToken(employer);
                alert("User Successfully logged In")
            } else {
                setError("password", { type: 'manual', message: 'Password is Wrong' })
            }
        } else {
            setError("email", { type: 'manual', message: 'email does not exist' })
            alert("first create employer")
            navigate("/")
        }
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    return (
        <>
            <Header>Login With Techovarya</Header>
            <Grid container spacing={1} sx={{ justifyContent: 'center', }}>
                <Box sx={{
                    top: '40%',
                    height: '100%',
                    weight: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#FFFFFF',
                    padding: '3%',
                    gap: '15px',
                    boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)'
                }}>
                    <TextField sx={{ width: '100%', }}
                        {...register("email", {
                            required: "This field is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "give email format"
                            }
                        },)} name="email" label="Email" type="email" variant="filled" />
                    {errors.email && <p role="alert" style={{ color: "red" }}>{`${errors.email.message}`}</p>}

                    <FormControl variant="filled">
                        <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                        <Controller name="password" control={control} rules={{
                            required: "this field is required",
                        }} render={({
                            field: { onChange, value },
                        }) =>
                            <FilledInput
                                id="filled-adornment-password"
                                type={values.showPassword ? "text" : "password"}
                                value={value}
                                onChange={onChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />} />
                        {errors.password && <p role="alert" style={{ color: "red" }}>{`${errors.password.message}`}</p>}

                    </FormControl>
                    <Button onClick={(e: any) => login(e)} variant="contained" color="primary">
                        Login
                    </Button>
                </Box>
            </Grid>
        </>
    )
}
const Header = styled.h1`
text-align: center;
`;

