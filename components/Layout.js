import globalCss from '../styles/global.css.js';

function Layout(props) {
  return (
    <div className="main-layout">
      {props.children}
      <style jsx global>{globalCss}</style>
    </div>
  )
}

export default Layout;