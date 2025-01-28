declare module 'embla-carousel' {
  export type EmblaCarouselType = any; // 必要に応じて具体的な型を定義
  export default function EmblaCarousel(node: HTMLElement, options?: any, plugins?: any[]): EmblaCarouselType;
}

declare module 'embla-carousel-autoplay' {
  export default function Autoplay(options?: any): any;
} 