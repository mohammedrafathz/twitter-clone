import {gql, useQuery} from '@apollo/client'
import {formatDistance, subDays} from 'date-fns'
import {Key} from 'react'

import "../styles/allTweets.css";

export const ALL_TWEETS_QUERY = gql`
  query ALL_TWEETS_QUERY{
    tweets {
      id
      createdAt
      content
      author {
        id
        name
        profile {
          id
          avatar
        }
      }
    }
  }
`

interface IAllTweet {
  id: Key
  content: String
  createdAt: Date
  author: {
    name: string
    profile: {
      avatar: string
    }
  }
}

const AllTweets = () => {
  const {loading, error, data} = useQuery(ALL_TWEETS_QUERY);

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>

  return (
    <div>
      {data.tweets.map((tweet: IAllTweet) => (
        <div className="tweet-container" key={tweet.id}>
          <div className="tweet-header">
            <img
              src={tweet.author.profile.avatar}
              style={{width: "40px", borderRadius: "50%"}}
              alt="avatar" />
            <h4 className='name'>{tweet.author.name}</h4>
            <p className='data-time'>
              {formatDistance(subDays(new Date(tweet.createdAt), 0), new Date())} ago
            </p>
          </div>
          <p>{tweet.content}</p>
        </div>
      ))}
    </div>
  )
}

export default AllTweets