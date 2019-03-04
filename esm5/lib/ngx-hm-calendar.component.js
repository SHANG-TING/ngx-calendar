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
var time = '150ms linear';
var NgxHmCalendarComponent = /** @class */ (function () {
    function NgxHmCalendarComponent(_model, _factory) {
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
    Object.defineProperty(NgxHmCalendarComponent.prototype, "ynow", {
        get: /**
         * @return {?}
         */
        function () {
            return this.nstr.getFullYear();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxHmCalendarComponent.prototype, "mnow", {
        get: /**
         * @return {?}
         */
        function () {
            return this.nstr.getMonth();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxHmCalendarComponent.prototype, "dnow", {
        get: /**
         * @return {?}
         */
        function () {
            return this.nstr.getDate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxHmCalendarComponent.prototype, "monDetail", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var result = this.ynow + " " + this.yearName + " " + (this.mnow + 1) + " " + this.monthName;
            if (this.viewMode === NgxHmCalendarViewMode.day) {
                result = result + " " + this.dnow + " " + this.dayName;
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgxHmCalendarComponent.prototype.prev = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    NgxHmCalendarComponent.prototype.next = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxHmCalendarComponent.prototype.openEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.open.emit(event);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    NgxHmCalendarComponent.prototype.openSelector = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        var _this = this;
        this._model
            .open(this.monthPopupComponent, {
            disableCloseButton: true,
            panelStyle: {
                top: $event.offsetY + "px",
            },
            data: { theme: this.className, containerViewMode: this.viewMode },
        })
            .subscribe(function (selectedDate) {
            if (selectedDate) {
                _this.nstr = selectedDate;
            }
        });
    };
    /**
     * @param {?} mode
     * @return {?}
     */
    NgxHmCalendarComponent.prototype.chaneMode = /**
     * @param {?} mode
     * @return {?}
     */
    function (mode) {
        this.viewMode = mode;
    };
    /**
     * @return {?}
     */
    NgxHmCalendarComponent.prototype.legendToggle = /**
     * @return {?}
     */
    function () {
        this.legendOpen = this.legendOpen === 'flyIn' ? 'flyOut' : 'flyIn';
    };
    NgxHmCalendarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-hm-calendar',
                    template: "<div class=\"content\"\n     [ngClass]=\"className\"\n     [ngStyle]=\"size\">\n  <div class=\"header\">\n    <span class=\"header-button\"\n          (click)=\"prev()\">\n      <div class=\"button left\"></div>\n    </span>\n    <h1 class=\"title\"\n        (click)=\"openSelector($event)\">\n      {{ monDetail }}\n    </h1>\n    <span class=\"header-button\"\n          (click)=\"next()\">\n      <div class=\"button right\"></div>\n    </span>\n  </div>\n  <div class=\"view-block\"\n       [ngSwitch]=\"viewMode\">\n\n    <ngx-hm-calendar-month-view [className]=\"className\"\n                                *ngSwitchCase=\"'month'\"\n                                [weekNames]=\"weekNames\"\n                                [yearName]=\"yearName\"\n                                [monthName]=\"monthName\"\n                                [events]=\"events\"\n                                [weeklyEvents]=\"weeklyEvents\"\n                                [nstr]=\"nstr\"\n                                (open)=\"openEvent($event)\"\n                                (swipeleft)=\"next()\"\n                                (swiperight)=\"prev()\"></ngx-hm-calendar-month-view>\n\n    <ngx-hm-calendar-week-view [className]=\"className\"\n                               *ngSwitchCase=\"'week'\"\n                               [events]=\"events\"\n                               [weeklyEvents]=\"weeklyEvents\"\n                               [nstr]=\"nstr\"\n                               (open)=\"openEvent($event)\"\n                               (swipeleft)=\"next()\"\n                               (swiperight)=\"prev()\"></ngx-hm-calendar-week-view>\n\n    <ngx-hm-calendar-day-view [className]=\"className\"\n                              *ngSwitchCase=\"'day'\"\n                              [events]=\"events\"\n                              [weeklyEvents]=\"weeklyEvents\"\n                              [nstr]=\"nstr\"\n                              start=\"9:00\"\n                              end=\"23:00\"\n                              (open)=\"openEvent($event)\"\n                              (swipeleft)=\"next()\"\n                              (swiperight)=\"prev()\"></ngx-hm-calendar-day-view>\n\n  </div>\n\n  <ul class=\"type-buttom\"\n      [@animate]=\"legendOpen\">\n    <li>\n      <button class=\"button day\"\n              type=\"button\"\n              [disabled]=\"viewMode === 'day'\"\n              (click)=\"chaneMode('day')\">\u65E5</button>\n    </li>\n\n    <li>\n      <button class=\"button week\"\n              type=\"button\"\n              [disabled]=\"viewMode === 'week'\"\n              (click)=\"chaneMode('week')\">\u5468</button>\n    </li>\n\n    <li>\n      <div style=\"display: flex;\">\n        <span class=\"open-menu\"\n              (click)=\"legendToggle()\"></span>\n        <button class=\"button month\"\n                type=\"button\"\n                [disabled]=\"viewMode === 'month'\"\n                (click)=\"chaneMode('month')\">\u6708</button>\n      </div>\n    </li>\n  </ul>\n\n  <div class=\"legend\">\n    <span class=\"entry\"\n          *ngFor=\"let category of eventCategorys\">\n      {{ category.name }}\n      <span class=\"icon\"\n            [style.background]=\"category.color\"></span>\n    </span>\n  </div>\n</div>\n",
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
                    styles: [".content{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:relative;overflow:hidden}.content .header{height:50px;display:flex;justify-content:space-between;align-items:center}.content .header .title{padding:0;margin:0;font-size:20px;line-height:50px;cursor:pointer}.content .header .header-button{padding:1em}.content .header .header-button .button{border-style:solid;cursor:pointer;transition:all .5s linear}.content .header .header-button .button.left{border-width:7.5px 10px 7.5px 0}.content .header .header-button .button.right{border-width:7.5px 0 7.5px 10px}.content .type-buttom{z-index:2;position:absolute;right:0;list-style:none;bottom:0;margin:0 0 30px;text-align:right;padding:0}.content .type-buttom .open-menu{cursor:pointer;width:50px;background:#7ef3cb;border-radius:30px 0 0 30px}.content .type-buttom .button{cursor:pointer;border:0;padding:.5em 1.5em;color:#000;line-height:40px;width:100px;transition:all .2s linear}.content .type-buttom .button.month{background:#7ef3cb}.content .type-buttom .button.week{width:80px;background:#ffd353}.content .type-buttom .button.day{width:60px;background:#de5757}.content .type-buttom .button:hover{z-index:1;-webkit-transform:scale(1.1);transform:scale(1.1);color:#fff}.content .type-buttom .button:hover.month{background:#42b991}.content .type-buttom .button:hover.week{width:80px;background:#a98623}.content .type-buttom .button:hover.day{background:#af1d1d}.content .legend{width:100%;height:30px;line-height:30px}.content.black{background:#4a4a4a}.content.black .header{background:#333}.content.black .title{color:#fff}.content.black .left{border-color:transparent #a09fa0 transparent transparent}.content.black .left:hover{border-color:transparent #fff transparent transparent}.content.black .right{border-color:transparent transparent transparent #a09fa0}.content.black .right:hover{border-color:transparent transparent transparent #fff}.content.black .legend{background:#333;color:#fff}.content.white{background:#fff}.content.white .header{background:#c7c7c7}.content.white .title{color:#000}.content.white .left{border-color:transparent #000 transparent transparent}.content.white .left:hover{border-color:transparent #fff transparent transparent}.content.white .right{border-color:transparent transparent transparent #000}.content.white .right:hover{border-color:transparent transparent transparent #fff}.content.white .legend{background:#c7c7c7;color:#000}.content .view-block{height:calc(100% - 80px);overflow-y:auto}.entry{position:relative;padding:0 0 0 25px;font-size:13px;display:inline-block;line-height:30px;background:0 0}.entry .icon{position:absolute;height:5px;width:5px;top:12px;left:14px}.mask{position:absolute;overflow:hidden;width:110%;height:100%;right:0}.mask:after{content:'';position:absolute;top:-40%;right:110%;width:30px;height:200%;background:rgba(255,255,255,.3);-webkit-transform:rotate(20deg);transform:rotate(20deg)}"]
                }] }
    ];
    /** @nocollapse */
    NgxHmCalendarComponent.ctorParameters = function () { return [
        { type: NgxRxModalService },
        { type: ComponentFactoryResolver }
    ]; };
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
    return NgxHmCalendarComponent;
}());
export { NgxHmCalendarComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWhtLWNhbGVuZGFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1obS1jYWxlbmRhci8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtaG0tY2FsZW5kYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pGLE9BQU8sRUFDTCxTQUFTLEVBQ1Qsd0JBQXdCLEVBQ3hCLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDakQsT0FBTyxFQUFrRCxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hILE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLHlFQUF5RSxDQUFDO0FBQzFILE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLHNFQUFzRSxDQUFDO0FBQ3RILE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLG1FQUFtRSxDQUFDO0FBQ2xILE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLDJFQUEyRSxDQUFDOztJQUV2SCxJQUFJLEdBQUcsY0FBYztBQUUzQjtJQStMRSxnQ0FBb0IsTUFBeUIsRUFBVSxRQUFrQztRQUFyRSxXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBakV6RixjQUFTLEdBQWEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4RSxhQUFRLEdBQUcsR0FBRyxDQUFDO1FBRWYsY0FBUyxHQUFHLEdBQUcsQ0FBQztRQUVoQixZQUFPLEdBQUcsR0FBRyxDQUFDO1FBRWQsbUJB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LGVBQWU7aUNBQzNCLENBQUM7Z0NBQ0YsT0FBTyxDQUFDLElBQUksQ0FBQzs2QkFDZCxDQUFDO3lCQUNILENBQUM7cUJBQ0g7NkJBNUJRLDY0RkFBNjRGO2lCQTZCdjVGOzs7O2dCQXBJUSxpQkFBaUI7Z0JBTnhCLHdCQUF3Qjs7OzRCQTRJdkIsS0FBSzsyQkFFTCxLQUFLOzRCQUVMLEtBQUs7MEJBRUwsS0FBSztpQ0FFTCxLQUFLOytCQUVMLEtBQUs7eUJBRUwsS0FBSzt1QkFFTCxLQUFLO3VCQUVMLE1BQU07NEJBR04sS0FBSzt1QkFFTCxLQUFLO2lDQWdDTCxTQUFTLFNBQUMsK0JBQStCO2dDQUd6QyxTQUFTLFNBQUMsOEJBQThCOytCQUd4QyxTQUFTLFNBQUMsNkJBQTZCOztJQWdFMUMsNkJBQUM7Q0FBQSxBQXhQRCxJQXdQQztTQTVIWSxzQkFBc0I7OztJQUNqQywyQ0FDd0U7O0lBQ3hFLDBDQUNlOztJQUNmLDJDQUNnQjs7SUFDaEIseUNBQ2M7O0lBQ2QsZ0RBQ2tEOztJQUNsRCw4Q0FDd0M7O0lBQ3hDLHdDQUNrQzs7SUFDbEMsc0NBQ2tCOztJQUNsQixzQ0FDNkM7O0lBRTdDLDJDQUNvQjs7SUFDcEIsc0NBSUU7Ozs7O0lBS0YsMENBQThEOztJQXFCOUQsNENBQXNCOztJQUV0QixnREFDd0Q7O0lBRXhELCtDQUNzRDs7SUFFdEQsOENBQ29EOztJQUVwRCxxREFFRTs7SUFFVSx3Q0FBaUM7O0lBQUUsMENBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYW5pbWF0ZSwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIFZpZXdDaGlsZCxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmd4UnhNb2RhbFNlcnZpY2UgfSBmcm9tICduZ3gtcngtbW9kYWwnO1xyXG5pbXBvcnQgeyBOZ3hIbUNhbGVuZGFyRXZlbnQsIE5neEhtQ2FsZW5kYXJFdmVudENhdGVnb3J5LCBOZ3hIbUNhbGVuZGFyVmlld01vZGUgfSBmcm9tICcuL25neC1obS1jYWxlbmRhci5tb2RlbCc7XHJcbmltcG9ydCB7IE5neEhtQ2FsZW5kYXJNb250aFZpZXdDb21wb25lbnQgfSBmcm9tICcuL21vbnRoL25neC1obS1jYWxlbmRhci1tb250aC12aWV3L25neC1obS1jYWxlbmRhci1tb250aC12aWV3LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5neEhtQ2FsZW5kYXJXZWVrVmlld0NvbXBvbmVudCB9IGZyb20gJy4vd2Vlay9uZ3gtaG0tY2FsZW5kYXItd2Vlay12aWV3L25neC1obS1jYWxlbmRhci13ZWVrLXZpZXcuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTmd4SG1DYWxlbmRhckRheVZpZXdDb21wb25lbnQgfSBmcm9tICcuL2RheS9uZ3gtaG0tY2FsZW5kYXItZGF5LXZpZXcvbmd4LWhtLWNhbGVuZGFyLWRheS12aWV3LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5neEhtQ2FsZW5kYXJNb250aFBvcHVwQ29tcG9uZW50IH0gZnJvbSAnLi9tb250aC9uZ3gtaG0tY2FsZW5kYXItbW9udGgtcG9wdXAvbmd4LWhtLWNhbGVuZGFyLW1vbnRoLXBvcHVwLmNvbXBvbmVudCc7XHJcblxyXG5jb25zdCB0aW1lID0gJzE1MG1zIGxpbmVhcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25neC1obS1jYWxlbmRhcicsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiY29udGVudFwiXHJcbiAgICAgW25nQ2xhc3NdPVwiY2xhc3NOYW1lXCJcclxuICAgICBbbmdTdHlsZV09XCJzaXplXCI+XHJcbiAgPGRpdiBjbGFzcz1cImhlYWRlclwiPlxyXG4gICAgPHNwYW4gY2xhc3M9XCJoZWFkZXItYnV0dG9uXCJcclxuICAgICAgICAgIChjbGljayk9XCJwcmV2KClcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbiBsZWZ0XCI+PC9kaXY+XHJcbiAgICA8L3NwYW4+XHJcbiAgICA8aDEgY2xhc3M9XCJ0aXRsZVwiXHJcbiAgICAgICAgKGNsaWNrKT1cIm9wZW5TZWxlY3RvcigkZXZlbnQpXCI+XHJcbiAgICAgIHt7IG1vbkRldGFpbCB9fVxyXG4gICAgPC9oMT5cclxuICAgIDxzcGFuIGNsYXNzPVwiaGVhZGVyLWJ1dHRvblwiXHJcbiAgICAgICAgICAoY2xpY2spPVwibmV4dCgpXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJidXR0b24gcmlnaHRcIj48L2Rpdj5cclxuICAgIDwvc3Bhbj5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwidmlldy1ibG9ja1wiXHJcbiAgICAgICBbbmdTd2l0Y2hdPVwidmlld01vZGVcIj5cclxuXHJcbiAgICA8bmd4LWhtLWNhbGVuZGFyLW1vbnRoLXZpZXcgW2NsYXNzTmFtZV09XCJjbGFzc05hbWVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ1N3aXRjaENhc2U9XCInbW9udGgnXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbd2Vla05hbWVzXT1cIndlZWtOYW1lc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3llYXJOYW1lXT1cInllYXJOYW1lXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbW9udGhOYW1lXT1cIm1vbnRoTmFtZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2V2ZW50c109XCJldmVudHNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt3ZWVrbHlFdmVudHNdPVwid2Vla2x5RXZlbnRzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbnN0cl09XCJuc3RyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob3Blbik9XCJvcGVuRXZlbnQoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHN3aXBlbGVmdCk9XCJuZXh0KClcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzd2lwZXJpZ2h0KT1cInByZXYoKVwiPjwvbmd4LWhtLWNhbGVuZGFyLW1vbnRoLXZpZXc+XHJcblxyXG4gICAgPG5neC1obS1jYWxlbmRhci13ZWVrLXZpZXcgW2NsYXNzTmFtZV09XCJjbGFzc05hbWVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nU3dpdGNoQ2FzZT1cIid3ZWVrJ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZXZlbnRzXT1cImV2ZW50c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbd2Vla2x5RXZlbnRzXT1cIndlZWtseUV2ZW50c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbnN0cl09XCJuc3RyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvcGVuKT1cIm9wZW5FdmVudCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzd2lwZWxlZnQpPVwibmV4dCgpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzd2lwZXJpZ2h0KT1cInByZXYoKVwiPjwvbmd4LWhtLWNhbGVuZGFyLXdlZWstdmlldz5cclxuXHJcbiAgICA8bmd4LWhtLWNhbGVuZGFyLWRheS12aWV3IFtjbGFzc05hbWVdPVwiY2xhc3NOYW1lXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nU3dpdGNoQ2FzZT1cIidkYXknXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2V2ZW50c109XCJldmVudHNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbd2Vla2x5RXZlbnRzXT1cIndlZWtseUV2ZW50c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuc3RyXT1cIm5zdHJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydD1cIjk6MDBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQ9XCIyMzowMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvcGVuKT1cIm9wZW5FdmVudCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHN3aXBlbGVmdCk9XCJuZXh0KClcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoc3dpcGVyaWdodCk9XCJwcmV2KClcIj48L25neC1obS1jYWxlbmRhci1kYXktdmlldz5cclxuXHJcbiAgPC9kaXY+XHJcblxyXG4gIDx1bCBjbGFzcz1cInR5cGUtYnV0dG9tXCJcclxuICAgICAgW0BhbmltYXRlXT1cImxlZ2VuZE9wZW5cIj5cclxuICAgIDxsaT5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBkYXlcIlxyXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJ2aWV3TW9kZSA9PT0gJ2RheSdcIlxyXG4gICAgICAgICAgICAgIChjbGljayk9XCJjaGFuZU1vZGUoJ2RheScpXCI+5pelPC9idXR0b24+XHJcbiAgICA8L2xpPlxyXG5cclxuICAgIDxsaT5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiB3ZWVrXCJcclxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwidmlld01vZGUgPT09ICd3ZWVrJ1wiXHJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cImNoYW5lTW9kZSgnd2VlaycpXCI+5ZGoPC9idXR0b24+XHJcbiAgICA8L2xpPlxyXG5cclxuICAgIDxsaT5cclxuICAgICAgPGRpdiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7XCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJvcGVuLW1lbnVcIlxyXG4gICAgICAgICAgICAgIChjbGljayk9XCJsZWdlbmRUb2dnbGUoKVwiPjwvc3Bhbj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIG1vbnRoXCJcclxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cInZpZXdNb2RlID09PSAnbW9udGgnXCJcclxuICAgICAgICAgICAgICAgIChjbGljayk9XCJjaGFuZU1vZGUoJ21vbnRoJylcIj7mnIg8L2J1dHRvbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2xpPlxyXG4gIDwvdWw+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJsZWdlbmRcIj5cclxuICAgIDxzcGFuIGNsYXNzPVwiZW50cnlcIlxyXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGNhdGVnb3J5IG9mIGV2ZW50Q2F0ZWdvcnlzXCI+XHJcbiAgICAgIHt7IGNhdGVnb3J5Lm5hbWUgfX1cclxuICAgICAgPHNwYW4gY2xhc3M9XCJpY29uXCJcclxuICAgICAgICAgICAgW3N0eWxlLmJhY2tncm91bmRdPVwiY2F0ZWdvcnkuY29sb3JcIj48L3NwYW4+XHJcbiAgICA8L3NwYW4+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG5gLFxyXG4gIHN0eWxlczogW2AuY29udGVudHstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmU7cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6aGlkZGVufS5jb250ZW50IC5oZWFkZXJ7aGVpZ2h0OjUwcHg7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO2FsaWduLWl0ZW1zOmNlbnRlcn0uY29udGVudCAuaGVhZGVyIC50aXRsZXtwYWRkaW5nOjA7bWFyZ2luOjA7Zm9udC1zaXplOjIwcHg7bGluZS1oZWlnaHQ6NTBweDtjdXJzb3I6cG9pbnRlcn0uY29udGVudCAuaGVhZGVyIC5oZWFkZXItYnV0dG9ue3BhZGRpbmc6MWVtfS5jb250ZW50IC5oZWFkZXIgLmhlYWRlci1idXR0b24gLmJ1dHRvbntib3JkZXItc3R5bGU6c29saWQ7Y3Vyc29yOnBvaW50ZXI7dHJhbnNpdGlvbjphbGwgLjVzIGxpbmVhcn0uY29udGVudCAuaGVhZGVyIC5oZWFkZXItYnV0dG9uIC5idXR0b24ubGVmdHtib3JkZXItd2lkdGg6Ny41cHggMTBweCA3LjVweCAwfS5jb250ZW50IC5oZWFkZXIgLmhlYWRlci1idXR0b24gLmJ1dHRvbi5yaWdodHtib3JkZXItd2lkdGg6Ny41cHggMCA3LjVweCAxMHB4fS5jb250ZW50IC50eXBlLWJ1dHRvbXt6LWluZGV4OjI7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MDtsaXN0LXN0eWxlOm5vbmU7Ym90dG9tOjA7bWFyZ2luOjAgMCAzMHB4O3RleHQtYWxpZ246cmlnaHQ7cGFkZGluZzowfS5jb250ZW50IC50eXBlLWJ1dHRvbSAub3Blbi1tZW51e2N1cnNvcjpwb2ludGVyO3dpZHRoOjUwcHg7YmFja2dyb3VuZDojN2VmM2NiO2JvcmRlci1yYWRpdXM6MzBweCAwIDAgMzBweH0uY29udGVudCAudHlwZS1idXR0b20gLmJ1dHRvbntjdXJzb3I6cG9pbnRlcjtib3JkZXI6MDtwYWRkaW5nOi41ZW0gMS41ZW07Y29sb3I6IzAwMDtsaW5lLWhlaWdodDo0MHB4O3dpZHRoOjEwMHB4O3RyYW5zaXRpb246YWxsIC4ycyBsaW5lYXJ9LmNvbnRlbnQgLnR5cGUtYnV0dG9tIC5idXR0b24ubW9udGh7YmFja2dyb3VuZDojN2VmM2NifS5jb250ZW50IC50eXBlLWJ1dHRvbSAuYnV0dG9uLndlZWt7d2lkdGg6ODBweDtiYWNrZ3JvdW5kOiNmZmQzNTN9LmNvbnRlbnQgLnR5cGUtYnV0dG9tIC5idXR0b24uZGF5e3dpZHRoOjYwcHg7YmFja2dyb3VuZDojZGU1NzU3fS5jb250ZW50IC50eXBlLWJ1dHRvbSAuYnV0dG9uOmhvdmVye3otaW5kZXg6MTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgxLjEpO3RyYW5zZm9ybTpzY2FsZSgxLjEpO2NvbG9yOiNmZmZ9LmNvbnRlbnQgLnR5cGUtYnV0dG9tIC5idXR0b246aG92ZXIubW9udGh7YmFja2dyb3VuZDojNDJiOTkxfS5jb250ZW50IC50eXBlLWJ1dHRvbSAuYnV0dG9uOmhvdmVyLndlZWt7d2lkdGg6ODBweDtiYWNrZ3JvdW5kOiNhOTg2MjN9LmNvbnRlbnQgLnR5cGUtYnV0dG9tIC5idXR0b246aG92ZXIuZGF5e2JhY2tncm91bmQ6I2FmMWQxZH0uY29udGVudCAubGVnZW5ke3dpZHRoOjEwMCU7aGVpZ2h0OjMwcHg7bGluZS1oZWlnaHQ6MzBweH0uY29udGVudC5ibGFja3tiYWNrZ3JvdW5kOiM0YTRhNGF9LmNvbnRlbnQuYmxhY2sgLmhlYWRlcntiYWNrZ3JvdW5kOiMzMzN9LmNvbnRlbnQuYmxhY2sgLnRpdGxle2NvbG9yOiNmZmZ9LmNvbnRlbnQuYmxhY2sgLmxlZnR7Ym9yZGVyLWNvbG9yOnRyYW5zcGFyZW50ICNhMDlmYTAgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnR9LmNvbnRlbnQuYmxhY2sgLmxlZnQ6aG92ZXJ7Ym9yZGVyLWNvbG9yOnRyYW5zcGFyZW50ICNmZmYgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnR9LmNvbnRlbnQuYmxhY2sgLnJpZ2h0e2JvcmRlci1jb2xvcjp0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCAjYTA5ZmEwfS5jb250ZW50LmJsYWNrIC5yaWdodDpob3Zlcntib3JkZXItY29sb3I6dHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgI2ZmZn0uY29udGVudC5ibGFjayAubGVnZW5ke2JhY2tncm91bmQ6IzMzMztjb2xvcjojZmZmfS5jb250ZW50LndoaXRle2JhY2tncm91bmQ6I2ZmZn0uY29udGVudC53aGl0ZSAuaGVhZGVye2JhY2tncm91bmQ6I2M3YzdjN30uY29udGVudC53aGl0ZSAudGl0bGV7Y29sb3I6IzAwMH0uY29udGVudC53aGl0ZSAubGVmdHtib3JkZXItY29sb3I6dHJhbnNwYXJlbnQgIzAwMCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudH0uY29udGVudC53aGl0ZSAubGVmdDpob3Zlcntib3JkZXItY29sb3I6dHJhbnNwYXJlbnQgI2ZmZiB0cmFuc3BhcmVudCB0cmFuc3BhcmVudH0uY29udGVudC53aGl0ZSAucmlnaHR7Ym9yZGVyLWNvbG9yOnRyYW5zcGFyZW50IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50ICMwMDB9LmNvbnRlbnQud2hpdGUgLnJpZ2h0OmhvdmVye2JvcmRlci1jb2xvcjp0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCAjZmZmfS5jb250ZW50LndoaXRlIC5sZWdlbmR7YmFja2dyb3VuZDojYzdjN2M3O2NvbG9yOiMwMDB9LmNvbnRlbnQgLnZpZXctYmxvY2t7aGVpZ2h0OmNhbGMoMTAwJSAtIDgwcHgpO292ZXJmbG93LXk6YXV0b30uZW50cnl7cG9zaXRpb246cmVsYXRpdmU7cGFkZGluZzowIDAgMCAyNXB4O2ZvbnQtc2l6ZToxM3B4O2Rpc3BsYXk6aW5saW5lLWJsb2NrO2xpbmUtaGVpZ2h0OjMwcHg7YmFja2dyb3VuZDowIDB9LmVudHJ5IC5pY29ue3Bvc2l0aW9uOmFic29sdXRlO2hlaWdodDo1cHg7d2lkdGg6NXB4O3RvcDoxMnB4O2xlZnQ6MTRweH0ubWFza3twb3NpdGlvbjphYnNvbHV0ZTtvdmVyZmxvdzpoaWRkZW47d2lkdGg6MTEwJTtoZWlnaHQ6MTAwJTtyaWdodDowfS5tYXNrOmFmdGVye2NvbnRlbnQ6Jyc7cG9zaXRpb246YWJzb2x1dGU7dG9wOi00MCU7cmlnaHQ6MTEwJTt3aWR0aDozMHB4O2hlaWdodDoyMDAlO2JhY2tncm91bmQ6cmdiYSgyNTUsMjU1LDI1NSwuMyk7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDIwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDIwZGVnKX1gXSxcclxuICBhbmltYXRpb25zOiBbXHJcbiAgICB0cmlnZ2VyKCdhbmltYXRlJywgW1xyXG4gICAgICBzdGF0ZShcclxuICAgICAgICAnZmx5T3V0JyxcclxuICAgICAgICBzdHlsZSh7XHJcbiAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKGNhbGMoMTAwJSAtIDU1cHgpKScsXHJcbiAgICAgICAgfSksXHJcbiAgICAgICksXHJcbiAgICAgIHN0YXRlKFxyXG4gICAgICAgICdmbHlJbicsXHJcbiAgICAgICAgc3R5bGUoe1xyXG4gICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwKScsXHJcbiAgICAgICAgfSksXHJcbiAgICAgICksXHJcbiAgICAgIHRyYW5zaXRpb24oJ2ZseU91dCA9PiBmbHlJbicsIFtcclxuICAgICAgICBzdHlsZSh7XHJcbiAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKGNhbGMoMTAwJSAtIDU1cHgpKScsXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgYW5pbWF0ZSh0aW1lKSxcclxuICAgICAgXSksXHJcbiAgICAgIHRyYW5zaXRpb24oJ2ZseUluID0+IGZseU91dCcsIFtcclxuICAgICAgICBzdHlsZSh7XHJcbiAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDApJyxcclxuICAgICAgICB9KSxcclxuICAgICAgICBhbmltYXRlKHRpbWUpLFxyXG4gICAgICBdKSxcclxuICAgIF0pLFxyXG4gIF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hIbUNhbGVuZGFyQ29tcG9uZW50IHtcclxuICBASW5wdXQoKVxyXG4gIHdlZWtOYW1lczogc3RyaW5nW10gPSBbJ+aYn+acn+aXpScsICfmmJ/mnJ/kuIAnLCAn5pif5pyf5LqMJywgJ+aYn+acn+S4iScsICfmmJ/mnJ/lm5snLCAn5pif5pyf5LqUJywgJ+aYn+acn+WFrSddO1xyXG4gIEBJbnB1dCgpXHJcbiAgeWVhck5hbWUgPSAn5bm0JztcclxuICBASW5wdXQoKVxyXG4gIG1vbnRoTmFtZSA9ICfmnIgnO1xyXG4gIEBJbnB1dCgpXHJcbiAgZGF5TmFtZSA9ICfml6UnO1xyXG4gIEBJbnB1dCgpXHJcbiAgZXZlbnRDYXRlZ29yeXM6IE5neEhtQ2FsZW5kYXJFdmVudENhdGVnb3J5W10gPSBbXTtcclxuICBASW5wdXQoKVxyXG4gIHdlZWtseUV2ZW50czogTmd4SG1DYWxlbmRhckV2ZW50W10gPSBbXTtcclxuICBASW5wdXQoKVxyXG4gIGV2ZW50czogTmd4SG1DYWxlbmRhckV2ZW50W10gPSBbXTtcclxuICBASW5wdXQoKVxyXG4gIG5zdHIgPSBuZXcgRGF0ZSgpO1xyXG4gIEBPdXRwdXQoKVxyXG4gIG9wZW46IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGNsYXNzTmFtZSA9ICdibGFjayc7XHJcbiAgQElucHV0KClcclxuICBzaXplID0ge1xyXG4gICAgd2lkdGg6ICcxMDB2dycsXHJcbiAgICBoZWlnaHQ6ICcxMDB2aCcsXHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICog6aGv56S65qih5byPXHJcbiAgICovXHJcbiAgdmlld01vZGU6IE5neEhtQ2FsZW5kYXJWaWV3TW9kZSA9IE5neEhtQ2FsZW5kYXJWaWV3TW9kZS5tb250aDtcclxuXHJcbiAgZ2V0IHlub3coKSB7XHJcbiAgICByZXR1cm4gdGhpcy5uc3RyLmdldEZ1bGxZZWFyKCk7XHJcbiAgfVxyXG4gIGdldCBtbm93KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubnN0ci5nZXRNb250aCgpO1xyXG4gIH1cclxuICBnZXQgZG5vdygpIHtcclxuICAgIHJldHVybiB0aGlzLm5zdHIuZ2V0RGF0ZSgpO1xyXG4gIH1cclxuICBnZXQgbW9uRGV0YWlsKCkge1xyXG4gICAgbGV0IHJlc3VsdCA9IGAke3RoaXMueW5vd30gJHt0aGlzLnllYXJOYW1lfSAke3RoaXMubW5vdyArIDF9ICR7dGhpcy5tb250aE5hbWV9YDtcclxuXHJcbiAgICBpZiAodGhpcy52aWV3TW9kZSA9PT0gTmd4SG1DYWxlbmRhclZpZXdNb2RlLmRheSkge1xyXG4gICAgICByZXN1bHQgPSBgJHtyZXN1bHR9ICR7dGhpcy5kbm93fSAke3RoaXMuZGF5TmFtZX1gO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBsZWdlbmRPcGVuID0gJ2ZseU91dCc7XHJcblxyXG4gIEBWaWV3Q2hpbGQoTmd4SG1DYWxlbmRhck1vbnRoVmlld0NvbXBvbmVudClcclxuICBwcml2YXRlIG1vbnRoQ29tcG9uZW50OiBOZ3hIbUNhbGVuZGFyTW9udGhWaWV3Q29tcG9uZW50O1xyXG5cclxuICBAVmlld0NoaWxkKE5neEhtQ2FsZW5kYXJXZWVrVmlld0NvbXBvbmVudClcclxuICBwcml2YXRlIHdlZWtDb21wb25lbnQ6IE5neEhtQ2FsZW5kYXJXZWVrVmlld0NvbXBvbmVudDtcclxuXHJcbiAgQFZpZXdDaGlsZChOZ3hIbUNhbGVuZGFyRGF5Vmlld0NvbXBvbmVudClcclxuICBwcml2YXRlIGRheUNvbXBvbmVudDogTmd4SG1DYWxlbmRhckRheVZpZXdDb21wb25lbnQ7XHJcblxyXG4gIHByaXZhdGUgbW9udGhQb3B1cENvbXBvbmVudCA9IHRoaXMuX2ZhY3RvcnkucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoXHJcbiAgICBOZ3hIbUNhbGVuZGFyTW9udGhQb3B1cENvbXBvbmVudCxcclxuICApO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tb2RlbDogTmd4UnhNb2RhbFNlcnZpY2UsIHByaXZhdGUgX2ZhY3Rvcnk6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcikge31cclxuXHJcbiAgcHJldigpOiB2b2lkIHtcclxuICAgIHN3aXRjaCAodGhpcy52aWV3TW9kZSkge1xyXG4gICAgICBjYXNlIE5neEhtQ2FsZW5kYXJWaWV3TW9kZS5tb250aDpcclxuICAgICAgICB0aGlzLm1vbnRoQ29tcG9uZW50LnByZXYoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBOZ3hIbUNhbGVuZGFyVmlld01vZGUud2VlazpcclxuICAgICAgICB0aGlzLndlZWtDb21wb25lbnQucHJldigpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIE5neEhtQ2FsZW5kYXJWaWV3TW9kZS5kYXk6XHJcbiAgICAgICAgdGhpcy5kYXlDb21wb25lbnQucHJldigpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmV4dCgpOiB2b2lkIHtcclxuICAgIHN3aXRjaCAodGhpcy52aWV3TW9kZSkge1xyXG4gICAgICBjYXNlIE5neEhtQ2FsZW5kYXJWaWV3TW9kZS5tb250aDpcclxuICAgICAgICB0aGlzLm1vbnRoQ29tcG9uZW50Lm5leHQoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBOZ3hIbUNhbGVuZGFyVmlld01vZGUud2VlazpcclxuICAgICAgICB0aGlzLndlZWtDb21wb25lbnQubmV4dCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIE5neEhtQ2FsZW5kYXJWaWV3TW9kZS5kYXk6XHJcbiAgICAgICAgdGhpcy5kYXlDb21wb25lbnQubmV4dCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb3BlbkV2ZW50KGV2ZW50OiBOZ3hIbUNhbGVuZGFyRXZlbnQpOiB2b2lkIHtcclxuICAgIHRoaXMub3Blbi5lbWl0KGV2ZW50KTtcclxuICB9XHJcblxyXG4gIG9wZW5TZWxlY3RvcigkZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIHRoaXMuX21vZGVsXHJcbiAgICAgIC5vcGVuKHRoaXMubW9udGhQb3B1cENvbXBvbmVudCwge1xyXG4gICAgICAgIGRpc2FibGVDbG9zZUJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICBwYW5lbFN0eWxlOiB7XHJcbiAgICAgICAgICB0b3A6IGAkeyRldmVudC5vZmZzZXRZfXB4YCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhdGE6IHsgdGhlbWU6IHRoaXMuY2xhc3NOYW1lLCBjb250YWluZXJWaWV3TW9kZTogdGhpcy52aWV3TW9kZSB9LFxyXG4gICAgICB9KVxyXG4gICAgICAuc3Vic2NyaWJlKHNlbGVjdGVkRGF0ZSA9PiB7XHJcbiAgICAgICAgaWYgKHNlbGVjdGVkRGF0ZSkge1xyXG4gICAgICAgICAgdGhpcy5uc3RyID0gc2VsZWN0ZWREYXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBjaGFuZU1vZGUobW9kZTogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLnZpZXdNb2RlID0gbW9kZTtcclxuICB9XHJcblxyXG4gIGxlZ2VuZFRvZ2dsZSgpOiB2b2lkIHtcclxuICAgIHRoaXMubGVnZW5kT3BlbiA9IHRoaXMubGVnZW5kT3BlbiA9PT0gJ2ZseUluJyA/ICdmbHlPdXQnIDogJ2ZseUluJztcclxuICB9XHJcbn1cclxuIl19