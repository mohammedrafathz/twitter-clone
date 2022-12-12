import {gql, useMutation} from '@apollo/client';
import {Formik, Field, ErrorMessage, Form} from 'formik';
import {useState} from 'react'
import ReactModal from 'react-modal';
import * as Yup from 'yup';

import '../styles/tweet.css';
import {ME_QUERY} from '../pages/Profile';
import {customStyles} from '../styles/customModalStyles';


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

const Tweet = () => {
  const [open, setOpen] = useState(false);
  const [createTweet] = useMutation(CREATE_TWEET_MUTATION, {
    refetchQueries: [{query: ME_QUERY}]
  });

  const toggleModal = () => {
    setOpen(m => !m);
  }

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
    <div>
      <button onClick={toggleModal} style={{marginRight: '10px', marginTop: '30px'}}>
        <span style={{padding: "15px 70px"}}> Tweet</span>
      </button>
      <ReactModal
        isOpen={open}
        onRequestClose={toggleModal}
        contentLabel='Modal'
        style={customStyles}
        ariaHideApp={false}
      >
        <span className="exit" onClick={toggleModal}>
          <i className="fa fa-times" aria-hidden='true'></i>
        </span>
        <div className="header"></div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values: any, {setSubmitting}: any) => {
            setSubmitting(true);

            await createTweet({
              variables: values
            })

            setSubmitting(false);
            toggleModal();
          }}
        >
          <Form>
            <Field name='content' type='text' as='textarea' placeholder="What's happening..." />
            <ErrorMessage name='content' component={'div'} />

            <div className="footer"></div>
            <button type='submit' className='tweet-button'>
              <span>Tweet</span>
            </button>
          </Form>
        </Formik>
      </ReactModal>
    </div>
  )
}

export default Tweet