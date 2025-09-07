import { describe, it, expect } from 'vitest';
import {
  timelineEvents,
  getTimelineEventsByChapter,
  getTimelineEventById,
  getNextTimelineEvent,
  getPreviousTimelineEvent
} from '../timeline-data';

describe('Timeline Data', () => {
  describe('timelineEvents', () => {
    it('contains expected number of events', () => {
      expect(timelineEvents).toHaveLength(11);
    });

    it('has events with required properties', () => {
      timelineEvents.forEach(event => {
        expect(event).toHaveProperty('id');
        expect(event).toHaveProperty('title');
        expect(event).toHaveProperty('date');
        expect(event).toHaveProperty('description');
        expect(event).toHaveProperty('chapterId');
        expect(event).toHaveProperty('position');
        
        expect(typeof event.id).toBe('string');
        expect(typeof event.title).toBe('string');
        expect(typeof event.date).toBe('string');
        expect(typeof event.description).toBe('string');
        expect(typeof event.chapterId).toBe('string');
        expect(typeof event.position).toBe('number');
      });
    });

    it('has events in correct position order', () => {
      for (let i = 0; i < timelineEvents.length - 1; i++) {
        expect(timelineEvents[i].position).toBeLessThan(timelineEvents[i + 1].position);
      }
    });

    it('has unique event IDs', () => {
      const ids = timelineEvents.map(event => event.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('has sequential positions starting from 0', () => {
      timelineEvents.forEach((event, index) => {
        expect(event.position).toBe(index);
      });
    });
  });

  describe('getTimelineEventsByChapter', () => {
    it('returns events for chapter-1', () => {
      const chapter1Events = getTimelineEventsByChapter('chapter-1');
      
      expect(chapter1Events).toHaveLength(3);
      expect(chapter1Events.every(event => event.chapterId === 'chapter-1')).toBe(true);
      expect(chapter1Events[0].title).toBe('The Beginning');
    });

    it('returns events for chapter-2', () => {
      const chapter2Events = getTimelineEventsByChapter('chapter-2');
      
      expect(chapter2Events).toHaveLength(3);
      expect(chapter2Events.every(event => event.chapterId === 'chapter-2')).toBe(true);
      expect(chapter2Events[0].title).toBe('The Challenges');
    });

    it('returns empty array for non-existent chapter', () => {
      const nonExistentEvents = getTimelineEventsByChapter('non-existent');
      expect(nonExistentEvents).toEqual([]);
    });

    it('returns events in position order', () => {
      const chapter1Events = getTimelineEventsByChapter('chapter-1');
      
      for (let i = 0; i < chapter1Events.length - 1; i++) {
        expect(chapter1Events[i].position).toBeLessThan(chapter1Events[i + 1].position);
      }
    });
  });

  describe('getTimelineEventById', () => {
    it('returns correct event by ID', () => {
      const event = getTimelineEventById('chapter-1-start');
      
      expect(event).toBeDefined();
      expect(event?.id).toBe('chapter-1-start');
      expect(event?.title).toBe('The Beginning');
      expect(event?.chapterId).toBe('chapter-1');
    });

    it('returns undefined for non-existent ID', () => {
      const event = getTimelineEventById('non-existent-id');
      expect(event).toBeUndefined();
    });

    it('returns correct event for each valid ID', () => {
      timelineEvents.forEach(originalEvent => {
        const foundEvent = getTimelineEventById(originalEvent.id);
        expect(foundEvent).toEqual(originalEvent);
      });
    });
  });

  describe('getNextTimelineEvent', () => {
    it('returns next event from position 0', () => {
      const nextEvent = getNextTimelineEvent(0);
      
      expect(nextEvent).toBeDefined();
      expect(nextEvent?.position).toBe(1);
      expect(nextEvent?.id).toBe('chapter-1-milestone-1');
    });

    it('returns next event from middle position', () => {
      const nextEvent = getNextTimelineEvent(5);
      
      expect(nextEvent).toBeDefined();
      expect(nextEvent?.position).toBe(6);
      expect(nextEvent?.id).toBe('chapter-3-start');
    });

    it('returns undefined when at last position', () => {
      const lastPosition = timelineEvents[timelineEvents.length - 1].position;
      const nextEvent = getNextTimelineEvent(lastPosition);
      
      expect(nextEvent).toBeUndefined();
    });

    it('returns undefined for position beyond last event', () => {
      const nextEvent = getNextTimelineEvent(999);
      expect(nextEvent).toBeUndefined();
    });

    it('returns first event with position > current', () => {
      // Test with a position that doesn't exactly match an event
      const nextEvent = getNextTimelineEvent(2.5);
      
      expect(nextEvent).toBeDefined();
      expect(nextEvent?.position).toBe(3);
    });
  });

  describe('getPreviousTimelineEvent', () => {
    it('returns previous event from position 1', () => {
      const prevEvent = getPreviousTimelineEvent(1);
      
      expect(prevEvent).toBeDefined();
      expect(prevEvent?.position).toBe(0);
      expect(prevEvent?.id).toBe('chapter-1-start');
    });

    it('returns previous event from middle position', () => {
      const prevEvent = getPreviousTimelineEvent(5);
      
      expect(prevEvent).toBeDefined();
      expect(prevEvent?.position).toBe(4);
      expect(prevEvent?.id).toBe('chapter-2-milestone-1');
    });

    it('returns undefined when at first position', () => {
      const prevEvent = getPreviousTimelineEvent(0);
      expect(prevEvent).toBeUndefined();
    });

    it('returns undefined for negative position', () => {
      const prevEvent = getPreviousTimelineEvent(-1);
      expect(prevEvent).toBeUndefined();
    });

    it('returns last event with position < current', () => {
      // Test with a position that doesn't exactly match an event
      const prevEvent = getPreviousTimelineEvent(2.5);
      
      expect(prevEvent).toBeDefined();
      expect(prevEvent?.position).toBe(2);
    });

    it('returns most recent previous event when multiple exist', () => {
      const prevEvent = getPreviousTimelineEvent(10);
      
      expect(prevEvent).toBeDefined();
      expect(prevEvent?.position).toBe(9);
      expect(prevEvent?.id).toBe('chapter-4-start');
    });
  });

  describe('Data Integrity', () => {
    it('has consistent chapter progression', () => {
      const chapters = ['chapter-1', 'chapter-2', 'chapter-3', 'chapter-4', 'epilogue'];
      
      chapters.forEach(chapterId => {
        const chapterEvents = getTimelineEventsByChapter(chapterId);
        expect(chapterEvents.length).toBeGreaterThan(0);
      });
    });

    it('has meaningful descriptions for all events', () => {
      timelineEvents.forEach(event => {
        expect(event.description.length).toBeGreaterThan(10);
        expect(event.description).not.toBe(event.title);
      });
    });

    it('has appropriate dates for career progression', () => {
      const earlyCareerEvents = getTimelineEventsByChapter('chapter-1');
      const midCareerEvents = getTimelineEventsByChapter('chapter-2');
      const seniorEvents = getTimelineEventsByChapter('chapter-3');
      
      expect(earlyCareerEvents[0].date).toBe('Early Career');
      expect(midCareerEvents[0].date).toBe('Mid Career');
      expect(seniorEvents[0].date).toBe('Senior Role');
    });
  });
});