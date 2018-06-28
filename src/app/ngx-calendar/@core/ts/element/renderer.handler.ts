import { Renderer2 } from '@angular/core';

export function addStyle(_renderer: Renderer2, elm: HTMLElement, style: { [key: string]: string | number }) {
  if (style) {
    Object.keys(style).forEach((key) => {
      const value = style[key];
      _renderer.setStyle(elm, key, value);
    });
  }
}

export function addClassByString(_renderer: Renderer2, elm: HTMLElement, value: string) {
  if (value) {
    _renderer.setAttribute(elm, 'class', `${elm.getAttribute('class')} ${value}`);
  }
}
