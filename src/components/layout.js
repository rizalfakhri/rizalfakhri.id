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
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
            fontFamily: 'Press Start 2P',
            fontSize: '30px',
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
          style={{
            fontFamily: `'Press Start 2P', Montserrat, sans-serif`,
            marginTop: 0,
            marginBottom: rhythm(2),
            color: '--textTitle',
            fontSize: '15px'
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
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(40),
          padding: `${rhythm(1.5)} ${rhythm(3)}`,
        }}
      >

        <header>{header}</header>
        <main>{children}</main>

      </div>
    )
  }
}

export default Layout
