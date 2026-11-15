// Mobile variants retain the supplied artwork; full-size files remain available in the viewer.
export function imageSources(src:string,width=1536){return `${src.replace('.webp','-480.webp')} 480w, ${src.replace('.webp','-960.webp')} ${Math.min(960,width)}w, ${src} ${Math.min(1600,width)}w`}
