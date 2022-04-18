import { React, useContext } from 'react'
import UserContext from './UserContext'
import { useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import NavigationBar from './Navbar'
import '../Css/homepage.css'
import ColoredLine from './Line'
import Profile from './Profile'

function HomePage() {
  const user = useContext(UserContext)

  let history = useHistory()

  useEffect(() => {
    //ensures the user is verified using web token, if not push them back to entry page (where they are logged out)
    axios
      .get('http://localhost:5000/user', { withCredentials: true })
      .then((response) => {
        user.setUserName(response.data.userName)
        console.log(response.data.userName)
      })
      .catch((error) => {
        console.log(error)
        history.push('/entry')
      })
  }, [])

  function logout() {
    axios
      .post('http://localhost:5000/logout', {}, { withCredentials: true })
      .then(() => user.setUserName(''))

    history.push('/entry')
  }

  return (
    <div className="rootClass">
      <NavigationBar />
      <div>
        {!!user.userName && (
          <div className="row">
            <div className="column">
              <div
                style={{
                  color: 'white',
                  fontSize: '25px',
                  alignSelf: 'start',
                  paddingTop: '10px',
                  paddingLeft: '10px'
                }}
              >
                Logged in as {user.userName}
              </div>
            </div>

            <div className="column">
              <div style={{ alignSelf: 'end', padding: '10px' }}>
                <button className="btn-1" onClick={() => logout()}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
        {!user.userName && <div>Not Logged in</div>}
      </div>
      <ColoredLine color="white" />
      <h1
        style={{
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '30px',
          fontWeight: '400'
        }}
      >
        <u>Data Center</u>
      </h1>
      <div
        style={{
          color: 'white',
          paddingTop: '30px',
          marginRight: '15%',
          marginLeft: '15%'
        }}
      >
        Now you have logged in to the site, you can edit your information here on the home 
        page and come back to see it later. You can also head to the forum and talk to other
        people on the site
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '30px'
        }}
      >

      <Profile name={user.userName}/>

      </div>
    </div>
  )
}

export default HomePage
