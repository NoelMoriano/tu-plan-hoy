export const getYouTubeId = (url: string): string => {
  const arrayUrl = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return arrayUrl[2] !== undefined
    ? arrayUrl[2].split(/[^0-9a-z_\-]/i)[0]
    : arrayUrl[0];
};
