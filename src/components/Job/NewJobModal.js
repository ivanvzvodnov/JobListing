import React from 'react'
import { Box, Grid, Button, Select, MenuItem, FilledInput, Dialog, DialogTitle, DialogContent, IconButton, DialogActions, Typography, makeStyles } from '@material-ui/core'
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
    }
}))

export default props => {
    const classes = useStyles()
    return(
        <Dialog open={false} fullWidth>
            <DialogTitle>
                <Box display = "flex" justifyContent = "space-between" alignItems = "center">
                    Post Job
                    <IconButton>
                        <Close />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing = {2}>
                    <Grid item xs={6}>
                        <FilledInput placeholder = "Job title *" disableUnderline fullWidth></FilledInput>
                    </Grid>
                    <Grid item xs = {6}>
                        <Select fullWidth variant = "filled" disableUnderline defaultValue = "Full time">
                            <MenuItem value = "Full time">Full time</MenuItem>
                            <MenuItem value = "Part time">Part time</MenuItem>
                            <MenuItem value = "Contract">Contract</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput placeholder = "Company name *" disableUnderline fullWidth></FilledInput>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput placeholder = "Company URL *" disableUnderline fullWidth></FilledInput>
                    </Grid>
                    <Grid item xs = {6}>
                        <Select fullWidth variant = "filled" disableUnderline defaultValue = "Remote">
                            <MenuItem value = "Remote">Remoute</MenuItem>
                            <MenuItem value = "In office">In office</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput placeholder = "Job URL *" disableUnderline fullWidth></FilledInput>
                    </Grid>
                    <Grid item xs={12}>
                        <FilledInput placeholder = "Job description *" disableUnderline fullWidth multiline rows = {4}></FilledInput>
                    </Grid>
                </Grid>
                <Box mt = {2}>
                    <Typography>Skills</Typography>
                    <Box display = "flex">
                        {skills.map(skill => <Box className = {classes.skillChip} item key = {skill}>{skill}</Box>)}
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Box width = "100%" display = "flex" justifyContent = "space-between" alignItems = "center" color = "red">
                    <Typography variant = "caption">* Required fields</Typography>
                    <Button variant = "contained" disableElevation color = "primary">Post job</Button>
                </Box>
            </DialogActions>
        </Dialog>
    )
}