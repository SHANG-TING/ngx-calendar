/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Inject } from '@angular/core';
import { NGX_RX_MODAL_TOKEN } from 'ngx-rx-modal';
import { Subject } from 'rxjs';
import { NgxHmCalendarViewMode } from '../../ngx-hm-calendar.model';
import { getCalendar } from '../utils';
import { CalendarSelectorMode } from './ngx-hm-calendar-month-popup.model';
var NgxHmCalendarMonthPopupComponent = /** @class */ (function () {
    function NgxHmCalendarMonthPopupComponent(data) {
        this.data = data;
        this.popupData = {};
        this.mode = CalendarSelectorMode.Year;
        this.minYear = 2016;
        this.months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        this.complete = new Subject();
        this.popupData = data;
    }
    Object.defineProperty(NgxHmCalendarMonthPopupComponent.prototype, "years", {
        get: /**
         * @return {?}
         */
        function () {
            var _this = this;
            return Array.from({ length: 24 }, function (v, k) { return k + _this.minYear; });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgxHmCalendarMonthPopupComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    NgxHmCalendarMonthPopupComponent.prototype.prevYearRange = /**
     * @return {?}
     */
    function () {
        this.minYear = this.minYear - 24;
    };
    /**
     * @return {?}
     */
    NgxHmCalendarMonthPopupComponent.prototype.nextYearRange = /**
     * @return {?}
     */
    function () {
        this.minYear = this.minYear + 24;
    };
    /**
     * @param {?} year
     * @return {?}
     */
    NgxHmCalendarMonthPopupComponent.prototype.selectYear = /**
     * @param {?} year
     * @return {?}
     */
    function (year) {
        this.selectedYear = year;
        this.mode = CalendarSelectorMode.Month;
    };
    /**
     * @param {?} month
     * @return {?}
     */
    NgxHmCalendarMonthPopupComponent.prototype.selectMonth = /**
     * @param {?} month
     * @return {?}
     */
    function (month) {
        this.selectedMonth = month;
        if (this.popupData.containerViewMode === NgxHmCalendarViewMode.day) {
            this.mode = CalendarSelectorMode.Day;
            this.calendarData = getCalendar(this.selectedYear, this.selectedMonth, []);
        }
        else {
            this.complete.next(new Date(this.selectedYear, this.selectedMonth, 1));
        }
    };
    /**
     * @param {?} day
     * @return {?}
     */
    NgxHmCalendarMonthPopupComponent.prototype.selectDay = /**
     * @param {?} day
     * @return {?}
     */
    function (day) {
        this.complete.next(day);
    };
    /**
     * @return {?}
     */
    NgxHmCalendarMonthPopupComponent.prototype.backToYearSelector = /**
     * @return {?}
     */
    function () {
        this.mode = CalendarSelectorMode.Year;
    };
    /**
     * @return {?}
     */
    NgxHmCalendarMonthPopupComponent.prototype.backToMonthSelector = /**
     * @return {?}
     */
    function () {
        this.mode = CalendarSelectorMode.Month;
    };
    NgxHmCalendarMonthPopupComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-hm-calendar-month-popup',
                    template: "<div class=\"wrapper\" [ngClass]=\"popupData.theme\">\n  <header class=\"header\">\n\n    <div class=\"title\" [ngSwitch]=\"mode\">\n      <span *ngSwitchCase=\"'Year'\">{{ minYear }} ~ {{ minYear + 24 }}\u5E74</span>\n      <span *ngSwitchCase=\"'Month'\">{{ selectedYear }}\u5E74</span>\n      <span *ngSwitchCase=\"'Day'\">{{ selectedYear }}\u5E74 {{ selectedMonth  + 1 }}\u6708</span>\n    </div>\n\n\n    <ng-container [ngSwitch]=\"mode\">\n\n      <div class=\"button-block\" *ngSwitchCase=\"'Year'\">\n\n        <button class=\"header-button\" (click)=\"prevYearRange()\">\n          <div class=\"button left\"></div>\n        </button>\n        <button class=\"header-button\" (click)=\"nextYearRange()\">\n          <div class=\"button right\"></div>\n        </button>\n\n      </div>\n\n      <div class=\"button-block\" *ngSwitchCase=\"'Month'\">\n        <button class=\"header-button\" (click)=\"backToYearSelector()\">\n          \u25B2\n        </button>\n      </div>\n\n      <div class=\"button-block\" *ngSwitchCase=\"'Day'\">\n        <button class=\"header-button\" (click)=\"backToMonthSelector()\">\n          \u25B2\n        </button>\n      </div>\n\n    </ng-container>\n\n  </header>\n  <ng-container [ngSwitch]=\"mode\">\n\n    <div *ngSwitchCase=\"'Year'\" class=\"container\" (swipeleft)=\"nextYearRange()\" (swiperight)=\"prevYearRange()\">\n      <div class=\"box year\" *ngFor=\"let year of years; let i = index;\" (click)=\"selectYear(year)\">{{ year }}</div>\n    </div>\n\n    <div *ngSwitchCase=\"'Month'\" class=\"container\" (swipeup)=\"backToYearSelector()\">\n      <div class=\"box\" *ngFor=\"let month of months; let i = index;\" (click)=\"selectMonth(month)\">{{ month + 1 }}</div>\n    </div>\n\n    <div *ngSwitchCase=\"'Day'\" class=\"container\" (swipeup)=\"backToMonthSelector()\">\n      <div *ngFor=\"let week of calendarData; let i = index;\">\n        <ng-container *ngFor=\"let day of week.days; let day_index = index;\" >\n          <div class=\"box day\" [class.n-month]=\"day.other\" (click)=\"selectDay(day.date)\">{{ day.number }}</div>\n        </ng-container>\n      </div>\n    </div>\n\n  </ng-container>\n\n\n</div>\n",
                    styles: [".wrapper.black{background-color:#5e5b5b}.wrapper.black .header{background-color:#007bff}.wrapper.black .title{color:#fff}.wrapper.black .left{border-color:transparent #a09fa0 transparent transparent}.wrapper.black .left:hover{border-color:transparent #fff transparent transparent}.wrapper.black .right{border-color:transparent transparent transparent #a09fa0}.wrapper.black .right:hover{border-color:transparent transparent transparent #fff}.wrapper.black .box{background-color:#4f4b4b;color:#fff}.wrapper.white{background-color:#fff}.wrapper.white .header{background-color:#39fbd6}.wrapper.white .title{color:#000}.wrapper.white .left{border-color:transparent #a09fa0 transparent transparent}.wrapper.white .left:hover{border-color:transparent #fff transparent transparent}.wrapper.white .right{border-color:transparent transparent transparent #a09fa0}.wrapper.white .right:hover{border-color:transparent transparent transparent #fff}.wrapper.white .box{background-color:#f6ffcf;color:#000}.wrapper{width:300px;box-sizing:border-box}.wrapper .header{display:flex;justify-content:space-between;padding:10px}.wrapper .header .title{font-size:20px;margin:10px}.wrapper .header .button-block{display:flex;align-items:center}.wrapper .header .button-block .header-button{padding:1em;background:0 0;border:0;color:#a09fa0;cursor:pointer}.wrapper .header .button-block .header-button .button{border-style:solid;cursor:pointer;transition:all .5s linear}.wrapper .header .button-block .header-button .button.left{border-width:7.5px 10px 7.5px 0}.wrapper .header .button-block .header-button .button.right{border-width:7.5px 0 7.5px 10px}header a.next,header a.prev{float:right}.container:after{content:\"\";clear:both;display:table}.container{padding:10px 0 10px 10px}.wrapper .box{float:left;width:60px;height:60px;margin:0 10px 10px 0;text-align:center;transition:all 1s ease;cursor:pointer}.wrapper .box.day{float:none;display:inline-block;width:30px;height:auto;padding:5px;box-sizing:border-box}.wrapper .box.day.n-month{background-color:#837d7d}.wrapper .box::before{content:'';width:0;height:100%;display:inline-block;position:relative;vertical-align:middle;background:red}.wrapper .box:active{background-color:#ff0;color:#000}.wrapper .box.year{width:60px;height:30px}.wrapper.list-mode .container{padding-right:10px}.wrapper.list-mode .box{width:100%}"]
                }] }
    ];
    /** @nocollapse */
    NgxHmCalendarMonthPopupComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [NGX_RX_MODAL_TOKEN,] }] }
    ]; };
    return NgxHmCalendarMonthPopupComponent;
}());
export { NgxHmCalendarMonthPopupComponent };
if (false) {
    /** @type {?} */
    NgxHmCalendarMonthPopupComponent.prototype.popupData;
    /** @type {?} */
    NgxHmCalendarMonthPopupComponent.prototype.mode;
    /** @type {?} */
    NgxHmCalendarMonthPopupComponent.prototype.minYear;
    /** @type {?} */
    NgxHmCalendarMonthPopupComponent.prototype.selectedYear;
    /** @type {?} */
    NgxHmCalendarMonthPopupComponent.prototype.selectedMonth;
    /** @type {?} */
    NgxHmCalendarMonthPopupComponent.prototype.selectedDate;
    /** @type {?} */
    NgxHmCalendarMonthPopupComponent.prototype.calendarData;
    /** @type {?} */
    NgxHmCalendarMonthPopupComponent.prototype.months;
    /** @type {?} */
    NgxHmCalendarMonthPopupComponent.prototype.complete;
    /** @type {?} */
    NgxHmCalendarMonthPopupComponent.prototype.data;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWhtLWNhbGVuZGFyLW1vbnRoLXBvcHVwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1obS1jYWxlbmRhci8iLCJzb3VyY2VzIjpbImxpYi9tb250aC9uZ3gtaG0tY2FsZW5kYXItbW9udGgtcG9wdXAvbmd4LWhtLWNhbGVuZGFyLW1vbnRoLXBvcHVwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDMUQsT0FBTyxFQUFpQixrQkFBa0IsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNqRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDdkMsT0FBTyxFQUF3QixvQkFBb0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBRWpHO0lBK0VFLDBDQUFnRCxJQUFJO1FBQUosU0FBSSxHQUFKLElBQUksQ0FBQTtRQWJwRCxjQUFTLEdBQXlCLEVBQUUsQ0FBQztRQUNyQyxTQUFJLEdBQUcsb0JBQW9CLENBQUMsSUFBSSxDQUFDO1FBQ2pDLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFLZixXQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBS3pDLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBRTlCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFQRCxzQkFBSSxtREFBSzs7OztRQUFUO1lBQUEsaUJBRUM7WUFEQyxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxHQUFHLEtBQUksQ0FBQyxPQUFPLEVBQWhCLENBQWdCLENBQUMsQ0FBQztRQUNoRSxDQUFDOzs7T0FBQTs7OztJQU9ELG1EQUFROzs7SUFBUixjQUFZLENBQUM7Ozs7SUFFYix3REFBYTs7O0lBQWI7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ25DLENBQUM7Ozs7SUFFRCx3REFBYTs7O0lBQWI7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ25DLENBQUM7Ozs7O0lBRUQscURBQVU7Ozs7SUFBVixVQUFXLElBQUk7UUFDYixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxHQUFHLG9CQUFvQixDQUFDLEtBQUssQ0FBQztJQUN6QyxDQUFDOzs7OztJQUVELHNEQUFXOzs7O0lBQVgsVUFBWSxLQUFLO1FBQ2YsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFFM0IsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixLQUFLLHFCQUFxQixDQUFDLEdBQUcsRUFBRTtZQUNsRSxJQUFJLENBQUMsSUFBSSxHQUFHLG9CQUFvQixDQUFDLEdBQUcsQ0FBQztZQUNyQyxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDNUU7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3hFO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxvREFBUzs7OztJQUFULFVBQVUsR0FBRztRQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7Ozs7SUFFRCw2REFBa0I7OztJQUFsQjtRQUNFLElBQUksQ0FBQyxJQUFJLEdBQUcsb0JBQW9CLENBQUMsSUFBSSxDQUFDO0lBQ3hDLENBQUM7Ozs7SUFFRCw4REFBbUI7OztJQUFuQjtRQUNFLElBQUksQ0FBQyxJQUFJLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxDQUFDO0lBQ3pDLENBQUM7O2dCQXZIRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDZCQUE2QjtvQkFDdkMsUUFBUSxFQUFFLHdvRUE0RFg7NkJBQ1Usa3pFQUFnekU7aUJBQzF6RTs7OztnREFlYyxNQUFNLFNBQUMsa0JBQWtCOztJQXlDeEMsdUNBQUM7Q0FBQSxBQXhIRCxJQXdIQztTQXZEWSxnQ0FBZ0M7OztJQUMzQyxxREFBcUM7O0lBQ3JDLGdEQUFpQzs7SUFDakMsbURBQWU7O0lBQ2Ysd0RBQXFCOztJQUNyQix5REFBc0I7O0lBQ3RCLHdEQUFtQjs7SUFDbkIsd0RBQWtCOztJQUNsQixrREFBZ0Q7O0lBS2hELG9EQUFnQzs7SUFDcEIsZ0RBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ3hSeE1vZGFsUmVmLCBOR1hfUlhfTU9EQUxfVE9LRU4gfSBmcm9tICduZ3gtcngtbW9kYWwnO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE5neEhtQ2FsZW5kYXJWaWV3TW9kZSB9IGZyb20gJy4uLy4uL25neC1obS1jYWxlbmRhci5tb2RlbCc7XHJcbmltcG9ydCB7IGdldENhbGVuZGFyIH0gZnJvbSAnLi4vdXRpbHMnO1xyXG5pbXBvcnQgeyBDYWxlbmRhclNlbGVjdG9yRGF0YSwgQ2FsZW5kYXJTZWxlY3Rvck1vZGUgfSBmcm9tICcuL25neC1obS1jYWxlbmRhci1tb250aC1wb3B1cC5tb2RlbCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25neC1obS1jYWxlbmRhci1tb250aC1wb3B1cCcsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwid3JhcHBlclwiIFtuZ0NsYXNzXT1cInBvcHVwRGF0YS50aGVtZVwiPlxyXG4gIDxoZWFkZXIgY2xhc3M9XCJoZWFkZXJcIj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIiBbbmdTd2l0Y2hdPVwibW9kZVwiPlxyXG4gICAgICA8c3BhbiAqbmdTd2l0Y2hDYXNlPVwiJ1llYXInXCI+e3sgbWluWWVhciB9fSB+IHt7IG1pblllYXIgKyAyNCB9feW5tDwvc3Bhbj5cclxuICAgICAgPHNwYW4gKm5nU3dpdGNoQ2FzZT1cIidNb250aCdcIj57eyBzZWxlY3RlZFllYXIgfX3lubQ8L3NwYW4+XHJcbiAgICAgIDxzcGFuICpuZ1N3aXRjaENhc2U9XCInRGF5J1wiPnt7IHNlbGVjdGVkWWVhciB9feW5tCB7eyBzZWxlY3RlZE1vbnRoICArIDEgfX3mnIg8L3NwYW4+XHJcbiAgICA8L2Rpdj5cclxuXHJcblxyXG4gICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwibW9kZVwiPlxyXG5cclxuICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbi1ibG9ja1wiICpuZ1N3aXRjaENhc2U9XCInWWVhcidcIj5cclxuXHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImhlYWRlci1idXR0b25cIiAoY2xpY2spPVwicHJldlllYXJSYW5nZSgpXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uIGxlZnRcIj48L2Rpdj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiaGVhZGVyLWJ1dHRvblwiIChjbGljayk9XCJuZXh0WWVhclJhbmdlKClcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJidXR0b24gcmlnaHRcIj48L2Rpdj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbi1ibG9ja1wiICpuZ1N3aXRjaENhc2U9XCInTW9udGgnXCI+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImhlYWRlci1idXR0b25cIiAoY2xpY2spPVwiYmFja1RvWWVhclNlbGVjdG9yKClcIj5cclxuICAgICAgICAgIOKWslxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJidXR0b24tYmxvY2tcIiAqbmdTd2l0Y2hDYXNlPVwiJ0RheSdcIj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiaGVhZGVyLWJ1dHRvblwiIChjbGljayk9XCJiYWNrVG9Nb250aFNlbGVjdG9yKClcIj5cclxuICAgICAgICAgIOKWslxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgPC9oZWFkZXI+XHJcbiAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwibW9kZVwiPlxyXG5cclxuICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidZZWFyJ1wiIGNsYXNzPVwiY29udGFpbmVyXCIgKHN3aXBlbGVmdCk9XCJuZXh0WWVhclJhbmdlKClcIiAoc3dpcGVyaWdodCk9XCJwcmV2WWVhclJhbmdlKClcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cImJveCB5ZWFyXCIgKm5nRm9yPVwibGV0IHllYXIgb2YgeWVhcnM7IGxldCBpID0gaW5kZXg7XCIgKGNsaWNrKT1cInNlbGVjdFllYXIoeWVhcilcIj57eyB5ZWFyIH19PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInTW9udGgnXCIgY2xhc3M9XCJjb250YWluZXJcIiAoc3dpcGV1cCk9XCJiYWNrVG9ZZWFyU2VsZWN0b3IoKVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYm94XCIgKm5nRm9yPVwibGV0IG1vbnRoIG9mIG1vbnRoczsgbGV0IGkgPSBpbmRleDtcIiAoY2xpY2spPVwic2VsZWN0TW9udGgobW9udGgpXCI+e3sgbW9udGggKyAxIH19PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInRGF5J1wiIGNsYXNzPVwiY29udGFpbmVyXCIgKHN3aXBldXApPVwiYmFja1RvTW9udGhTZWxlY3RvcigpXCI+XHJcbiAgICAgIDxkaXYgKm5nRm9yPVwibGV0IHdlZWsgb2YgY2FsZW5kYXJEYXRhOyBsZXQgaSA9IGluZGV4O1wiPlxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGRheSBvZiB3ZWVrLmRheXM7IGxldCBkYXlfaW5kZXggPSBpbmRleDtcIiA+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm94IGRheVwiIFtjbGFzcy5uLW1vbnRoXT1cImRheS5vdGhlclwiIChjbGljayk9XCJzZWxlY3REYXkoZGF5LmRhdGUpXCI+e3sgZGF5Lm51bWJlciB9fTwvZGl2PlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICA8L25nLWNvbnRhaW5lcj5cclxuXHJcblxyXG48L2Rpdj5cclxuYCxcclxuICBzdHlsZXM6IFtgLndyYXBwZXIuYmxhY2t7YmFja2dyb3VuZC1jb2xvcjojNWU1YjVifS53cmFwcGVyLmJsYWNrIC5oZWFkZXJ7YmFja2dyb3VuZC1jb2xvcjojMDA3YmZmfS53cmFwcGVyLmJsYWNrIC50aXRsZXtjb2xvcjojZmZmfS53cmFwcGVyLmJsYWNrIC5sZWZ0e2JvcmRlci1jb2xvcjp0cmFuc3BhcmVudCAjYTA5ZmEwIHRyYW5zcGFyZW50IHRyYW5zcGFyZW50fS53cmFwcGVyLmJsYWNrIC5sZWZ0OmhvdmVye2JvcmRlci1jb2xvcjp0cmFuc3BhcmVudCAjZmZmIHRyYW5zcGFyZW50IHRyYW5zcGFyZW50fS53cmFwcGVyLmJsYWNrIC5yaWdodHtib3JkZXItY29sb3I6dHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgI2EwOWZhMH0ud3JhcHBlci5ibGFjayAucmlnaHQ6aG92ZXJ7Ym9yZGVyLWNvbG9yOnRyYW5zcGFyZW50IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50ICNmZmZ9LndyYXBwZXIuYmxhY2sgLmJveHtiYWNrZ3JvdW5kLWNvbG9yOiM0ZjRiNGI7Y29sb3I6I2ZmZn0ud3JhcHBlci53aGl0ZXtiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9LndyYXBwZXIud2hpdGUgLmhlYWRlcntiYWNrZ3JvdW5kLWNvbG9yOiMzOWZiZDZ9LndyYXBwZXIud2hpdGUgLnRpdGxle2NvbG9yOiMwMDB9LndyYXBwZXIud2hpdGUgLmxlZnR7Ym9yZGVyLWNvbG9yOnRyYW5zcGFyZW50ICNhMDlmYTAgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnR9LndyYXBwZXIud2hpdGUgLmxlZnQ6aG92ZXJ7Ym9yZGVyLWNvbG9yOnRyYW5zcGFyZW50ICNmZmYgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnR9LndyYXBwZXIud2hpdGUgLnJpZ2h0e2JvcmRlci1jb2xvcjp0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCAjYTA5ZmEwfS53cmFwcGVyLndoaXRlIC5yaWdodDpob3Zlcntib3JkZXItY29sb3I6dHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgI2ZmZn0ud3JhcHBlci53aGl0ZSAuYm94e2JhY2tncm91bmQtY29sb3I6I2Y2ZmZjZjtjb2xvcjojMDAwfS53cmFwcGVye3dpZHRoOjMwMHB4O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ud3JhcHBlciAuaGVhZGVye2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjtwYWRkaW5nOjEwcHh9LndyYXBwZXIgLmhlYWRlciAudGl0bGV7Zm9udC1zaXplOjIwcHg7bWFyZ2luOjEwcHh9LndyYXBwZXIgLmhlYWRlciAuYnV0dG9uLWJsb2Nre2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXJ9LndyYXBwZXIgLmhlYWRlciAuYnV0dG9uLWJsb2NrIC5oZWFkZXItYnV0dG9ue3BhZGRpbmc6MWVtO2JhY2tncm91bmQ6MCAwO2JvcmRlcjowO2NvbG9yOiNhMDlmYTA7Y3Vyc29yOnBvaW50ZXJ9LndyYXBwZXIgLmhlYWRlciAuYnV0dG9uLWJsb2NrIC5oZWFkZXItYnV0dG9uIC5idXR0b257Ym9yZGVyLXN0eWxlOnNvbGlkO2N1cnNvcjpwb2ludGVyO3RyYW5zaXRpb246YWxsIC41cyBsaW5lYXJ9LndyYXBwZXIgLmhlYWRlciAuYnV0dG9uLWJsb2NrIC5oZWFkZXItYnV0dG9uIC5idXR0b24ubGVmdHtib3JkZXItd2lkdGg6Ny41cHggMTBweCA3LjVweCAwfS53cmFwcGVyIC5oZWFkZXIgLmJ1dHRvbi1ibG9jayAuaGVhZGVyLWJ1dHRvbiAuYnV0dG9uLnJpZ2h0e2JvcmRlci13aWR0aDo3LjVweCAwIDcuNXB4IDEwcHh9aGVhZGVyIGEubmV4dCxoZWFkZXIgYS5wcmV2e2Zsb2F0OnJpZ2h0fS5jb250YWluZXI6YWZ0ZXJ7Y29udGVudDpcIlwiO2NsZWFyOmJvdGg7ZGlzcGxheTp0YWJsZX0uY29udGFpbmVye3BhZGRpbmc6MTBweCAwIDEwcHggMTBweH0ud3JhcHBlciAuYm94e2Zsb2F0OmxlZnQ7d2lkdGg6NjBweDtoZWlnaHQ6NjBweDttYXJnaW46MCAxMHB4IDEwcHggMDt0ZXh0LWFsaWduOmNlbnRlcjt0cmFuc2l0aW9uOmFsbCAxcyBlYXNlO2N1cnNvcjpwb2ludGVyfS53cmFwcGVyIC5ib3guZGF5e2Zsb2F0Om5vbmU7ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6MzBweDtoZWlnaHQ6YXV0bztwYWRkaW5nOjVweDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LndyYXBwZXIgLmJveC5kYXkubi1tb250aHtiYWNrZ3JvdW5kLWNvbG9yOiM4MzdkN2R9LndyYXBwZXIgLmJveDo6YmVmb3Jle2NvbnRlbnQ6Jyc7d2lkdGg6MDtoZWlnaHQ6MTAwJTtkaXNwbGF5OmlubGluZS1ibG9jaztwb3NpdGlvbjpyZWxhdGl2ZTt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7YmFja2dyb3VuZDpyZWR9LndyYXBwZXIgLmJveDphY3RpdmV7YmFja2dyb3VuZC1jb2xvcjojZmYwO2NvbG9yOiMwMDB9LndyYXBwZXIgLmJveC55ZWFye3dpZHRoOjYwcHg7aGVpZ2h0OjMwcHh9LndyYXBwZXIubGlzdC1tb2RlIC5jb250YWluZXJ7cGFkZGluZy1yaWdodDoxMHB4fS53cmFwcGVyLmxpc3QtbW9kZSAuYm94e3dpZHRoOjEwMCV9YF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hIbUNhbGVuZGFyTW9udGhQb3B1cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgTmd4UnhNb2RhbFJlZiB7XHJcbiAgcG9wdXBEYXRhOiBDYWxlbmRhclNlbGVjdG9yRGF0YSA9IHt9O1xyXG4gIG1vZGUgPSBDYWxlbmRhclNlbGVjdG9yTW9kZS5ZZWFyO1xyXG4gIG1pblllYXIgPSAyMDE2O1xyXG4gIHNlbGVjdGVkWWVhcjogbnVtYmVyO1xyXG4gIHNlbGVjdGVkTW9udGg6IG51bWJlcjtcclxuICBzZWxlY3RlZERhdGU6IERhdGU7XHJcbiAgY2FsZW5kYXJEYXRhOiBhbnk7XHJcbiAgbW9udGhzID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMV07XHJcbiAgZ2V0IHllYXJzKCkge1xyXG4gICAgcmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IDI0IH0sICh2LCBrKSA9PiBrICsgdGhpcy5taW5ZZWFyKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjb21wbGV0ZSA9IG5ldyBTdWJqZWN0KCk7XHJcbiAgY29uc3RydWN0b3IoQEluamVjdChOR1hfUlhfTU9EQUxfVE9LRU4pIHByaXZhdGUgZGF0YSkge1xyXG4gICAgdGhpcy5wb3B1cERhdGEgPSBkYXRhO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7fVxyXG5cclxuICBwcmV2WWVhclJhbmdlKCkge1xyXG4gICAgdGhpcy5taW5ZZWFyID0gdGhpcy5taW5ZZWFyIC0gMjQ7XHJcbiAgfVxyXG5cclxuICBuZXh0WWVhclJhbmdlKCkge1xyXG4gICAgdGhpcy5taW5ZZWFyID0gdGhpcy5taW5ZZWFyICsgMjQ7XHJcbiAgfVxyXG5cclxuICBzZWxlY3RZZWFyKHllYXIpIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRZZWFyID0geWVhcjtcclxuICAgIHRoaXMubW9kZSA9IENhbGVuZGFyU2VsZWN0b3JNb2RlLk1vbnRoO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0TW9udGgobW9udGgpIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRNb250aCA9IG1vbnRoO1xyXG5cclxuICAgIGlmICh0aGlzLnBvcHVwRGF0YS5jb250YWluZXJWaWV3TW9kZSA9PT0gTmd4SG1DYWxlbmRhclZpZXdNb2RlLmRheSkge1xyXG4gICAgICB0aGlzLm1vZGUgPSBDYWxlbmRhclNlbGVjdG9yTW9kZS5EYXk7XHJcbiAgICAgIHRoaXMuY2FsZW5kYXJEYXRhID0gZ2V0Q2FsZW5kYXIodGhpcy5zZWxlY3RlZFllYXIsIHRoaXMuc2VsZWN0ZWRNb250aCwgW10pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jb21wbGV0ZS5uZXh0KG5ldyBEYXRlKHRoaXMuc2VsZWN0ZWRZZWFyLCB0aGlzLnNlbGVjdGVkTW9udGgsIDEpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNlbGVjdERheShkYXkpIHtcclxuICAgIHRoaXMuY29tcGxldGUubmV4dChkYXkpO1xyXG4gIH1cclxuXHJcbiAgYmFja1RvWWVhclNlbGVjdG9yKCkge1xyXG4gICAgdGhpcy5tb2RlID0gQ2FsZW5kYXJTZWxlY3Rvck1vZGUuWWVhcjtcclxuICB9XHJcblxyXG4gIGJhY2tUb01vbnRoU2VsZWN0b3IoKSB7XHJcbiAgICB0aGlzLm1vZGUgPSBDYWxlbmRhclNlbGVjdG9yTW9kZS5Nb250aDtcclxuICB9XHJcbn1cclxuIl19