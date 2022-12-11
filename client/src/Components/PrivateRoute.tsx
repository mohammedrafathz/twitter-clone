import {gql, useQuery} from '@apollo/client';
import {ReactNode} from 'react';
import {Navigate} from 'react-router-dom';


const PRIVATE_ROUTE = gql`
  {
    me {
      id
    } 
  }
`

interface PrivateRouteProps {
  children: ReactNode
}

const PrivateRoute = ({children}: PrivateRouteProps) => {
  const {loading, error, data} = useQuery(PRIVATE_ROUTE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  if (!data.me) {
    return <Navigate to='/landing' />;
  }

  return  <>{children}</>;
}

export default PrivateRoute;