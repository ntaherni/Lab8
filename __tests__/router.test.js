/**
 * @jest-environment jsdom
 */

 import { pushToHistory } from '../scripts/router.js';

 describe('pushing to history', () => {
    test('push settings', () => {
      let push = pushToHistory('settings', 0);
      expect(history.length).toBe(2);
      expect(push).toBe(history);
    });
    
    test('push entry', () => {
      let push = pushToHistory('entry', 0);
      expect(history.length).toBe(3);
      expect(push).toBe(history);
    });

    test('push default', () => {
        let push = pushToHistory('');
        expect(history.length).toBe(4);
        expect(push).toBe(history);
      });
  });