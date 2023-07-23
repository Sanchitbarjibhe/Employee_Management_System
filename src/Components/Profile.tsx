// import { CenterFocusStrong } from '@mui/icons-material';
import { Avatar, Button, Grid } from '@mui/material'
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Icon } from '@mui/material';
import { useNavigate } from 'react-router';



export default function Profile() {

    const { employer } = useContext(GlobalContext);

    const navigate = useNavigate();

    useEffect(() => {
        getLoginUserInfo(employer);
    }, [])

    const getLoginUserInfo = async (employer: { id: any }) => {

        let res = await fetch(`http://localhost:5000/emplist/${employer}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        let user = await res.json();
        // setLoggedInUser(user)

        // .then((response) => response.json())
        // .then((data) => {
        //     // addAllEmp(data);
        //     setLoggedInUser(LoggedInUser)
        // })
        // .catch((error) => {
        //     console.log(error);
        // });
        // let res = await fetch('http://localhost:5000/emplist?email=' + employer.id, {
        //     method: 'Get'
        // })
        // setLoggedInUser(LoggedInUser)
        // let user = await res.json();
        // console.log(user)
    }


    const myStyle = {
        display: 'flex',
        justifyContent: 'center',
        backgroundImage: "url('https://wallpapercave.com/wp/wp8606869.png')",
        height: '400px',
        fontSize: '50px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        // opacity: '0.5'

    };

    const profileContent = {
        display: 'flex',
        fontSize: '18px',
        color: 'white',
    }

    const profilebtn = {
        display: 'flex',
        justifyContent: 'spaceEvenly',

    }

    const btn = {
        color: 'black',
        background: 'skyblue',
        border: 'none',
        height: '30px',
        width: '70px',
        borderRadius: '24px'
    }
    const btnsm = {
        color: 'black',
        background: 'skyblue',
        border: 'none',
        // height: '30px',
        // width: '30px',
        borderRadius: '24px'
    }

    // function handleNavigate() {
    //     navigate('https://www.techovarya.com')
    // }

    // function handleNavigate001() {
    //     navigate('www.infosys.com')
    // }
    return (
        <div style={myStyle}>
            <Grid sx={{ mt: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ height: "120px", justifyContent: 'center', width: "120px", flexDirection: 'column', alignItems: 'center' }} />
                <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0', m: '0' }}>
                    <p style={profileContent}>Jone Doe</p>
                    <p style={profileContent}>Jonedoe24@gmail.com</p>
                    <p style={profileContent}>Hobbies</p>
                    <p style={profileContent}>profiler name</p>
                </Grid>
                <div style={profilebtn}>
                    <button style={btn}>Button</button>
                    <button style={btnsm}><LinkedInIcon /></button>
                    <button style={btnsm}><InstagramIcon /></button>
                </div>
                <Grid>
                    {/* <button>Button</button>
            <button>Button</button>
            <button>Button</button> */}
                </Grid>
            </Grid>
        </div>
    )
}
