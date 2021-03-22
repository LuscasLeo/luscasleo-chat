import {
  faFacebook,
  faGithub,
  faInstagram,
  faReact,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/scss/bootstrap.scss';
import React from 'react';
import { Col, Container, Jumbotron, Row } from 'react-bootstrap';
import { hot } from 'react-hot-loader/root';
import './dracula.css';
import './style.scss';
const App: React.FC<{}> = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Jumbotron>
            <h1>Hi! I&apos;m Lucas</h1>
            <span>I&apos;m 21, from Brazil and a big technology lover</span>
            <br />
            <br />
            I&apos;m sorry for the poor site. it&apos;s under development!
            <br />
            Anyway, you can find me at{' '}
            <a href="http://instagram.com/pebaronte">
              <FontAwesomeIcon icon={faInstagram} /> <span>Instagram</span>
            </a>
            ,{' '}
            <a href="http://github.com/luscasleo">
              <FontAwesomeIcon icon={faGithub} /> <span>GitHub</span>
            </a>{' '}
            or{' '}
            <a href="http://fb.com/luscasleo">
              <FontAwesomeIcon icon={faFacebook} /> <span>Facebook</span>
            </a>
            <br />
            <br />
            <h3>A little more about me</h3>
            <p>
              I&apos;m in love with programmation since i was 12 when i met the{' '}
              <b>PHP</b> language, since then i never stopped learning.
            </p>
            <p>Actually i have some experience on:</p>
            <ul>
              <li>Javascript</li>
              <li>Typescript</li>
              <li>Java</li>
              <li>Webpack</li>
              <li>NodeJS</li>
              <li>React</li>
            </ul>
            <span>and some other things i don&apos;t know right now</span>
            <p>
              I made this site with learning purpose. This site is made with{' '}
              <FontAwesomeIcon icon={faReact} /> <b>React</b>, using{' '}
              <b>Typescript</b>, hosted on a <b>AWS EC2</b> instance trough{' '}
              <b>Docker</b> using <b>Traefik</b>
            </p>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
};
export default hot(App);
