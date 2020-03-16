import { GoogleLogin, GoogleLogout } from 'react-google-login';

function LoginButton({login}) {
  return (
    <GoogleLogin
      clientId={process.env.GOOGLE_CLIENT_ID}
      buttonText="Login"
      onSuccess={login}
      onFailure={err => console.log(JSON.stringify({err}))}
      render={renderProps => 
        <button 
          onClick={renderProps.onClick} 
          disabled={renderProps.disabled}
        >
          <img src="https://i.ya-webdesign.com/images/transparent-g-black-and-white-4.png" className="icon-pos-fix" style={{opacity: .8}} width="20" />&nbsp;&nbsp; Login
        </button>
      }
      
      cookiePolicy={'single_host_origin'}
      isSignedIn={true}
    />
  )
}

function LogoutButton({logout, renderElement}) {
  return (
    <GoogleLogout
      clientId={process.env.GOOGLE_CLIENT_ID}
      buttonText="Logout"
      render={renderElement}
      onLogoutSuccess={logout}
    />
  )
}


export {
  LoginButton,
  LogoutButton
}