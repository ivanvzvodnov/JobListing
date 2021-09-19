import React, { useState } from 'react'
import { Box, Grid, Button, Select, MenuItem, FilledInput, Dialog, DialogTitle, DialogContent, IconButton, DialogActions, Typography, makeStyles, CircularProgress } from '@material-ui/core'
import {Close} from '@material-ui/icons'

const skills = [
    "JavaScript",
    "React",
    "Vue",
    "Node",
    "Firebase",
    "MongoDB",
    "SQL"
]

const useStyles = makeStyles(theme => ({
    skillChip: {
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontSize: "14.5px",
        borderRadius: "5px",
        transition: ".3s",
        cursor: "pointer",
        fontWeight: "600",
        border: `1px solid ${theme.palette.secondary.main}`,
        color: theme.palette.secondary.main,
        "&:hover":{
            backgroundColor: theme.palette.secondary.main,
            color: "#fff"
        }
    },
    included: {
        backgroundColor: theme.palette.secondary.main,
        color: "#fff"
    }
}))

const initialState = {
    title: "",
    type: "Full time",
    location: "Remote",
    companyName: "",
    companyUrl: "",
    skills: [],
    link: "",
    description: ""
}

export const NewJobModal = ({postJob, closeModal, newJobModal}) => {
    const [jobDetails, setJobDetails] = useState(initialState)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        e.persist()
        setJobDetails(oldState => ({...oldState, [e.target.name] : e.target.value }))
    }

    const addRemoveSkill = skill => {
        jobDetails.skills.includes(skill) ? 
        setJobDetails(oldState => ({...oldState, skills: oldState.skills.filter(s => s != skill)})) :
        setJobDetails(oldState => ({...oldState, skills: oldState.skills.concat(skill)}))
    }

    const handleSubmit = async () => {
        for(const field in jobDetails){
            if(typeof jobDetails[field] === 'string' && !jobDetails[field]) return
        }
        if(!jobDetails.skills.length) return
        setLoading(true)
        await postJob(jobDetails)
        closeModal()
    }

    const newCloseModal = () => {
        setJobDetails(initialState)
        setLoading(false)
        closeModal()
    }

    const classes = useStyles()
    console.log(jobDetails)
    return(
        <Dialog open={newJobModal} fullWidth>
            <DialogTitle>
                <Box display = "flex" justifyContent = "space-between" alignItems = "center">
                    Post Job
                    <IconButton onClick = {newCloseModal}>
                        <Close />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing = {2}>
                    <Grid item xs={6}>
                        <FilledInput onChange = {handleChange} autoComplete = "off" name = "title" value = {jobDetails.title} placeholder = "Job title *" disableUnderline fullWidth></FilledInput>
                    </Grid>
                    <Grid item xs = {6}>
                        <Select onChange = {handleChange} fullWidth variant = "filled" name = "type" value = {jobDetails.type} disableUnderline>
                            <MenuItem value = "Full time">Full time</MenuItem>
                            <MenuItem value = "Part time">Part time</MenuItem>
                            <MenuItem value = "Contract">Contract</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput onChange = {handleChange} autoComplete = "off" name = "companyName" value = {jobDetails.companyName} placeholder = "Company name *" disableUnderline fullWidth></FilledInput>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput onChange = {handleChange} autoComplete = "off" name = "companyUrl" value = {jobDetails.companyUrl} placeholder = "Company URL *" disableUnderline fullWidth></FilledInput>
                    </Grid>
                    <Grid item xs = {6}>
                        <Select onChange = {handleChange} fullWidth variant = "filled" name = "location" value = {jobDetails.location} disableUnderline>
                            <MenuItem value = "Remote">Remoute</MenuItem>
                            <MenuItem value = "In office">In office</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput onChange = {handleChange} autoComplete = "off" name = "link" value = {jobDetails.link} placeholder = "Job URL *" disableUnderline fullWidth></FilledInput>
                    </Grid>
                    <Grid item xs={12}>
                        <FilledInput onChange = {handleChange} autoComplete = "off" name = "description" value = {jobDetails.description} placeholder = "Job description *" disableUnderline fullWidth multiline rows = {4}></FilledInput>
                    </Grid>
                </Grid>
                <Box mt = {2}>
                    <Typography>Skills *</Typography>
                    <Box display = "flex">
                        {skills.map(skill => <Box onClick = {() => addRemoveSkill(skill)} className = {`${classes.skillChip} ${jobDetails.skills.includes(skill) && classes.included}`} key = {skill}>{skill}</Box>)}
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Box width = "100%" display = "flex" justifyContent = "space-between" alignItems = "center" color = "red">
                    <Typography variant = "caption">* Required fields</Typography>
                    <Button onClick = {handleSubmit} variant = "contained" disableElevation color = "primary" disabled = {loading}>{loading ? <CircularProgress color = "secondary" size = {22} /> : "Post job"}</Button>
                </Box>
            </DialogActions>
        </Dialog>
    )
}