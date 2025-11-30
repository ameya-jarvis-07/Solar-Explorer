import { Injectable } from '@angular/core';
import Lenis from 'lenis';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private lenis: Lenis | null = null;
  private onScrollCallback: ((progress: number) => void) | null = null;

  initSmoothScroll(onScroll: (progress: number) => void): void {
    this.onScrollCallback = onScroll;
    
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    const raf = (time: number) => {
      this.lenis?.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    this.lenis.on('scroll', ({ scroll, limit }: { scroll: number; limit: number }) => {
      const progress = scroll / limit;
      this.onScrollCallback?.(progress);
    });
  }

  scrollTo(target: number): void {
    this.lenis?.scrollTo(target, {
      duration: 2,
      easing: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    });
  }

  destroy(): void {
    this.lenis?.destroy();
    this.lenis = null;
    this.onScrollCallback = null;
  }
}
