import Link from 'next/link';
//components
import Container from 'components/Container';
import ProjectCard from 'components/projectCard';

//Assets
import AngularlyEcommerce from '../../public/angularecommerce.png';
import bookmonger from '@public/bookmonger_ss.png';
export default function Dashboard() {
  return (
    <Container
      title="Projects - Deepak Kumar"
      description="My personal projects"
    >
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <div className="mb-8">
          <p className="text-l md:text-xl text-gray-600 dark:text-gray-400 mb-4">
            These are my personal projects.
          </p>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
          <ProjectCard
            title={'Angularly Ecommerce'}
            link="projects/angularlyecommerce"
            imgsrc={AngularlyEcommerce}
            desc="Ecommerce website built using Angular 11"
          />
          <ProjectCard
            title={'BookMonger'}
            link="#"
            imgsrc={bookmonger}
            desc="Tinder for book exchange built using WAMP stack."
          />
        </div>
      </div>

      {/*  >
        <div className="flex flex-col w-full">
          <Unsplash />
          <YouTube />
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
          <Analytics />
          <GitHub />
        </div>
        <h2 className="font-bold text-3xl tracking-tight mb-4 mt-16 text-black dark:text-white">
          Top Tracks
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Curious what I'm currently jamming to? Here's my top tracks on Spotify
          updated daily.
        </p>
        <TopTracks />
      */}
    </Container>
  );
}
