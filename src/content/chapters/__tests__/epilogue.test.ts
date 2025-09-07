import { describe, it, expect } from 'vitest';
import epilogueContent from '../epilogue';

describe('Epilogue Content', () => {
  it('has required structure', () => {
    expect(epilogueContent).toHaveProperty('title');
    expect(epilogueContent).toHaveProperty('subtitle');
    expect(epilogueContent).toHaveProperty('introduction');
    expect(epilogueContent).toHaveProperty('architectureNodes');
    expect(epilogueContent).toHaveProperty('codeExamples');
    expect(epilogueContent).toHaveProperty('bestPractices');
  });

  it('has valid architecture nodes', () => {
    expect(Array.isArray(epilogueContent.architectureNodes)).toBe(true);
    expect(epilogueContent.architectureNodes.length).toBeGreaterThan(0);
    
    epilogueContent.architectureNodes.forEach(node => {
      expect(node).toHaveProperty('id');
      expect(node).toHaveProperty('label');
      expect(node).toHaveProperty('type');
      expect(node).toHaveProperty('description');
      expect(node).toHaveProperty('technologies');
      expect(node).toHaveProperty('connections');
      expect(node).toHaveProperty('position');
      
      expect(['component', 'service', 'data', 'external']).toContain(node.type);
      expect(Array.isArray(node.technologies)).toBe(true);
      expect(Array.isArray(node.connections)).toBe(true);
      expect(node.position).toHaveProperty('x');
      expect(node.position).toHaveProperty('y');
    });
  });

  it('has valid code examples', () => {
    expect(Array.isArray(epilogueContent.codeExamples)).toBe(true);
    expect(epilogueContent.codeExamples.length).toBeGreaterThan(0);
    
    epilogueContent.codeExamples.forEach(example => {
      expect(example).toHaveProperty('name');
      expect(example).toHaveProperty('path');
      expect(example).toHaveProperty('language');
      expect(example).toHaveProperty('description');
      expect(example).toHaveProperty('content');
      
      expect(typeof example.name).toBe('string');
      expect(typeof example.path).toBe('string');
      expect(typeof example.language).toBe('string');
      expect(typeof example.description).toBe('string');
      expect(typeof example.content).toBe('string');
    });
  });

  it('has valid best practices', () => {
    expect(Array.isArray(epilogueContent.bestPractices)).toBe(true);
    expect(epilogueContent.bestPractices.length).toBeGreaterThan(0);
    
    epilogueContent.bestPractices.forEach(practice => {
      expect(practice).toHaveProperty('id');
      expect(practice).toHaveProperty('title');
      expect(practice).toHaveProperty('category');
      expect(practice).toHaveProperty('description');
      expect(practice).toHaveProperty('language');
      expect(practice).toHaveProperty('goodExample');
      expect(practice).toHaveProperty('benefits');
      
      expect(['performance', 'accessibility', 'testing', 'architecture', 'security']).toContain(practice.category);
      expect(Array.isArray(practice.benefits)).toBe(true);
      expect(practice.goodExample).toHaveProperty('code');
      expect(practice.goodExample).toHaveProperty('explanation');
    });
  });

  it('has consistent node connections', () => {
    const nodeIds = epilogueContent.architectureNodes.map(node => node.id);
    
    epilogueContent.architectureNodes.forEach(node => {
      node.connections.forEach(connectionId => {
        expect(nodeIds).toContain(connectionId);
      });
    });
  });

  it('has non-empty content strings', () => {
    expect(epilogueContent.title.length).toBeGreaterThan(0);
    expect(epilogueContent.subtitle.length).toBeGreaterThan(0);
    expect(epilogueContent.introduction.length).toBeGreaterThan(0);
  });

  it('has valid position coordinates', () => {
    epilogueContent.architectureNodes.forEach(node => {
      expect(typeof node.position.x).toBe('number');
      expect(typeof node.position.y).toBe('number');
      expect(node.position.x).toBeGreaterThanOrEqual(0);
      expect(node.position.y).toBeGreaterThanOrEqual(0);
    });
  });
});