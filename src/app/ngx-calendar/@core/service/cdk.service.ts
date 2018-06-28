import { DomPortalHost, PortalInjector } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { ApplicationRef, ComponentFactoryResolver, Inject, Injectable, Injector, InjectionToken } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CdkService {

  constructor(
    @Inject(DOCUMENT) private document,
    private _appRef: ApplicationRef,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _injector: Injector) {
  }

  createBodyPortalHost() {
    return new DomPortalHost(
      this.document.body,
      this._componentFactoryResolver,
      this._appRef,
      this._injector
    );
  }

  createInjector<T>(key: InjectionToken<T>, data: any): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(key, data);

    return new PortalInjector(this._injector, injectorTokens);
  }


}
