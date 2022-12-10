import React, {Key} from 'react'
import {gql, useQuery} from '@apollo/client'

const USERS_QUERY = gql`
  query users_query{
    users{
      id
      name
    }
  }
`

interface User {
  name: string
}

const Users = () => {
  // useQuery
  const {loading, error, data} = useQuery(USERS_QUERY);

  if (loading) return <p>loading</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <div> 
      {data.users.map((u: User, index: Key) => <p key={index}>{u.name}</p>)}
    </div>
  )
}

export default Users