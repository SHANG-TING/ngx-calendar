import { DomPortalOutlet } from '@angular/cdk/portal';
import { LocationStrategy } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  ReflectiveInjector,
  Renderer2,
  TemplateRef,
  ViewChild,
  InjectionToken,
  Injector,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { animateFactory } from '../../animation';
import { CUBIC_BEZIER, DURATIONS } from '../../animation/animate.constant';
import { AutoDestroy } from '../../ts/auto.destroy';
import { addClassByString, addStyle } from '../../ts/element/renderer.handler';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PopUpConfig, PopUpRef, POPUP_TOKEN, PopupOption } from './pop-up.model';
import { ViewContainerDirective } from './view-container.directive';

@Component({
  selector: 'pop-up-container',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
  animations: [
    animateFactory(`${DURATIONS.short} ${CUBIC_BEZIER.Sharp}`)
  ]
})
export class PopUpComponent extends AutoDestroy implements AfterContentInit, AfterViewInit {
  @HostBinding('@animate') private animate = 'fadeIn';

  @ViewChild('panel') panel: ElementRef;
  @ViewChild(ViewContainerDirective) view: ViewContainerDirective;

  portalhost: DomPortalOutlet = this._injectData.portalhost;
  component: ComponentFactory<any> | TemplateRef<any> = this._injectData.component;
  completeSubject: Subject<any> = new Subject();
  config: PopUpConfig = this._injectData.config;
  id: string = this._injectData.id;

  title: SafeHtml;
  isTemplate = true;
  // private keyExit$: Subscription;
  completeEmitter: EventEmitter<string>;
  private sendData: any;
  private isBack = true;

  // @HostListener('window:popstate', ['$event'])
  // onPopstate(event) {
  //   if (this._path.check(this.id)) {
  //     this.isBack = false;
  //     this.close();
  //   }
  // }

  constructor(
    @Inject(POPUP_TOKEN) public _injectData: PopupOption,
    private _cfr: ComponentFactoryResolver,
    private _sanitizer: DomSanitizer,
    private _elm: ElementRef,
    private _renderer: Renderer2,
  ) {
    super();
  }

  @HostListener('@animate.done', ['$event']) private animateDone(event) {
    // console.log(event);
    if (event.toState === 'void') {
      this.completeSubject.next([this.sendData, this.isBack]);
    }
  }

  ngAfterContentInit() {
    if (this.component['componentType']) {
      this.isTemplate = false;
      this.loadComponent(<any>this.component);
    } else {
      this.completeEmitter = new EventEmitter<string>();

      this.completeEmitter.pipe(
        takeUntil(this._destroy$)
      ).subscribe(data => {
        this.sendData = data;
        this.close();
      });
    }
    this.handelStyle(this.config);

  }

  ngAfterViewInit(): void {
    if (this.config.fixedContainer) {
      const panelElm: HTMLElement = this.panel.nativeElement;
      const popElm: HTMLElement = this._elm.nativeElement;

      const elmDetial = {
        height: panelElm.clientHeight,
        width: panelElm.clientWidth,
        top: panelElm.offsetTop,
        left: panelElm.offsetLeft
      };

      const windowElm = {
        height: popElm.offsetHeight,
        width: popElm.offsetWidth
      };

      const heightDis = (elmDetial.top + elmDetial.height) - windowElm.height;
      const widthDis = (elmDetial.left + elmDetial.width) - windowElm.width;

      const elm: HTMLElement = this.panel.nativeElement;
      if (heightDis > 0) {
        this._renderer.setStyle(this.panel.nativeElement, 'top', `${windowElm.height - elmDetial.height}px`);
      }
      if (widthDis > 0) {
        this._renderer.setStyle(this.panel.nativeElement, 'left', `${windowElm.width - elmDetial.width}px`);
      }
    }
  }

  // handel the pop-up style and class
  private handelStyle(config: PopUpConfig) {
    if (config) {
      if (config.title) { this.title = this._sanitizer.bypassSecurityTrustHtml(config.title); }

      addClassByString(this._renderer, this._elm.nativeElement, config.backdropClass);
      addStyle(this._renderer, this._elm.nativeElement, config.backdropStyle);

      if (!config.notMdFix) { this._renderer.addClass(this._elm.nativeElement, 'md-fix'); }

      addStyle(this._renderer, this.panel.nativeElement, config.panelStyle);
      addClassByString(this._renderer, this.panel.nativeElement, config.panelClass);

      if (!config.elevation) { config.elevation = 24; }
      this._renderer.addClass(this.panel.nativeElement, `mat-elevation-z${config.elevation}`);
    }
  }

  // load Dynamin component
  private loadComponent(component: ComponentFactory<any>) {
    const viewContainerRef = this.view.viewContainerRef;
    // viewContainerRef.clear();

    const injector: Injector =
      ReflectiveInjector.resolveAndCreate([
        { provide: POPUP_TOKEN, useValue: this.config.data }
      ]);

    const componentRef = viewContainerRef.createComponent<PopUpRef>(component, 0, injector);

    if (componentRef.instance.popupTitle) {
      this.config.title = componentRef.instance.popupTitle;
    }

    // when data send back, close this dialog
    if (componentRef.instance.popupOutputSender) {
      componentRef.instance.popupOutputSender.pipe(
        takeUntil(this._destroy$)
      ).subscribe((data: any) => {
        this.sendData = data;
        this.close();
      });
    }
  }

  close() {
    this.portalhost.detach();
  }
}
