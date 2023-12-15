export const isDefined = <T>(item: T | undefined | null | false): item is T => {
  return !!item;
};
