import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import ColoredLine from './Line'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import axios from 'axios'

export default function Profile(props) {

  //Error handling
  const [isError, setIsError] = useState(false)
  const [errorType, setErrorType] = useState("Unspecified error")

  //Tags
  const [openTags, setOpenTags] = useState(false)
  const [tempTagOne, setTempTagOne] = useState('')
  const [tempTagTwo, setTempTagTwo] = useState('')
  const [tempTagThree, setTempTagThree] = useState('')
  const [tempTagFour, setTempTagFour] = useState('')
  const [tagOne, setTagOne] = useState('')
  const [tagTwo, setTagTwo] = useState('')
  const [tagThree, setTagThree] = useState('')
  const [tagFour, setTagFour] = useState('')

  //About
  const [openAbout, setOpenAbout] = useState(false)
  const [tempAbout, setTempAbout] = useState('')
  const [About, setAbout] = useState('')

  //Location
  const [openLocation, setOpenLocation] = useState(false)
  const [tempLocation, setTempLocation] = useState(false)
  const [Location, setLocation] = useState(false)

  //Tags
  const handleClickOpenTags = () => {
    setTempTagOne(tagOne)
    setTempTagTwo(tagTwo)
    setTempTagThree(tagThree)
    setTempTagFour(tagFour)

    setOpenTags(true)
  }
  const handleCloseTags = () => {
    setOpenTags(false)
  }
  const EditOne = (event) => {
    setTempTagOne(event.target.value)
    console.log(event.target.value)
  }
  const EditTwo = (event) => {
    setTempTagTwo(event.target.value)
  }
  const EditThree = (event) => {
    setTempTagThree(event.target.value)
  }
  const EditFour = (event) => {
    setTempTagFour(event.target.value)
  }

  const handleSaveTags = () => {
    setTagOne(tempTagOne)
    setTagTwo(tempTagTwo)
    setTagThree(tempTagThree)
    setTagFour(tempTagFour)
    setOpenTags(false)

    let userInf = props.name

    axios
      .put('http://localhost:49153/ProfileInfo', null, {
        params: { username: userInf, field: 'Tag1', content: tempTagOne }
      })
      .then((response) => {
        console.log(response.data)
      })
    axios
      .put('http://localhost:49153/ProfileInfo', null, {
        params: { username: userInf, field: 'Tag2', content: tempTagTwo }
      })
      .then((response) => {
        console.log(response.data)
      })
    axios
      .put('http://localhost:49153/ProfileInfo', null, {
        params: { username: userInf, field: 'Tag3', content: tempTagThree }
      })
      .then((response) => {
        console.log(response.data)
      })
    axios
      .put('http://localhost:49153/ProfileInfo', null, {
        params: { username: userInf, field: 'Tag4', content: tempTagFour }
      })
      .then((response) => {
        console.log(response.data)
      })
  }

  //About
  const handleSaveAbout = () => {
    let userInf = props.name

    console.log('RUNNNING')
    setAbout(tempAbout)

    axios
      .put('http://localhost:49153/ProfileInfo', null, {
        params: { username: userInf, field: 'About', content: tempAbout }
      })
      .then((response) => {
        console.log(response.data)
      })

    setOpenAbout(false)
  }

  const handleClickOpenAbout = () => {
    setTempAbout(About)
    setOpenAbout(true)
  }

  const handleCloseAbout = () => {
    setOpenAbout(false)
  }

  const EditAbout = (event) => {
    setTempAbout(event.target.value)
  }

  //Location
  //About
  const handleSaveLocation = () => {
    let userInf = props.name
    setLocation(tempLocation)
    axios
      .put('http://localhost:49153/ProfileInfo', null, {
        params: { username: userInf, field: 'location', content: tempLocation }
      })
      .then((response) => {
        console.log(response.data)
      })
    setOpenLocation(false)
  }

  const handleClickOpenLocation = () => {
    setTempLocation(Location)
    setOpenLocation(true)
  }

  const handleCloseLocation = () => {
    setOpenLocation(false)
  }

  const EditLocation = (event) => {
    setTempLocation(event.target.value)
  }

  useEffect(() => {
    let userInf = props.name
    console.log(userInf)

    setTimeout(
      function () {
        axios
          .get(
            'http://localhost:49153/ProfileInfo',
            { params: { username: userInf } },
            { withCredentials: true }
          )
          .then((response) => {
            setIsError(false)
            console.log(response.data)
            let profileData = response.data

            setAbout(profileData.About)
            setLocation(profileData.location)
            setTagOne(profileData.Tag1)
            setTagTwo(profileData.Tag2)
            setTagThree(profileData.Tag3)
            setTagFour(profileData.Tag4)
          })
          .catch((error) => {
            console.log(error.message)
            setIsError(true)
            setErrorType(error.message)
          })
      }.bind(this),
      5
    )
  })

  return (
    <div
      style={{
        marginRight: '15%',
        marginLeft: '15%',
        marginTop: '20px',
        minWidth: '70%'
      }}
    >
      {!isError ? (
        <Box sx={{ minWidth: 275 }} display="inline">
          <Card variant="outlined">
            <CardContent
              style={{ backgroundColor: '#2C2F33', minHeight: '300px' }}
            >
              <Typography sx={{ fontSize: 18 }} color="white" gutterBottom>
                {props.name}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="#97A9B4" gutterBottom>
                {Location}
              </Typography>
              <Button onClick={handleClickOpenLocation}>Edit</Button>
              <ColoredLine color="white" />
              <Typography
                sx={{ fontSize: 18 }}
                color="white"
                gutterBottom
                style={{ marginTop: '15px' }}
              >
                About
              </Typography>
              <div>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="#97A9B4"
                  variant="text"
                  style={{ wordBreak: 'break-all' }}
                >
                  {About}
                </Typography>
              </div>

              <Button onClick={handleClickOpenAbout}>Edit</Button>
              <ColoredLine color="white" />

              <Typography
                sx={{ fontSize: 18 }}
                color="white"
                gutterBottom
                style={{ marginTop: '15px' }}
                rows={6}
              >
                Tags
              </Typography>

              <Typography sx={{ fontSize: 14 }} color="#97A9B4" gutterBottom>
                1: <b>{tagOne}</b>
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="#97A9B4" gutterBottom>
                2: <b>{tagTwo}</b>
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="#97A9B4" gutterBottom>
                3: <b>{tagThree}</b>
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="#97A9B4" gutterBottom>
                4: <b>{tagFour}</b>
              </Typography>

              <Button onClick={handleClickOpenTags}>Edit</Button>

              <Dialog open={openTags} onClose={handleCloseTags}>
                <DialogTitle>Edit Tags</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Tag 1"
                    variant="standard"
                    value={tempTagOne}
                    onChange={EditOne}
                  />

                  <TextField
                    autoFocus
                    margin="dense"
                    label="Tag 2"
                    variant="standard"
                    value={tempTagTwo}
                    onChange={EditTwo}
                  />

                  <TextField
                    autoFocus
                    margin="dense"
                    label="Tag 3"
                    variant="standard"
                    value={tempTagThree}
                    onChange={EditThree}
                  />

                  <TextField
                    autoFocus
                    margin="dense"
                    label="Tag 4"
                    variant="standard"
                    value={tempTagFour}
                    onChange={EditFour}
                  />
                  <Button
                    variant="contained"
                    color="success"
                    style={{
                      marginTop: '50px',
                      display: 'flex',
                      justifycontent: 'center'
                    }}
                    onClick={handleSaveTags}
                  >
                    Save
                  </Button>
                </DialogContent>
              </Dialog>

              <Dialog open={openAbout} onClose={handleCloseAbout}>
                <DialogTitle>Edit About</DialogTitle>
                <DialogContent>
                  <TextField
                    style={{ width: '500px' }}
                    multiline
                    rows={8}
                    maxrows={4}
                    autoFocus
                    margin="dense"
                    label="About"
                    variant="standard"
                    value={tempAbout}
                    onChange={EditAbout}
                  />
                  <Button
                    variant="contained"
                    color="success"
                    style={{
                      marginTop: '50px',
                      display: 'flex',
                      justifycontent: 'center'
                    }}
                    onClick={handleSaveAbout}
                  >
                    Save
                  </Button>
                </DialogContent>
              </Dialog>

              <Dialog open={openLocation} onClose={handleCloseLocation}>
                <DialogTitle>Edit Location</DialogTitle>
                <DialogContent>
                  <TextField
                    style={{ width: '500px' }}
                    multiline
                    rows={8}
                    maxrows={4}
                    autoFocus
                    margin="dense"
                    label="About"
                    variant="standard"
                    value={tempLocation}
                    onChange={EditLocation}
                  />
                  <Button
                    variant="contained"
                    color="success"
                    style={{
                      marginTop: '50px',
                      display: 'flex',
                      justifycontent: 'center'
                    }}
                    onClick={handleSaveLocation}
                  >
                    Save
                  </Button>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </Box>
      ) : (
        <div>
          <Box sx={{ minWidth: 275 }} display="inline">
            <Card variant="outlined">
              <CardContent
                style={{ backgroundColor: '#2C2F33', minHeight: '300px' }}
              >
                <Typography
                  sx={{ fontSize: 24 }}
                  color="red"
                  gutterBottom
                  style={{ marginTop: '15px', display: 'flex', justifycontent: 'center' }}
                >
                 <u>Error</u>
                </Typography>
                <Typography
                  sx={{ fontSize: 18 }}
                  color="white"
                  gutterBottom
                  style={{ marginTop: '25px' }}
                >
                  Oops... There was an problem retrieving your information
                </Typography>
                <ColoredLine color="white" />
                <Typography
                  sx={{ fontSize: 18 }}
                  color="white"
                  gutterBottom
                  style={{ marginTop: '15px' }}
                >
                  Error Type: <b>{errorType}</b>
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </div>
      )}
    </div>
  )
}
