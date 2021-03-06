/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import profilePic from '../../content/assets/profile-pic.jpeg'

import { rhythm } from "../utils/typography"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpeg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div
      className="bio-container"
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      <img
        alt={author}
        src={profilePic}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          width: rhythm(2.5),
          height: rhythm(2.5),
          borderRadius: `50%`,
        }}
      />
      <p
        className="bio-description"
      >

        This is personal blog by&nbsp;
        <a href={`https://twitter.com/${social.twitter}`}>
          {author}
        </a>
        .

        <br />

        I wrote lots of code & opinions here, but <b>pssst...</b> sometimes weird things.

      </p>
    </div>
  )
}

export default Bio
