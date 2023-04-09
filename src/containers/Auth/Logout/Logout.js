import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = props => {
  const navigate = useNavigate();
  useEffect(() => {
    props.onLogout();
  }, [props]);

  return navigate('/');
};

export default Logout;
