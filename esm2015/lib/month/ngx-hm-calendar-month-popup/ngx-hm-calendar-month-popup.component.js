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
export class NgxHmCalendarMonthPopupComponent {
    /**
     * @param {?} data
     */
    constructor(data) {
        this.data = data;
        this.popupData = {};
        this.mode = CalendarSelectorMode.Year;
        this.minYear = 2016;
        this.months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        this.complete = new Subject();
        this.popupData = data;
    }
    /**
     * @return {?}
     */
    get years() {
        return Array.from({ length: 24 }, (v, k) => k + this.minYear);
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * @return {?}
     */
    prevYearRange() {
        this.minYear = this.minYear - 24;
    }
    /**
     * @return {?}
     */
    nextYearRange() {
        this.minYear = this.minYear + 24;
    }
    /**
     * @param {?} year
     * @return {?}
     */
    selectYear(year) {
        this.selectedYear = year;
        this.mode = CalendarSelectorMode.Month;
    }
    /**
     * @param {?} month
     * @return {?}
     */
    selectMonth(month) {
        this.selectedMonth = month;
        if (this.popupData.containerViewMode === NgxHmCalendarViewMode.day) {
            this.mode = CalendarSelectorMode.Day;
            this.calendarData = getCalendar(this.selectedYear, this.selectedMonth, []);
        }
        else {
            this.complete.next(new Date(this.selectedYear, this.selectedMonth, 1));
        }
    }
    /**
     * @param {?} day
     * @return {?}
     */
    selectDay(day) {
        this.complete.next(day);
    }
    /**
     * @return {?}
     */
    backToYearSelector() {
        this.mode = CalendarSelectorMode.Year;
    }
    /**
     * @return {?}
     */
    backToMonthSelector() {
        this.mode = CalendarSelectorMode.Month;
    }
}
NgxHmCalendarMonthPopupComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-hm-calendar-month-popup',
                template: `<div class="wrapper" [ngClass]="popupData.theme">
  <header class="header">

    <div class="title" [ngSwitch]="mode">
      <span *ngSwitchCase="'Year'">{{ minYear }} ~ {{ minYear + 24 }}年</span>
      <span *ngSwitchCase="'Month'">{{ selectedYear }}年</span>
      <span *ngSwitchCase="'Day'">{{ selectedYear }}年 {{ selectedMonth  + 1 }}月</span>
    </div>


    <ng-container [ngSwitch]="mode">

      <div class="button-block" *ngSwitchCase="'Year'">

        <button class="header-button" (click)="prevYearRange()">
          <div class="button left"></div>
        </button>
        <button class="header-button" (click)="nextYearRange()">
          <div class="button right"></div>
        </button>

      </div>

      <div class="button-block" *ngSwitchCase="'Month'">
        <button class="header-button" (click)="backToYearSelector()">
          ▲
        </button>
      </div>

      <div class="button-block" *ngSwitchCase="'Day'">
        <button class="header-button" (click)="backToMonthSelector()">
          ▲
        </button>
      </div>

    </ng-container>

  </header>
  <ng-container [ngSwitch]="mode">

    <div *ngSwitchCase="'Year'" class="container" (swipeleft)="nextYearRange()" (swiperight)="prevYearRange()">
      <div class="box year" *ngFor="let year of years; let i = index;" (click)="selectYear(year)">{{ year }}</div>
    </div>

    <div *ngSwitchCase="'Month'" class="container" (swipeup)="backToYearSelector()">
      <div class="box" *ngFor="let month of months; let i = index;" (click)="selectMonth(month)">{{ month + 1 }}</div>
    </div>

    <div *ngSwitchCase="'Day'" class="container" (swipeup)="backToMonthSelector()">
      <div *ngFor="let week of calendarData; let i = index;">
        <ng-container *ngFor="let day of week.days; let day_index = index;" >
          <div class="box day" [class.n-month]="day.other" (click)="selectDay(day.date)">{{ day.number }}</div>
        </ng-container>
      </div>
    </div>

  </ng-container>


</div>
`,
                styles: [`.wrapper.black{background-color:#5e5b5b}.wrapper.black .header{background-color:#007bff}.wrapper.black .title{color:#fff}.wrapper.black .left{border-color:transparent #a09fa0 transparent transparent}.wrapper.black .left:hover{border-color:transparent #fff transparent transparent}.wrapper.black .right{border-color:transparent transparent transparent #a09fa0}.wrapper.black .right:hover{border-color:transparent transparent transparent #fff}.wrapper.black .box{background-color:#4f4b4b;color:#fff}.wrapper.white{background-color:#fff}.wrapper.white .header{background-color:#39fbd6}.wrapper.white .title{color:#000}.wrapper.white .left{border-color:transparent #a09fa0 transparent transparent}.wrapper.white .left:hover{border-color:transparent #fff transparent transparent}.wrapper.white .right{border-color:transparent transparent transparent #a09fa0}.wrapper.white .right:hover{border-color:transparent transparent transparent #fff}.wrapper.white .box{background-color:#f6ffcf;color:#000}.wrapper{width:300px;box-sizing:border-box}.wrapper .header{display:flex;justify-content:space-between;padding:10px}.wrapper .header .title{font-size:20px;margin:10px}.wrapper .header .button-block{display:flex;align-items:center}.wrapper .header .button-block .header-button{padding:1em;background:0 0;border:0;color:#a09fa0;cursor:pointer}.wrapper .header .button-block .header-button .button{border-style:solid;cursor:pointer;transition:all .5s linear}.wrapper .header .button-block .header-button .button.left{border-width:7.5px 10px 7.5px 0}.wrapper .header .button-block .header-button .button.right{border-width:7.5px 0 7.5px 10px}header a.next,header a.prev{float:right}.container:after{content:"";clear:both;display:table}.container{padding:10px 0 10px 10px}.wrapper .box{float:left;width:60px;height:60px;margin:0 10px 10px 0;text-align:center;transition:all 1s ease;cursor:pointer}.wrapper .box.day{float:none;display:inline-block;width:30px;height:auto;padding:5px;box-sizing:border-box}.wrapper .box.day.n-month{background-color:#837d7d}.wrapper .box::before{content:'';width:0;height:100%;display:inline-block;position:relative;vertical-align:middle;background:red}.wrapper .box:active{background-color:#ff0;color:#000}.wrapper .box.year{width:60px;height:30px}.wrapper.list-mode .container{padding-right:10px}.wrapper.list-mode .box{width:100%}`]
            }] }
];
/** @nocollapse */
NgxHmCalendarMonthPopupComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [NGX_RX_MODAL_TOKEN,] }] }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWhtLWNhbGVuZGFyLW1vbnRoLXBvcHVwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1obS1jYWxlbmRhci8iLCJzb3VyY2VzIjpbImxpYi9tb250aC9uZ3gtaG0tY2FsZW5kYXItbW9udGgtcG9wdXAvbmd4LWhtLWNhbGVuZGFyLW1vbnRoLXBvcHVwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDMUQsT0FBTyxFQUFpQixrQkFBa0IsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNqRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDdkMsT0FBTyxFQUF3QixvQkFBb0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBbUVqRyxNQUFNLE9BQU8sZ0NBQWdDOzs7O0lBYzNDLFlBQWdELElBQUk7UUFBSixTQUFJLEdBQUosSUFBSSxDQUFBO1FBYnBELGNBQVMsR0FBeUIsRUFBRSxDQUFDO1FBQ3JDLFNBQUksR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLENBQUM7UUFDakMsWUFBTyxHQUFHLElBQUksQ0FBQztRQUtmLFdBQU0sR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFLekMsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFFOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDeEIsQ0FBQzs7OztJQVBELElBQUksS0FBSztRQUNQLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEUsQ0FBQzs7OztJQU9ELFFBQVEsS0FBSSxDQUFDOzs7O0lBRWIsYUFBYTtRQUNYLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7OztJQUVELGFBQWE7UUFDWCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ25DLENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLElBQUk7UUFDYixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxHQUFHLG9CQUFvQixDQUFDLEtBQUssQ0FBQztJQUN6QyxDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxLQUFLO1FBQ2YsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFFM0IsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixLQUFLLHFCQUFxQixDQUFDLEdBQUcsRUFBRTtZQUNsRSxJQUFJLENBQUMsSUFBSSxHQUFHLG9CQUFvQixDQUFDLEdBQUcsQ0FBQztZQUNyQyxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDNUU7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3hFO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxTQUFTLENBQUMsR0FBRztRQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7Ozs7SUFFRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLENBQUM7SUFDeEMsQ0FBQzs7OztJQUVELG1CQUFtQjtRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLG9CQUFvQixDQUFDLEtBQUssQ0FBQztJQUN6QyxDQUFDOzs7WUF2SEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw2QkFBNkI7Z0JBQ3ZDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBNERYO3lCQUNVLGd6RUFBZ3pFO2FBQzF6RTs7Ozs0Q0FlYyxNQUFNLFNBQUMsa0JBQWtCOzs7O0lBYnRDLHFEQUFxQzs7SUFDckMsZ0RBQWlDOztJQUNqQyxtREFBZTs7SUFDZix3REFBcUI7O0lBQ3JCLHlEQUFzQjs7SUFDdEIsd0RBQW1COztJQUNuQix3REFBa0I7O0lBQ2xCLGtEQUFnRDs7SUFLaEQsb0RBQWdDOztJQUNwQixnREFBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEluamVjdCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5neFJ4TW9kYWxSZWYsIE5HWF9SWF9NT0RBTF9UT0tFTiB9IGZyb20gJ25neC1yeC1tb2RhbCc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTmd4SG1DYWxlbmRhclZpZXdNb2RlIH0gZnJvbSAnLi4vLi4vbmd4LWhtLWNhbGVuZGFyLm1vZGVsJztcclxuaW1wb3J0IHsgZ2V0Q2FsZW5kYXIgfSBmcm9tICcuLi91dGlscyc7XHJcbmltcG9ydCB7IENhbGVuZGFyU2VsZWN0b3JEYXRhLCBDYWxlbmRhclNlbGVjdG9yTW9kZSB9IGZyb20gJy4vbmd4LWhtLWNhbGVuZGFyLW1vbnRoLXBvcHVwLm1vZGVsJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd4LWhtLWNhbGVuZGFyLW1vbnRoLXBvcHVwJyxcclxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ3cmFwcGVyXCIgW25nQ2xhc3NdPVwicG9wdXBEYXRhLnRoZW1lXCI+XHJcbiAgPGhlYWRlciBjbGFzcz1cImhlYWRlclwiPlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiIFtuZ1N3aXRjaF09XCJtb2RlXCI+XHJcbiAgICAgIDxzcGFuICpuZ1N3aXRjaENhc2U9XCInWWVhcidcIj57eyBtaW5ZZWFyIH19IH4ge3sgbWluWWVhciArIDI0IH195bm0PC9zcGFuPlxyXG4gICAgICA8c3BhbiAqbmdTd2l0Y2hDYXNlPVwiJ01vbnRoJ1wiPnt7IHNlbGVjdGVkWWVhciB9feW5tDwvc3Bhbj5cclxuICAgICAgPHNwYW4gKm5nU3dpdGNoQ2FzZT1cIidEYXknXCI+e3sgc2VsZWN0ZWRZZWFyIH195bm0IHt7IHNlbGVjdGVkTW9udGggICsgMSB9feaciDwvc3Bhbj5cclxuICAgIDwvZGl2PlxyXG5cclxuXHJcbiAgICA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJtb2RlXCI+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uLWJsb2NrXCIgKm5nU3dpdGNoQ2FzZT1cIidZZWFyJ1wiPlxyXG5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiaGVhZGVyLWJ1dHRvblwiIChjbGljayk9XCJwcmV2WWVhclJhbmdlKClcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJidXR0b24gbGVmdFwiPjwvZGl2PlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJoZWFkZXItYnV0dG9uXCIgKGNsaWNrKT1cIm5leHRZZWFyUmFuZ2UoKVwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbiByaWdodFwiPjwvZGl2PlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uLWJsb2NrXCIgKm5nU3dpdGNoQ2FzZT1cIidNb250aCdcIj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiaGVhZGVyLWJ1dHRvblwiIChjbGljayk9XCJiYWNrVG9ZZWFyU2VsZWN0b3IoKVwiPlxyXG4gICAgICAgICAg4payXHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbi1ibG9ja1wiICpuZ1N3aXRjaENhc2U9XCInRGF5J1wiPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJoZWFkZXItYnV0dG9uXCIgKGNsaWNrKT1cImJhY2tUb01vbnRoU2VsZWN0b3IoKVwiPlxyXG4gICAgICAgICAg4payXHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG5cclxuICA8L2hlYWRlcj5cclxuICA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJtb2RlXCI+XHJcblxyXG4gICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ1llYXInXCIgY2xhc3M9XCJjb250YWluZXJcIiAoc3dpcGVsZWZ0KT1cIm5leHRZZWFyUmFuZ2UoKVwiIChzd2lwZXJpZ2h0KT1cInByZXZZZWFyUmFuZ2UoKVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYm94IHllYXJcIiAqbmdGb3I9XCJsZXQgeWVhciBvZiB5ZWFyczsgbGV0IGkgPSBpbmRleDtcIiAoY2xpY2spPVwic2VsZWN0WWVhcih5ZWFyKVwiPnt7IHllYXIgfX08L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidNb250aCdcIiBjbGFzcz1cImNvbnRhaW5lclwiIChzd2lwZXVwKT1cImJhY2tUb1llYXJTZWxlY3RvcigpXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJib3hcIiAqbmdGb3I9XCJsZXQgbW9udGggb2YgbW9udGhzOyBsZXQgaSA9IGluZGV4O1wiIChjbGljayk9XCJzZWxlY3RNb250aChtb250aClcIj57eyBtb250aCArIDEgfX08L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidEYXknXCIgY2xhc3M9XCJjb250YWluZXJcIiAoc3dpcGV1cCk9XCJiYWNrVG9Nb250aFNlbGVjdG9yKClcIj5cclxuICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgd2VlayBvZiBjYWxlbmRhckRhdGE7IGxldCBpID0gaW5kZXg7XCI+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZGF5IG9mIHdlZWsuZGF5czsgbGV0IGRheV9pbmRleCA9IGluZGV4O1wiID5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJib3ggZGF5XCIgW2NsYXNzLm4tbW9udGhdPVwiZGF5Lm90aGVyXCIgKGNsaWNrKT1cInNlbGVjdERheShkYXkuZGF0ZSlcIj57eyBkYXkubnVtYmVyIH19PC9kaXY+XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gIDwvbmctY29udGFpbmVyPlxyXG5cclxuXHJcbjwvZGl2PlxyXG5gLFxyXG4gIHN0eWxlczogW2Aud3JhcHBlci5ibGFja3tiYWNrZ3JvdW5kLWNvbG9yOiM1ZTViNWJ9LndyYXBwZXIuYmxhY2sgLmhlYWRlcntiYWNrZ3JvdW5kLWNvbG9yOiMwMDdiZmZ9LndyYXBwZXIuYmxhY2sgLnRpdGxle2NvbG9yOiNmZmZ9LndyYXBwZXIuYmxhY2sgLmxlZnR7Ym9yZGVyLWNvbG9yOnRyYW5zcGFyZW50ICNhMDlmYTAgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnR9LndyYXBwZXIuYmxhY2sgLmxlZnQ6aG92ZXJ7Ym9yZGVyLWNvbG9yOnRyYW5zcGFyZW50ICNmZmYgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnR9LndyYXBwZXIuYmxhY2sgLnJpZ2h0e2JvcmRlci1jb2xvcjp0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCAjYTA5ZmEwfS53cmFwcGVyLmJsYWNrIC5yaWdodDpob3Zlcntib3JkZXItY29sb3I6dHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgI2ZmZn0ud3JhcHBlci5ibGFjayAuYm94e2JhY2tncm91bmQtY29sb3I6IzRmNGI0Yjtjb2xvcjojZmZmfS53cmFwcGVyLndoaXRle2JhY2tncm91bmQtY29sb3I6I2ZmZn0ud3JhcHBlci53aGl0ZSAuaGVhZGVye2JhY2tncm91bmQtY29sb3I6IzM5ZmJkNn0ud3JhcHBlci53aGl0ZSAudGl0bGV7Y29sb3I6IzAwMH0ud3JhcHBlci53aGl0ZSAubGVmdHtib3JkZXItY29sb3I6dHJhbnNwYXJlbnQgI2EwOWZhMCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudH0ud3JhcHBlci53aGl0ZSAubGVmdDpob3Zlcntib3JkZXItY29sb3I6dHJhbnNwYXJlbnQgI2ZmZiB0cmFuc3BhcmVudCB0cmFuc3BhcmVudH0ud3JhcHBlci53aGl0ZSAucmlnaHR7Ym9yZGVyLWNvbG9yOnRyYW5zcGFyZW50IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50ICNhMDlmYTB9LndyYXBwZXIud2hpdGUgLnJpZ2h0OmhvdmVye2JvcmRlci1jb2xvcjp0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCAjZmZmfS53cmFwcGVyLndoaXRlIC5ib3h7YmFja2dyb3VuZC1jb2xvcjojZjZmZmNmO2NvbG9yOiMwMDB9LndyYXBwZXJ7d2lkdGg6MzAwcHg7Ym94LXNpemluZzpib3JkZXItYm94fS53cmFwcGVyIC5oZWFkZXJ7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO3BhZGRpbmc6MTBweH0ud3JhcHBlciAuaGVhZGVyIC50aXRsZXtmb250LXNpemU6MjBweDttYXJnaW46MTBweH0ud3JhcHBlciAuaGVhZGVyIC5idXR0b24tYmxvY2t7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcn0ud3JhcHBlciAuaGVhZGVyIC5idXR0b24tYmxvY2sgLmhlYWRlci1idXR0b257cGFkZGluZzoxZW07YmFja2dyb3VuZDowIDA7Ym9yZGVyOjA7Y29sb3I6I2EwOWZhMDtjdXJzb3I6cG9pbnRlcn0ud3JhcHBlciAuaGVhZGVyIC5idXR0b24tYmxvY2sgLmhlYWRlci1idXR0b24gLmJ1dHRvbntib3JkZXItc3R5bGU6c29saWQ7Y3Vyc29yOnBvaW50ZXI7dHJhbnNpdGlvbjphbGwgLjVzIGxpbmVhcn0ud3JhcHBlciAuaGVhZGVyIC5idXR0b24tYmxvY2sgLmhlYWRlci1idXR0b24gLmJ1dHRvbi5sZWZ0e2JvcmRlci13aWR0aDo3LjVweCAxMHB4IDcuNXB4IDB9LndyYXBwZXIgLmhlYWRlciAuYnV0dG9uLWJsb2NrIC5oZWFkZXItYnV0dG9uIC5idXR0b24ucmlnaHR7Ym9yZGVyLXdpZHRoOjcuNXB4IDAgNy41cHggMTBweH1oZWFkZXIgYS5uZXh0LGhlYWRlciBhLnByZXZ7ZmxvYXQ6cmlnaHR9LmNvbnRhaW5lcjphZnRlcntjb250ZW50OlwiXCI7Y2xlYXI6Ym90aDtkaXNwbGF5OnRhYmxlfS5jb250YWluZXJ7cGFkZGluZzoxMHB4IDAgMTBweCAxMHB4fS53cmFwcGVyIC5ib3h7ZmxvYXQ6bGVmdDt3aWR0aDo2MHB4O2hlaWdodDo2MHB4O21hcmdpbjowIDEwcHggMTBweCAwO3RleHQtYWxpZ246Y2VudGVyO3RyYW5zaXRpb246YWxsIDFzIGVhc2U7Y3Vyc29yOnBvaW50ZXJ9LndyYXBwZXIgLmJveC5kYXl7ZmxvYXQ6bm9uZTtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDozMHB4O2hlaWdodDphdXRvO3BhZGRpbmc6NXB4O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ud3JhcHBlciAuYm94LmRheS5uLW1vbnRoe2JhY2tncm91bmQtY29sb3I6IzgzN2Q3ZH0ud3JhcHBlciAuYm94OjpiZWZvcmV7Y29udGVudDonJzt3aWR0aDowO2hlaWdodDoxMDAlO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3Bvc2l0aW9uOnJlbGF0aXZlO3ZlcnRpY2FsLWFsaWduOm1pZGRsZTtiYWNrZ3JvdW5kOnJlZH0ud3JhcHBlciAuYm94OmFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOiNmZjA7Y29sb3I6IzAwMH0ud3JhcHBlciAuYm94LnllYXJ7d2lkdGg6NjBweDtoZWlnaHQ6MzBweH0ud3JhcHBlci5saXN0LW1vZGUgLmNvbnRhaW5lcntwYWRkaW5nLXJpZ2h0OjEwcHh9LndyYXBwZXIubGlzdC1tb2RlIC5ib3h7d2lkdGg6MTAwJX1gXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5neEhtQ2FsZW5kYXJNb250aFBvcHVwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBOZ3hSeE1vZGFsUmVmIHtcclxuICBwb3B1cERhdGE6IENhbGVuZGFyU2VsZWN0b3JEYXRhID0ge307XHJcbiAgbW9kZSA9IENhbGVuZGFyU2VsZWN0b3JNb2RlLlllYXI7XHJcbiAgbWluWWVhciA9IDIwMTY7XHJcbiAgc2VsZWN0ZWRZZWFyOiBudW1iZXI7XHJcbiAgc2VsZWN0ZWRNb250aDogbnVtYmVyO1xyXG4gIHNlbGVjdGVkRGF0ZTogRGF0ZTtcclxuICBjYWxlbmRhckRhdGE6IGFueTtcclxuICBtb250aHMgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExXTtcclxuICBnZXQgeWVhcnMoKSB7XHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogMjQgfSwgKHYsIGspID0+IGsgKyB0aGlzLm1pblllYXIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNvbXBsZXRlID0gbmV3IFN1YmplY3QoKTtcclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KE5HWF9SWF9NT0RBTF9UT0tFTikgcHJpdmF0ZSBkYXRhKSB7XHJcbiAgICB0aGlzLnBvcHVwRGF0YSA9IGRhdGE7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHt9XHJcblxyXG4gIHByZXZZZWFyUmFuZ2UoKSB7XHJcbiAgICB0aGlzLm1pblllYXIgPSB0aGlzLm1pblllYXIgLSAyNDtcclxuICB9XHJcblxyXG4gIG5leHRZZWFyUmFuZ2UoKSB7XHJcbiAgICB0aGlzLm1pblllYXIgPSB0aGlzLm1pblllYXIgKyAyNDtcclxuICB9XHJcblxyXG4gIHNlbGVjdFllYXIoeWVhcikge1xyXG4gICAgdGhpcy5zZWxlY3RlZFllYXIgPSB5ZWFyO1xyXG4gICAgdGhpcy5tb2RlID0gQ2FsZW5kYXJTZWxlY3Rvck1vZGUuTW9udGg7XHJcbiAgfVxyXG5cclxuICBzZWxlY3RNb250aChtb250aCkge1xyXG4gICAgdGhpcy5zZWxlY3RlZE1vbnRoID0gbW9udGg7XHJcblxyXG4gICAgaWYgKHRoaXMucG9wdXBEYXRhLmNvbnRhaW5lclZpZXdNb2RlID09PSBOZ3hIbUNhbGVuZGFyVmlld01vZGUuZGF5KSB7XHJcbiAgICAgIHRoaXMubW9kZSA9IENhbGVuZGFyU2VsZWN0b3JNb2RlLkRheTtcclxuICAgICAgdGhpcy5jYWxlbmRhckRhdGEgPSBnZXRDYWxlbmRhcih0aGlzLnNlbGVjdGVkWWVhciwgdGhpcy5zZWxlY3RlZE1vbnRoLCBbXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNvbXBsZXRlLm5leHQobmV3IERhdGUodGhpcy5zZWxlY3RlZFllYXIsIHRoaXMuc2VsZWN0ZWRNb250aCwgMSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2VsZWN0RGF5KGRheSkge1xyXG4gICAgdGhpcy5jb21wbGV0ZS5uZXh0KGRheSk7XHJcbiAgfVxyXG5cclxuICBiYWNrVG9ZZWFyU2VsZWN0b3IoKSB7XHJcbiAgICB0aGlzLm1vZGUgPSBDYWxlbmRhclNlbGVjdG9yTW9kZS5ZZWFyO1xyXG4gIH1cclxuXHJcbiAgYmFja1RvTW9udGhTZWxlY3RvcigpIHtcclxuICAgIHRoaXMubW9kZSA9IENhbGVuZGFyU2VsZWN0b3JNb2RlLk1vbnRoO1xyXG4gIH1cclxufVxyXG4iXX0=