import { GoogleLogin, GoogleLogout } from 'react-google-login';

function LoginButton({login}) {
  return (
    <GoogleLogin
      clientId={process.env.GOOGLE_CLIENT_ID}
      buttonText="Login"
      onSuccess={login}
      render={renderProps => <a onClick={renderProps.onClick} disabled={renderProps.disabled}><i className="material-icons icon-pos-fix">face</i>&nbsp; Login</a>}
      cookiePolicy={'single_host_origin'}
      isSignedIn={true}
    />
  )
}

function LogoutButton({logout}) {
  return (
    <GoogleLogout
      clientId={process.env.GOOGLE_CLIENT_ID}
      buttonText="Logout"
      render={renderProps => <a {...renderProps}>Logout</a>}
      onLogoutSuccess={logout}
    />
  )
}


export {
  LoginButton,
  LogoutButton
}