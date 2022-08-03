/**
 * Giving the defaults, it lets you override specific properties of the objects for the test sake
 *
 * @param defaults - Default object to be returned
 * @param overrides - Overrides of the default object
 * @returns An object where you can customize specific properties for tests, keeping the defaults to avoid repeating
 */
export function fixtureFactory<T extends {}>(defaults: T) {
  return (overrides: Partial<T> = {}) => ({ ...defaults, ...overrides });
}
