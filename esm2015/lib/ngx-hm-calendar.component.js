/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ComponentFactoryResolver, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { NgxRxModalService } from 'ngx-rx-modal';
import { NgxHmCalendarViewMode } from './ngx-hm-calendar.model';
import { NgxHmCalendarMonthViewComponent } from './month/ngx-hm-calendar-month-view/ngx-hm-calendar-month-view.component';
import { NgxHmCalendarWeekViewComponent } from './week/ngx-hm-calendar-week-view/ngx-hm-calendar-week-view.component';
import { NgxHmCalendarDayViewComponent } from './day/ngx-hm-calendar-day-view/ngx-hm-calendar-day-view.component';
import { NgxHmCalendarMonthPopupComponent } from './month/ngx-hm-calendar-month-popup/ngx-hm-calendar-month-popup.component';
/** @type {?} */
const time = '150ms linear';
export class NgxHmCalendarComponent {
    /**
     * @param {?} _model
     * @param {?} _factory
     */
    constructor(_model, _factory) {
        this._model = _model;
        this._factory = _factory;
        this.weekNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        this.yearName = '年';
        this.monthName = '月';
        this.dayName = '日';
        this.eventCategorys = [];
        this.weeklyEvents = [];
        this.events = [];
        this.nstr = new Date();
        this.open = new EventEmitter();
        this.className = 'black';
        this.size = {
            width: '100vw',
            height: '100vh',
        };
        /**
         * 顯示模式
         */
        this.viewMode = NgxHmCalendarViewMode.month;
        this.legendOpen = 'flyOut';
        this.monthPopupComponent = this._factory.resolveComponentFactory(NgxHmCalendarMonthPopupComponent);
    }
    /**
     * @return {?}
     */
    get ynow() {
        return this.nstr.getFullYear();
    }
    /**
     * @return {?}
     */
    get mnow() {
        return this.nstr.getMonth();
    }
    /**
     * @return {?}
     */
    get dnow() {
        return this.nstr.getDate();
    }
    /**
     * @return {?}
     */
    get monDetail() {
        /** @type {?} */
        let result = `${this.ynow} ${this.yearName} ${this.mnow + 1} ${this.monthName}`;
        if (this.viewMode === NgxHmCalendarViewMode.day) {
            result = `${result} ${this.dnow} ${this.dayName}`;
        }
        return result;
    }
    /**
     * @return {?}
     */
    prev() {
        switch (this.viewMode) {
            case NgxHmCalendarViewMode.month:
                this.monthComponent.prev();
                break;
            case NgxHmCalendarViewMode.week:
                this.weekComponent.prev();
                break;
            case NgxHmCalendarViewMode.day:
                this.dayComponent.prev();
                break;
        }
    }
    /**
     * @return {?}
     */
    next() {
        switch (this.viewMode) {
            case NgxHmCalendarViewMode.month:
                this.monthComponent.next();
                break;
            case NgxHmCalendarViewMode.week:
                this.weekComponent.next();
                break;
            case NgxHmCalendarViewMode.day:
                this.dayComponent.next();
                break;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    openEvent(event) {
        this.open.emit(event);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    openSelector($event) {
        this._model
            .open(this.monthPopupComponent, {
            disableCloseButton: true,
            panelStyle: {
                top: `${$event.offsetY}px`,
            },
            data: { theme: this.className, containerViewMode: this.viewMode },
        })
            .subscribe(selectedDate => {
            if (selectedDate) {
                this.nstr = selectedDate;
            }
        });
    }
    /**
     * @param {?} mode
     * @return {?}
     */
    chaneMode(mode) {
        this.viewMode = mode;
    }
    /**
     * @return {?}
     */
    legendToggle() {
        this.legendOpen = this.legendOpen === 'flyIn' ? 'flyOut' : 'flyIn';
    }
}
NgxHmCalendarComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-hm-calendar',
                template: `<div class="content"
     [ngClass]="className"
     [ngStyle]="size">
  <div class="header">
    <span class="header-button"
          (click)="prev()">
      <div class="button left"></div>
    </span>
    <h1 class="title"
        (click)="openSelector($event)">
      {{ monDetail }}
    </h1>
    <span class="header-button"
          (click)="next()">
      <div class="button right"></div>
    </span>
  </div>
  <div class="view-block"
       [ngSwitch]="viewMode">

    <ngx-hm-calendar-month-view [className]="className"
                                *ngSwitchCase="'month'"
                                [weekNames]="weekNames"
                                [yearName]="yearName"
                                [monthName]="monthName"
                                [events]="events"
                                [weeklyEvents]="weeklyEvents"
                                [nstr]="nstr"
                                (open)="openEvent($event)"
                                (swipeleft)="next()"
                                (swiperight)="prev()"></ngx-hm-calendar-month-view>

    <ngx-hm-calendar-week-view [className]="className"
                               *ngSwitchCase="'week'"
                               [events]="events"
                               [weeklyEvents]="weeklyEvents"
                               [nstr]="nstr"
                               (open)="openEvent($event)"
                               (swipeleft)="next()"
                               (swiperight)="prev()"></ngx-hm-calendar-week-view>

    <ngx-hm-calendar-day-view [className]="className"
                              *ngSwitchCase="'day'"
                              [events]="events"
                              [weeklyEvents]="weeklyEvents"
                              [nstr]="nstr"
                              start="9:00"
                              end="23:00"
                              (open)="openEvent($event)"
                              (swipeleft)="next()"
                              (swiperight)="prev()"></ngx-hm-calendar-day-view>

  </div>

  <ul class="type-buttom"
      [@animate]="legendOpen">
    <li>
      <button class="button day"
              type="button"
              [disabled]="viewMode === 'day'"
              (click)="chaneMode('day')">日</button>
    </li>

    <li>
      <button class="button week"
              type="button"
              [disabled]="viewMode === 'week'"
              (click)="chaneMode('week')">周</button>
    </li>

    <li>
      <div style="display: flex;">
        <span class="open-menu"
              (click)="legendToggle()"></span>
        <button class="button month"
                type="button"
                [disabled]="viewMode === 'month'"
                (click)="chaneMode('month')">月</button>
      </div>
    </li>
  </ul>

  <div class="legend">
    <span class="entry"
          *ngFor="let category of eventCategorys">
      {{ category.name }}
      <span class="icon"
            [style.background]="category.color"></span>
    </span>
  </div>
</div>
`,
                animations: [
                    trigger('animate', [
                        state('flyOut', style({
                            transform: 'translateX(calc(100% - 55px))',
                        })),
                        state('flyIn', style({
                            transform: 'translateX(0)',
                        })),
                        transition('flyOut => flyIn', [
                            style({
                                transform: 'translateX(calc(100% - 55px))',
                            }),
                            animate(time),
                        ]),
                        transition('flyIn => flyOut', [
                            style({
                                transform: 'translateX(0)',
                            }),
                            animate(time),
                        ]),
                    ]),
                ],
                styles: [`.content{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:relative;overflow:hidden}.content .header{height:50px;display:flex;justify-content:space-between;align-items:center}.content .header .title{padding:0;margin:0;font-size:20px;line-height:50px;cursor:pointer}.content .header .header-button{padding:1em}.content .header .header-button .button{border-style:solid;cursor:pointer;transition:all .5s linear}.content .header .header-button .button.left{border-width:7.5px 10px 7.5px 0}.content .header .header-button .button.right{border-width:7.5px 0 7.5px 10px}.content .type-buttom{z-index:2;position:absolute;right:0;list-style:none;bottom:0;margin:0 0 30px;text-align:right;padding:0}.content .type-buttom .open-menu{cursor:pointer;width:50px;background:#7ef3cb;border-radius:30px 0 0 30px}.content .type-buttom .button{cursor:pointer;border:0;padding:.5em 1.5em;color:#000;line-height:40px;width:100px;transition:all .2s linear}.content .type-buttom .button.month{background:#7ef3cb}.content .type-buttom .button.week{width:80px;background:#ffd353}.content .type-buttom .button.day{width:60px;background:#de5757}.content .type-buttom .button:hover{z-index:1;-webkit-transform:scale(1.1);transform:scale(1.1);color:#fff}.content .type-buttom .button:hover.month{background:#42b991}.content .type-buttom .button:hover.week{width:80px;background:#a98623}.content .type-buttom .button:hover.day{background:#af1d1d}.content .legend{width:100%;height:30px;line-height:30px}.content.black{background:#4a4a4a}.content.black .header{background:#333}.content.black .title{color:#fff}.content.black .left{border-color:transparent #a09fa0 transparent transparent}.content.black .left:hover{border-color:transparent #fff transparent transparent}.content.black .right{border-color:transparent transparent transparent #a09fa0}.content.black .right:hover{border-color:transparent transparent transparent #fff}.content.black .legend{background:#333;color:#fff}.content.white{background:#fff}.content.white .header{background:#c7c7c7}.content.white .title{color:#000}.content.white .left{border-color:transparent #000 transparent transparent}.content.white .left:hover{border-color:transparent #fff transparent transparent}.content.white .right{border-color:transparent transparent transparent #000}.content.white .right:hover{border-color:transparent transparent transparent #fff}.content.white .legend{background:#c7c7c7;color:#000}.content .view-block{height:calc(100% - 80px);overflow-y:auto}.entry{position:relative;padding:0 0 0 25px;font-size:13px;display:inline-block;line-height:30px;background:0 0}.entry .icon{position:absolute;height:5px;width:5px;top:12px;left:14px}.mask{position:absolute;overflow:hidden;width:110%;height:100%;right:0}.mask:after{content:'';position:absolute;top:-40%;right:110%;width:30px;height:200%;background:rgba(255,255,255,.3);-webkit-transform:rotate(20deg);transform:rotate(20deg)}`]
            }] }
];
/** @nocollapse */
NgxHmCalendarComponent.ctorParameters = () => [
    { type: NgxRxModalService },
    { type: ComponentFactoryResolver }
];
NgxHmCalendarComponent.propDecorators = {
    weekNames: [{ type: Input }],
    yearName: [{ type: Input }],
    monthName: [{ type: Input }],
    dayName: [{ type: Input }],
    eventCategorys: [{ type: Input }],
    weeklyEvents: [{ type: Input }],
    events: [{ type: Input }],
    nstr: [{ type: Input }],
    open: [{ type: Output }],
    className: [{ type: Input }],
    size: [{ type: Input }],
    monthComponent: [{ type: ViewChild, args: [NgxHmCalendarMonthViewComponent,] }],
    weekComponent: [{ type: ViewChild, args: [NgxHmCalendarWeekViewComponent,] }],
    dayComponent: [{ type: ViewChild, args: [NgxHmCalendarDayViewComponent,] }]
};
if (false) {
    /** @type {?} */
    NgxHmCalendarComponent.prototype.weekNames;
    /** @type {?} */
    NgxHmCalendarComponent.prototype.yearName;
    /** @type {?} */
    NgxHmCalendarComponent.prototype.monthName;
    /** @type {?} */
    NgxHmCalendarComponent.prototype.dayName;
    /** @type {?} */
    NgxHmCalendarComponent.prototype.eventCategorys;
    /** @type {?} */
    NgxHmCalendarComponent.prototype.weeklyEvents;
    /** @type {?} */
    NgxHmCalendarComponent.prototype.events;
    /** @type {?} */
    NgxHmCalendarComponent.prototype.nstr;
    /** @type {?} */
    NgxHmCalendarComponent.prototype.open;
    /** @type {?} */
    NgxHmCalendarComponent.prototype.className;
    /** @type {?} */
    NgxHmCalendarComponent.prototype.size;
    /**
     * 顯示模式
     * @type {?}
     */
    NgxHmCalendarComponent.prototype.viewMode;
    /** @type {?} */
    NgxHmCalendarComponent.prototype.legendOpen;
    /** @type {?} */
    NgxHmCalendarComponent.prototype.monthComponent;
    /** @type {?} */
    NgxHmCalendarComponent.prototype.weekComponent;
    /** @type {?} */
    NgxHmCalendarComponent.prototype.dayComponent;
    /** @type {?} */
    NgxHmCalendarComponent.prototype.monthPopupComponent;
    /** @type {?} */
    NgxHmCalendarComponent.prototype._model;
    /** @type {?} */
    NgxHmCalendarComponent.prototype._factory;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWhtLWNhbGVuZGFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1obS1jYWxlbmRhci8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtaG0tY2FsZW5kYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pGLE9BQU8sRUFDTCxTQUFTLEVBQ1Qsd0JBQXdCLEVBQ3hCLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDakQsT0FBTyxFQUFrRCxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hILE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLHlFQUF5RSxDQUFDO0FBQzFILE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLHNFQUFzRSxDQUFDO0FBQ3RILE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLG1FQUFtRSxDQUFDO0FBQ2xILE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLDJFQUEyRSxDQUFDOztNQUV2SCxJQUFJLEdBQUcsY0FBYztBQThIM0IsTUFBTSxPQUFPLHNCQUFzQjs7Ozs7SUFtRWpDLFlBQW9CLE1BQXlCLEVBQVUsUUFBa0M7UUFBckUsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUEwQjtRQWpFekYsY0FBUyxHQUFhLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEUsYUFBUSxHQUFHLEdBQUcsQ0FBQztRQUVmLGNBQVMsR0FBRyxHQUFHLENBQUM7UUFFaEIsWUFBTyxH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Q0FBQztnQ0FDSixTQUFTLEVBQUUsZUFBZTs2QkFDM0IsQ0FBQzs0QkFDRixPQUFPLENBQUMsSUFBSSxDQUFDO3lCQUNkLENBQUM7cUJBQ0gsQ0FBQztpQkFDSDt5QkE1QlEsNjRGQUE2NEY7YUE2QnY1Rjs7OztZQXBJUSxpQkFBaUI7WUFOeEIsd0JBQXdCOzs7d0JBNEl2QixLQUFLO3VCQUVMLEtBQUs7d0JBRUwsS0FBSztzQkFFTCxLQUFLOzZCQUVMLEtBQUs7MkJBRUwsS0FBSztxQkFFTCxLQUFLO21CQUVMLEtBQUs7bUJBRUwsTUFBTTt3QkFHTixLQUFLO21CQUVMLEtBQUs7NkJBZ0NMLFNBQVMsU0FBQywrQkFBK0I7NEJBR3pDLFNBQVMsU0FBQyw4QkFBOEI7MkJBR3hDLFNBQVMsU0FBQyw2QkFBNkI7Ozs7SUEzRHhDLDJDQUN3RTs7SUFDeEUsMENBQ2U7O0lBQ2YsMkNBQ2dCOztJQUNoQix5Q0FDYzs7SUFDZCxnREFDa0Q7O0lBQ2xELDhDQUN3Qzs7SUFDeEMsd0NBQ2tDOztJQUNsQyxzQ0FDa0I7O0lBQ2xCLHNDQUM2Qzs7SUFFN0MsMkNBQ29COztJQUNwQixzQ0FJRTs7Ozs7SUFLRiwwQ0FBOEQ7O0lBcUI5RCw0Q0FBc0I7O0lBRXRCLGdEQUN3RDs7SUFFeEQsK0NBQ3NEOztJQUV0RCw4Q0FDb0Q7O0lBRXBELHFEQUVFOztJQUVVLHdDQUFpQzs7SUFBRSwwQ0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhbmltYXRlLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgVmlld0NoaWxkLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ3hSeE1vZGFsU2VydmljZSB9IGZyb20gJ25neC1yeC1tb2RhbCc7XHJcbmltcG9ydCB7IE5neEhtQ2FsZW5kYXJFdmVudCwgTmd4SG1DYWxlbmRhckV2ZW50Q2F0ZWdvcnksIE5neEhtQ2FsZW5kYXJWaWV3TW9kZSB9IGZyb20gJy4vbmd4LWhtLWNhbGVuZGFyLm1vZGVsJztcclxuaW1wb3J0IHsgTmd4SG1DYWxlbmRhck1vbnRoVmlld0NvbXBvbmVudCB9IGZyb20gJy4vbW9udGgvbmd4LWhtLWNhbGVuZGFyLW1vbnRoLXZpZXcvbmd4LWhtLWNhbGVuZGFyLW1vbnRoLXZpZXcuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTmd4SG1DYWxlbmRhcldlZWtWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi93ZWVrL25neC1obS1jYWxlbmRhci13ZWVrLXZpZXcvbmd4LWhtLWNhbGVuZGFyLXdlZWstdmlldy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOZ3hIbUNhbGVuZGFyRGF5Vmlld0NvbXBvbmVudCB9IGZyb20gJy4vZGF5L25neC1obS1jYWxlbmRhci1kYXktdmlldy9uZ3gtaG0tY2FsZW5kYXItZGF5LXZpZXcuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTmd4SG1DYWxlbmRhck1vbnRoUG9wdXBDb21wb25lbnQgfSBmcm9tICcuL21vbnRoL25neC1obS1jYWxlbmRhci1tb250aC1wb3B1cC9uZ3gtaG0tY2FsZW5kYXItbW9udGgtcG9wdXAuY29tcG9uZW50JztcclxuXHJcbmNvbnN0IHRpbWUgPSAnMTUwbXMgbGluZWFyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd4LWhtLWNhbGVuZGFyJyxcclxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJjb250ZW50XCJcclxuICAgICBbbmdDbGFzc109XCJjbGFzc05hbWVcIlxyXG4gICAgIFtuZ1N0eWxlXT1cInNpemVcIj5cclxuICA8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+XHJcbiAgICA8c3BhbiBjbGFzcz1cImhlYWRlci1idXR0b25cIlxyXG4gICAgICAgICAgKGNsaWNrKT1cInByZXYoKVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uIGxlZnRcIj48L2Rpdj5cclxuICAgIDwvc3Bhbj5cclxuICAgIDxoMSBjbGFzcz1cInRpdGxlXCJcclxuICAgICAgICAoY2xpY2spPVwib3BlblNlbGVjdG9yKCRldmVudClcIj5cclxuICAgICAge3sgbW9uRGV0YWlsIH19XHJcbiAgICA8L2gxPlxyXG4gICAgPHNwYW4gY2xhc3M9XCJoZWFkZXItYnV0dG9uXCJcclxuICAgICAgICAgIChjbGljayk9XCJuZXh0KClcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbiByaWdodFwiPjwvZGl2PlxyXG4gICAgPC9zcGFuPlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJ2aWV3LWJsb2NrXCJcclxuICAgICAgIFtuZ1N3aXRjaF09XCJ2aWV3TW9kZVwiPlxyXG5cclxuICAgIDxuZ3gtaG0tY2FsZW5kYXItbW9udGgtdmlldyBbY2xhc3NOYW1lXT1cImNsYXNzTmFtZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nU3dpdGNoQ2FzZT1cIidtb250aCdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt3ZWVrTmFtZXNdPVwid2Vla05hbWVzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbeWVhck5hbWVdPVwieWVhck5hbWVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFttb250aE5hbWVdPVwibW9udGhOYW1lXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZXZlbnRzXT1cImV2ZW50c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3dlZWtseUV2ZW50c109XCJ3ZWVrbHlFdmVudHNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuc3RyXT1cIm5zdHJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvcGVuKT1cIm9wZW5FdmVudCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoc3dpcGVsZWZ0KT1cIm5leHQoKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHN3aXBlcmlnaHQpPVwicHJldigpXCI+PC9uZ3gtaG0tY2FsZW5kYXItbW9udGgtdmlldz5cclxuXHJcbiAgICA8bmd4LWhtLWNhbGVuZGFyLXdlZWstdmlldyBbY2xhc3NOYW1lXT1cImNsYXNzTmFtZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdTd2l0Y2hDYXNlPVwiJ3dlZWsnXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtldmVudHNdPVwiZXZlbnRzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt3ZWVrbHlFdmVudHNdPVwid2Vla2x5RXZlbnRzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuc3RyXT1cIm5zdHJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9wZW4pPVwib3BlbkV2ZW50KCRldmVudClcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHN3aXBlbGVmdCk9XCJuZXh0KClcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHN3aXBlcmlnaHQpPVwicHJldigpXCI+PC9uZ3gtaG0tY2FsZW5kYXItd2Vlay12aWV3PlxyXG5cclxuICAgIDxuZ3gtaG0tY2FsZW5kYXItZGF5LXZpZXcgW2NsYXNzTmFtZV09XCJjbGFzc05hbWVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdTd2l0Y2hDYXNlPVwiJ2RheSdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZXZlbnRzXT1cImV2ZW50c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt3ZWVrbHlFdmVudHNdPVwid2Vla2x5RXZlbnRzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25zdHJdPVwibnN0clwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0PVwiOTowMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZD1cIjIzOjAwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9wZW4pPVwib3BlbkV2ZW50KCRldmVudClcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoc3dpcGVsZWZ0KT1cIm5leHQoKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzd2lwZXJpZ2h0KT1cInByZXYoKVwiPjwvbmd4LWhtLWNhbGVuZGFyLWRheS12aWV3PlxyXG5cclxuICA8L2Rpdj5cclxuXHJcbiAgPHVsIGNsYXNzPVwidHlwZS1idXR0b21cIlxyXG4gICAgICBbQGFuaW1hdGVdPVwibGVnZW5kT3BlblwiPlxyXG4gICAgPGxpPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGRheVwiXHJcbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cInZpZXdNb2RlID09PSAnZGF5J1wiXHJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cImNoYW5lTW9kZSgnZGF5JylcIj7ml6U8L2J1dHRvbj5cclxuICAgIDwvbGk+XHJcblxyXG4gICAgPGxpPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIHdlZWtcIlxyXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJ2aWV3TW9kZSA9PT0gJ3dlZWsnXCJcclxuICAgICAgICAgICAgICAoY2xpY2spPVwiY2hhbmVNb2RlKCd3ZWVrJylcIj7lkag8L2J1dHRvbj5cclxuICAgIDwvbGk+XHJcblxyXG4gICAgPGxpPlxyXG4gICAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTogZmxleDtcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cIm9wZW4tbWVudVwiXHJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cImxlZ2VuZFRvZ2dsZSgpXCI+PC9zcGFuPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidXR0b24gbW9udGhcIlxyXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwidmlld01vZGUgPT09ICdtb250aCdcIlxyXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImNoYW5lTW9kZSgnbW9udGgnKVwiPuaciDwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvbGk+XHJcbiAgPC91bD5cclxuXHJcbiAgPGRpdiBjbGFzcz1cImxlZ2VuZFwiPlxyXG4gICAgPHNwYW4gY2xhc3M9XCJlbnRyeVwiXHJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgY2F0ZWdvcnkgb2YgZXZlbnRDYXRlZ29yeXNcIj5cclxuICAgICAge3sgY2F0ZWdvcnkubmFtZSB9fVxyXG4gICAgICA8c3BhbiBjbGFzcz1cImljb25cIlxyXG4gICAgICAgICAgICBbc3R5bGUuYmFja2dyb3VuZF09XCJjYXRlZ29yeS5jb2xvclwiPjwvc3Bhbj5cclxuICAgIDwvc3Bhbj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbmAsXHJcbiAgc3R5bGVzOiBbYC5jb250ZW50ey13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZTtwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW59LmNvbnRlbnQgLmhlYWRlcntoZWlnaHQ6NTBweDtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47YWxpZ24taXRlbXM6Y2VudGVyfS5jb250ZW50IC5oZWFkZXIgLnRpdGxle3BhZGRpbmc6MDttYXJnaW46MDtmb250LXNpemU6MjBweDtsaW5lLWhlaWdodDo1MHB4O2N1cnNvcjpwb2ludGVyfS5jb250ZW50IC5oZWFkZXIgLmhlYWRlci1idXR0b257cGFkZGluZzoxZW19LmNvbnRlbnQgLmhlYWRlciAuaGVhZGVyLWJ1dHRvbiAuYnV0dG9ue2JvcmRlci1zdHlsZTpzb2xpZDtjdXJzb3I6cG9pbnRlcjt0cmFuc2l0aW9uOmFsbCAuNXMgbGluZWFyfS5jb250ZW50IC5oZWFkZXIgLmhlYWRlci1idXR0b24gLmJ1dHRvbi5sZWZ0e2JvcmRlci13aWR0aDo3LjVweCAxMHB4IDcuNXB4IDB9LmNvbnRlbnQgLmhlYWRlciAuaGVhZGVyLWJ1dHRvbiAuYnV0dG9uLnJpZ2h0e2JvcmRlci13aWR0aDo3LjVweCAwIDcuNXB4IDEwcHh9LmNvbnRlbnQgLnR5cGUtYnV0dG9te3otaW5kZXg6Mjtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDowO2xpc3Qtc3R5bGU6bm9uZTtib3R0b206MDttYXJnaW46MCAwIDMwcHg7dGV4dC1hbGlnbjpyaWdodDtwYWRkaW5nOjB9LmNvbnRlbnQgLnR5cGUtYnV0dG9tIC5vcGVuLW1lbnV7Y3Vyc29yOnBvaW50ZXI7d2lkdGg6NTBweDtiYWNrZ3JvdW5kOiM3ZWYzY2I7Ym9yZGVyLXJhZGl1czozMHB4IDAgMCAzMHB4fS5jb250ZW50IC50eXBlLWJ1dHRvbSAuYnV0dG9ue2N1cnNvcjpwb2ludGVyO2JvcmRlcjowO3BhZGRpbmc6LjVlbSAxLjVlbTtjb2xvcjojMDAwO2xpbmUtaGVpZ2h0OjQwcHg7d2lkdGg6MTAwcHg7dHJhbnNpdGlvbjphbGwgLjJzIGxpbmVhcn0uY29udGVudCAudHlwZS1idXR0b20gLmJ1dHRvbi5tb250aHtiYWNrZ3JvdW5kOiM3ZWYzY2J9LmNvbnRlbnQgLnR5cGUtYnV0dG9tIC5idXR0b24ud2Vla3t3aWR0aDo4MHB4O2JhY2tncm91bmQ6I2ZmZDM1M30uY29udGVudCAudHlwZS1idXR0b20gLmJ1dHRvbi5kYXl7d2lkdGg6NjBweDtiYWNrZ3JvdW5kOiNkZTU3NTd9LmNvbnRlbnQgLnR5cGUtYnV0dG9tIC5idXR0b246aG92ZXJ7ei1pbmRleDoxOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDEuMSk7dHJhbnNmb3JtOnNjYWxlKDEuMSk7Y29sb3I6I2ZmZn0uY29udGVudCAudHlwZS1idXR0b20gLmJ1dHRvbjpob3Zlci5tb250aHtiYWNrZ3JvdW5kOiM0MmI5OTF9LmNvbnRlbnQgLnR5cGUtYnV0dG9tIC5idXR0b246aG92ZXIud2Vla3t3aWR0aDo4MHB4O2JhY2tncm91bmQ6I2E5ODYyM30uY29udGVudCAudHlwZS1idXR0b20gLmJ1dHRvbjpob3Zlci5kYXl7YmFja2dyb3VuZDojYWYxZDFkfS5jb250ZW50IC5sZWdlbmR7d2lkdGg6MTAwJTtoZWlnaHQ6MzBweDtsaW5lLWhlaWdodDozMHB4fS5jb250ZW50LmJsYWNre2JhY2tncm91bmQ6IzRhNGE0YX0uY29udGVudC5ibGFjayAuaGVhZGVye2JhY2tncm91bmQ6IzMzM30uY29udGVudC5ibGFjayAudGl0bGV7Y29sb3I6I2ZmZn0uY29udGVudC5ibGFjayAubGVmdHtib3JkZXItY29sb3I6dHJhbnNwYXJlbnQgI2EwOWZhMCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudH0uY29udGVudC5ibGFjayAubGVmdDpob3Zlcntib3JkZXItY29sb3I6dHJhbnNwYXJlbnQgI2ZmZiB0cmFuc3BhcmVudCB0cmFuc3BhcmVudH0uY29udGVudC5ibGFjayAucmlnaHR7Ym9yZGVyLWNvbG9yOnRyYW5zcGFyZW50IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50ICNhMDlmYTB9LmNvbnRlbnQuYmxhY2sgLnJpZ2h0OmhvdmVye2JvcmRlci1jb2xvcjp0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCAjZmZmfS5jb250ZW50LmJsYWNrIC5sZWdlbmR7YmFja2dyb3VuZDojMzMzO2NvbG9yOiNmZmZ9LmNvbnRlbnQud2hpdGV7YmFja2dyb3VuZDojZmZmfS5jb250ZW50LndoaXRlIC5oZWFkZXJ7YmFja2dyb3VuZDojYzdjN2M3fS5jb250ZW50LndoaXRlIC50aXRsZXtjb2xvcjojMDAwfS5jb250ZW50LndoaXRlIC5sZWZ0e2JvcmRlci1jb2xvcjp0cmFuc3BhcmVudCAjMDAwIHRyYW5zcGFyZW50IHRyYW5zcGFyZW50fS5jb250ZW50LndoaXRlIC5sZWZ0OmhvdmVye2JvcmRlci1jb2xvcjp0cmFuc3BhcmVudCAjZmZmIHRyYW5zcGFyZW50IHRyYW5zcGFyZW50fS5jb250ZW50LndoaXRlIC5yaWdodHtib3JkZXItY29sb3I6dHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgIzAwMH0uY29udGVudC53aGl0ZSAucmlnaHQ6aG92ZXJ7Ym9yZGVyLWNvbG9yOnRyYW5zcGFyZW50IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50ICNmZmZ9LmNvbnRlbnQud2hpdGUgLmxlZ2VuZHtiYWNrZ3JvdW5kOiNjN2M3Yzc7Y29sb3I6IzAwMH0uY29udGVudCAudmlldy1ibG9ja3toZWlnaHQ6Y2FsYygxMDAlIC0gODBweCk7b3ZlcmZsb3cteTphdXRvfS5lbnRyeXtwb3NpdGlvbjpyZWxhdGl2ZTtwYWRkaW5nOjAgMCAwIDI1cHg7Zm9udC1zaXplOjEzcHg7ZGlzcGxheTppbmxpbmUtYmxvY2s7bGluZS1oZWlnaHQ6MzBweDtiYWNrZ3JvdW5kOjAgMH0uZW50cnkgLmljb257cG9zaXRpb246YWJzb2x1dGU7aGVpZ2h0OjVweDt3aWR0aDo1cHg7dG9wOjEycHg7bGVmdDoxNHB4fS5tYXNre3Bvc2l0aW9uOmFic29sdXRlO292ZXJmbG93OmhpZGRlbjt3aWR0aDoxMTAlO2hlaWdodDoxMDAlO3JpZ2h0OjB9Lm1hc2s6YWZ0ZXJ7Y29udGVudDonJztwb3NpdGlvbjphYnNvbHV0ZTt0b3A6LTQwJTtyaWdodDoxMTAlO3dpZHRoOjMwcHg7aGVpZ2h0OjIwMCU7YmFja2dyb3VuZDpyZ2JhKDI1NSwyNTUsMjU1LC4zKTstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMjBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMjBkZWcpfWBdLFxyXG4gIGFuaW1hdGlvbnM6IFtcclxuICAgIHRyaWdnZXIoJ2FuaW1hdGUnLCBbXHJcbiAgICAgIHN0YXRlKFxyXG4gICAgICAgICdmbHlPdXQnLFxyXG4gICAgICAgIHN0eWxlKHtcclxuICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoY2FsYygxMDAlIC0gNTVweCkpJyxcclxuICAgICAgICB9KSxcclxuICAgICAgKSxcclxuICAgICAgc3RhdGUoXHJcbiAgICAgICAgJ2ZseUluJyxcclxuICAgICAgICBzdHlsZSh7XHJcbiAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDApJyxcclxuICAgICAgICB9KSxcclxuICAgICAgKSxcclxuICAgICAgdHJhbnNpdGlvbignZmx5T3V0ID0+IGZseUluJywgW1xyXG4gICAgICAgIHN0eWxlKHtcclxuICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoY2FsYygxMDAlIC0gNTVweCkpJyxcclxuICAgICAgICB9KSxcclxuICAgICAgICBhbmltYXRlKHRpbWUpLFxyXG4gICAgICBdKSxcclxuICAgICAgdHJhbnNpdGlvbignZmx5SW4gPT4gZmx5T3V0JywgW1xyXG4gICAgICAgIHN0eWxlKHtcclxuICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCknLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGFuaW1hdGUodGltZSksXHJcbiAgICAgIF0pLFxyXG4gICAgXSksXHJcbiAgXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5neEhtQ2FsZW5kYXJDb21wb25lbnQge1xyXG4gIEBJbnB1dCgpXHJcbiAgd2Vla05hbWVzOiBzdHJpbmdbXSA9IFsn5pif5pyf5pelJywgJ+aYn+acn+S4gCcsICfmmJ/mnJ/kuownLCAn5pif5pyf5LiJJywgJ+aYn+acn+WbmycsICfmmJ/mnJ/kupQnLCAn5pif5pyf5YWtJ107XHJcbiAgQElucHV0KClcclxuICB5ZWFyTmFtZSA9ICflubQnO1xyXG4gIEBJbnB1dCgpXHJcbiAgbW9udGhOYW1lID0gJ+aciCc7XHJcbiAgQElucHV0KClcclxuICBkYXlOYW1lID0gJ+aXpSc7XHJcbiAgQElucHV0KClcclxuICBldmVudENhdGVnb3J5czogTmd4SG1DYWxlbmRhckV2ZW50Q2F0ZWdvcnlbXSA9IFtdO1xyXG4gIEBJbnB1dCgpXHJcbiAgd2Vla2x5RXZlbnRzOiBOZ3hIbUNhbGVuZGFyRXZlbnRbXSA9IFtdO1xyXG4gIEBJbnB1dCgpXHJcbiAgZXZlbnRzOiBOZ3hIbUNhbGVuZGFyRXZlbnRbXSA9IFtdO1xyXG4gIEBJbnB1dCgpXHJcbiAgbnN0ciA9IG5ldyBEYXRlKCk7XHJcbiAgQE91dHB1dCgpXHJcbiAgb3BlbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgY2xhc3NOYW1lID0gJ2JsYWNrJztcclxuICBASW5wdXQoKVxyXG4gIHNpemUgPSB7XHJcbiAgICB3aWR0aDogJzEwMHZ3JyxcclxuICAgIGhlaWdodDogJzEwMHZoJyxcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiDpoa/npLrmqKHlvI9cclxuICAgKi9cclxuICB2aWV3TW9kZTogTmd4SG1DYWxlbmRhclZpZXdNb2RlID0gTmd4SG1DYWxlbmRhclZpZXdNb2RlLm1vbnRoO1xyXG5cclxuICBnZXQgeW5vdygpIHtcclxuICAgIHJldHVybiB0aGlzLm5zdHIuZ2V0RnVsbFllYXIoKTtcclxuICB9XHJcbiAgZ2V0IG1ub3coKSB7XHJcbiAgICByZXR1cm4gdGhpcy5uc3RyLmdldE1vbnRoKCk7XHJcbiAgfVxyXG4gIGdldCBkbm93KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubnN0ci5nZXREYXRlKCk7XHJcbiAgfVxyXG4gIGdldCBtb25EZXRhaWwoKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gYCR7dGhpcy55bm93fSAke3RoaXMueWVhck5hbWV9ICR7dGhpcy5tbm93ICsgMX0gJHt0aGlzLm1vbnRoTmFtZX1gO1xyXG5cclxuICAgIGlmICh0aGlzLnZpZXdNb2RlID09PSBOZ3hIbUNhbGVuZGFyVmlld01vZGUuZGF5KSB7XHJcbiAgICAgIHJlc3VsdCA9IGAke3Jlc3VsdH0gJHt0aGlzLmRub3d9ICR7dGhpcy5kYXlOYW1lfWA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIGxlZ2VuZE9wZW4gPSAnZmx5T3V0JztcclxuXHJcbiAgQFZpZXdDaGlsZChOZ3hIbUNhbGVuZGFyTW9udGhWaWV3Q29tcG9uZW50KVxyXG4gIHByaXZhdGUgbW9udGhDb21wb25lbnQ6IE5neEhtQ2FsZW5kYXJNb250aFZpZXdDb21wb25lbnQ7XHJcblxyXG4gIEBWaWV3Q2hpbGQoTmd4SG1DYWxlbmRhcldlZWtWaWV3Q29tcG9uZW50KVxyXG4gIHByaXZhdGUgd2Vla0NvbXBvbmVudDogTmd4SG1DYWxlbmRhcldlZWtWaWV3Q29tcG9uZW50O1xyXG5cclxuICBAVmlld0NoaWxkKE5neEhtQ2FsZW5kYXJEYXlWaWV3Q29tcG9uZW50KVxyXG4gIHByaXZhdGUgZGF5Q29tcG9uZW50OiBOZ3hIbUNhbGVuZGFyRGF5Vmlld0NvbXBvbmVudDtcclxuXHJcbiAgcHJpdmF0ZSBtb250aFBvcHVwQ29tcG9uZW50ID0gdGhpcy5fZmFjdG9yeS5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShcclxuICAgIE5neEhtQ2FsZW5kYXJNb250aFBvcHVwQ29tcG9uZW50LFxyXG4gICk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX21vZGVsOiBOZ3hSeE1vZGFsU2VydmljZSwgcHJpdmF0ZSBfZmFjdG9yeTogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7fVxyXG5cclxuICBwcmV2KCk6IHZvaWQge1xyXG4gICAgc3dpdGNoICh0aGlzLnZpZXdNb2RlKSB7XHJcbiAgICAgIGNhc2UgTmd4SG1DYWxlbmRhclZpZXdNb2RlLm1vbnRoOlxyXG4gICAgICAgIHRoaXMubW9udGhDb21wb25lbnQucHJldigpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIE5neEhtQ2FsZW5kYXJWaWV3TW9kZS53ZWVrOlxyXG4gICAgICAgIHRoaXMud2Vla0NvbXBvbmVudC5wcmV2KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgTmd4SG1DYWxlbmRhclZpZXdNb2RlLmRheTpcclxuICAgICAgICB0aGlzLmRheUNvbXBvbmVudC5wcmV2KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZXh0KCk6IHZvaWQge1xyXG4gICAgc3dpdGNoICh0aGlzLnZpZXdNb2RlKSB7XHJcbiAgICAgIGNhc2UgTmd4SG1DYWxlbmRhclZpZXdNb2RlLm1vbnRoOlxyXG4gICAgICAgIHRoaXMubW9udGhDb21wb25lbnQubmV4dCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIE5neEhtQ2FsZW5kYXJWaWV3TW9kZS53ZWVrOlxyXG4gICAgICAgIHRoaXMud2Vla0NvbXBvbmVudC5uZXh0KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgTmd4SG1DYWxlbmRhclZpZXdNb2RlLmRheTpcclxuICAgICAgICB0aGlzLmRheUNvbXBvbmVudC5uZXh0KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvcGVuRXZlbnQoZXZlbnQ6IE5neEhtQ2FsZW5kYXJFdmVudCk6IHZvaWQge1xyXG4gICAgdGhpcy5vcGVuLmVtaXQoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgb3BlblNlbGVjdG9yKCRldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgdGhpcy5fbW9kZWxcclxuICAgICAgLm9wZW4odGhpcy5tb250aFBvcHVwQ29tcG9uZW50LCB7XHJcbiAgICAgICAgZGlzYWJsZUNsb3NlQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgIHBhbmVsU3R5bGU6IHtcclxuICAgICAgICAgIHRvcDogYCR7JGV2ZW50Lm9mZnNldFl9cHhgLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGF0YTogeyB0aGVtZTogdGhpcy5jbGFzc05hbWUsIGNvbnRhaW5lclZpZXdNb2RlOiB0aGlzLnZpZXdNb2RlIH0sXHJcbiAgICAgIH0pXHJcbiAgICAgIC5zdWJzY3JpYmUoc2VsZWN0ZWREYXRlID0+IHtcclxuICAgICAgICBpZiAoc2VsZWN0ZWREYXRlKSB7XHJcbiAgICAgICAgICB0aGlzLm5zdHIgPSBzZWxlY3RlZERhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGNoYW5lTW9kZShtb2RlOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMudmlld01vZGUgPSBtb2RlO1xyXG4gIH1cclxuXHJcbiAgbGVnZW5kVG9nZ2xlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5sZWdlbmRPcGVuID0gdGhpcy5sZWdlbmRPcGVuID09PSAnZmx5SW4nID8gJ2ZseU91dCcgOiAnZmx5SW4nO1xyXG4gIH1cclxufVxyXG4iXX0=