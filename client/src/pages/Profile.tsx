import {gql, useQuery} from '@apollo/client'
import React from 'react'
import CreateProfile from '../Components/CreateProfile';
import UpdateProfile from '../Components/UpdateProfile';

export const ME_QUERY = gql`
  query me{
    me {
      id 
      profile{
        id 
        bio
        location
        website
        avatar
      }
    }
  }
`

const Profile = () => {
  const {loading, error, data} = useQuery(ME_QUERY);
  if (loading) return <p>Loading...</p>
  if (error) return <p>{error?.message}</p>

  return (
    <div className='container'>
      <h1>Profile</h1>
      
      {data.me.profile.id ? <UpdateProfile /> : <CreateProfile />}
      <p>{data.me.profile?.bio}</p>
      <p>{data.me.profile?.location}</p>
      <p>{data.me.profile?.website}</p>
    </div>
  )
}

export default Profile