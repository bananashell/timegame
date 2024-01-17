export const nameOf = <T = never>(propertyName: keyof T) =>
  propertyName as string;
