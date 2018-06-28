import { ComponentPortal } from '@angular/cdk/portal';
import {
  ComponentFactory,
  ComponentFactoryResolver,
  Injectable,
  Injector,
  ReflectiveInjector,
  TemplateRef,
  Type,
} from '@angular/core';
import { of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { CdkService } from '../../service';
import { PopUpComponent } from './pop-up.component';
import { PopUpConfig, PopUpRef, POPUP_TOKEN, PopupOption } from './pop-up.model';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor(
    private _cdk: CdkService) { }

  open(
    component: TemplateRef<any> | ComponentFactory<any>
    , config: PopUpConfig = {}) {

    return of(null).pipe(
      switchMap(() => {
        const portalhost = this._cdk.createBodyPortalHost();

        const componentRef = portalhost.attach(new ComponentPortal(
          PopUpComponent,
          undefined,
          this._cdk.createInjector<PopupOption>(POPUP_TOKEN, {
            portalhost,
            component,
            config,
            id: 'test'
          })
        ));

        return componentRef.instance.completeSubject.asObservable().pipe(
          take(1),
          map(([data, isBack]) => {
            return data;
          })
        ); // only take once;
      })
    );

  }

}
