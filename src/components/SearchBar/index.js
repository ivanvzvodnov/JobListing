import React from 'react'
import { Box, Button, MenuItem, Select, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    wrapper: {
        backgroundColor: "#fff",
        display: "flex",
        boxShadow: "0px 1px 5px rgba(0, 0, 0, .1)", 
        borderRadius: "5px",
        "& > *" : {
            height: "45px",
            flex: 1,
            margin :"8px"
        }
    }
})

export default props => {
    const classes = useStyles()
    return (
    <Box p = {2} mt = {-5} mb = {2} className = {classes.wrapper}>
        <Select variant = "filled" disableUnderline defaultValue = "Full time">
            <MenuItem value = "Full time">Full time</MenuItem>
            <MenuItem value = "Part time">Part time</MenuItem>
            <MenuItem value = "Contract">Contract</MenuItem>
        </Select>
        <Select variant = "filled" disableUnderline defaultValue = "Remote">
            <MenuItem value = "Remote">Remote</MenuItem>
            <MenuItem value = "In office">In office</MenuItem>
        </Select>
        <Button variant = 'contained' color = 'primary' disableElevation>Find</Button>
    </Box>
)}