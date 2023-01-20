/* import Link from 'next/link';
import Image from 'next/image'; */

import Container from 'components/Container';
//import avatar from 'public/avatar.jpeg';
//import avatarBW from 'public/avatar-bw.jpg';

export default function About() {
  return (
    <Container title="About – Deepak Kumar">
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        {/*   <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          About Me
        </h1> */}
        <div className="mb-8 prose dark:prose-dark leading-6">
          <h2>Bio</h2>
          <p>
            I am a skilled and dedicated frontend developer with a strong
            foundation in computer science and web development.
          </p>
          {/* Job Title */}
          <h3>Job Title</h3>
          <p>
            In my current role as a frontend engineer at Doorpix Pvt Ltd, I have
            the opportunity to apply and further hone my skills in building
            Next.Js and React applications.
          </p>
          <h3>Education</h3>
          <p>
            I completed my schooling at Kendriya Vidyalaya, Gomti Nagar,
            Lucknow, and went on to earn a Bachelor's of Technology in Computer
            Science Engineering at the prestigious Babu Banarasi Das National
            Institute of Technology and Management.
          </p>
          <h2>Links</h2>
          <ul>
            <li>
              Twitter:{' '}
              <a
                href="https://twitter.com/dazzlerkumar"
                target={'_blank'}
                rel="noreferrer"
              >
                @dazzlerkumar
              </a>
            </li>
            <li>
              GitHub:{' '}
              <a
                href="https://github.com/dazzlerkumar"
                target={'_blank'}
                rel="noreferrer"
              >
                @dazzlerkumar
              </a>
            </li>

            <li>
              LinkedIn:{' '}
              <a
                href="https://www.linkedin.com/in/dazzlerkumar/"
                target={'_blank'}
                rel="noreferrer"
              >
                Deepak Kumar
              </a>
            </li>
          </ul>
          {/* <div className="flex space-x-8">
            <a href="/avatar.jpg">
              <Image
                alt="Deepak Kumar headshot"
                width={400}
                quality={100}
                src={avatar}
                className="rounded-md"
              />
            </a>
          </div> */}
        </div>
      </div>
    </Container>
  );
}
