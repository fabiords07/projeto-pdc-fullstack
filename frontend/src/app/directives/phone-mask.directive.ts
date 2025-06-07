import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPhoneMask]',
  standalone: true
})
export class PhoneMaskDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    const input = event.target;
    let value = input.value.replace(/\D/g, '');

    if (value.length > 11) {
      value = value.substring(0, 11);
    }

    let formattedValue = '';

    if (value.length === 0) {
      formattedValue = '';
    } else if (value.length <= 2) {
      formattedValue = `(${value}`;
    } else if (value.length <= 7) {
      formattedValue = `(${value.substring(0, 2)}) ${value.substring(2)}`;
    } else {
      formattedValue = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
    }

    input.value = formattedValue;

    const event2 = new Event('input', { bubbles: true });
    input.dispatchEvent(event2);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');

    const allowedKeys = [8, 9, 27, 13, 46, 35, 36, 37, 38, 39, 40];

    if (allowedKeys.includes(event.keyCode) ||
        (event.ctrlKey && [65, 67, 86, 88, 90].includes(event.keyCode))) {
      return;
    }

    if (value.length >= 11 && ![8, 46].includes(event.keyCode)) {
      event.preventDefault();
      return;
    }

    if (event.keyCode < 48 || event.keyCode > 57) {
      if (event.keyCode < 96 || event.keyCode > 105) {
        event.preventDefault();
      }
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text') || '';
    const numbers = pastedText.replace(/\D/g, '').substring(0, 11);

    const input = event.target as HTMLInputElement;
    input.value = numbers;

    const inputEvent = new Event('input', { bubbles: true });
    input.dispatchEvent(inputEvent);
  }
}
