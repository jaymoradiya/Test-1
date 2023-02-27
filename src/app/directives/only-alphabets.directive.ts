import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appOnlyAlphabets]'
})
export class OnlyAlphabetsDirective {

  @Output() ngModelValueChange = new EventEmitter();

  constructor() { }

  @HostListener('keypress', ['$event'])  onKeyPress(event: any){
    if((event.keyCode >= 97 && event.keyCode <= 122) || (event.keyCode >= 65 && event.keyCode <= 90)){
      return event;
    }
    event.preventDefault();
  }

  @HostListener('paste', ['$event'])  onPaste(event: any){
    event.preventDefault();

    let data= event.clipboardData.getData('text');
    const re = /[^a-zA-Z]/g;
    data = (data as string).replace(re, "");
    document.execCommand('insertText', true, data);
    this.ngModelValueChange.emit(data);
  }

  // @HostListener('input', ['$event'])  onInput(event: any){
  //   event.preventDefault();

  //   let data = event.target.value;
  //   const re = /[^a-zA-Z]/g;
  //   data = (data as string).replace(re, "");
  //   document.execCommand('insertText', false, data);
  //   // const selection = window.getSelection();
  //   // if (!selection?.rangeCount) return;
  //   // selection.deleteFromDocument();
  //   // (selection!.focusNode!.childNodes[1] as HTMLInputElement).value = data;
  //   // selection.collapseToEnd();
  //   // this.ngModelValueChange.emit(data);
  // }
}
