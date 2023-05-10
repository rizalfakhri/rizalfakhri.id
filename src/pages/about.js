import React, { Component } from 'react';
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import AboutMe from "../components/AboutMe"
import "../styles/nes.min.css"
import { relativeTimeRounding } from 'moment';
import ErrorStackParser from 'error-stack-parser';


class CV extends Component {

  state = {
    been: `unknown`
  }

  componentDidMount() {

    let moment = require('moment')

    this.interval = setInterval(() => {
      this.setState({
          been: moment.duration(moment().diff(moment('2015'))).as('years').toString().substring(0, 16)
      })

    }, 100)

  }

  render() {
    const { data } = this.props
    const { been } = this.state
    const siteTitle = data.site.siteMetadata.title


    let moment = require('moment')

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="About" />

        <h2>Hi!</h2>

          My name is <b>Rizal</b>,  Indonesian  🇮🇩🇮🇩. I'm a person that's currently still able to live by typing on a keyboard day and night.




          <br />
          <br />

          It's been <b> { been } years </b> since my first `Hello World`.

          <br />
          <br />

          I love to see how things work, even though it will drag me down into the darkness of unknown,
          but those feelings when I finally got the <b>"Aha!"</b> moment are priceless.

          <br />
          <br />

          On the other hand, I'd love to see that my things is working out, no more distraction or other people's drama 💩

          <br />
          <br />

          Anyway, this is it.

          <br />

      </Layout>
    );
  }
}

export default CV;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
