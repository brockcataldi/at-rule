import { describe, expect, test } from '@jest/globals';
import { at } from './index';
 
describe('testing index file', () => {
  test('basic test', () => {
    expect(at('hi')).toBe('Test: hi');
  });
});