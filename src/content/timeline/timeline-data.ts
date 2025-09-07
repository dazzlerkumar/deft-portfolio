import { TimelineEvent } from '@/lib/types';

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'chapter-1-start',
    title: 'The Beginning',
    date: 'Early Career',
    description: 'Starting the journey as a frontend developer, learning the fundamentals and discovering the passion for creating beautiful user experiences.',
    chapterId: 'chapter-1',
    position: 0
  },
  {
    id: 'chapter-1-milestone-1',
    title: 'First Framework',
    date: 'Year 1',
    description: 'Mastering the first JavaScript framework and understanding component-based architecture.',
    chapterId: 'chapter-1',
    position: 1
  },
  {
    id: 'chapter-1-milestone-2',
    title: 'Design Systems',
    date: 'Year 2',
    description: 'Learning about design systems and the importance of consistent, scalable UI components.',
    chapterId: 'chapter-1',
    position: 2
  },
  {
    id: 'chapter-2-start',
    title: 'The Challenges',
    date: 'Mid Career',
    description: 'Facing complex technical challenges and learning to solve problems with creative solutions.',
    chapterId: 'chapter-2',
    position: 3
  },
  {
    id: 'chapter-2-milestone-1',
    title: 'Performance Optimization',
    date: 'Year 3',
    description: 'Diving deep into performance optimization and learning to build fast, efficient applications.',
    chapterId: 'chapter-2',
    position: 4
  },
  {
    id: 'chapter-2-milestone-2',
    title: 'Complex State Management',
    date: 'Year 4',
    description: 'Mastering complex state management patterns and building scalable application architectures.',
    chapterId: 'chapter-2',
    position: 5
  },
  {
    id: 'chapter-3-start',
    title: 'The Leadership',
    date: 'Senior Role',
    description: 'Transitioning into leadership roles and learning to guide teams toward technical excellence.',
    chapterId: 'chapter-3',
    position: 6
  },
  {
    id: 'chapter-3-milestone-1',
    title: 'Team Mentoring',
    date: 'Year 5',
    description: 'Mentoring junior developers and establishing best practices across the development team.',
    chapterId: 'chapter-3',
    position: 7
  },
  {
    id: 'chapter-3-milestone-2',
    title: 'Technical Strategy',
    date: 'Year 6',
    description: 'Defining technical strategy and architecture decisions that impact the entire organization.',
    chapterId: 'chapter-3',
    position: 8
  },
  {
    id: 'chapter-4-start',
    title: 'The Vision',
    date: 'Present',
    description: 'Looking toward the future and envisioning the next chapter of technological innovation.',
    chapterId: 'chapter-4',
    position: 9
  },
  {
    id: 'epilogue',
    title: 'The Code',
    date: 'Ongoing',
    description: 'Sharing knowledge and contributing to the developer community through open source and mentorship.',
    chapterId: 'epilogue',
    position: 10
  }
];

export const getTimelineEventsByChapter = (chapterId: string): TimelineEvent[] => {
  return timelineEvents.filter(event => event.chapterId === chapterId);
};

export const getTimelineEventById = (eventId: string): TimelineEvent | undefined => {
  return timelineEvents.find(event => event.id === eventId);
};

export const getNextTimelineEvent = (currentPosition: number): TimelineEvent | undefined => {
  return timelineEvents.find(event => event.position > currentPosition);
};

export const getPreviousTimelineEvent = (currentPosition: number): TimelineEvent | undefined => {
  return timelineEvents
    .filter(event => event.position < currentPosition)
    .sort((a, b) => b.position - a.position)[0];
};