import React from 'react'
import { Box, Grid, Button, Select, MenuItem, FilledInput, Dialog, DialogTitle, DialogContent, IconButton, DialogActions, Typography, makeStyles, CircularProgress } from '@material-ui/core'
import {Close} from '@material-ui/icons'
import {format} from 'date-fns'
import theme from '../../theme/theme'

const useStyles = makeStyles(theme => ({
    info: {
        '& > *': {
            margin: '4px'
        },
    },
    skillChip: {
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontSize: "14.5px",
        borderRadius: "5px",
        fontWeight: "600",
        backgroundColor: theme.palette.secondary.main,
        color: "#fff"
    }
}))

export const ViewJobModal =  ({job, closeModal}) => {
    const classes = useStyles()
    return(
    <Dialog open={!!Object.keys(job).length} fullWidth>
        <DialogTitle>
            <Box display = "flex" justifyContent = "space-between" alignItems = "center">
                {job.title} @ {job.companyName}
                <IconButton onClick = {closeModal}>
                    <Close />
                </IconButton>
            </Box>
        </DialogTitle>
        <DialogContent>
            <Box>
                <Box className = {classes.info} display="flex">
                    <Typography variant="caption">Posted on: </Typography>
                    <Typography variant="body2">{job.postedOn && format(job.postedOn, 'dd/MMM/yyyy hh:mm')}</Typography>
                </Box>
                <Box className = {classes.info} display="flex">
                    <Typography variant="caption">Job type: </Typography>
                    <Typography variant="body2">{job.type}</Typography>
                </Box>
                <Box className = {classes.info} display="flex">
                    <Typography variant="caption">Job location: </Typography>
                    <Typography variant="body2">{job.location}</Typography>
                </Box>
                <Box className = {classes.info} display="flex">
                    <Typography variant="caption">Job description: </Typography>
                    <Typography variant="body2">{job.description}</Typography>
                </Box>
                <Box className = {classes.info} display="flex">
                    <Typography variant="caption">Company name: </Typography>
                    <Typography variant="body2">{job.companyName}</Typography>
                </Box>
                <Box className = {classes.info} display="flex">
                    <Typography variant="caption">Company website: </Typography>
                    <Typography variant="body2">{job.companyUrl}</Typography>
                </Box>
                <Box className = {classes.info} >
                    <Typography variant="caption">Skills: </Typography>
                    <Grid container alignItems = "center">
                        {job.skills && 
                            job.skills.map(skill => (
                            <Grid item key={skill} className = {classes.skillChip}>{skill}</Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </DialogContent>
        <DialogActions>
            <Button variant="outlined" component="a" href={job.link} target="_blank">Apply</Button>
        </DialogActions>
    </Dialog>
)}