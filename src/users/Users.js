/* eslint-disable no-unused-vars */
import React from 'react'
import './index.scss'
import { Success } from './components/Success'
import { Users } from './components/Users'

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [searchValue, setSearchValue] = React.useState('')
  const [invites, setInvites] = React.useState([])
  const [success, setSuccess] = React.useState(false)

  React.useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then((res) => res.json())
      .then((json) => setUsers(json.data))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false))
  }, [])

  const onChangeValue = (e) => {
    setSearchValue(e.target.value)
  }

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((_id) => id !== _id))
    } else {
      setInvites((prev) => [...prev, id])
    }
  }

  const onClickSendInvite = () => {
    setSuccess(true)
  }

  return (
    <div className="App">
      {success ? (
        <Success count={invites.length} />
      ) : (
        <Users
          items={users}
          isLoading={isLoading}
          searchValue={searchValue}
          onChangeValue={onChangeValue}
          invites={invites}
          onClickInvite={onClickInvite}
          onClickSendInvite={onClickSendInvite}
        />
      )}
    </div>
  )
}

export default App
