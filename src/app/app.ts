import { Component, ElementRef, viewChild, AfterViewInit, OnDestroy, computed, inject, signal } from '@angular/core';
import { SolarSystemService } from './services/solar-system.service';
import { ScrollService } from './services/scroll.service';
import { PLANETS } from './models/planet.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit, OnDestroy {
  private canvas = viewChild<ElementRef<HTMLCanvasElement>>('canvas');
  private solarSystemService = inject(SolarSystemService);
  private scrollService = inject(ScrollService);
  
  protected readonly planets = PLANETS;
  protected readonly currentPlanetIndex = this.solarSystemService.currentPlanetIndex;
  protected readonly currentPlanet = computed(() => this.planets[this.currentPlanetIndex()]);
  protected readonly showFacts = signal(false);

  ngAfterViewInit(): void {
    const canvasElement = this.canvas()?.nativeElement;
    if (canvasElement) {
      this.solarSystemService.initScene(canvasElement);
      this.scrollService.initSmoothScroll((progress) => {
        this.solarSystemService.updateCameraPosition(progress);
      });
    }
  }

  scrollToPlanet(index: number): void {
    const scrollTarget = (index / (this.planets.length - 1)) * (document.body.scrollHeight - window.innerHeight);
    this.scrollService.scrollTo(scrollTarget);
    this.showFacts.set(false);
  }

  toggleFacts(): void {
    this.showFacts.update(value => !value);
  }

  ngOnDestroy(): void {
    this.scrollService.destroy();
    this.solarSystemService.dispose();
  }
}
