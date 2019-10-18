import React from "react"
import { Link } from "gatsby"
import {
  useStaticQuery,
  graphql
} from "gatsby"

const Footer = () => {

    const data = useStaticQuery(graphql`

        query MyQuery {
            site {
                siteMetadata {
                    social {
                        github
                        instagram
                        twitter
                    }
                }
            }
        }

    `)

    const { social } = data.site.siteMetadata

    return (

        <footer>
            <div
                style={
                    {
                        fontWeight: 'bold',
                        marginBottom: '4px'
                    }
                }

            >

            <a target="_blank" href={`https://github.com/${social.github}`}>GitHub</a> • <a target="_blank" href={`https://twitter.com/${social.twitter}`}>Twitter</a> •  <a target="_blank" href={`https://instagram.com/${social.instagram}`}>Instagram</a> •&nbsp; 

            <Link to="cv" rel="prev">
                Curriculum Vitae
            </Link>

                {` `}

                • Copyright © {new Date().getFullYear()}, Built with
                {` `}

                <a href="https://www.gatsbyjs.org">Gatsby</a>

            </div>
        </footer>

    )

}

export default Footer