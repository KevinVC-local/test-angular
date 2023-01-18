import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appImageError]',
})
export class ImageErrorDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('error')
  loadFallbackOnError(): void {
    const element: HTMLImageElement = this.elementRef
      .nativeElement as HTMLImageElement;
    element.src = 'assets/img/not-found-pokemon.webp';
  }
}
