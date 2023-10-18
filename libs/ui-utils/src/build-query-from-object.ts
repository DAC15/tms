export const buildQueryFromObject = (
  object?: Record<string, unknown>
): string => {
  if (!object) {
    return '';
  }

  const query = Object.keys(object).reduce((acc: string, key: string) => {
    const value = (object as Record<string, string>)[key];
    if (value == null || value?.length === 0) {
      return acc;
    }
    return `${acc}&${key}=${encodeURIComponent(value)}`;
  }, '');

  return query.length ? query.substring(1) : '';
};
