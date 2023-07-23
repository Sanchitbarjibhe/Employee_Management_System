import { VisibilityOff, Visibility } from '@mui/icons-material'
import { Button, Grid, Box, TextField, FormControl, InputLabel, FilledInput, InputAdornment, IconButton, FormLabel, RadioGroup, FormControlLabel, Radio, Switch, Checkbox, Select, MenuItem, TextareaAutosize, SelectChangeEvent } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form';
import styled from "styled-components";


export default function AddEmp() {

    //React Hooks
    const [selectedValue, setSelectedValue] = React.useState('a');
    const [age, setAge] = React.useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

    //Custom Hooks
    // const validation = useRequired();

    // Click Event Function
    const onSubmit = (data: any) => {
        console.log(JSON.stringify(data));
    };

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setSelectedValue(event.target.value);
    // };

    const handleDDL = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
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
    const handleChangePass = (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleChangeConfirmPass = (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };


    return (
        <>
            <Header>Add Employer</Header>
            <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
                <Form onSubmit={handleSubmit(onSubmit)} >
                    <Box sx={{ width: '100%', display: 'flex', gap: '10%' }}>
                        <TextField sx={{ width: '100%', }}{...register("FirstName")} label="First Name" variant="filled" required />
                        <TextField sx={{ width: '100%', }}{...register("LastName")} label="Last Name" variant="filled" required />
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', gap: '10%' }}>
                        <TextField sx={{ width: '100%', }} {...register("Email")} label="Email" variant="filled" required />
                        <TextField sx={{ width: '100%' }} {...register("Phone Number")} label="Phone Number" variant="filled" required />
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', gap: '10%' }}>
                        <FormControl sx={{ width: '100%', display: 'flex', gap: '10%' }} variant="filled">
                            <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                            <FilledInput
                                id="filled-adornment-password"
                                type={values.showPassword ? "text" : "password"}
                                value={values.password}
                                onChange={handleChangePass("password")}
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
                            />
                        </FormControl>
                        <FormControl sx={{ width: '100%', display: 'flex', gap: '10%' }} variant="filled">
                            <InputLabel htmlFor="filled-adornment-Confirm-password">Confirm Password</InputLabel>
                            <FilledInput
                                id="filled-adornment-Confirm-password"
                                type={values.showPassword ? "text" : "password"}
                                value={values.password}
                                onChange={handleChangeConfirmPass("password")}
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
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', gap: '10%' }}>
                        <FormControl sx={{ width: '100%', display: 'flex', gap: '10%' }} variant="standard">
                            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>


                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                            >
                                <Grid>
                                    <FormControlLabel {...register("female")} value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel {...register("male")} value="male" control={<Radio />} label="Male" />
                                </Grid>
                            </RadioGroup>
                        </FormControl>
                        <FormControl sx={{ width: '100%', display: 'flex', gap: '10%' }} variant="standard">
                            <FormLabel id="demo-radio-buttons-group-label">Status</FormLabel>
                            <FormControlLabel control={<Switch defaultChecked />} label="Active" />
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <Grid>
                            <FormLabel component="legend">Choose Your Hobbies</FormLabel>
                            <FormControlLabel
                                {...register("Singing")}
                                control={< Checkbox />} label="Singing"
                            />
                            <FormControlLabel
                                {...register("bodyBuilding")}
                                control={< Checkbox />} label="bodyBuilding"
                            />
                            <FormControlLabel
                                {...register("Photography")}
                                control={< Checkbox />} label="Photography"
                            />
                            <FormControlLabel
                                {...register("Painting")}
                                control={< Checkbox />} label="Painting"
                            />
                            <FormControlLabel
                                {...register("dacing")}
                                control={< Checkbox />} label="dacing"
                            />
                            <FormControlLabel
                                {...register("Art and Craft")}
                                control={< Checkbox />} label="Art and Craft"
                            />
                        </Grid>
                    </Box>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Eduction</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            onChange={handleDDL}
                        >
                            <MenuItem value={10}>BCA</MenuItem>
                            <MenuItem value={20}>MCA</MenuItem>
                            <MenuItem value={40}>B.Tech</MenuItem>
                            <MenuItem value={50}>M.Tech</MenuItem>
                            <MenuItem value={60}>Under-Graduation</MenuItem>
                            <MenuItem value={70}>Post-Graduation</MenuItem>
                        </Select>
                    </FormControl>
                    <TextareaAutosize
                        aria-label="empty textarea"
                        placeholder="Enter your Description"
                        maxRows={10}
                        style={{ height: '60px', width: '500' }}
                        {...register("description")}
                    />
                    <Button type='submit' variant="contained" color="primary">
                        Sign Up
                    </Button>
                </Form>
            </Grid>
        </>
    )
}

const Form = styled.form`
display:flex;
flex-direction:column;
background: #FFFFFF;
height:100%;
weight:100%;
padding: 3%;
gap: 30px;
box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
`;
const Header = styled.h1`
text-align: center;
`;