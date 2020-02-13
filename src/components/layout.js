import React from "react"
import { Link } from "gatsby"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    // let homeLink
    // if (location.pathname === rootPath) {
    //   homeLink = (
    //     <h1>
    //       <Link to={`/`}>{title}</Link>
    //     </h1>
    //   )
    // } else {
    //   homeLink = (
    //     <h3>
    //       <Link to={`/`}>{title}</Link>
    //     </h3>
    //   )
    // }
    return (
      <div className="container">
        <header>
          <div className="header-content">
            <h3>
              <Link to={`/`}>{title}</Link>
            </h3>
            <nav>
              <Link to={"/work"} activeClassName="current_page">
                Work
              </Link>
              <Link to={"/blog"} activeClassName="current_page">
                Blog
              </Link>
              <Link to={"/about"} activeClassName="current_page">
                About
              </Link>
              <Link to={"/contact"} activeClassName="current_page">
                Contact
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer>Copyright © {new Date().getFullYear()} Jeremy Kahne</footer>
      </div>
    )
  }
}

export default Layout
