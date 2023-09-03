import Link from 'next/link';
import style from './style.module.css';
import Image from 'next/image';
export default function FeaturedProject() {
  const projects = [
    {
      id: 1,
      title: 'Angularly Ecommerce',
      slug: 'https://angularlyecommerce.web.app/',
      image: '/angularecommerce.png'
    },
    {
      id: 2,
      title: 'Config Gen',
      slug: 'https://config-generator-sooty.vercel.app/',
      image: '/configGen.png'
    },
    {
      id: 2,
      title: 'Next JS Template',
      slug: 'https://github.com/dazzlerkumar/NextJS-Template',
      image: '/nextjstemplate.png'
    }
  ];

  return (
    <div className={style.featuredProjects__container}>
      {projects.map((project) => (
        <Card
          key={project.id}
          title={project.title}
          slug={project.slug}
          data={project}
        />
      ))}
    </div>
  );
}
function Card({ data, title, slug }) {
  return (
    <Link href={slug} className={style.card} target="_blank">
      <div className="grid place-items-center w-full h-full">
        <div className={style.card__hover}>
          <div className={style.image_container}>
            <Image src={data.image} alt={data.image} fill />
          </div>
          <span>
            <h3>{title}</h3>
          </span>
        </div>
      </div>
    </Link>
  );
}
