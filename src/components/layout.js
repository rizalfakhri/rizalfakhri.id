import React from "react"
import { Link } from "gatsby"
import "../styles/global.css"
import { rhythm, scale } from "../utils/typography"
import {
  Helmet
} from 'react-helmet'

class Layout extends React.Component {

  render() {

    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h6
          className="blog-name"
          style={{
            marginBottom: rhythm(2),
            marginTop: 2,
            fontFamily: 'Titan One',
            fontSize: '40px',
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: '--textLink',
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h6>
      )
    } else {
      header = (
        <h6
          className="blog-name"
          style={{
            fontFamily: `'Titan One', Montserrat, sans-serif`,
            marginTop: 2,
            marginBottom: rhythm(2),
            color: '--textTitle',
            fontSize: '40px'
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: '--textLink',
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h6>
      )
    }


    return (

      <div
        className="blog-container"
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(40),
          padding: `${rhythm(.7)} ${rhythm(3)}`,
        }}
      >

        <header>{header}</header>
        <main>{children}</main>

      </div>
    )
  }
}

export default Layout
