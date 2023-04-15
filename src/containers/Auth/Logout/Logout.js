import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { burgerAuthActions } from '../../../store/burgerAuthSlice/burgerAuthSlice';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => navigate('/auth')
  useEffect(() => {
    dispatch(burgerAuthActions.setLogout());
    logout()
  });
  return
};

export default Logout;
