import { DomPortalOutlet } from '@angular/cdk/portal';
import { ComponentFactory, InjectionToken, ReflectiveInjector, TemplateRef, Type } from '@angular/core';
import { Subject } from 'rxjs';

export const POPUP_TOKEN = new InjectionToken('POPUP');
export interface PopupOption {
  portalhost: DomPortalOutlet;
  component: ComponentFactory<any> | TemplateRef<any>;
  config: PopUpConfig;
  id: string;
}

export interface PopUpModel {
  component: Type<PopUpRef>;
  config?: PopUpConfig;
  sendData?: any;
}

export interface PopUpRef {
  popupTitle?: string;
  popupOutputSender: Subject<any>;
}

export interface PopUpConfig {
  title?: string;
  /** Data being injected into the child component. */
  data?: any;
  /** Custom class for the overlay pane. */
  panelClass?: string;
  /** Custom class for the backdrop, */
  backdropClass?: string;
  /** style of the dialog. */
  panelStyle?: any;
  /** style of the backdrop. */
  backdropStyle?: any;
  /** Layout direction for the dialog's content. */
  disableTitle?: boolean;
  /** Whether the user can use escape or clicking outside to close a modal. */
  disableClose?: boolean;
  disableCloseButton?: boolean;
  disableBackdropClick?: boolean;
  /* main window animate */
  windowAnimate?: string;
  /** when lt-md fix to 100%  */
  notMdFix?: boolean;
  /** elevation height */
  elevation?: number;
  /** is check layout in the container */
  fixedContainer?: boolean;
}
