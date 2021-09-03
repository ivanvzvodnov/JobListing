import React, { useState, useEffect } from "react";
import { Box, Button, CircularProgress, Grid, ThemeProvider } from "@material-ui/core";
import theme from './theme/theme'
import Header from './components/Header/'
import SearchBar from "./components/SearchBar/";
import JobCard from "./components/Job/JobCard";
import NewJobModal from "./components/Job/NewJobModal";
import { firestore } from "./firebase/config";
import {Close} from '@material-ui/icons'


export default () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [customSearch, setCustomSearch] = useState(false)
  const [newJobModal, setNewJobModal] = useState(false)

  const fetchJobs = async() => {
    setCustomSearch(false)
    setLoading(true)
    const req = await firestore
      .collection('jobs')
      .orderBy('postedOn', 'desc')
      .get()
     const tempJobs = req.docs.map(job => ({...job.data(), id: job.id, postedOn: job.data().postedOn.toDate()}))
     setJobs(tempJobs)
     setLoading(false)
  }

  const fetchJobsCustom = async jobSearch => {
    setLoading(true)
    setCustomSearch(true)
    const req = await firestore
      .collection('jobs')
      .orderBy('postedOn', 'desc')
      .where("location", "==" , jobSearch.location)
      .where("type", "==" , jobSearch.type)  
      .get()
    const tempJobs = req.docs.map(job => ({...job.data(), id: job.id, postedOn: job.data().postedOn.toDate()}))
    setJobs(tempJobs)
    setLoading(false)
  }

  const postJob = async (jobDetails) => {
    await firestore.collection('jobs').add({
      ...jobDetails,
      postedOn: new Date()
    })
    fetchJobs()
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  return <ThemeProvider theme = {theme}>
    <Header openNewJobModal = {() => setNewJobModal(true)} />
    <NewJobModal closeModal = {() => setNewJobModal(false)}  newJobModal = {newJobModal} postJob = {postJob} />
    <Box mb={3}>
      <Grid container justify = "center">
        <Grid item xs = {10}>
          <SearchBar fetchJobsCustom = {fetchJobsCustom} />
          {loading ?
          (<Box display = "flex" justifyContent = "center"><CircularProgress /></Box>)  : 
          (<>
            {customSearch && (<Box my = {2} display = "flex" justifyContent = "flex-end">
              <Button onClick = {fetchJobs} >
                <Close size = {20} />
                Filter
              </Button>
            </Box>)}
            {jobs.map(job => (<JobCard key = {job.id} {...job}/>))}
          </>
          )}
        </Grid>
      </Grid>
    </Box>
  </ThemeProvider>;
};
