import {gql, useQuery} from '@apollo/client'
import {useNavigate} from 'react-router-dom';

import '../styles/home.css';
import '../styles/primary.css';
import LeftNav from '../Components/LeftNav';
import AllTweets from '../Components/AllTweets';
import HomePageTweet from '../Components/HomePageTweet';

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

const Home = () => {
  const {loading, error, data} = useQuery(ME_QUERY);
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error?.message}</p>

  return (
    <div className='primary'>
      <div className="left">
        <LeftNav />
      </div>
      <div className="home">
        <div className="home-header">
          <h3 className="home-title">Home</h3>
        </div>
        <HomePageTweet />
        <AllTweets />
      </div>

      <div className="right">
        Right
      </div>
    </div >
  )
}

export default Home