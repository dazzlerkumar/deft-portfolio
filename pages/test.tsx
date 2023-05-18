import { Suspense, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import style from '@styles/test.module.css';
import Container from '../components/Container';
import BlogPostCard from '../components/BlogPostCard';
import Timeline from '@components/Timeline';
import Button from '@components/Button/Buttons';

export default function Home() {
  const [superContainerStyles, setSuperContainerStyles] = useState({
    flexDirection: 'row' as 'row'
  });
  return (
    <Suspense fallback={null}>
      <Container>
        <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
          <div className={style.super_container} style={superContainerStyles}>
            <div className={style.flex_container}>
              <div className={style.grid_item}>Card A</div>
              <div className={style.grid_item}>Card B</div>
              <div className={style.grid_item}>Card C</div>
              <div
                className={style.grid_item}
                onMouseEnter={() => {
                  setSuperContainerStyles({
                    ...superContainerStyles,
                    flexDirection: 'row-reverse' as 'row-reverse'
                  });
                }}
                onMouseLeave={() => {
                  setTimeout(() => {
                    setSuperContainerStyles({
                      ...superContainerStyles,
                      flexDirection: 'row' as 'row'
                    });
                  }, 1000);
                }}
              >
                Card D
              </div>
            </div>
          </div>
          <div className={style.newBox}>
            <div className={style.card}>A</div>
            <div className={style.card}>B</div>
            <div className={style.card}>C</div>
            <div className={style.card}>D</div>
          </div>
          {/*  <Subscribe /> */}
          <Button />
          <Button buttonType="secondary" />
        </div>
      </Container>
    </Suspense>
  );
}
const Arr = [
  {
    id: 1,
    title: 'First Post'
  },
  {
    id: 2,
    title: 'Second Post'
  },
  {
    id: 3,
    title: 'Third Post'
  },
  {
    id: 4,
    title: 'Fourth Post'
  },
  {
    id: 5,
    title: 'Fifth Post'
  },
  {
    id: 6,
    title: 'Sixth Post'
  }
];
