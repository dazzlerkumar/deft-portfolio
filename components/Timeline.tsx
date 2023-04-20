import React, { useRef, useEffect } from 'react';
export default function Timeline() {
  const eventScroll = useRef(null);
  const yearScroll = useRef(null);

  useEffect(() => {
    window.addEventListener(
      'scroll',
      (e) => {
        console.log('scrolling', e.target);
      },
      { passive: true }
    );

   /*  return () => {
      window.removeEventListener('scroll', () => {
        console.log('scrolling');
      });
    }; */
  }, []);
  /*  const onSidebarScroll = (e) => {
    yearScroll.current.scrollTop = e.target.scrollTop;
  }; */
  return (
    <div
      className=" max-w-2xl mx-auto mb-16 w-full h-full relative TimeLine"
      ref={eventScroll}
      /*   onScroll={(e) => onSidebarScroll(e)} */
    >
      <nav className="timeline">
        <ul ref={yearScroll}>
          {data.map((item, index) => (
            <li key={index}>{item.year}</li>
          ))}
        </ul>
      </nav>
      <section className="timeline__section">
        <div className="wrapper">
          {data.map((item, index) => (
            <div key={index} className="timeline__item">
              <h2 className="milestone">{item.year}</h2>
              <p>{item.events}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
const data = [
  {
    year: 2001,
    events: 'Lorem empisum fafbd sf dfna sklfjndf sfnk'
  },
  {
    year: 2002,
    events: 'Lorem empisum fafbd sf dfna sklfjndf sfnk'
  },
  {
    year: 2003,
    events: 'Lorem empisum fafbd sf dfna sklfjndf sfnk'
  },
  {
    year: 2004,
    events: 'Lorem empisum fafbd sf dfna sklfjndf sfnk'
  },
  {
    year: 2005,
    events: 'Lorem empisum fafbd sf dfna sklfjndf sfnk'
  },
  {
    year: 2006,
    events: 'Lorem empisum fafbd sf dfna sklfjndf sfnk'
  },
  {
    year: 2007,
    events: 'Lorem empisum fafbd sf dfna sklfjndf sfnk'
  },
  {
    year: 2008,
    events: 'Lorem empisum fafbd sf dfna sklfjndf sfnk'
  },
  {
    year: 2009,
    events: 'Lorem empisum fafbd sf dfna sklfjndf sfnk'
  },
  {
    year: 2010,
    events: 'Lorem empisum fafbd sf dfna sklfjndf sfnk'
  },
  {
    year: 2011,
    events: 'Lorem empisum fafbd sf dfna sklfjndf sfnk'
  },
  {
    year: 2012,
    events: 'Lorem empisum fafbd sf dfna sklfjndf sfnk'
  },
  {
    year: 2013,
    events: 'Lorem empisum fafbd sf dfna sklfjndf sfnk'
  },
  {
    year: 2014,
    events: 'Lorem empisum fafbd sf dfna sklfjndf sfnk'
  },
  {
    year: 2015,
    events: 'Lorem empisum fafbd sf dfna sklfjndf sfnk'
  },
  {
    year: 2016,
    events: 'Lorem empisum fafbd sf dfna sklfjndf sfnk'
  },
  {
    year: 2017,
    events: 'Lorem empisum fafbd sf dfna sklfjndf sfnk'
  },
  {
    year: 2018,
    events: 'Lorem empisum fafbd sf dfna sklfjndf sfnk'
  },
  {
    year: 2019,
    events: 'Lorem empisum fafbd sf dfna sklfjndf sfnk'
  },
  {
    year: 2020,
    events: 'Lorem empisum fafbd sf dfna sklfjndf sfnk'
  },
  {
    year: 2021,
    events: 'Lorem empisum fafbd sf dfna sklfjndf sfnk'
  },
  {
    year: 2022,
    events: 'Lorem empisum fafbd sf dfna sklfjndf sfnk'
  },
  {
    year: 2023,
    events: 'Lorem empisum fafbd sf dfna sklfjndf sfnk'
  }
];
