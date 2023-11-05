import { useEffect, useState } from 'react'
import axios from 'axios'

export default function App() {
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [profile, setProfile] = useState()
  const api = axios.create({ baseURL: "https://b4d5-2001-fb1-11f-bb65-a554-70c2-1434-3d82.ngrok-free.app/api" })

  useEffect(() => {
    api.get('/getuser', {
      withCredentials: true
    }).then(res => {
      setProfile(res.data)
    }).catch(() => {})
  }, [])

  /**
   * 
   * @param {import('react').FormEvent<HTMLFormElement>} event 
   */
  async function registerForm(event) {
    event.preventDefault()
    const response = await api.post('/register', {
      username,
      password
    })

    console.log(response.data)
  }

  /**
   * 
   * @param {import('react').FormEvent<HTMLFormElement>} event 
   */
  async function loginForm(event) {
    event.preventDefault()
    const response = await api.post('/login', {
      username,
      password
    }, {
      withCredentials: true
    })
    setProfile(response.data)
  }
  
  /**
   * 
   * @param {import('react').MouseEvent<HTMLButtonElement>} event 
   */
  async function logoutHandler() {
    await api.get('/logout', {
      withCredentials: true
    })
    document.location.reload()
  }

  return (
    <main>
      {profile 
        ? (
          <>
            {profile.username} <button onClick={logoutHandler}>Logout</button>
          </>
        )
        : (
          <>
            Register
            <form onSubmit={registerForm}>
              <input type="text" autoComplete='off' name="username" id="username" placeholder='Username' onChange={(e) => setUsername(e.currentTarget.value)} />
              <input type="text" autoComplete='off' name="username" id="username" placeholder='Username' onChange={(e) => setPassword(e.currentTarget.value)} />
              <input type="submit" />
            </form>

            Login
            <form onSubmit={loginForm}>
              <input type="text" autoComplete='off' name="username" id="username" placeholder='Username' onChange={(e) => setUsername(e.currentTarget.value)} />
              <input type="text" autoComplete='off' name="username" id="username" placeholder='Username' onChange={(e) => setPassword(e.currentTarget.value)} />
              <input type="submit" value='Login' />
            </form>
          </>

        )
      }
    </main>
  )
}