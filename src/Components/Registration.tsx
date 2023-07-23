import React from 'react'
import styled from "styled-components";
import { Box, Grid, Button, TextField, FormGroup, FormControlLabel, TextareaAutosize, Checkbox, InputLabel, MenuItem, FormControl, Select, Switch, SelectChangeEvent, RadioGroup, FormLabel, Radio, OutlinedInput, InputAdornment, IconButton, Input, FilledInput, FormHelperText } from '@mui/material';
import { useForm, Controller, } from "react-hook-form";
import { Email, Label, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router';

export default function Registration() {

    //React Hooks
    const [selectedValue, setSelectedValue] = React.useState('a');
    const [Education, setEducation] = React.useState('');
    const { register, formState: { errors }, watch, handleSubmit, clearErrors, setError, reset, control, getValues } = useForm();
    const [values, setValues] = React.useState({
        password: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false,
    });

    const navigate = useNavigate();
    // const id = new URLSearchParams(window.location.search).get('id');
    // const renderPostsByID = async (name: any) => {
    //     let res = await fetch(`http://localhost:5000/emplist/${id}`);
    //     const posts = await res.json();
    // }

    // const renderPosts = async () => {
    //     let uri = 'http://localhost:5000/emplist';
    //     const res = await fetch(uri);
    //     const posts = await res.json();
    // }

    const onSubmit = async (data: any) => {
        let res = await fetch('http://localhost:5000/emplist?email=' + data.email, {
            method: 'Get'
        })
        let user = await res.json();
        if (user.length > 0) {
            alert("emp already existing")
            navigate('/')
        } else {
            fetch('http://localhost:5000/emplist', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            }).then(() => {
                alert("newEmp Successfully Created")
                navigate('/')
            })
        }
    }
    function SubmitEvent() {
        fetch('http://localhost:5000/emplist', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: 'hussain', surname: 'kagiwala' }),
        })
    }

    const handleDDL = (event: SelectChangeEvent) => {
        setEducation(event.target.value as string);
        clearErrors('eduction')

    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleClickShowPassword = (prop: any, value: boolean) => {
        setValues({
            ...values,
            [prop]: value,
        });
    };

    return (
        <>
            <Button onClick={SubmitEvent}>onsk</Button>
            <Header>Welcome To Techovarya</Header>
            <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#FFFFFF',
                    height: '100%',
                    width: '50%',
                    padding: '3%',
                    gap: '15px',
                    justifyContent: 'space-around',
                    boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)'
                }}>
                    {/* name Field */}
                    <Box sx={{ width: '100%', display: 'flex', gap: '10%', }}>
                        <Grid sx={{ width: '100%' }}>
                            <TextField sx={{ width: '100%', }} {...register("FirstName", { required: "First Name is Required" })} name="FirstName" label="First Name" variant="filled" />
                            {errors.FirstName && <p role="alert" style={{ color: "red" }}>{`${errors.FirstName.message}`}</p>}
                        </Grid>
                        <Grid sx={{ width: '100%' }}>
                            <TextField sx={{ width: '100%', }} {...register("LastName", { required: "Last Name is Required" })} name="LastName" label="Last Name" variant="filled" />
                            {errors.LastName && <p role="alert" style={{ color: "red" }}>{`${errors.LastName.message}`}</p>}
                        </Grid>
                    </Box>

                    {/* contact feild */}
                    <Box sx={{ width: '100%', display: 'flex', gap: '10%' }}>
                        <Grid sx={{ width: '100%' }}>
                            <TextField sx={{ width: '100%' }}
                                {...register("email", {
                                    required: "This field is required",
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "Entered value does not match email format"
                                    }
                                },)} label="Email" type="email" variant="filled" />

                            {errors.email && <p role="alert" style={{ color: "red" }}>{`${errors.email.message}`}</p>}
                        </Grid>
                        <Grid sx={{ width: '100%' }}>
                            <TextField sx={{ width: '100%' }} {...register("phone", {
                                maxLength: {
                                    value: 10,
                                    message: "required 10 numbers"
                                },
                                minLength: {
                                    value: 10,
                                    message: "required 10 numbers"
                                },
                            })} type="number" label="Phone" variant="filled" />
                            {errors.phone && <p role="alert" style={{ color: "red" }}>{`${errors.phone.message}`}</p>}
                        </Grid>
                    </Box>

                    {/* password feild */}
                    <Box sx={{ width: '100%', display: 'flex', gap: '10%' }}>
                        <FormControl sx={{ width: '100%', display: 'flex', gap: '10%' }} variant="filled">
                            <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                            <Controller name="password" control={control} rules={{
                                required: "this field is required",
                                minLength: {
                                    value: 8,
                                    message: "Minimum 8 characters required"
                                },
                                maxLength: {
                                    value: 15,
                                    message: "Maximum 15 characters are allowed"
                                },
                                pattern: {
                                    value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}/,
                                    message: "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 special characters and 1 number"
                                }
                            }} render={({
                                field: { onChange, value },
                            }) => <FilledInput
                                    name='password'
                                    id="filled-adornment-password"
                                    type={values.showPassword ? "text" : "password"}
                                    value={value}
                                    onChange={onChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => handleClickShowPassword("showPassword", !values.showPassword)}
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
                        <FormControl sx={{ width: '100%', display: 'flex', gap: '10%' }} variant="filled">
                            <InputLabel htmlFor="filled-adornment-confirmPassword">Confirm Password</InputLabel>
                            <Controller name="confirmPassword" control={control} rules={{
                                validate: value => value === getValues("password") || "Confirm Password doesn't match"
                            }} render={({
                                field: { onChange, value },
                            }) =>
                                <FilledInput
                                    id="filled-adornment-password"
                                    type={values.showConfirmPassword ? "text" : "password"}
                                    value={value}
                                    onChange={onChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => handleClickShowPassword("showConfirmPassword", !values.showConfirmPassword)}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />} />
                            {errors.confirmPassword && <p role="alert" style={{ color: "red" }}>{`${errors.confirmPassword.message}`}</p>}
                        </FormControl>
                    </Box>
                    {/* gender radio button */}
                    <Box sx={{ width: '100%', display: 'flex', gap: '10%' }}>
                        <FormControl sx={{ width: '100%', display: 'flex', gap: '10%' }} variant="standard"  >
                            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                row
                            >
                                <FormControlLabel {...register("gender", { required: "select gender" })} name="gender" value="female" control={<Radio />} label="Female" />
                                <FormControlLabel {...register("gender", { required: "select gender" })} name="gender" value="male" control={<Radio />} label="Male" />
                            </RadioGroup>
                            {errors.radiobutton && <p role="alert" style={{ color: "red" }}>{`${errors.radiobutton.message}`}</p>}

                        </FormControl>
                        <FormControl sx={{ width: '100%', display: 'flex', gap: '10%' }} variant="standard" >
                            <FormLabel id="demo-radio-buttons-group-label">Status</FormLabel>
                            <FormControlLabel control={<Switch {...register("status")} />} label="Active" />
                        </FormControl>
                    </Box>

                    {/* hobbies checkbox */}
                    <Box sx={{ display: 'flex' }}>
                        <FormControl variant="filled" >
                            <Grid>
                                <FormLabel component="legend">Choose Your Hobbies</FormLabel>
                                <FormControlLabel
                                    control={< Checkbox {...register("hobbieecheck", { required: "Choose Atlest one" })} value={"Singing"} name="hobbieecheck" />} label="Singing"
                                />

                                <FormControlLabel
                                    control={< Checkbox {...register("hobbieecheck", { required: "Choose Atlest one" })} value={"bodyBuilding"} name="hobbieecheck" />} label="bodyBuilding"

                                />
                                <FormControlLabel
                                    control={< Checkbox {...register("hobbieecheck", { required: "Choose Atlest one" })} value={"Photography"} name="hobbieecheck" />} label="Photography"

                                />
                                <FormControlLabel
                                    control={< Checkbox {...register("hobbieecheck", { required: "Choose Atlest one" })} value={"Painting"} name="hobbieecheck" />} label="Painting"

                                />
                                <FormControlLabel
                                    control={< Checkbox {...register("hobbieecheck", { required: "Choose Atlest one" })} value={"dacing"} name="hobbieecheck" />} label="dacing"

                                />
                                <FormControlLabel
                                    control={< Checkbox {...register("hobbieecheck", { required: "Choose Atlest one" })} value={"Art and Craft"} name="hobbieecheck" />} label="Art and Craft"

                                />
                            </Grid>
                            {errors.hobbieecheck && <p role="alert" style={{ color: "red" }}>{`${errors.hobbieecheck.message}`}</p>}
                        </FormControl>
                    </Box>

                    {/* eduction select input */}
                    <FormControl variant="filled">
                        <InputLabel id="demo-simple-select-filled-label">Eduction</InputLabel>
                        <Select
                            {...register("eduction", { required: "Choose stream" })}
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={Education}
                            onChange={handleDDL}
                        >
                            <MenuItem value={"BCA"} >BCA</MenuItem>
                            <MenuItem value={"MCA"} >MCA</MenuItem>
                            <MenuItem value={"B.Tech"} >B.Tech</MenuItem>
                            <MenuItem value={"M.Tech"} >M.Tech</MenuItem>
                            <MenuItem value={"Under-Graduation"} >Under-Graduation</MenuItem>
                            <MenuItem value={"Post-Graduation"} >Post-Graduation</MenuItem>
                        </Select>
                    </FormControl>
                    {errors.eduction && <p role="alert" style={{ color: "red" }}>{`${errors.eduction.message}`}</p>}

                    <FormControl variant="filled">
                        <TextareaAutosize
                            style={{ height: '60px', width: '500' }}
                            placeholder="Enter your Description"
                            aria-label="empty textarea"
                            {...register("description", {
                                required: "This field is required",
                                minLength: {
                                    value: 5,
                                    message: "Minimum 100 characters required"
                                },
                            },)}
                            name="description"
                        />
                        {errors.description && <p role="alert" style={{ color: "red" }}>{`${errors.description.message}`}</p>}
                    </FormControl>

                    <Button onClick={handleSubmit(onSubmit)} type='submit' variant="contained" color="primary">
                        signUp
                    </Button>
                </Box>
            </Grid>
        </>
    )
}
const Form = styled.form`
// display:flex;
// flex-direction:column;
// background: #FFFFFF;
// height:100%;
// weight:100%;
// padding: 3%;
// gap: 15px;
// color: red;
// justify-content: space-around;
// box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
`;
const Header = styled.h1`
text-align: center;
`;
const SubHeader = styled.h4`
text-align: center;
`;
const Error = styled.p`
color: red;
`;




