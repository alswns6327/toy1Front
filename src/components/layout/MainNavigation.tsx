import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../auth/auth-context';



const MainNavigation = () =>{

  const authCtx = useContext(AuthContext);
  const [nickname, setNickname] = useState('');
  let isLogin = authCtx.isLoggedIn;
  let isGet = authCtx.isGetSuccess;

  const callback = (str:string) => {
    setNickname(str);
  }

  useEffect(() => {
    if (isLogin) {
      console.log('start');
      authCtx.getUser();
    } 
  }, [isLogin]);

  useEffect(() => {
    if (isGet) {
      console.log('get start');
      callback(authCtx.userObj.nickname);
    }
  }, [isGet]);


  const toggleLogoutHandler = () => {
    authCtx.logout();
  }

  
  return(
    <header>
      <Link to='/'><div >Home</div></Link>
      <br/>
      <nav>
        <div>로그인</div>
        <ul>
          <li>{!isLogin && <Link to='/login'>Login</Link>}</li>
          <li>{!isLogin && <Link to='signup'>Sign-Up</Link>}</li>
          <li>{isLogin && <Link to='/profile'>{nickname}</Link>}</li>
          <li>{isLogin && <button onClick={toggleLogoutHandler}>Logout</button>}</li>
        </ul>
        <div>1인용게임</div>
        <ul>
          <li><Link to="/firstGame">노노그램</Link></li>
          <li><Link to="/secondGame">스도쿠</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;