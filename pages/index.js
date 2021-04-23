import Head from 'next/head';
import styled, { createGlobalStyle } from 'styled-components';
import { useState, useEffect} from 'react'
import { normalize } from 'styled-normalize'
import Newsletter from '../components/Newsletter'


// const StyledSimpleForm = styled(Mailchimp)`
//     margin-top: 120px;
//     button {
//       border: none;
//       background-color: red;

//     }
//     div {
//       padding: 10px
//     }
// `;

const GlobalStyle = createGlobalStyle`
  ${normalize}

  body {
    background-color: #000000;
    color: #FFFFFF;
    font-family: 'Courier New', Courier, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    font-size: 2rem;
  }
`;

const Container = styled.main`
  text-align: center;
	width: 100vw;
	height: 600px;	
	position: absolute;
	top:0;
	bottom: 0;
	left: 0;
	right: 0;
  	margin: auto;
`;

const Vertical = styled.div`
    margin: 20px auto;
    border-left: 2px solid white;
    width: 1px;
    height: ${props => props.height};
    text-align: center;
`;

const Text = styled.div`
`

export default function Home() {
 const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    const difference = +new Date(`${year}-07-31`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval, index) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={index}>
        {(timeLeft[interval]).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}{interval==="seconds" ? "" : ":"}
      </span>
    );
  });


  return (
    <>
      <Head>
        <title>Capturing a PM - A film by Gary ...</title>
      </Head>
      <Container>
        <GlobalStyle />
        <Text>Counting down.</Text>
        <Vertical height="160px"/>
         {timerComponents.length ? timerComponents : <span>Time's up!</span>} 
        <Vertical height="160px"/>
        <Text>31-07-2021</Text>
        <Newsletter />
      </Container>
    </>
  );
}