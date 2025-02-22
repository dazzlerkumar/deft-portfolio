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
        <div className="mb-8 prose dark:prose-dark leading-16">
          <h2>Bio</h2>
          <p>
            Hello, I'm Deepak Kumar, a highly skilled Front-End Website
            Developer with a passion for creating user-friendly and engaging
            website interfaces using the Next.js (ReactJS) framework. <br />
            Since February 2022, I've been putting my expertise to work at
            Techpix Software Solutions (prev. Doorpix Pvt Ltd), continuously honing my abilities in website
            development.
            <br />
            If you're looking for a talented and motivated Front-End Website
            Developer who is committed to delivering top-notch results, look no
            further than me🧑🏽‍💻. With my combination of technical expertise,
            creative vision, and unwavering commitment to excellence, I'm sure
            to bring your web development projects to life in exciting and
            engaging ways.
          </p>
          {/* Job Title */}
          <h3>Job Title</h3>
          <p>
            As a Frontend Engineer at{' '}
            <a
              href="https://www.linkedin.com/company/doorpix/about/"
              target={'_blank'}
              rel="noreferrer"
              className="font-normal"
            >
              {' '}
              Techpix Software Solutions (prev. Doorpix Pvt Ltd)
            </a>{' '}
            since February 2022, I have been presented with a unique opportunity
            to not only apply but also enhance my skills in building Next.Js and
            React applications.
          </p>
          <h3>Education</h3>
          <p>
            I am a proud alumnus of Kendriya Vidyalaya, Gomti Nagar, Lucknow,
            where I completed my schooling. Continuing my pursuit of excellence,
            I went on to earn a Bachelor's of Technology in Computer Science
            Engineering from the prestigious{' '}
            <a
              href="https://aktu.ac.in/"
              target={'_blank'}
              rel="noreferrer"
              className="font-normal"
            >
              {' '}
              Dr. APJ Abdul Kalam Technical University, Lucknow.
            </a>
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
              Gitlab:{' '}
              <a
                href="https://gitlab.com/dazzlerkumar"
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
