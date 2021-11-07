/**
 * Converts record of class -> condition into list of classes
 * @param dynamic
 * @param classes
 */
export function classes(dynamic: Record<string, boolean>, classes = '') {
  return Object.entries(dynamic)
    .filter((entry) => entry[1])
    .map((entry) => entry[0])
    .join(' ')
    .concat(' ')
    .concat(classes)
}
