import {useQuery} from '@apollo/client';
import  {useState} from 'react'
import ReactModal from 'react-modal';
import {useNavigate} from 'react-router-dom'

import "../styles/logout.css"
import {ME_QUERY} from '../pages/Profile';
import {customStyles} from '../styles/customModalStyles';


const Logout = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const {loading, error, data} = useQuery(ME_QUERY);

  if (loading) return <p>loading...</p>
  if (error) return <p>{error?.message}</p>

  const toggleModal = () => {
    setOpen(m => !m)
  }

  const handleLogout = async () => {
    localStorage.removeItem('token')

    navigate('/login');
  }

  return (
    <div className='logout'>
      <span onClick={toggleModal} style={{flex: 1, flexDirection: 'row'}}>
        <h4>
          <img
            src={data.me.profile.avatar}
            alt="avatar"
            style={{width: '40px', borderRadius: '50%'}}
          />
          <span style={{marginLeft: '10px', marginTop: "-10px"}}>
            {data.me.name}
          </span>
          <span style={{marginLeft: '30px'}}>
            <i className="fas fa-ellipsis-h"></i>
          </span>
        </h4>
      </span>
      <div style={{position: 'absolute', bottom: 0}}></div>
      <ReactModal
        isOpen={open}
        onRequestClose={toggleModal}
        contentLabel='Modal'
        style={customStyles}
        ariaHideApp={false}
      >
        <span onClick={handleLogout} style={{cursor: "pointer"}}>
          <p style={{borderBottom: "1px solid #000"}}>
            Logout @{data.me.name}
          </p>
        </span>
      </ReactModal>
    </div >
  )
}

export default Logout