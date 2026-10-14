import type { ImgHTMLAttributes } from 'react';
export const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
export function Image({ src, priority = false, ...props }: ImgHTMLAttributes<HTMLImageElement> & { src: string; priority?: boolean }) {
  return <img {...props} src={src} loading={priority ? "eager" : "lazy"} decoding="async" />;
}
