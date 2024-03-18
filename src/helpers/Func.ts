export const randomString = (length: number) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result.toUpperCase();
};

export const hashString = (s: string): number => {
  return s.split('').reduce(function (a, b) {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
};

export const isValidNumber = (s: string): boolean => {
  return !isNaN(Number(s));
};

export const hashObject = (o: any): number => {
  return hashString(JSON.stringify(o));
};

export const deepCopy = (o: any): any => {
  return JSON.parse(JSON.stringify(o));
};

export const generateRandomString = function (length = 6) {
  return Math.random().toString(20).substring(2, length);
};
