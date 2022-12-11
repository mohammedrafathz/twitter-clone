import {gql, useMutation, useQuery} from '@apollo/client'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import React, {useState} from 'react'
import ReactModal from 'react-modal'
import {ME_QUERY} from '../pages/Profile'
import {customStyles} from '../styles/customModalStyles'

const UPDATE_PROFILE_MUTATION = gql`
  mutation updateProfile(
    $id: Int!
    $bio: String
    $location: String
    $website: String
    $avatar: String
  ) {
    updateProfile(
      id: $id
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
  id: Number
  bio: String
  location: String
  website: String
  avatar: String
}

const UpdateProfile = () => {
  const {loading, error, data} = useQuery(ME_QUERY);
  const [updateProfile] = useMutation(UPDATE_PROFILE_MUTATION, {
    refetchQueries: [{query: ME_QUERY}]
  })
  const [open, setOpen] = useState(false);

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error?.message}</p>

  const initialValues: ProfileValues = {
    id: data.me.profile.id,
    bio: data.me.profile.bio,
    location: data.me.profile.location,
    website: data.me.profile.website,
    avatar: data.me.profile.avatar,
  }

  const toggleModal = () => {
    setOpen(m => !m)
  }

  return (
    <div>
      <button onClick={toggleModal}>Update Profile</button>
      <ReactModal
        isOpen={open}
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

            await updateProfile({
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
              <span>Update Profile</span>
            </button>
          </Form>
        </Formik>
      </ReactModal>
    </div>
  )
}

export default UpdateProfile