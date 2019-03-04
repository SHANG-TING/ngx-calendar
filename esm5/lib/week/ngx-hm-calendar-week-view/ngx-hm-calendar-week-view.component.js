/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { getMutipleEvents } from '../../month/utils';
var NgxHmCalendarWeekViewComponent = /** @class */ (function () {
    function NgxHmCalendarWeekViewComponent() {
        this.className = 'black';
        this.dayName = '號';
        this.weekNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        this.weeklyEvents = [];
        this.events = [];
        this.nstr = new Date();
        this.open = new EventEmitter();
        this.weekDays = [];
        this.weekEvents = [];
    }
    /**
     * @return {?}
     */
    NgxHmCalendarWeekViewComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initValue();
    };
    /**
     * @return {?}
     */
    NgxHmCalendarWeekViewComponent.prototype.initValue = /**
     * @return {?}
     */
    function () {
        this.setWeekDays();
        this.setWeekEvents();
    };
    /**
     * @return {?}
     */
    NgxHmCalendarWeekViewComponent.prototype.setWeekDays = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var today = new Date();
        /** @type {?} */
        var nstrDay = this.nstr.getDay();
        /** @type {?} */
        var startDate = new Date(this.nstr.getTime());
        startDate.setDate(startDate.getDate() + (0 - nstrDay));
        this.weekDays = [];
        for (var i = 0; i < 7; i++) {
            /** @type {?} */
            var date = new Date(startDate.getTime());
            date.setDate(date.getDate() + i);
            this.weekDays.push((/** @type {?} */ ({
                date: date,
                year: date.getFullYear(),
                month: date.getMonth(),
                day: date.getDate(),
                isToday: date.toDateString() === today.toDateString(),
            })));
        }
    };
    /**
     * @return {?}
     */
    NgxHmCalendarWeekViewComponent.prototype.setWeekEvents = /**
     * @return {?}
     */
    function () {
        var _a;
        /** @type {?} */
        var firstWeekDay = this.weekDays[0];
        /** @type {?} */
        var firstdate = new Date(firstWeekDay.year, firstWeekDay.month, firstWeekDay.day);
        /** @type {?} */
        var firstday = firstdate.getDay();
        /** @type {?} */
        var lastWeekDay = this.weekDays[6];
        /** @type {?} */
        var lastdate = new Date(lastWeekDay.year, lastWeekDay.month, lastWeekDay.day);
        /** @type {?} */
        var lastday = lastdate.getDay();
        lastdate.setDate(lastdate.getDate() + 1);
        this.weekEvents = (_a = this.events).concat.apply(_a, tslib_1.__spread(this.weeklyEvents.map(getMutipleEvents(firstWeekDay.year, firstWeekDay.month)))).filter(function (e) {
            return ((e.start >= firstdate && e.start < lastdate) ||
                (firstdate >= e.start && firstdate <= e.end) ||
                (e.start <= firstdate && lastdate < e.end));
        })
            .sort(function (e1, e2) { return e1.start.getTime() - e2.start.getTime(); })
            .map(function (e) {
            /** @type {?} */
            var event = {
                style: {
                    width: 7,
                    left: e.start.getDay() - firstday,
                    color: e.color,
                },
                startsBeforeWeek: true,
                endsAfterWeek: true,
                title: e.title,
                url: e.url,
                data: e,
            };
            if (e.start >= firstdate && e.end < lastdate) {
                event.style.width = e.end.getDay() - e.start.getDay() + 1;
                event.style.left = e.start.getDay() - firstday;
            }
            else if (e.start < firstdate && (firstdate <= e.end && e.end < lastdate)) {
                event.style.width = e.end.getDay() - firstday + 1;
                event.style.left = 0;
                event.startsBeforeWeek = false;
            }
            else if (e.start >= firstdate && e.start < lastdate && e.end >= lastdate) {
                event.style.width = lastday - e.start.getDay() + 1;
                event.style.left = e.start.getDay() - firstday;
                event.endsAfterWeek = false;
            }
            else if (e.start <= firstdate && lastdate < e.end) {
                event.style.width = 7;
                event.style.left = 0;
                event.startsBeforeWeek = false;
                event.endsAfterWeek = false;
            }
            return tslib_1.__assign({}, event, { style: {
                    width: (event.style.width / 7) * 100 + "%",
                    left: (event.style.left / 7) * 100 + "%",
                    color: e.color,
                } });
        });
    };
    /**
     * @return {?}
     */
    NgxHmCalendarWeekViewComponent.prototype.prev = /**
     * @return {?}
     */
    function () {
        this.nstr.setDate(this.nstr.getDate() - 7);
        this.initValue();
    };
    /**
     * @return {?}
     */
    NgxHmCalendarWeekViewComponent.prototype.next = /**
     * @return {?}
     */
    function () {
        this.nstr.setDate(this.nstr.getDate() + 7);
        this.initValue();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxHmCalendarWeekViewComponent.prototype.openEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.open.emit(event);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgxHmCalendarWeekViewComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.nstr || changes.events) {
            this.initValue();
        }
    };
    NgxHmCalendarWeekViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-hm-calendar-week-view',
                    template: "<div class=\"cal-week-view\"\n     [ngClass]=\"className\">\n\n  <div class=\"cal-day-headers\">\n\n    <div class=\"cal-header\"\n         *ngFor=\"let weekDay of weekDays; let i = index; let isFirst = first; let isLast = last\"\n         [class.cal-weekend]=\"isFirst || isLast\"\n         [class.cal-today]=\"weekDay.isToday\">\n      <b>{{ weekNames[i] }}</b>\n      <br>\n      <span>{{ weekDay.day }}{{ dayName }}</span>\n    </div>\n  </div>\n\n  <div class=\"action-block\">\n    <div class=\"cal-events-row \"\n         *ngFor=\"let weekEvent of weekEvents; let i = index;\">\n      <div class=\"cal-event-container cal-starts-within-week cal-ends-within-week \"\n           [style.width]=\"weekEvent.style.width\"\n           [style.left]=\"weekEvent.style.left\"\n           [class.cal-starts-within-week]=\"weekEvent.startsBeforeWeek\"\n           [class.cal-ends-within-week]=\"weekEvent.endsAfterWeek\">\n        <div class=\"cal-event\"\n             [style.background]=\"weekEvent.style.color\">\n          <!-- <span class=\"cal-event-actions \">\n            <a class=\"cal-event-action \" href=\"javascript:;\">\n              <i class=\"fa fa-fw fa-pencil\"></i>\n            </a>\n            <a class=\"cal-event-action \" href=\"javascript:;\">\n              <i class=\"fa fa-fw fa-times\"></i>\n            </a>\n          </span> -->\n          <a class=\"cal-event-title \"\n             href=\"javascript: void(0)\"\n             (click)=\"openEvent(weekEvent.data)\">{{ weekEvent.title }}</a>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n",
                    styles: [":host{min-height:50vh;max-height:85vh;display:block}.black .cal-day-headers{background:#4a4a4a}.black .cal-header{border-right:1px solid #e1e1e1;border-bottom:1px solid #e1e1e1;color:#fff}.black .cal-header.cal-today{background-color:#467298}.white .cal-day-headers{background:#fff}.white .cal-header{border-right:1px solid #e1e1e1;border-bottom:1px solid #e1e1e1}.white .cal-header.cal-today{background-color:#d7ecff}.cal-week-view{height:calc(100% - 30px);overflow-y:auto}.cal-week-view .cal-day-headers{display:flex;position:absolute;width:100%;z-index:1}.cal-week-view .cal-day-headers .cal-header{flex:1;text-align:center;padding:5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:50px}.cal-week-view .action-block{padding-top:62px}.cal-week-view .cal-events-row{position:relative;height:33px}.cal-week-view .cal-event-container{display:inline-block;position:absolute}.cal-week-view .cal-ends-within-week .cal-event{border-top-right-radius:5px;border-bottom-right-radius:5px}.cal-week-view .cal-starts-within-week .cal-event{border-top-left-radius:5px;border-bottom-left-radius:5px}.cal-week-view .cal-event{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0 10px;font-size:12px;margin-left:2px;margin-right:2px;height:30px;line-height:30px;background-color:#d1e8ff;border:1px solid #1e90ff;color:#1e90ff}.cal-week-view .cal-event.orange{background-color:#ffc681;border-color:#ad2121}.cal-week-view .cal-event.blue{background-color:#c4e7ff;border-color:#0834e3}a{color:#007bff;text-decoration:none;background-color:transparent;-webkit-text-decoration-skip:objects}.cal-week-view .cal-event-title:link{color:currentColor}"]
                }] }
    ];
    /** @nocollapse */
    NgxHmCalendarWeekViewComponent.ctorParameters = function () { return []; };
    NgxHmCalendarWeekViewComponent.propDecorators = {
        className: [{ type: Input }],
        dayName: [{ type: Input }],
        weekNames: [{ type: Input }],
        weeklyEvents: [{ type: Input }],
        events: [{ type: Input }],
        nstr: [{ type: Input }],
        open: [{ type: Output }]
    };
    return NgxHmCalendarWeekViewComponent;
}());
export { NgxHmCalendarWeekViewComponent };
if (false) {
    /** @type {?} */
    NgxHmCalendarWeekViewComponent.prototype.className;
    /** @type {?} */
    NgxHmCalendarWeekViewComponent.prototype.dayName;
    /** @type {?} */
    NgxHmCalendarWeekViewComponent.prototype.weekNames;
    /** @type {?} */
    NgxHmCalendarWeekViewComponent.prototype.weeklyEvents;
    /** @type {?} */
    NgxHmCalendarWeekViewComponent.prototype.events;
    /** @type {?} */
    NgxHmCalendarWeekViewComponent.prototype.nstr;
    /** @type {?} */
    NgxHmCalendarWeekViewComponent.prototype.open;
    /** @type {?} */
    NgxHmCalendarWeekViewComponent.prototype.weekDays;
    /** @type {?} */
    NgxHmCalendarWeekViewComponent.prototype.weekEvents;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWhtLWNhbGVuZGFyLXdlZWstdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtaG0tY2FsZW5kYXIvIiwic291cmNlcyI6WyJsaWIvd2Vlay9uZ3gtaG0tY2FsZW5kYXItd2Vlay12aWV3L25neC1obS1jYWxlbmRhci13ZWVrLXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sR0FFUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUdyRDtJQWtFRTtRQWxCQSxjQUFTLEdBQUcsT0FBTyxDQUFDO1FBRXBCLFlBQU8sR0FBRyxHQUFHLENBQUM7UUFFZCxjQUFTLEdBQWEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4RSxpQkFBWSxHQUF5QixFQUFFLENBQUM7UUFFeEMsV0FBTSxHQUF5QixFQUFFLENBQUM7UUFFbEMsU0FBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFHbEIsU0FBSSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTdDLGFBQVEsR0FBMkIsRUFBRSxDQUFDO1FBQ3RDLGVBQVUsR0FBcUMsRUFBRSxDQUFDO0lBRW5DLENBQUM7Ozs7SUFFaEIsaURBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7Ozs7SUFFTyxrREFBUzs7O0lBQWpCO1FBQ0UsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7O0lBRUQsb0RBQVc7OztJQUFYOztZQUNRLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRTs7WUFDbEIsT0FB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QUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7Ozs7O0lBRUQsa0RBQVM7Ozs7SUFBVCxVQUFVLEtBQUs7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QixDQUFDOzs7OztJQUVELG9EQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNsQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDbEI7SUFDSCxDQUFDOztnQkF0TEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLFFBQVEsRUFBRSxpakRBeUNYOzZCQUNVLDhuREFBOG5EO2lCQUN4b0Q7Ozs7OzRCQUVFLEtBQUs7MEJBRUwsS0FBSzs0QkFFTCxLQUFLOytCQUVMLEtBQUs7eUJBRUwsS0FBSzt1QkFFTCxLQUFLO3VCQUdMLE1BQU07O0lBMkhULHFDQUFDO0NBQUEsQUF2TEQsSUF1TEM7U0F6SVksOEJBQThCOzs7SUFDekMsbURBQ29COztJQUNwQixpREFDYzs7SUFDZCxtREFDd0U7O0lBQ3hFLHNEQUN3Qzs7SUFDeEMsZ0RBQ2tDOztJQUNsQyw4Q0FDa0I7O0lBRWxCLDhDQUM2Qzs7SUFFN0Msa0RBQXNDOztJQUN0QyxvREFBa0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSW5wdXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIE9uSW5pdCxcclxuICBPdXRwdXQsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZ2V0TXV0aXBsZUV2ZW50cyB9IGZyb20gJy4uLy4uL21vbnRoL3V0aWxzJztcclxuaW1wb3J0IHsgTmd4SG1DYWxlbmRhckVsbURldGlhbCwgTmd4SG1DYWxlbmRhckV2ZW50LCBOZ3hIbUNhbGVuZGFyV2Vla0RheSB9IGZyb20gJy4uLy4uL25neC1obS1jYWxlbmRhci5tb2RlbCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25neC1obS1jYWxlbmRhci13ZWVrLXZpZXcnLFxyXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImNhbC13ZWVrLXZpZXdcIlxyXG4gICAgIFtuZ0NsYXNzXT1cImNsYXNzTmFtZVwiPlxyXG5cclxuICA8ZGl2IGNsYXNzPVwiY2FsLWRheS1oZWFkZXJzXCI+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cImNhbC1oZWFkZXJcIlxyXG4gICAgICAgICAqbmdGb3I9XCJsZXQgd2Vla0RheSBvZiB3ZWVrRGF5czsgbGV0IGkgPSBpbmRleDsgbGV0IGlzRmlyc3QgPSBmaXJzdDsgbGV0IGlzTGFzdCA9IGxhc3RcIlxyXG4gICAgICAgICBbY2xhc3MuY2FsLXdlZWtlbmRdPVwiaXNGaXJzdCB8fCBpc0xhc3RcIlxyXG4gICAgICAgICBbY2xhc3MuY2FsLXRvZGF5XT1cIndlZWtEYXkuaXNUb2RheVwiPlxyXG4gICAgICA8Yj57eyB3ZWVrTmFtZXNbaV0gfX08L2I+XHJcbiAgICAgIDxicj5cclxuICAgICAgPHNwYW4+e3sgd2Vla0RheS5kYXkgfX17eyBkYXlOYW1lIH19PC9zcGFuPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJhY3Rpb24tYmxvY2tcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjYWwtZXZlbnRzLXJvdyBcIlxyXG4gICAgICAgICAqbmdGb3I9XCJsZXQgd2Vla0V2ZW50IG9mIHdlZWtFdmVudHM7IGxldCBpID0gaW5kZXg7XCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjYWwtZXZlbnQtY29udGFpbmVyIGNhbC1zdGFydHMtd2l0aGluLXdlZWsgY2FsLWVuZHMtd2l0aGluLXdlZWsgXCJcclxuICAgICAgICAgICBbc3R5bGUud2lkdGhdPVwid2Vla0V2ZW50LnN0eWxlLndpZHRoXCJcclxuICAgICAgICAgICBbc3R5bGUubGVmdF09XCJ3ZWVrRXZlbnQuc3R5bGUubGVmdFwiXHJcbiAgICAgICAgICAgW2NsYXNzLmNhbC1zdGFydHMtd2l0aGluLXdlZWtdPVwid2Vla0V2ZW50LnN0YXJ0c0JlZm9yZVdlZWtcIlxyXG4gICAgICAgICAgIFtjbGFzcy5jYWwtZW5kcy13aXRoaW4td2Vla109XCJ3ZWVrRXZlbnQuZW5kc0FmdGVyV2Vla1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYWwtZXZlbnRcIlxyXG4gICAgICAgICAgICAgW3N0eWxlLmJhY2tncm91bmRdPVwid2Vla0V2ZW50LnN0eWxlLmNvbG9yXCI+XHJcbiAgICAgICAgICA8IS0tIDxzcGFuIGNsYXNzPVwiY2FsLWV2ZW50LWFjdGlvbnMgXCI+XHJcbiAgICAgICAgICAgIDxhIGNsYXNzPVwiY2FsLWV2ZW50LWFjdGlvbiBcIiBocmVmPVwiamF2YXNjcmlwdDo7XCI+XHJcbiAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1mdyBmYS1wZW5jaWxcIj48L2k+XHJcbiAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgPGEgY2xhc3M9XCJjYWwtZXZlbnQtYWN0aW9uIFwiIGhyZWY9XCJqYXZhc2NyaXB0OjtcIj5cclxuICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWZ3IGZhLXRpbWVzXCI+PC9pPlxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICA8L3NwYW4+IC0tPlxyXG4gICAgICAgICAgPGEgY2xhc3M9XCJjYWwtZXZlbnQtdGl0bGUgXCJcclxuICAgICAgICAgICAgIGhyZWY9XCJqYXZhc2NyaXB0OiB2b2lkKDApXCJcclxuICAgICAgICAgICAgIChjbGljayk9XCJvcGVuRXZlbnQod2Vla0V2ZW50LmRhdGEpXCI+e3sgd2Vla0V2ZW50LnRpdGxlIH19PC9hPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuYCxcclxuICBzdHlsZXM6IFtgOmhvc3R7bWluLWhlaWdodDo1MHZoO21heC1oZWlnaHQ6ODV2aDtkaXNwbGF5OmJsb2NrfS5ibGFjayAuY2FsLWRheS1oZWFkZXJze2JhY2tncm91bmQ6IzRhNGE0YX0uYmxhY2sgLmNhbC1oZWFkZXJ7Ym9yZGVyLXJpZ2h0OjFweCBzb2xpZCAjZTFlMWUxO2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNlMWUxZTE7Y29sb3I6I2ZmZn0uYmxhY2sgLmNhbC1oZWFkZXIuY2FsLXRvZGF5e2JhY2tncm91bmQtY29sb3I6IzQ2NzI5OH0ud2hpdGUgLmNhbC1kYXktaGVhZGVyc3tiYWNrZ3JvdW5kOiNmZmZ9LndoaXRlIC5jYWwtaGVhZGVye2JvcmRlci1yaWdodDoxcHggc29saWQgI2UxZTFlMTtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZTFlMWUxfS53aGl0ZSAuY2FsLWhlYWRlci5jYWwtdG9kYXl7YmFja2dyb3VuZC1jb2xvcjojZDdlY2ZmfS5jYWwtd2Vlay12aWV3e2hlaWdodDpjYWxjKDEwMCUgLSAzMHB4KTtvdmVyZmxvdy15OmF1dG99LmNhbC13ZWVrLXZpZXcgLmNhbC1kYXktaGVhZGVyc3tkaXNwbGF5OmZsZXg7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MTAwJTt6LWluZGV4OjF9LmNhbC13ZWVrLXZpZXcgLmNhbC1kYXktaGVhZGVycyAuY2FsLWhlYWRlcntmbGV4OjE7dGV4dC1hbGlnbjpjZW50ZXI7cGFkZGluZzo1cHg7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7d2hpdGUtc3BhY2U6bm93cmFwO2hlaWdodDo1MHB4fS5jYWwtd2Vlay12aWV3IC5hY3Rpb24tYmxvY2t7cGFkZGluZy10b3A6NjJweH0uY2FsLXdlZWstdmlldyAuY2FsLWV2ZW50cy1yb3d7cG9zaXRpb246cmVsYXRpdmU7aGVpZ2h0OjMzcHh9LmNhbC13ZWVrLXZpZXcgLmNhbC1ldmVudC1jb250YWluZXJ7ZGlzcGxheTppbmxpbmUtYmxvY2s7cG9zaXRpb246YWJzb2x1dGV9LmNhbC13ZWVrLXZpZXcgLmNhbC1lbmRzLXdpdGhpbi13ZWVrIC5jYWwtZXZlbnR7Ym9yZGVyLXRvcC1yaWdodC1yYWRpdXM6NXB4O2JvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOjVweH0uY2FsLXdlZWstdmlldyAuY2FsLXN0YXJ0cy13aXRoaW4td2VlayAuY2FsLWV2ZW50e2JvcmRlci10b3AtbGVmdC1yYWRpdXM6NXB4O2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6NXB4fS5jYWwtd2Vlay12aWV3IC5jYWwtZXZlbnR7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7d2hpdGUtc3BhY2U6bm93cmFwO3BhZGRpbmc6MCAxMHB4O2ZvbnQtc2l6ZToxMnB4O21hcmdpbi1sZWZ0OjJweDttYXJnaW4tcmlnaHQ6MnB4O2hlaWdodDozMHB4O2xpbmUtaGVpZ2h0OjMwcHg7YmFja2dyb3VuZC1jb2xvcjojZDFlOGZmO2JvcmRlcjoxcHggc29saWQgIzFlOTBmZjtjb2xvcjojMWU5MGZmfS5jYWwtd2Vlay12aWV3IC5jYWwtZXZlbnQub3Jhbmdle2JhY2tncm91bmQtY29sb3I6I2ZmYzY4MTtib3JkZXItY29sb3I6I2FkMjEyMX0uY2FsLXdlZWstdmlldyAuY2FsLWV2ZW50LmJsdWV7YmFja2dyb3VuZC1jb2xvcjojYzRlN2ZmO2JvcmRlci1jb2xvcjojMDgzNGUzfWF7Y29sb3I6IzAwN2JmZjt0ZXh0LWRlY29yYXRpb246bm9uZTtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50Oy13ZWJraXQtdGV4dC1kZWNvcmF0aW9uLXNraXA6b2JqZWN0c30uY2FsLXdlZWstdmlldyAuY2FsLWV2ZW50LXRpdGxlOmxpbmt7Y29sb3I6Y3VycmVudENvbG9yfWBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4SG1DYWxlbmRhcldlZWtWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpXHJcbiAgY2xhc3NOYW1lID0gJ2JsYWNrJztcclxuICBASW5wdXQoKVxyXG4gIGRheU5hbWUgPSAn6JmfJztcclxuICBASW5wdXQoKVxyXG4gIHdlZWtOYW1lczogc3RyaW5nW10gPSBbJ+aYn+acn+aXpScsICfmmJ/mnJ/kuIAnLCAn5pif5pyf5LqMJywgJ+aYn+acn+S4iScsICfmmJ/mnJ/lm5snLCAn5pif5pyf5LqUJywgJ+aYn+acn+WFrSddO1xyXG4gIEBJbnB1dCgpXHJcbiAgd2Vla2x5RXZlbnRzOiBOZ3hIbUNhbGVuZGFyRXZlbnRbXSA9IFtdO1xyXG4gIEBJbnB1dCgpXHJcbiAgZXZlbnRzOiBOZ3hIbUNhbGVuZGFyRXZlbnRbXSA9IFtdO1xyXG4gIEBJbnB1dCgpXHJcbiAgbnN0ciA9IG5ldyBEYXRlKCk7XHJcblxyXG4gIEBPdXRwdXQoKVxyXG4gIG9wZW46IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICB3ZWVrRGF5czogTmd4SG1DYWxlbmRhcldlZWtEYXlbXSA9IFtdO1xyXG4gIHdlZWtFdmVudHM6IE5neEhtQ2FsZW5kYXJFbG1EZXRpYWw8c3RyaW5nPltdID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmluaXRWYWx1ZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0VmFsdWUoKSB7XHJcbiAgICB0aGlzLnNldFdlZWtEYXlzKCk7XHJcbiAgICB0aGlzLnNldFdlZWtFdmVudHMoKTtcclxuICB9XHJcblxyXG4gIHNldFdlZWtEYXlzKCk6IHZvaWQge1xyXG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG4gICAgY29uc3QgbnN0ckRheSA9IHRoaXMubnN0ci5nZXREYXkoKTtcclxuICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKHRoaXMubnN0ci5nZXRUaW1lKCkpO1xyXG5cclxuICAgIHN0YXJ0RGF0ZS5zZXREYXRlKHN0YXJ0RGF0ZS5nZXREYXRlKCkgKyAoMCAtIG5zdHJEYXkpKTtcclxuXHJcbiAgICB0aGlzLndlZWtEYXlzID0gW107XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA3OyBpKyspIHtcclxuICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHN0YXJ0RGF0ZS5nZXRUaW1lKCkpO1xyXG5cclxuICAgICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgaSk7XHJcblxyXG4gICAgICB0aGlzLndlZWtEYXlzLnB1c2goe1xyXG4gICAgICAgIGRhdGUsXHJcbiAgICAgICAgeWVhcjogZGF0ZS5nZXRGdWxsWWVhcigpLFxyXG4gICAgICAgIG1vbnRoOiBkYXRlLmdldE1vbnRoKCksXHJcbiAgICAgICAgZGF5OiBkYXRlLmdldERhdGUoKSxcclxuICAgICAgICBpc1RvZGF5OiBkYXRlLnRvRGF0ZVN0cmluZygpID09PSB0b2RheS50b0RhdGVTdHJpbmcoKSxcclxuICAgICAgfSBhcyBOZ3hIbUNhbGVuZGFyV2Vla0RheSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRXZWVrRXZlbnRzKCk6IHZvaWQge1xyXG4gICAgY29uc3QgZmlyc3RXZWVrRGF5ID0gdGhpcy53ZWVrRGF5c1swXTtcclxuICAgIGNvbnN0IGZpcnN0ZGF0ZSA9IG5ldyBEYXRlKGZpcnN0V2Vla0RheS55ZWFyLCBmaXJzdFdlZWtEYXkubW9udGgsIGZpcnN0V2Vla0RheS5kYXkpO1xyXG4gICAgY29uc3QgZmlyc3RkYXkgPSBmaXJzdGRhdGUuZ2V0RGF5KCk7XHJcblxyXG4gICAgY29uc3QgbGFzdFdlZWtEYXkgPSB0aGlzLndlZWtEYXlzWzZdO1xyXG4gICAgY29uc3QgbGFzdGRhdGUgPSBuZXcgRGF0ZShsYXN0V2Vla0RheS55ZWFyLCBsYXN0V2Vla0RheS5tb250aCwgbGFzdFdlZWtEYXkuZGF5KTtcclxuICAgIGNvbnN0IGxhc3RkYXkgPSBsYXN0ZGF0ZS5nZXREYXkoKTtcclxuICAgIGxhc3RkYXRlLnNldERhdGUobGFzdGRhdGUuZ2V0RGF0ZSgpICsgMSk7XHJcblxyXG4gICAgdGhpcy53ZWVrRXZlbnRzID0gdGhpcy5ldmVudHNcclxuICAgICAgLmNvbmNhdCguLi50aGlzLndlZWtseUV2ZW50cy5tYXAoZ2V0TXV0aXBsZUV2ZW50cyhmaXJzdFdlZWtEYXkueWVhciwgZmlyc3RXZWVrRGF5Lm1vbnRoKSkpXHJcbiAgICAgIC5maWx0ZXIoZSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIChlLnN0YXJ0ID49IGZpcnN0ZGF0ZSAmJiBlLnN0YXJ0IDwgbGFzdGRhdGUpIHx8XHJcbiAgICAgICAgICAoZmlyc3RkYXRlID49IGUuc3RhcnQgJiYgZmlyc3RkYXRlIDw9IGUuZW5kKSB8fFxyXG4gICAgICAgICAgKGUuc3RhcnQgPD0gZmlyc3RkYXRlICYmIGxhc3RkYXRlIDwgZS5lbmQpXHJcbiAgICAgICAgKTtcclxuICAgICAgfSlcclxuICAgICAgLnNvcnQoKGUxLCBlMikgPT4gZTEuc3RhcnQuZ2V0VGltZSgpIC0gZTIuc3RhcnQuZ2V0VGltZSgpKVxyXG4gICAgICAubWFwKGUgPT4ge1xyXG4gICAgICAgIGNvbnN0IGV2ZW50OiBOZ3hIbUNhbGVuZGFyRWxtRGV0aWFsPG51bWJlcj4gPSB7XHJcbiAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICB3aWR0aDogNyxcclxuICAgICAgICAgICAgbGVmdDogZS5zdGFydC5nZXREYXkoKSAtIGZpcnN0ZGF5LFxyXG4gICAgICAgICAgICBjb2xvcjogZS5jb2xvcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBzdGFydHNCZWZvcmVXZWVrOiB0cnVlLFxyXG4gICAgICAgICAgZW5kc0FmdGVyV2VlazogdHJ1ZSxcclxuICAgICAgICAgIHRpdGxlOiBlLnRpdGxlLFxyXG4gICAgICAgICAgdXJsOiBlLnVybCxcclxuICAgICAgICAgIGRhdGE6IGUsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKGUuc3RhcnQgPj0gZmlyc3RkYXRlICYmIGUuZW5kIDwgbGFzdGRhdGUpIHtcclxuICAgICAgICAgIGV2ZW50LnN0eWxlLndpZHRoID0gZS5lbmQuZ2V0RGF5KCkgLSBlLnN0YXJ0LmdldERheSgpICsgMTtcclxuICAgICAgICAgIGV2ZW50LnN0eWxlLmxlZnQgPSBlLnN0YXJ0LmdldERheSgpIC0gZmlyc3RkYXk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChlLnN0YXJ0IDwgZmlyc3RkYXRlICYmIChmaXJzdGRhdGUgPD0gZS5lbmQgJiYgZS5lbmQgPCBsYXN0ZGF0ZSkpIHtcclxuICAgICAgICAgIGV2ZW50LnN0eWxlLndpZHRoID0gZS5lbmQuZ2V0RGF5KCkgLSBmaXJzdGRheSArIDE7XHJcbiAgICAgICAgICBldmVudC5zdHlsZS5sZWZ0ID0gMDtcclxuICAgICAgICAgIGV2ZW50LnN0YXJ0c0JlZm9yZVdlZWsgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGUuc3RhcnQgPj0gZmlyc3RkYXRlICYmIGUuc3RhcnQgPCBsYXN0ZGF0ZSAmJiBlLmVuZCA+PSBsYXN0ZGF0ZSkge1xyXG4gICAgICAgICAgZXZlbnQuc3R5bGUud2lkdGggPSBsYXN0ZGF5IC0gZS5zdGFydC5nZXREYXkoKSArIDE7XHJcbiAgICAgICAgICBldmVudC5zdHlsZS5sZWZ0ID0gZS5zdGFydC5nZXREYXkoKSAtIGZpcnN0ZGF5O1xyXG4gICAgICAgICAgZXZlbnQuZW5kc0FmdGVyV2VlayA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZS5zdGFydCA8PSBmaXJzdGRhdGUgJiYgbGFzdGRhdGUgPCBlLmVuZCkge1xyXG4gICAgICAgICAgZXZlbnQuc3R5bGUud2lkdGggPSA3O1xyXG4gICAgICAgICAgZXZlbnQuc3R5bGUubGVmdCA9IDA7XHJcbiAgICAgICAgICBldmVudC5zdGFydHNCZWZvcmVXZWVrID0gZmFsc2U7XHJcbiAgICAgICAgICBldmVudC5lbmRzQWZ0ZXJXZWVrID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgLi4uZXZlbnQsXHJcbiAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICB3aWR0aDogYCR7KGV2ZW50LnN0eWxlLndpZHRoIC8gNykgKiAxMDB9JWAsXHJcbiAgICAgICAgICAgIGxlZnQ6IGAkeyhldmVudC5zdHlsZS5sZWZ0IC8gNykgKiAxMDB9JWAsXHJcbiAgICAgICAgICAgIGNvbG9yOiBlLmNvbG9yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIHByZXYoKTogdm9pZCB7XHJcbiAgICB0aGlzLm5zdHIuc2V0RGF0ZSh0aGlzLm5zdHIuZ2V0RGF0ZSgpIC0gNyk7XHJcbiAgICB0aGlzLmluaXRWYWx1ZSgpO1xyXG4gIH1cclxuXHJcbiAgbmV4dCgpOiB2b2lkIHtcclxuICAgIHRoaXMubnN0ci5zZXREYXRlKHRoaXMubnN0ci5nZXREYXRlKCkgKyA3KTtcclxuICAgIHRoaXMuaW5pdFZhbHVlKCk7XHJcbiAgfVxyXG5cclxuICBvcGVuRXZlbnQoZXZlbnQpOiB2b2lkIHtcclxuICAgIHRoaXMub3Blbi5lbWl0KGV2ZW50KTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIGlmIChjaGFuZ2VzLm5zdHIgfHwgY2hhbmdlcy5ldmVudHMpIHtcclxuICAgICAgdGhpcy5pbml0VmFsdWUoKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19