import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';

// import * as actions from '../../../store/actions/index';

const Logout = props => {
  const navigate = useNavigate();
  useEffect(() => {
    props.onLogout();
  }, []);

  return navigate('/');
};

export default Logout;
