import {gql, useQuery} from '@apollo/client'
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

import "../styles/primary.css"
import "../styles/profile.css"
import CreateProfile from '../Components/CreateProfile';
import UpdateProfile from '../Components/UpdateProfile';
import LeftNav from '../Components/LeftNav';

export const ME_QUERY = gql`
  query me{
    me {
      id 
      name
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
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error?.message}</p>

  return (
    <div className='primary'>
      <div className="left">
        <LeftNav />
      </div>
      <div className="profile">
        <div className="profile-info">
          <div className="profile-head">
            <span className="back-arrow" onClick={() => navigate(-1)}>
              <i className="fa fa-arrow-left" aria-hidden='true'></i>
            </span>
            <span className="nickname">
              <h3>{data.me.name}</h3>
            </span>
          </div>
          <div className="avatar">
            <i className="fa fa-user fa-5x" aria-hidden='true'></i>
          </div>
          <div className="make-profile">
            {data.me.profile ? <UpdateProfile /> : <CreateProfile />}
          </div>
          <h3 className='name'>{data.me.name}</h3>
          {data.me.profile ? (
            <p>
              <i className="fas fa-link" aria-hidden='true'></i>
              <a
                href={`http://${data.me.profile.website}`}
                target='_blank'
                rel="noreferrer">{" "}
                {data.me.profile.website}
              </a>
            </p>
          ) : null}
          <div className="followers">
            <p>200 following</p>
            <p>389 followers</p>
          </div>
        </div>
      </div>
      <div className="right">
        Right
      </div>
    </div >
  )
}

export default Profile