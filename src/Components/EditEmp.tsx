import React, { useContext, useEffect, useState } from 'react'
import styled from "styled-components";
import { Box, Grid, Button, TextField, FormGroup, FormControlLabel, TextareaAutosize, Checkbox, InputLabel, MenuItem, FormControl, Select, Switch, SelectChangeEvent, RadioGroup, FormLabel, Radio, OutlinedInput, InputAdornment, IconButton, Input, FilledInput, FormHelperText } from '@mui/material';
import { useForm, Controller } from "react-hook-form";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useLocation, useParams, useNavigate } from 'react-router';
import { GlobalContext } from '../context/GlobalState';

export default function EditEmp(route: { employer: any; }) {
    type FormInputs = {
        FirstName: string;
        LastName: string;
        eduction: string;
        phone: string;
        password: string;
        gender: string;
        hobbieecheck: any;
        email: string;
        confirmPassword: string;
        description: string;
        radiobutton: string;
    };


    const { register, formState: { errors }, handleSubmit, control, setValue, getValues } = useForm<FormInputs>({});

    const [selectEmp, setSelectedEmp] = useState<any>();

    const navigate = useNavigate();

    const hobbieecheck = "Singing-bodyBuilding-Photography-Painting-Dancing-Art and Craft".split('-');
    //React Hooks
    const [selectedValue, setSelectedValue] = React.useState('a');
    const [isProcessing, setisProcessing] = React.useState(false);
    const [Education, setEducation] = React.useState('');
    const [values, setValues] = React.useState({
        password: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false,
    });

    const { employer } = useContext(GlobalContext);

    useEffect(() => {
        getEmpData(employer)
    }, [])

    async function getEmpData(employer: { id: any }) {
        setisProcessing(true);
        let response = await fetch(`http://localhost:5000/emplist/${employer}`, {
            method: 'GET'
        })
        const data = await response.json();
        console.log(data);
        setValue("FirstName", data.FirstName)
        setValue("LastName", data.LastName)
        setValue("email", data.email)
        setValue("password", data.password)
        setValue("confirmPassword", data.confirmPassword)
        setValue("phone", data.phone)
        setValue("description", data.description)
        setValue("gender", data?.gender)
        data?.hobbieecheck?.map((c: any, i: number) => setValue(`hobbieecheck.${i}` as const, c))
        setValue("eduction", data.eduction)
        setSelectedEmp(data);
        setisProcessing(false);
        // setEducation(data.eduction);
    }

    const onSubmit = async (route: any) => {
        debugger;
        fetch(`http://localhost:5000/emplist/${employer}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(route),
        }).then(() => {
            navigate('/emplist')
            console.log('success')
        })
    }

    const handleDDL = (event: SelectChangeEvent) => {
        setEducation(event.target.value as string);
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
            <Header>Edit Employer</Header>
            <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                {!isProcessing && (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        background: '#FFFFFF',
                        height: '100%',
                        width: '5b0%',
                        padding: '3%',
                        gap: '15px',
                        justifyContent: 'space-around',
                        boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)'
                    }}>
                        {/* name Field */}
                        <Box sx={{ width: '100%', display: 'flex', gap: '10%', }}>
                            <Grid sx={{ width: '100%' }}>
                                <TextField sx={{ width: '100%', }} InputLabelProps={{ shrink: true }} {...register("FirstName", { required: "First Name is Required" })} name="FirstName" label="First Name" variant="filled" />
                                {errors.FirstName && <p role="alert" style={{ color: "red" }}>{`${errors.FirstName.message}`}</p>}
                            </Grid>
                            <Grid sx={{ width: '100%' }}>
                                <TextField sx={{ width: '100%', }} InputLabelProps={{ shrink: true }} {...register("LastName", { required: "Last Name is Required" })} name="LastName" label="Last Name" variant="filled" />
                                {errors.LastName && <p role="alert" style={{ color: "red" }}>{`${errors.LastName.message}`}</p>}
                            </Grid>
                        </Box>

                        {/* contact feild */}
                        <Box sx={{ width: '100%', display: 'flex', gap: '10%' }}>
                            <Grid sx={{ width: '100%' }}>
                                <TextField sx={{ width: '100%' }}
                                    InputLabelProps={{ shrink: true }}
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
                                <TextField sx={{ width: '100%' }} InputLabelProps={{ shrink: true }} {...register("phone", {

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
                                    required: "this field is required"
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
                            {getValues("gender")?.length > 0 && <FormControl sx={{ width: '100%', display: 'flex', gap: '10%' }} variant="standard"  >
                                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="gender"
                                    row
                                    defaultValue={getValues("gender")}
                                >
                                    <FormControlLabel {...register("gender", { required: "select gender" })} name="gender" value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel {...register("gender", { required: "select gender" })} name="gender" value="male" control={<Radio />} label="Male" />
                                </RadioGroup>
                                {errors.radiobutton && <p role="alert" style={{ color: "red" }}>{`${errors.radiobutton.message}`}</p>}
                            </FormControl>}
                            <FormControl sx={{ width: '100%', display: 'flex', gap: '10%' }} variant="standard" >
                                <FormLabel id="demo-radio-buttons-group-label">Status</FormLabel>
                                <FormControlLabel control={<Switch />} label="Active" />
                            </FormControl>
                        </Box>

                        {/* hobbies checkbox */}
                        <Box sx={{ display: 'flex' }}>
                            <Grid>
                                {
                                    hobbieecheck?.map(
                                        (c, i) => <label key={c}><input type="checkbox" value={c} {...register(`hobbieecheck.${i}` as const)} name={`hobbieecheck.${i}` as const} />{c}</label>
                                    )
                                }
                            </Grid>
                        </Box>

                        {/* eduction select input */}
                        <FormControl variant="filled"  >
                            <InputLabel id="demo-simple-select-filled-label">Eduction</InputLabel>
                            <Select
                                {...register("eduction", { required: "Choose stream" })}
                                name="eduction"
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                defaultValue={getValues("eduction")}
                            >
                                <MenuItem value={"BCA"}>BCA</MenuItem>
                                <MenuItem value={"MCA"}>MCA</MenuItem>
                                <MenuItem value={"B.Tech"}>B.Tech</MenuItem>
                                <MenuItem value={"M.Tech"}>M.Tech</MenuItem>
                                <MenuItem value={"Under-Graduation"}>Under-Graduation</MenuItem>
                                <MenuItem value={"Post-Graduation"}>Post-Graduation</MenuItem>
                            </Select>
                            {errors.eduction && <p role="alert" style={{ color: "red" }}>{`${errors.eduction.message}`}</p>}
                        </FormControl>
                        <FormControl variant="filled">
                            <TextareaAutosize
                                style={{ height: '60px', width: '500' }}
                                placeholder="Enter your description"
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
                )}

            </Grid>
        </>
    )
}

const Header = styled.h1`
text-align: center;
`;


