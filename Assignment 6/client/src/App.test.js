import content, { categories, labTimeslots } from './constants';

test('loads assignment constants', () => {
  expect(content.en.brand).toBe('CampusConnect');
  expect(content.mr.home).toBeTruthy();
  expect(categories).toContain('Bike');
  expect(labTimeslots.length).toBeGreaterThan(0);
});
