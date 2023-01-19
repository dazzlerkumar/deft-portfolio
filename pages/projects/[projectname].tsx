import { useState } from 'react';
import { useRouter } from 'next/router';
//components
import Container from 'components/Container';
import Image from 'next/image';
//content
import { projects } from 'content/userData';
export default function ProjectPage() {
  const [projectData, setProjectData] = useState(projects[0]);
  const router = useRouter();
  console.log('post', router);

  return (
    <Container title="Project - Deepak Kumar" description="My personal project">
      <div className="flex flex-col max-w-2xl mx-auto mb-16 w-full text-gray-900 dark:text-white">
        <div className="w-full text-sm tracking-tight text-gray-900 dark:text-white">
          {'<-'} Back to Projects
        </div>
        <div className="w-full min-h-[360px] bg-teal-500 relative p-2 rounded">
          <Image src={projectData.projectImg} fill alt="project image" />
        </div>
        <p className="text-4xl p-2">{projectData.projectName}</p>
        <p className=" p-2">{projectData.desc_1}</p>
        <div className="w-full p-2 flex flex-col text-sm">
          <div className="flex  items-center py-1 gap-2">
            <span className="font-semibold">Framework:</span>
            <span className="text-gray-900 dark:text-gray-200">
              {projectData.framework}
            </span>
          </div>

          <div className="flex items-center py-1 gap-2">
            <span className="font-semibold">Date of completion:</span>
            <span className="text-gray-900 dark:text-gray-200">10/02/2022</span>
          </div>
          <div className="flex  items-center py-1 gap-2">
            <span className="font-semibold">Hosted on:</span>
            <span className="text-gray-900 dark:text-gray-200">Vercel</span>
          </div>
        </div>
        <div className="w-full flex justify-center items-center gap-5">
          <a
            href="#"
            className="flex justify-center w-40 bg-white hover:bg-gray-800 text-gray-900 hover:text-white   py-2 px-4 border-b-4 border-slate hover:border-gray-700 rounded transform active:translate-y-1 transition duration-200 ease-in-out"
          >
            View Demo
          </a>
          <a
            href="#"
            className="flex justify-center w-40 bg-white hover:bg-gray-800 text-gray-900 hover:text-white  py-2 px-4 border-b-4 border-slate hover:border-gray-700 rounded transform active:translate-y-1 transition duration-200 ease-in-out"
          >
            View Repo
          </a>
        </div>
      </div>
    </Container>
  );
}
