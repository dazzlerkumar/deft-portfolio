import Image from 'next/image';
export default function projectCard({ title, desc, imgsrc, link }) {
  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <Image
          className="p-8 rounded-t-lg"
          src={imgsrc}
          width={400}
          height={400}
          quality={100}
          alt="product image"
        />
      </a>
      <div className="px-5 pb-5 h-full">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        <div className="flex items-center mt-2 mb-3">
          <p className=" text-gray-600 dark:text-gray-400">{desc}</p>
        </div>
        <div className="flex items-center justify-center mt-auto">
          <a
            href={link}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            View Details
          </a>
        </div>
      </div>
    </div>
  );
}
