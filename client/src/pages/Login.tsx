import React from 'react'
import {gql, useMutation} from '@apollo/client';
import * as Yup from 'yup';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {useNavigate} from 'react-router-dom';

const LOGIN_MUTATION = gql`
  mutation login( $email: String!, $password: String!){
    login( email: $email, password: $password){
      token
    }
  }
`

interface LoginValues {
  email: String
  password: String
}

const Login = () => {
  const navigate = useNavigate();
  const [login, {data}] = useMutation(LOGIN_MUTATION);

  const initialValues: LoginValues = {
    email: '',
    password: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
  })

  return (
    <>
      <h1>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values: any, {setSubmitting}: any) => {
          setSubmitting(true);

          const {data} = await login({
            variables: values
          })

          localStorage.setItem("token", data.login.token);
          navigate('/users');
          setSubmitting(false);

        }}
      >
        <Form>
          <Field name='email' type='text' placeholder='Email' />
          <ErrorMessage name='email' component={'div'} />
          <Field name='password' type='password' placeholder='Password' />
          <ErrorMessage name='password' component={'div'} />

          <button type='submit'>Login</button>
        </Form>

      </Formik>
    </>
  );
}

export default Login;