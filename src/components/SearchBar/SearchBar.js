import React, { useState } from 'react'
import { Box, Button, MenuItem, Select, makeStyles, CircularProgress } from '@material-ui/core'

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

export const SearchBar = ({fetchJobsCustom}) => {
    const [loading, setLoading] = useState(false)
    const [jobSearch, setJobSearch] = useState({
        type: "Full time",
        location: "Remote"
    })

    const handleChange = (e) => {
        e.persist()
        setJobSearch(oldState => ({...oldState, [e.target.name] : e.target.value }))
    }

    const search = async () => {
        setLoading(true)
        await fetchJobsCustom(jobSearch)
        setLoading(false)
    }

    const classes = useStyles()
    return (
    <Box p = {2} mt = {-5} mb = {2} className = {classes.wrapper}>
        <Select onChange = {handleChange} value = {jobSearch.type} name = "type" variant = "filled" disableUnderline>
            <MenuItem value = "Full time">Full time</MenuItem>
            <MenuItem value = "Part time">Part time</MenuItem>
            <MenuItem value = "Contract">Contract</MenuItem>
        </Select>
        <Select onChange = {handleChange} value = {jobSearch.location} name = "location" variant = "filled" disableUnderline>
            <MenuItem value = "Remote">Remote</MenuItem>
            <MenuItem value = "In office">In office</MenuItem>
        </Select>
        <Button disabled = {loading} onClick = {search} variant = 'contained' color = 'primary' disableElevation>{loading ? <CircularProgress color = "secondary" size = {22} /> : "Find"}</Button>
    </Box>
)}