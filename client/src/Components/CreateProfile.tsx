import React, {useState} from 'react'
import ReactModal from 'react-modal'
import {ErrorMessage, Field, Formik, Form} from 'formik'
import {gql, useMutation} from '@apollo/client'

import {ME_QUERY} from '../pages/Profile'
import {customStyles} from '../styles/customModalStyles'

const CREATE_PROFILE_MUTATION = gql`
  mutation createProfile(
    $bio: String
    $location: String
    $website: String
    $avatar: String
  ) {
    createProfile(
      bio: $bio
      location: $location
      website: $website
      avatar: $avatar
    ) {
      id
    }
  }
`

interface ProfileValues {
  bio: String
  location: String
  website: String
  avatar: String
}


const CreateProfile = () => {
  const [createProfile] = useMutation(CREATE_PROFILE_MUTATION, {
    refetchQueries: [{query: ME_QUERY}]
  });

  const [isOpen, setIsOpen] = useState(false);

  const initialValues: ProfileValues = {
    bio: "",
    location: "",
    website: "",
    avatar: "",
  }

  const toggleModal = () => {
    setIsOpen(m => !m)
  }

  return (
    <div>
      <button onClick={toggleModal}>Create Profile</button>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel='Modal'
        style={customStyles}
        ariaHideApp={false}
      >
        <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
          onSubmit={async (values: any, {setSubmitting}: any) => {
            setSubmitting(true);

            await createProfile({
              variables: values
            })

            setSubmitting(false);
            toggleModal();
          }}
        >
          <Form>
            <Field name='bio' type='text' as='textarea' placeholder='Bio' />
            <ErrorMessage name='bio' component={'div'} />

            <Field name='location' type='text' placeholder='Location' />
            <ErrorMessage name='location' component={'div'} />

            <Field name='website' type='text' placeholder='Website' />
            <ErrorMessage name='website' component={'div'} />

            <button type='submit' className='login-button'>
              <span>Create Profile</span>
            </button>
          </Form>
        </Formik>
      </ReactModal>
    </div>
  )
}

export default CreateProfile