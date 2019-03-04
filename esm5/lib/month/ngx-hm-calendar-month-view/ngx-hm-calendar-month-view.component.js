/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { getCalendar } from '../utils';
var NgxHmCalendarMonthViewComponent = /** @class */ (function () {
    function NgxHmCalendarMonthViewComponent() {
        this.className = 'black';
        this.weekNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        this.yearName = '年';
        this.monthName = '月';
        this.weeklyEvents = [];
        this.events = [];
        this.nstr = new Date();
        this.open = new EventEmitter();
        this.calendarData = getCalendar(this.ynow, this.mnow, this.events, this.weeklyEvents);
        this.eachPresent = 100 / 14;
    }
    Object.defineProperty(NgxHmCalendarMonthViewComponent.prototype, "ynow", {
        get: /**
         * @return {?}
         */
        function () {
            return this.nstr.getFullYear();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxHmCalendarMonthViewComponent.prototype, "mnow", {
        get: /**
         * @return {?}
         */
        function () {
            return this.nstr.getMonth();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxHmCalendarMonthViewComponent.prototype, "dnow", {
        get: /**
         * @return {?}
         */
        function () {
            return this.nstr.getDate();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgxHmCalendarMonthViewComponent.prototype.prev = /**
     * @return {?}
     */
    function () {
        this.nstr.setMonth(this.nstr.getMonth() - 1);
        this.calendarData = getCalendar(this.ynow, this.mnow, this.events, this.weeklyEvents);
    };
    /**
     * @return {?}
     */
    NgxHmCalendarMonthViewComponent.prototype.next = /**
     * @return {?}
     */
    function () {
        this.nstr.setMonth(this.nstr.getMonth() + 1);
        this.calendarData = getCalendar(this.ynow, this.mnow, this.events, this.weeklyEvents);
    };
    /**
     * @param {?} week
     * @param {?} day
     * @return {?}
     */
    NgxHmCalendarMonthViewComponent.prototype.showEventList = /**
     * @param {?} week
     * @param {?} day
     * @return {?}
     */
    function (week, day) {
        if (day.events.length) {
            if (week.selectedDay && week.selectedDay === day) {
                week.selectedDay = undefined;
            }
            else {
                this.calendarData.forEach(function (w) {
                    w.selectedDay = undefined;
                });
                week.selectedDay = day;
                /** @type {?} */
                var present = (day.name * 2 + 1) * this.eachPresent;
                week.style = {
                    flex: "1 1 " + present + "%",
                    'max-width': present + "%",
                    'min-width': present + "%",
                };
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxHmCalendarMonthViewComponent.prototype.openEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.open.emit(event);
    };
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    NgxHmCalendarMonthViewComponent.prototype.trackByFn = /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    function (index, item) {
        return index;
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgxHmCalendarMonthViewComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.events || changes.nstr) {
            this.calendarData = getCalendar(this.ynow, this.mnow, this.events, this.weeklyEvents);
        }
    };
    NgxHmCalendarMonthViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-hm-calendar-month-view',
                    template: "<div class=\"month new\"\n     [ngClass]=\"className\">\n  <div class=\"week\"\n       *ngFor=\"let week of calendarData; trackBy: trackByFn; let week_index = index;\">\n    <div class=\"day\"\n         *ngFor=\"let day of week.days; trackBy: trackByFn; let day_index = index;\"\n         [ngClass]=\"{ other: day.other, today: day.isToday }\"\n         (click)=\"showEventList(week, day)\">\n      <div class=\"day-name\">{{ weekNames[day.name] }}</div>\n      <div class=\"day-number\">{{ day.number }}</div>\n      <div class=\"day-events\">\n        <ng-container *ngFor=\"let event of day.events;\">\n          <span [style.background]=\"event.color\"></span>\n        </ng-container>\n      </div>\n    </div>\n    <div class=\"details\"\n         [ngClass]=\"{ 'in': week.selectedDay, 'out': !week.selectedDay }\">\n      <div class=\"arrow-container\"\n           *ngIf=\"week.selectedDay\">\n        <div class=\"fill\"\n             [ngStyle]=\"week.style\"></div>\n        <div class=\"arrow\"></div>\n      </div>\n      <div class=\"events\">\n        <ng-container *ngIf=\"week.selectedDay\">\n          <div class=\"event\"\n               *ngFor=\"let event of week.selectedDay.events;\"\n               (click)=\"openEvent(event)\">\n            <div class=\"event-category\"\n                 [style.background]=\"event.color\"></div>\n            <span>{{ event.title }}</span>\n          </div>\n        </ng-container>\n      </div>\n    </div>\n  </div>\n</div>\n",
                    styles: [":host{display:block;max-height:85vh}.month{opacity:0}.month.new{-webkit-animation:1s ease-out fadeIn;animation:1s ease-out fadeIn;opacity:1;overflow-y:scroll}.month.black .day{color:#fff}.month.black .day.other{color:#717171}.month.black .day.today{background:#467298;color:#53b7ff}.month.black .day-name{color:rgba(255,255,255,.5)}.month.black .details{background:#a4a4a4;color:#fff}.month.white .day{color:#000}.month.white .day.other,.month.white .day.other .day-name{color:#dadada}.month.white .day.today{background:#d7ecff;color:#53b7ff}.month.white .day-name{color:#db4437}.month.white .arrow{border-color:transparent transparent #dcffc7}.month.white .details{background:#dcffc7}.month .week{display:flex;flex-wrap:wrap}.month .week .day{z-index:1;display:inline-block;width:calc(100% / 7);padding:10px;text-align:center;cursor:pointer;box-sizing:border-box}.month .week .day .day-events{list-style:none;margin-top:3px;text-align:center;min-height:12px;line-height:6px;overflow:hidden}.month .week .day .day-events span{display:inline-block;width:5px;height:5px;margin:0 1px}.month .week .day .day-name{font-size:9px;text-transform:uppercase;margin-bottom:5px;letter-spacing:.7px}.month .week .day .day-number{font-size:24px}.month .week .details{display:none;position:relative;max-height:5000px;width:100%;margin-top:5px;border-radius:4px;flex:1 1 100%;min-width:100%;max-width:100%}.month .week .details.in{display:block;-webkit-animation:.5s cubic-bezier(1,0,1,0) moveFromTopFade;animation:.5s cubic-bezier(1,0,1,0) moveFromTopFade}.month .week .details.in .event{-webkit-animation:.3s .3s both fadeIn;animation:.3s .3s both fadeIn}.month .week .details.out{display:block;z-index:-1;max-height:0;transition:all .5s cubic-bezier(0,1,0,1)}.month .week .details.out .event{-webkit-animation:.3s both fadeIn;animation:.3s both fadeIn}.month .week .details .arrow-container{width:100%;display:flex}.month .week .details .arrow-container .fill{transition:all .3s ease}.month .week .details .arrow-container .arrow{-webkit-transform:translateX(-2.5px) translateY(-5px);transform:translateX(-2.5px) translateY(-5px);width:0;height:0;border-style:solid;border-width:0 5px 5px;border-color:transparent transparent #a4a4a4}.month .week .details .events{min-height:120px;padding:7px 0;overflow-y:auto;overflow-x:hidden}.month .week .details .events .event{font-size:16px;line-height:22px;letter-spacing:.5px;padding:2px 16px;vertical-align:top;display:flex}.month .week .details .events .event.empty{color:#eee}.month .week .details .events .event .event-category{height:10px;width:10px;display:inline-block;margin:6px 5px 0;vertical-align:top}.month .week .details .events .event span{display:inline-block;padding:0 0 0 7px}.month .week .details .events .event span:hover{color:#ff0;font-size:120%}.month .week .details .events .event span:active{color:red}@media screen and (max-width:320px){.day{padding:5px}}@-webkit-keyframes moveFromTopFade{0%{max-height:0}100%{max-height:5000px}}@keyframes moveFromTopFade{0%{max-height:0}100%{max-height:5000px}}@-webkit-keyframes fadeIn{0%{opacity:0}}@keyframes fadeIn{0%{opacity:0}}@-webkit-keyframes fadeOut{100%{opacity:0}}@keyframes fadeOut{100%{opacity:0}}", ".blue{background:#9ccaeb}.orange{background:#f7a700}.green{background:#99c66d}.yellow{background:#f9e900}"]
                }] }
    ];
    /** @nocollapse */
    NgxHmCalendarMonthViewComponent.ctorParameters = function () { return []; };
    NgxHmCalendarMonthViewComponent.propDecorators = {
        className: [{ type: Input }],
        weekNames: [{ type: Input }],
        yearName: [{ type: Input }],
        monthName: [{ type: Input }],
        weeklyEvents: [{ type: Input }],
        events: [{ type: Input }],
        nstr: [{ type: Input }],
        open: [{ type: Output }]
    };
    return NgxHmCalendarMonthViewComponent;
}());
export { NgxHmCalendarMonthViewComponent };
if (false) {
    /** @type {?} */
    NgxHmCalendarMonthViewComponent.prototype.className;
    /** @type {?} */
    NgxHmCalendarMonthViewComponent.prototype.weekNames;
    /** @type {?} */
    NgxHmCalendarMonthViewComponent.prototype.yearName;
    /** @type {?} */
    NgxHmCalendarMonthViewComponent.prototype.monthName;
    /** @type {?} */
    NgxHmCalendarMonthViewComponent.prototype.weeklyEvents;
    /** @type {?} */
    NgxHmCalendarMonthViewComponent.prototype.events;
    /** @type {?} */
    NgxHmCalendarMonthViewComponent.prototype.nstr;
    /** @type {?} */
    NgxHmCalendarMonthViewComponent.prototype.open;
    /** @type {?} */
    NgxHmCalendarMonthViewComponent.prototype.calendarData;
    /** @type {?} */
    NgxHmCalendarMonthViewComponent.prototype.eachPresent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWhtLWNhbGVuZGFyLW1vbnRoLXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWhtLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibGliL21vbnRoL25neC1obS1jYWxlbmRhci1tb250aC12aWV3L25neC1obS1jYWxlbmRhci1tb250aC12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFNakcsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUV2QztJQTRFRTtRQS9CQSxjQUFTLEdBQUcsT0FBTyxDQUFDO1FBRXBCLGNBQVMsR0FBYSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhFLGFBQVEsR0FBRyxHQUFHLENBQUM7UUFFZixjQUFTLEdBQUcsR0FBRyxDQUFDO1FBRWhCLGlCQUFZLEdBQXlCLEVBQUUsQ0FBQztRQUV4QyxXQUFNLEdBQXlCLEVBQUUsQ0FBQztRQUVsQyxTQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUdsQixTQUFJLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFN0MsaUJBQVksR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRXpFLGdCQUFXLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQztJQVloQixDQUFDO0lBVmhCLHNCQUFJLGlEQUFJOzs7O1FBQVI7WUFDRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDakMsQ0FBQzs7O09BQUE7SUFDRCxzQkFB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RFQsc0NBQUM7Q0FBQSxBQTFIRCxJQTBIQztTQS9FWSwrQkFBK0I7OztJQUMxQyxvREFDb0I7O0lBQ3BCLG9EQUN3RTs7SUFDeEUsbURBQ2U7O0lBQ2Ysb0RBQ2dCOztJQUNoQix1REFDd0M7O0lBQ3hDLGlEQUNrQzs7SUFDbEMsK0NBQ2tCOztJQUVsQiwrQ0FDNkM7O0lBRTdDLHVEQUFpRjs7SUFFakYsc0RBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIE5neEhtQ2FsZW5kYXJEYXksXHJcbiAgTmd4SG1DYWxlbmRhckV2ZW50LFxyXG4gIE5neEhtQ2FsZW5kYXJXZWVrLFxyXG59IGZyb20gJy4uLy4uL25neC1obS1jYWxlbmRhci5tb2RlbCc7XHJcbmltcG9ydCB7IGdldENhbGVuZGFyIH0gZnJvbSAnLi4vdXRpbHMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3gtaG0tY2FsZW5kYXItbW9udGgtdmlldycsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibW9udGggbmV3XCJcclxuICAgICBbbmdDbGFzc109XCJjbGFzc05hbWVcIj5cclxuICA8ZGl2IGNsYXNzPVwid2Vla1wiXHJcbiAgICAgICAqbmdGb3I9XCJsZXQgd2VlayBvZiBjYWxlbmRhckRhdGE7IHRyYWNrQnk6IHRyYWNrQnlGbjsgbGV0IHdlZWtfaW5kZXggPSBpbmRleDtcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJkYXlcIlxyXG4gICAgICAgICAqbmdGb3I9XCJsZXQgZGF5IG9mIHdlZWsuZGF5czsgdHJhY2tCeTogdHJhY2tCeUZuOyBsZXQgZGF5X2luZGV4ID0gaW5kZXg7XCJcclxuICAgICAgICAgW25nQ2xhc3NdPVwieyBvdGhlcjogZGF5Lm90aGVyLCB0b2RheTogZGF5LmlzVG9kYXkgfVwiXHJcbiAgICAgICAgIChjbGljayk9XCJzaG93RXZlbnRMaXN0KHdlZWssIGRheSlcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cImRheS1uYW1lXCI+e3sgd2Vla05hbWVzW2RheS5uYW1lXSB9fTwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiZGF5LW51bWJlclwiPnt7IGRheS5udW1iZXIgfX08L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImRheS1ldmVudHNcIj5cclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBldmVudCBvZiBkYXkuZXZlbnRzO1wiPlxyXG4gICAgICAgICAgPHNwYW4gW3N0eWxlLmJhY2tncm91bmRdPVwiZXZlbnQuY29sb3JcIj48L3NwYW4+XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZGV0YWlsc1wiXHJcbiAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ2luJzogd2Vlay5zZWxlY3RlZERheSwgJ291dCc6ICF3ZWVrLnNlbGVjdGVkRGF5IH1cIj5cclxuICAgICAgPGRpdiBjbGFzcz1cImFycm93LWNvbnRhaW5lclwiXHJcbiAgICAgICAgICAgKm5nSWY9XCJ3ZWVrLnNlbGVjdGVkRGF5XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImZpbGxcIlxyXG4gICAgICAgICAgICAgW25nU3R5bGVdPVwid2Vlay5zdHlsZVwiPjwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhcnJvd1wiPjwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImV2ZW50c1wiPlxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJ3ZWVrLnNlbGVjdGVkRGF5XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXZlbnRcIlxyXG4gICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgZXZlbnQgb2Ygd2Vlay5zZWxlY3RlZERheS5ldmVudHM7XCJcclxuICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9wZW5FdmVudChldmVudClcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImV2ZW50LWNhdGVnb3J5XCJcclxuICAgICAgICAgICAgICAgICBbc3R5bGUuYmFja2dyb3VuZF09XCJldmVudC5jb2xvclwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8c3Bhbj57eyBldmVudC50aXRsZSB9fTwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuYCxcclxuICBzdHlsZXM6IFtgOmhvc3R7ZGlzcGxheTpibG9jazttYXgtaGVpZ2h0Ojg1dmh9Lm1vbnRoe29wYWNpdHk6MH0ubW9udGgubmV3ey13ZWJraXQtYW5pbWF0aW9uOjFzIGVhc2Utb3V0IGZhZGVJbjthbmltYXRpb246MXMgZWFzZS1vdXQgZmFkZUluO29wYWNpdHk6MTtvdmVyZmxvdy15OnNjcm9sbH0ubW9udGguYmxhY2sgLmRheXtjb2xvcjojZmZmfS5tb250aC5ibGFjayAuZGF5Lm90aGVye2NvbG9yOiM3MTcxNzF9Lm1vbnRoLmJsYWNrIC5kYXkudG9kYXl7YmFja2dyb3VuZDojNDY3Mjk4O2NvbG9yOiM1M2I3ZmZ9Lm1vbnRoLmJsYWNrIC5kYXktbmFtZXtjb2xvcjpyZ2JhKDI1NSwyNTUsMjU1LC41KX0ubW9udGguYmxhY2sgLmRldGFpbHN7YmFja2dyb3VuZDojYTRhNGE0O2NvbG9yOiNmZmZ9Lm1vbnRoLndoaXRlIC5kYXl7Y29sb3I6IzAwMH0ubW9udGgud2hpdGUgLmRheS5vdGhlciwubW9udGgud2hpdGUgLmRheS5vdGhlciAuZGF5LW5hbWV7Y29sb3I6I2RhZGFkYX0ubW9udGgud2hpdGUgLmRheS50b2RheXtiYWNrZ3JvdW5kOiNkN2VjZmY7Y29sb3I6IzUzYjdmZn0ubW9udGgud2hpdGUgLmRheS1uYW1le2NvbG9yOiNkYjQ0Mzd9Lm1vbnRoLndoaXRlIC5hcnJvd3tib3JkZXItY29sb3I6dHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgI2RjZmZjN30ubW9udGgud2hpdGUgLmRldGFpbHN7YmFja2dyb3VuZDojZGNmZmM3fS5tb250aCAud2Vla3tkaXNwbGF5OmZsZXg7ZmxleC13cmFwOndyYXB9Lm1vbnRoIC53ZWVrIC5kYXl7ei1pbmRleDoxO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOmNhbGMoMTAwJSAvIDcpO3BhZGRpbmc6MTBweDt0ZXh0LWFsaWduOmNlbnRlcjtjdXJzb3I6cG9pbnRlcjtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1vbnRoIC53ZWVrIC5kYXkgLmRheS1ldmVudHN7bGlzdC1zdHlsZTpub25lO21hcmdpbi10b3A6M3B4O3RleHQtYWxpZ246Y2VudGVyO21pbi1oZWlnaHQ6MTJweDtsaW5lLWhlaWdodDo2cHg7b3ZlcmZsb3c6aGlkZGVufS5tb250aCAud2VlayAuZGF5IC5kYXktZXZlbnRzIHNwYW57ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6NXB4O2hlaWdodDo1cHg7bWFyZ2luOjAgMXB4fS5tb250aCAud2VlayAuZGF5IC5kYXktbmFtZXtmb250LXNpemU6OXB4O3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTttYXJnaW4tYm90dG9tOjVweDtsZXR0ZXItc3BhY2luZzouN3B4fS5tb250aCAud2VlayAuZGF5IC5kYXktbnVtYmVye2ZvbnQtc2l6ZToyNHB4fS5tb250aCAud2VlayAuZGV0YWlsc3tkaXNwbGF5Om5vbmU7cG9zaXRpb246cmVsYXRpdmU7bWF4LWhlaWdodDo1MDAwcHg7d2lkdGg6MTAwJTttYXJnaW4tdG9wOjVweDtib3JkZXItcmFkaXVzOjRweDtmbGV4OjEgMSAxMDAlO21pbi13aWR0aDoxMDAlO21heC13aWR0aDoxMDAlfS5tb250aCAud2VlayAuZGV0YWlscy5pbntkaXNwbGF5OmJsb2NrOy13ZWJraXQtYW5pbWF0aW9uOi41cyBjdWJpYy1iZXppZXIoMSwwLDEsMCkgbW92ZUZyb21Ub3BGYWRlO2FuaW1hdGlvbjouNXMgY3ViaWMtYmV6aWVyKDEsMCwxLDApIG1vdmVGcm9tVG9wRmFkZX0ubW9udGggLndlZWsgLmRldGFpbHMuaW4gLmV2ZW50ey13ZWJraXQtYW5pbWF0aW9uOi4zcyAuM3MgYm90aCBmYWRlSW47YW5pbWF0aW9uOi4zcyAuM3MgYm90aCBmYWRlSW59Lm1vbnRoIC53ZWVrIC5kZXRhaWxzLm91dHtkaXNwbGF5OmJsb2NrO3otaW5kZXg6LTE7bWF4LWhlaWdodDowO3RyYW5zaXRpb246YWxsIC41cyBjdWJpYy1iZXppZXIoMCwxLDAsMSl9Lm1vbnRoIC53ZWVrIC5kZXRhaWxzLm91dCAuZXZlbnR7LXdlYmtpdC1hbmltYXRpb246LjNzIGJvdGggZmFkZUluO2FuaW1hdGlvbjouM3MgYm90aCBmYWRlSW59Lm1vbnRoIC53ZWVrIC5kZXRhaWxzIC5hcnJvdy1jb250YWluZXJ7d2lkdGg6MTAwJTtkaXNwbGF5OmZsZXh9Lm1vbnRoIC53ZWVrIC5kZXRhaWxzIC5hcnJvdy1jb250YWluZXIgLmZpbGx7dHJhbnNpdGlvbjphbGwgLjNzIGVhc2V9Lm1vbnRoIC53ZWVrIC5kZXRhaWxzIC5hcnJvdy1jb250YWluZXIgLmFycm93ey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVgoLTIuNXB4KSB0cmFuc2xhdGVZKC01cHgpO3RyYW5zZm9ybTp0cmFuc2xhdGVYKC0yLjVweCkgdHJhbnNsYXRlWSgtNXB4KTt3aWR0aDowO2hlaWdodDowO2JvcmRlci1zdHlsZTpzb2xpZDtib3JkZXItd2lkdGg6MCA1cHggNXB4O2JvcmRlci1jb2xvcjp0cmFuc3BhcmVudCB0cmFuc3BhcmVudCAjYTRhNGE0fS5tb250aCAud2VlayAuZGV0YWlscyAuZXZlbnRze21pbi1oZWlnaHQ6MTIwcHg7cGFkZGluZzo3cHggMDtvdmVyZmxvdy15OmF1dG87b3ZlcmZsb3cteDpoaWRkZW59Lm1vbnRoIC53ZWVrIC5kZXRhaWxzIC5ldmVudHMgLmV2ZW50e2ZvbnQtc2l6ZToxNnB4O2xpbmUtaGVpZ2h0OjIycHg7bGV0dGVyLXNwYWNpbmc6LjVweDtwYWRkaW5nOjJweCAxNnB4O3ZlcnRpY2FsLWFsaWduOnRvcDtkaXNwbGF5OmZsZXh9Lm1vbnRoIC53ZWVrIC5kZXRhaWxzIC5ldmVudHMgLmV2ZW50LmVtcHR5e2NvbG9yOiNlZWV9Lm1vbnRoIC53ZWVrIC5kZXRhaWxzIC5ldmVudHMgLmV2ZW50IC5ldmVudC1jYXRlZ29yeXtoZWlnaHQ6MTBweDt3aWR0aDoxMHB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrO21hcmdpbjo2cHggNXB4IDA7dmVydGljYWwtYWxpZ246dG9wfS5tb250aCAud2VlayAuZGV0YWlscyAuZXZlbnRzIC5ldmVudCBzcGFue2Rpc3BsYXk6aW5saW5lLWJsb2NrO3BhZGRpbmc6MCAwIDAgN3B4fS5tb250aCAud2VlayAuZGV0YWlscyAuZXZlbnRzIC5ldmVudCBzcGFuOmhvdmVye2NvbG9yOiNmZjA7Zm9udC1zaXplOjEyMCV9Lm1vbnRoIC53ZWVrIC5kZXRhaWxzIC5ldmVudHMgLmV2ZW50IHNwYW46YWN0aXZle2NvbG9yOnJlZH1AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjMyMHB4KXsuZGF5e3BhZGRpbmc6NXB4fX1ALXdlYmtpdC1rZXlmcmFtZXMgbW92ZUZyb21Ub3BGYWRlezAle21heC1oZWlnaHQ6MH0xMDAle21heC1oZWlnaHQ6NTAwMHB4fX1Aa2V5ZnJhbWVzIG1vdmVGcm9tVG9wRmFkZXswJXttYXgtaGVpZ2h0OjB9MTAwJXttYXgtaGVpZ2h0OjUwMDBweH19QC13ZWJraXQta2V5ZnJhbWVzIGZhZGVJbnswJXtvcGFjaXR5OjB9fUBrZXlmcmFtZXMgZmFkZUluezAle29wYWNpdHk6MH19QC13ZWJraXQta2V5ZnJhbWVzIGZhZGVPdXR7MTAwJXtvcGFjaXR5OjB9fUBrZXlmcmFtZXMgZmFkZU91dHsxMDAle29wYWNpdHk6MH19YCwgYC5ibHVle2JhY2tncm91bmQ6IzljY2FlYn0ub3Jhbmdle2JhY2tncm91bmQ6I2Y3YTcwMH0uZ3JlZW57YmFja2dyb3VuZDojOTljNjZkfS55ZWxsb3d7YmFja2dyb3VuZDojZjllOTAwfWBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4SG1DYWxlbmRhck1vbnRoVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KClcclxuICBjbGFzc05hbWUgPSAnYmxhY2snO1xyXG4gIEBJbnB1dCgpXHJcbiAgd2Vla05hbWVzOiBzdHJpbmdbXSA9IFsn5pif5pyf5pelJywgJ+aYn+acn+S4gCcsICfmmJ/mnJ/kuownLCAn5pif5pyf5LiJJywgJ+aYn+acn+WbmycsICfmmJ/mnJ/kupQnLCAn5pif5pyf5YWtJ107XHJcbiAgQElucHV0KClcclxuICB5ZWFyTmFtZSA9ICflubQnO1xyXG4gIEBJbnB1dCgpXHJcbiAgbW9udGhOYW1lID0gJ+aciCc7XHJcbiAgQElucHV0KClcclxuICB3ZWVrbHlFdmVudHM6IE5neEhtQ2FsZW5kYXJFdmVudFtdID0gW107XHJcbiAgQElucHV0KClcclxuICBldmVudHM6IE5neEhtQ2FsZW5kYXJFdmVudFtdID0gW107XHJcbiAgQElucHV0KClcclxuICBuc3RyID0gbmV3IERhdGUoKTtcclxuXHJcbiAgQE91dHB1dCgpXHJcbiAgb3BlbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNhbGVuZGFyRGF0YSA9IGdldENhbGVuZGFyKHRoaXMueW5vdywgdGhpcy5tbm93LCB0aGlzLmV2ZW50cywgdGhpcy53ZWVrbHlFdmVudHMpO1xyXG5cclxuICBwcml2YXRlIGVhY2hQcmVzZW50ID0gMTAwIC8gMTQ7XHJcblxyXG4gIGdldCB5bm93KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubnN0ci5nZXRGdWxsWWVhcigpO1xyXG4gIH1cclxuICBnZXQgbW5vdygpIHtcclxuICAgIHJldHVybiB0aGlzLm5zdHIuZ2V0TW9udGgoKTtcclxuICB9XHJcbiAgZ2V0IGRub3coKSB7XHJcbiAgICByZXR1cm4gdGhpcy5uc3RyLmdldERhdGUoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgcHJldigpIHtcclxuICAgIHRoaXMubnN0ci5zZXRNb250aCh0aGlzLm5zdHIuZ2V0TW9udGgoKSAtIDEpO1xyXG4gICAgdGhpcy5jYWxlbmRhckRhdGEgPSBnZXRDYWxlbmRhcih0aGlzLnlub3csIHRoaXMubW5vdywgdGhpcy5ldmVudHMsIHRoaXMud2Vla2x5RXZlbnRzKTtcclxuICB9XHJcblxyXG4gIG5leHQoKSB7XHJcbiAgICB0aGlzLm5zdHIuc2V0TW9udGgodGhpcy5uc3RyLmdldE1vbnRoKCkgKyAxKTtcclxuICAgIHRoaXMuY2FsZW5kYXJEYXRhID0gZ2V0Q2FsZW5kYXIodGhpcy55bm93LCB0aGlzLm1ub3csIHRoaXMuZXZlbnRzLCB0aGlzLndlZWtseUV2ZW50cyk7XHJcbiAgfVxyXG5cclxuICBzaG93RXZlbnRMaXN0KHdlZWs6IE5neEhtQ2FsZW5kYXJXZWVrLCBkYXk6IE5neEhtQ2FsZW5kYXJEYXkpIHtcclxuICAgIGlmIChkYXkuZXZlbnRzLmxlbmd0aCkge1xyXG4gICAgICBpZiAod2Vlay5zZWxlY3RlZERheSAmJiB3ZWVrLnNlbGVjdGVkRGF5ID09PSBkYXkpIHtcclxuICAgICAgICB3ZWVrLnNlbGVjdGVkRGF5ID0gdW5kZWZpbmVkO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuY2FsZW5kYXJEYXRhLmZvckVhY2godyA9PiB7XHJcbiAgICAgICAgICB3LnNlbGVjdGVkRGF5ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB3ZWVrLnNlbGVjdGVkRGF5ID0gZGF5O1xyXG5cclxuICAgICAgICBjb25zdCBwcmVzZW50ID0gKGRheS5uYW1lICogMiArIDEpICogdGhpcy5lYWNoUHJlc2VudDtcclxuICAgICAgICB3ZWVrLnN0eWxlID0ge1xyXG4gICAgICAgICAgZmxleDogYDEgMSAke3ByZXNlbnR9JWAsXHJcbiAgICAgICAgICAnbWF4LXdpZHRoJzogYCR7cHJlc2VudH0lYCxcclxuICAgICAgICAgICdtaW4td2lkdGgnOiBgJHtwcmVzZW50fSVgLFxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9wZW5FdmVudChldmVudDogTmd4SG1DYWxlbmRhckV2ZW50KSB7XHJcbiAgICB0aGlzLm9wZW4uZW1pdChldmVudCk7XHJcbiAgfVxyXG5cclxuICB0cmFja0J5Rm4oaW5kZXgsIGl0ZW0pIHtcclxuICAgIHJldHVybiBpbmRleDtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIGlmIChjaGFuZ2VzLmV2ZW50cyB8fCBjaGFuZ2VzLm5zdHIpIHtcclxuICAgICAgdGhpcy5jYWxlbmRhckRhdGEgPSBnZXRDYWxlbmRhcih0aGlzLnlub3csIHRoaXMubW5vdywgdGhpcy5ldmVudHMsIHRoaXMud2Vla2x5RXZlbnRzKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19