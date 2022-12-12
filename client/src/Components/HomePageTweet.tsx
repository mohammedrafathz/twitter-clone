import {gql, useMutation} from '@apollo/client'
import {Formik, Field, ErrorMessage, Form} from 'formik'
import * as Yup from 'yup';

import {ME_QUERY} from '../pages/Profile';
import {ALL_TWEETS_QUERY} from './AllTweets';

const CREATE_TWEET_MUTATION = gql`
  mutation createTweet($content: String) {
    createTweet(content: $content) {
      id
    }
  }
`
interface TweetValues {
  content: String
}

const HomePageTweet = () => {
  const [createTweet] = useMutation(CREATE_TWEET_MUTATION, {
    refetchQueries: [{query: ALL_TWEETS_QUERY}]
  });

  const initialValues: TweetValues = {
    content: "",
  }

  const validationSchema = Yup.object({
    content: Yup.string()
      .required()
      .min(1, "Must be more that 1 character")
      .max(256, 'Must be less than 257 characters')
  })

  return (
    <div className='home-page-tweet'>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values: any, {setSubmitting}: any) => {
          setSubmitting(true);

          await createTweet({
            variables: values
          })

          setSubmitting(false);
        }}
      >
        <Form>
          <Field name='content' type='text' as='textarea' placeholder="What's happening..." />
          <ErrorMessage name='content' component={'div'} />

          <button type='submit' className='home-tweet-button'>
            <span>Tweet</span>
          </button>
        </Form>
      </Formik>
      <div className="footer"></div>
    </div>
  )
}

export default HomePageTweet