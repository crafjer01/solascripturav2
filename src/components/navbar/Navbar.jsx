import './navbar.css';

export const Navbar = () => {
  return (
    <div className="navbar_wrapper">
      <div className="container">
        <div className="navbar_container">
          <div className="navbar_logo">
            <div className="img_logo">
              <img src="/assets/logo.png" alt="Logo" />
            </div>
            <span className="logo">SolaScriptura</span>
          </div>
          <div className="menu">
            <div className="menu_link">
              <a href="/" className="menu_link_item">Reglas</a>
              <a href="/" className="menu_link_item">Info</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
