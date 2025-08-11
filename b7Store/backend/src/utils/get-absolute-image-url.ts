import { getBaseURL } from "./get-base-url";

export const getAbsoluteImageIrl = (path: string) => {
  return `${getBaseURL()}/${path}`;
};
