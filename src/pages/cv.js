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
        <SEO title="Curriculum Vitae" />

        <h2>Hi!</h2>

        <p>
          My name is <b>Rizal Fakhri</b>, {moment("2000-12-30", "YYYY-MM-DD").toNow(true)} old, I'm from Indonesia  🇮🇩🇮🇩. I'm a Backend Developer,
          code <b>PHP</b> a lots,&nbsp;

          <span style={
            {
              color: `#ED605D`
            }
          }>Laravel</span>

          &nbsp;

          <span className="is-warning">
            <i className="nes-icon star is-small"></i>
          </span>


          &nbsp;most of the time.


          <br />
          <br />

          It's been <b> { been } years </b> since my first `Hello World`, I learn lot of things since then, such as best practices, design patterns, etc.

          <br />
          <br />

          I love to see how things work, even though it will drag me down into the darkness of unknown,
          but those feelings when I finally got the <b>"Aha!"</b> moment are priceless.

          <br />
          <br />

          Some of which are figuring out how "Illuminate(i)" hide <a href="https://rizalfakhri.id/the-power-of-pipeline/" target="_blank">The Power Of Pipeline</a> in order to runs their Middleware!

          Discovering stuff is fun!

          <br />
          <br />

          Anyway, this is some of my skills

          <br />
          <br />
          <hr />

          <div id="badges" className="items" style={
            {
              marginRight: `5px`
            }
          }>

            <a href="#" class="nes-badge">
              <span class="is-primary">PHP</span>
            </a>
            &nbsp;
            <a href="#" class="nes-badge">
              <span class="is-error">Laravel</span>
            </a>
            &nbsp;
            <a href="#" class="nes-badge">
              <span class="is-warning">JavaScript</span>
            </a>
            &nbsp;
            <a href="#" class="nes-badge">
              <span class="is-dark">Bash</span>
            </a>
            &nbsp;
            <a href="#" class="nes-badge is-splited">
              <span class="is-warning">DevOps</span>
              <span class="is-dark">Basic</span>
            </a>
            &nbsp;
            <a href="#" class="nes-badge">
              <span class="is-success">Symfony</span>
            </a>
            &nbsp;
            <a href="#" class="nes-badge is-splited">
              <span class="is-success">Symfony</span>
              <span class="is-primary">Component</span>
            </a>
            &nbsp;
            <a href="#" class="nes-badge">
              <span class="is-warning">SQL</span>
            </a>
            &nbsp;
            <a href="#" class="nes-badge">
              <span class="is-dark">Linux</span>
            </a>
            &nbsp;
            <a href="#" class="nes-badge">
              <span class="is-primary">VIM</span>
            </a>
            &nbsp;
            <a href="#" class="nes-badge">
              <span class="is-success">TMUX</span>
            </a>
            &nbsp;
            <a href="#" class="nes-badge">
              <span class="is-error">Object Oriented</span>
            </a>
            &nbsp;
            <a href="#" class="nes-badge">
              <span class="is-dark">Command Line Tools</span>
            </a>
            &nbsp;
            <a href="#" class="nes-badge">
              <span class="is-warning">Networking</span>
            </a>
            &nbsp;
            <a href="#" class="nes-badge">
              <span class="is-error">Breathing</span>
            </a>

          </div>

        </p>

        <hr />


        Those skills have been helping me out during my works, and I get some of which while doing my works. Thanks to Mr. Experiences below!

      <div style={{marginTop: `20px`}}>
        <div className="nes-container with-title is-dark" style={
          {
            backgroundColor: `#282c35`,
            fontFamily: `Press Start 2P`,
          }
        }>
          <h3 className="title" style={
            {
              backgroundColor: `#282c35`,
              color: `rgb(255, 167, 196)`
            }
          }>WORKING EXPERIENCES</h3>


          <div>
            <h4>PT. Procyon Logikreasi Indonesia</h4>

              <p>Fullstack Developer @ Jakarta, Indonesia 🇮🇩</p>

            <p>Working on multiple projects, that have similar functionality is challenging,
              especially when you need to avoid repeatedly writing same code, so on this company, I built reusable components so it can be used on cross-project. such as
            </p>
            <ul>
              <li>Dynamic Email Templating using [placeholder].</li>
              <li>Multiple Payment Gateway using registry patterns.</li>
              <li>Authentication scaffolding including OAuth authentication using 3rd party services.</li>
              <li>Dynamic SMTP Setting by extending the Laravel's Swiftmailer</li>
              <li>Base components, such as Settings, Authentication, Notification channels, Assets Storage, etc.</li>
              <li>Centralized package tracking number services.</li>
            </ul>


            <p>And the technology we are using is</p>
            <ul>
              <li>Laravel as the main framework.</li>
              <li>Angular JS as the front end & also used on the mobile app (ionic).</li>
              <li>Lumen for the 3rd party services.</li>
              <li>Redis for caching and real-time pub-sub service</li>
              <li>MySQL Database</li>
              <li>Mailgun & Sendgrid integration for SMTP</li>
              <li>Logwatch</li>
              <li>Nginx Reverse Proxy</li>
              <li>Load Balancing using HAProxy & Nginx</li>
              <li>Automatic SSL Provisioning using Let's Encrypt</li>
            </ul>

            <p>The field we are mostly working on is e-commerce based, so we're most likely has similar functionality between project, and by building those dynamic & reusable environments really helps us to move on as fast as possible to the next project, and at the same time keeping the old project scalable.</p>

            <hr />

            <h4>Ultrack Technology Sdn Bhd (TrackerHero)</h4>
              <p>Backend Developer @ Cyberjaya, Malaysia 🇲🇾</p>

              <p>TrackerHero is a Workforce Management system, That basically foccusses on Security Fields. This is the first time I working on this kind of project, And the lesson is, Amazing!</p>
              <p>Like, How Real-Time data affect the Security of an Assets, How downtime costs lots of money, How Security operate, etc.</p>
              <p>From Technical perspective, This is quite challenging though, Dealing with real-time data, a huge HTTP traffic from APIs, 3rd party services, Webhooks, Custom Requirements, Offline data, etc. </p>
              <p>But, this is the things that I foccussed the most</p>

              <ul>
                <li>Building powerfull APIs to fit the Client Requirements.</li>
                <li>Multiple Reporting Templates using Registry Patterns.</li>
                <li>Aggresive Caching using Redis.</li>
                <li>Distributing Assets through multiple Object Storage.</li>
                <li>Real-Time data push using pub-sub powered by Pusher™.</li>
                <li>Internal Real-Time data push using Websocket.</li>
                <li>Multi-Threading browser HTTP request to make our dashboard seamless using Web-Worker™.</li>
                <li>AWS integration, from S3 to CloudFront distribution.</li>
                <li>Simple Mail To Protocol using AWS SES.</li>
                <li>Bounce & Complain reports using AWS SNS.</li>
                <li>Queues Jobs using AWS SQS.</li>
                <li>On-The-Fly image manipulation using AWS Lambda.</li>
                <li>Centralized SessionID.</li>
                <li>Building Database Cluster using Galera.</li>
                <li>Building and Scaling Redis Cluster using Sentinel.</li>
              </ul>

              Working here been encourage me to learn more & taught me a priceless time!

          </div>


        </div>

      </div>


      <hr />

      Those process also improve my communication skills! My English also improved!, So here are some of languages that I speak.

      <div style={{marginTop: `20px`}}></div>

      <div className="nes-container with-title is-dark" style={
        {
          backgroundColor: `#282c35`,
          fontFamily: `Press Start 2P`,
        }
      }>
        <h3 className="title" style={
          {
            backgroundColor: `#282c35`,
            color: `rgb(255, 167, 196)`
          }
        }>LANGUAGES</h3>

        <ul>
          <li style={{fontSize: `20px`}}>Javanese (Native)</li>
          <p>My parents are Sundanese-Javanese, But I grow up on Jawa, So I more to Javanese native speaker, I also understand a little bit of Sundanese but that's just some of pieces, can't put it together.</p>

          <li style={{fontSize: `20px`}}>Bahasa Indonesia (Native)</li>
          <p>I speak Bahasa Indonesia most of the time. But the Slang, not the Original.</p>

          <li style={{fontSize: `20px`}}>English (Still Learning)</li>
          <p>Well I believe I'm good at reading and sometimes listening, But I need to improve my Pronouncing. <span style={{fontSize: `8px`}}>and my grammar..</span></p>
        </ul>

      </div>

      <hr />

      Well, Thank you very much for your time Checking Out my CV, If you need to reach me out, Please contact me at :

      <div style={{marginTop: `20px`}}></div>

      <div className="nes-container with-title is-dark" style={
        {
          backgroundColor: `#282c35`,
          fontFamily: `Press Start 2P`,
        }
      }>
        <h3 className="title" style={
          {
            backgroundColor: `#282c35`,
            color: `rgb(255, 167, 196)`
          }
        }>CONTACT ME</h3>

        <h5>Emails :</h5>
        <ul>
          <li><a href="mailto:rizalfakhri12@gmail.com">rizalfakhri12@gmail.com</a></li>
          <li><a href="mailto:me@rizalfakhri.id">me@rizalfakhri.id</a></li>
        </ul>

        <h5>Phone :</h5>
        <ul>
          <li><a href="tel:+6287731384336">+62 87731384336 (ID)</a></li>
          <li><a href="tel:+60105029686">+60 010 502 9686 (MY)</a></li>
        </ul>
      </div>


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
