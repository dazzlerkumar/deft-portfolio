import Link from 'next/link';

import Container from 'components/Container';

export default function NotFound() {
  return (
    <Container title="404 – Deepak Kumar">
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          451 – Unavailable For Legal Reasons
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Why show a generic 404 when I can make it sound mysterious? It seems
          you've found something that used to exist, or you spelled something
          wrong. I'm guessing you spelled something wrong. Can you double check
          that URL?
        </p>
        <Link
          href="/"
          className="flex justify-center w-40 bg-white hover:bg-gray-800 text-gray-900 hover:text-white   py-2 px-4 border-b-4 border-slate hover:border-gray-700 rounded transform active:translate-y-1 transition duration-200 ease-in-out"
        >
          Return Home
        </Link>
      </div>
    </Container>
  );
}
