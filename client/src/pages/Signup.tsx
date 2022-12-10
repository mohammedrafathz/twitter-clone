import React from 'react'
import {gql, useMutation} from '@apollo/client'

import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useNavigate} from 'react-router-dom';

const SIGNUP_MUTATION = gql`
  mutation signup($name: String, $email: String!, $password: String!){
    signup(name: $name, email: $email, password: $password){
      token
    }
  }
`

interface SignupValues {
  email: string
  password: string
  name: string
  confirmPassword: string
}

const Signup = () => {
  // useMutation
  const navigate = useNavigate();

  const [signup, {data}] = useMutation(SIGNUP_MUTATION);

  const initialValues: SignupValues = {
    email: '',
    name: '',
    password: '',
    confirmPassword: ''
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    name: Yup.string()
      .required("Username is required"),
    password: Yup.string()
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "Passwords don't match"
      )
  })

  return (
    <>
      <h1>Sign Up</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values: any, {setSubmitting}: any) => {
          setSubmitting(true);

          const {data} = await signup({
            variables: values
          })

          localStorage.setItem("token", data.signup.token);
          navigate('/');
          setSubmitting(false);
          
        }}
      >
        <Form>
          <Field name='email' type='text' placeholder='Email' />
          <ErrorMessage name='email' component={'div'} />
          <Field name='name' type='text' placeholder='Name' />
          <ErrorMessage name='name' component={'div'} />
          <Field name='password' type='password' placeholder='Password' />
          <ErrorMessage name='password' component={'div'} />
          <Field name='confirmpassword' type='password' placeholder='Confirm Password' />
          <ErrorMessage name='confirmpassword' component={'div'} />

          <button type='submit'>Sign Up</button>
        </Form>

      </Formik>
    </>
  )
}

export default Signup;