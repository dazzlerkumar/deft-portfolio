//components
import Container from 'components/Container';
export default function ProjectPage({ post }) {
  console.log('post', post);
  return (
    <Container title="Project - Deepak Kumar" description="My personal project">
      <div className=" max-w-2xl mx-auto mb-16 w-full grid grid-cols-[193px_minmax(451px,1fr)] text-gray-900 dark:text-white">
        <div className="flex flex-col">
          <div className="w-full text-sm tracking-tight text-gray-900 dark:text-white">
            {'<-'} Back to Projects
          </div>
        </div>
        <div>B</div>
      </div>
    </Container>
  );
}
