/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { getCalendar } from '../utils';
export class NgxHmCalendarMonthViewComponent {
    constructor() {
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
    prev() {
        this.nstr.setMonth(this.nstr.getMonth() - 1);
        this.calendarData = getCalendar(this.ynow, this.mnow, this.events, this.weeklyEvents);
    }
    /**
     * @return {?}
     */
    next() {
        this.nstr.setMonth(this.nstr.getMonth() + 1);
        this.calendarData = getCalendar(this.ynow, this.mnow, this.events, this.weeklyEvents);
    }
    /**
     * @param {?} week
     * @param {?} day
     * @return {?}
     */
    showEventList(week, day) {
        if (day.events.length) {
            if (week.selectedDay && week.selectedDay === day) {
                week.selectedDay = undefined;
            }
            else {
                this.calendarData.forEach(w => {
                    w.selectedDay = undefined;
                });
                week.selectedDay = day;
                /** @type {?} */
                const present = (day.name * 2 + 1) * this.eachPresent;
                week.style = {
                    flex: `1 1 ${present}%`,
                    'max-width': `${present}%`,
                    'min-width': `${present}%`,
                };
            }
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
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    trackByFn(index, item) {
        return index;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.events || changes.nstr) {
            this.calendarData = getCalendar(this.ynow, this.mnow, this.events, this.weeklyEvents);
        }
    }
}
NgxHmCalendarMonthViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-hm-calendar-month-view',
                template: `<div class="month new"
     [ngClass]="className">
  <div class="week"
       *ngFor="let week of calendarData; trackBy: trackByFn; let week_index = index;">
    <div class="day"
         *ngFor="let day of week.days; trackBy: trackByFn; let day_index = index;"
         [ngClass]="{ other: day.other, today: day.isToday }"
         (click)="showEventList(week, day)">
      <div class="day-name">{{ weekNames[day.name] }}</div>
      <div class="day-number">{{ day.number }}</div>
      <div class="day-events">
        <ng-container *ngFor="let event of day.events;">
          <span [style.background]="event.color"></span>
        </ng-container>
      </div>
    </div>
    <div class="details"
         [ngClass]="{ 'in': week.selectedDay, 'out': !week.selectedDay }">
      <div class="arrow-container"
           *ngIf="week.selectedDay">
        <div class="fill"
             [ngStyle]="week.style"></div>
        <div class="arrow"></div>
      </div>
      <div class="events">
        <ng-container *ngIf="week.selectedDay">
          <div class="event"
               *ngFor="let event of week.selectedDay.events;"
               (click)="openEvent(event)">
            <div class="event-category"
                 [style.background]="event.color"></div>
            <span>{{ event.title }}</span>
          </div>
        </ng-container>
      </div>
    </div>
  </div>
</div>
`,
                styles: [`:host{display:block;max-height:85vh}.month{opacity:0}.month.new{-webkit-animation:1s ease-out fadeIn;animation:1s ease-out fadeIn;opacity:1;overflow-y:scroll}.month.black .day{color:#fff}.month.black .day.other{color:#717171}.month.black .day.today{background:#467298;color:#53b7ff}.month.black .day-name{color:rgba(255,255,255,.5)}.month.black .details{background:#a4a4a4;color:#fff}.month.white .day{color:#000}.month.white .day.other,.month.white .day.other .day-name{color:#dadada}.month.white .day.today{background:#d7ecff;color:#53b7ff}.month.white .day-name{color:#db4437}.month.white .arrow{border-color:transparent transparent #dcffc7}.month.white .details{background:#dcffc7}.month .week{display:flex;flex-wrap:wrap}.month .week .day{z-index:1;display:inline-block;width:calc(100% / 7);padding:10px;text-align:center;cursor:pointer;box-sizing:border-box}.month .week .day .day-events{list-style:none;margin-top:3px;text-align:center;min-height:12px;line-height:6px;overflow:hidden}.month .week .day .day-events span{display:inline-block;width:5px;height:5px;margin:0 1px}.month .week .day .day-name{font-size:9px;text-transform:uppercase;margin-bottom:5px;letter-spacing:.7px}.month .week .day .day-number{font-size:24px}.month .week .details{display:none;position:relative;max-height:5000px;width:100%;margin-top:5px;border-radius:4px;flex:1 1 100%;min-width:100%;max-width:100%}.month .week .details.in{display:block;-webkit-animation:.5s cubic-bezier(1,0,1,0) moveFromTopFade;animation:.5s cubic-bezier(1,0,1,0) moveFromTopFade}.month .week .details.in .event{-webkit-animation:.3s .3s both fadeIn;animation:.3s .3s both fadeIn}.month .week .details.out{display:block;z-index:-1;max-height:0;transition:all .5s cubic-bezier(0,1,0,1)}.month .week .details.out .event{-webkit-animation:.3s both fadeIn;animation:.3s both fadeIn}.month .week .details .arrow-container{width:100%;display:flex}.month .week .details .arrow-container .fill{transition:all .3s ease}.month .week .details .arrow-container .arrow{-webkit-transform:translateX(-2.5px) translateY(-5px);transform:translateX(-2.5px) translateY(-5px);width:0;height:0;border-style:solid;border-width:0 5px 5px;border-color:transparent transparent #a4a4a4}.month .week .details .events{min-height:120px;padding:7px 0;overflow-y:auto;overflow-x:hidden}.month .week .details .events .event{font-size:16px;line-height:22px;letter-spacing:.5px;padding:2px 16px;vertical-align:top;display:flex}.month .week .details .events .event.empty{color:#eee}.month .week .details .events .event .event-category{height:10px;width:10px;display:inline-block;margin:6px 5px 0;vertical-align:top}.month .week .details .events .event span{display:inline-block;padding:0 0 0 7px}.month .week .details .events .event span:hover{color:#ff0;font-size:120%}.month .week .details .events .event span:active{color:red}@media screen and (max-width:320px){.day{padding:5px}}@-webkit-keyframes moveFromTopFade{0%{max-height:0}100%{max-height:5000px}}@keyframes moveFromTopFade{0%{max-height:0}100%{max-height:5000px}}@-webkit-keyframes fadeIn{0%{opacity:0}}@keyframes fadeIn{0%{opacity:0}}@-webkit-keyframes fadeOut{100%{opacity:0}}@keyframes fadeOut{100%{opacity:0}}`, `.blue{background:#9ccaeb}.orange{background:#f7a700}.green{background:#99c66d}.yellow{background:#f9e900}`]
            }] }
];
/** @nocollapse */
NgxHmCalendarMonthViewComponent.ctorParameters = () => [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWhtLWNhbGVuZGFyLW1vbnRoLXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWhtLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibGliL21vbnRoL25neC1obS1jYWxlbmRhci1tb250aC12aWV3L25neC1obS1jYWxlbmRhci1tb250aC12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFNakcsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQTZDdkMsTUFBTSxPQUFPLCtCQUErQjtJQWlDMUM7UUEvQkEsY0FBUyxHQUFHLE9BQU8sQ0FBQztRQUVwQixjQUFTLEdBQWEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4RSxhQUFRLEdBQUcsR0FBRyxDQUFDO1FBRWYsY0FBUyxHQUFHLEdBQUcsQ0FBQztRQUVoQixpQkFBWSxHQUF5QixFQUFFLENBQUM7UUFFeEMsV0FBTSxHQUF5QixFQUFFLENBQUM7UUFFbEMsU0FBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFHbEIsU0FBSSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTdDLGlCQUFZLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUV6RSxnQkFBVyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFZaEIsQ0FBQzs7OztJQVZoQixJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDakMsQ0FBQzs7OztJ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Q3hFLG1EQUNlOztJQUNmLG9EQUNnQjs7SUFDaEIsdURBQ3dDOztJQUN4QyxpREFDa0M7O0lBQ2xDLCtDQUNrQjs7SUFFbEIsK0NBQzZDOztJQUU3Qyx1REFBaUY7O0lBRWpGLHNEQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBOZ3hIbUNhbGVuZGFyRGF5LFxyXG4gIE5neEhtQ2FsZW5kYXJFdmVudCxcclxuICBOZ3hIbUNhbGVuZGFyV2VlayxcclxufSBmcm9tICcuLi8uLi9uZ3gtaG0tY2FsZW5kYXIubW9kZWwnO1xyXG5pbXBvcnQgeyBnZXRDYWxlbmRhciB9IGZyb20gJy4uL3V0aWxzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd4LWhtLWNhbGVuZGFyLW1vbnRoLXZpZXcnLFxyXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIm1vbnRoIG5ld1wiXHJcbiAgICAgW25nQ2xhc3NdPVwiY2xhc3NOYW1lXCI+XHJcbiAgPGRpdiBjbGFzcz1cIndlZWtcIlxyXG4gICAgICAgKm5nRm9yPVwibGV0IHdlZWsgb2YgY2FsZW5kYXJEYXRhOyB0cmFja0J5OiB0cmFja0J5Rm47IGxldCB3ZWVrX2luZGV4ID0gaW5kZXg7XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZGF5XCJcclxuICAgICAgICAgKm5nRm9yPVwibGV0IGRheSBvZiB3ZWVrLmRheXM7IHRyYWNrQnk6IHRyYWNrQnlGbjsgbGV0IGRheV9pbmRleCA9IGluZGV4O1wiXHJcbiAgICAgICAgIFtuZ0NsYXNzXT1cInsgb3RoZXI6IGRheS5vdGhlciwgdG9kYXk6IGRheS5pc1RvZGF5IH1cIlxyXG4gICAgICAgICAoY2xpY2spPVwic2hvd0V2ZW50TGlzdCh3ZWVrLCBkYXkpXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJkYXktbmFtZVwiPnt7IHdlZWtOYW1lc1tkYXkubmFtZV0gfX08L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImRheS1udW1iZXJcIj57eyBkYXkubnVtYmVyIH19PC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJkYXktZXZlbnRzXCI+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZXZlbnQgb2YgZGF5LmV2ZW50cztcIj5cclxuICAgICAgICAgIDxzcGFuIFtzdHlsZS5iYWNrZ3JvdW5kXT1cImV2ZW50LmNvbG9yXCI+PC9zcGFuPlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImRldGFpbHNcIlxyXG4gICAgICAgICBbbmdDbGFzc109XCJ7ICdpbic6IHdlZWsuc2VsZWN0ZWREYXksICdvdXQnOiAhd2Vlay5zZWxlY3RlZERheSB9XCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJhcnJvdy1jb250YWluZXJcIlxyXG4gICAgICAgICAgICpuZ0lmPVwid2Vlay5zZWxlY3RlZERheVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmaWxsXCJcclxuICAgICAgICAgICAgIFtuZ1N0eWxlXT1cIndlZWsuc3R5bGVcIj48L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXJyb3dcIj48L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJldmVudHNcIj5cclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwid2Vlay5zZWxlY3RlZERheVwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImV2ZW50XCJcclxuICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IGV2ZW50IG9mIHdlZWsuc2VsZWN0ZWREYXkuZXZlbnRzO1wiXHJcbiAgICAgICAgICAgICAgIChjbGljayk9XCJvcGVuRXZlbnQoZXZlbnQpXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJldmVudC1jYXRlZ29yeVwiXHJcbiAgICAgICAgICAgICAgICAgW3N0eWxlLmJhY2tncm91bmRdPVwiZXZlbnQuY29sb3JcIj48L2Rpdj5cclxuICAgICAgICAgICAgPHNwYW4+e3sgZXZlbnQudGl0bGUgfX08L3NwYW4+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbmAsXHJcbiAgc3R5bGVzOiBbYDpob3N0e2Rpc3BsYXk6YmxvY2s7bWF4LWhlaWdodDo4NXZofS5tb250aHtvcGFjaXR5OjB9Lm1vbnRoLm5ld3std2Via2l0LWFuaW1hdGlvbjoxcyBlYXNlLW91dCBmYWRlSW47YW5pbWF0aW9uOjFzIGVhc2Utb3V0IGZhZGVJbjtvcGFjaXR5OjE7b3ZlcmZsb3cteTpzY3JvbGx9Lm1vbnRoLmJsYWNrIC5kYXl7Y29sb3I6I2ZmZn0ubW9udGguYmxhY2sgLmRheS5vdGhlcntjb2xvcjojNzE3MTcxfS5tb250aC5ibGFjayAuZGF5LnRvZGF5e2JhY2tncm91bmQ6IzQ2NzI5ODtjb2xvcjojNTNiN2ZmfS5tb250aC5ibGFjayAuZGF5LW5hbWV7Y29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuNSl9Lm1vbnRoLmJsYWNrIC5kZXRhaWxze2JhY2tncm91bmQ6I2E0YTRhNDtjb2xvcjojZmZmfS5tb250aC53aGl0ZSAuZGF5e2NvbG9yOiMwMDB9Lm1vbnRoLndoaXRlIC5kYXkub3RoZXIsLm1vbnRoLndoaXRlIC5kYXkub3RoZXIgLmRheS1uYW1le2NvbG9yOiNkYWRhZGF9Lm1vbnRoLndoaXRlIC5kYXkudG9kYXl7YmFja2dyb3VuZDojZDdlY2ZmO2NvbG9yOiM1M2I3ZmZ9Lm1vbnRoLndoaXRlIC5kYXktbmFtZXtjb2xvcjojZGI0NDM3fS5tb250aC53aGl0ZSAuYXJyb3d7Ym9yZGVyLWNvbG9yOnRyYW5zcGFyZW50IHRyYW5zcGFyZW50ICNkY2ZmYzd9Lm1vbnRoLndoaXRlIC5kZXRhaWxze2JhY2tncm91bmQ6I2RjZmZjN30ubW9udGggLndlZWt7ZGlzcGxheTpmbGV4O2ZsZXgtd3JhcDp3cmFwfS5tb250aCAud2VlayAuZGF5e3otaW5kZXg6MTtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDpjYWxjKDEwMCUgLyA3KTtwYWRkaW5nOjEwcHg7dGV4dC1hbGlnbjpjZW50ZXI7Y3Vyc29yOnBvaW50ZXI7Ym94LXNpemluZzpib3JkZXItYm94fS5tb250aCAud2VlayAuZGF5IC5kYXktZXZlbnRze2xpc3Qtc3R5bGU6bm9uZTttYXJnaW4tdG9wOjNweDt0ZXh0LWFsaWduOmNlbnRlcjttaW4taGVpZ2h0OjEycHg7bGluZS1oZWlnaHQ6NnB4O292ZXJmbG93OmhpZGRlbn0ubW9udGggLndlZWsgLmRheSAuZGF5LWV2ZW50cyBzcGFue2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjVweDtoZWlnaHQ6NXB4O21hcmdpbjowIDFweH0ubW9udGggLndlZWsgLmRheSAuZGF5LW5hbWV7Zm9udC1zaXplOjlweDt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7bWFyZ2luLWJvdHRvbTo1cHg7bGV0dGVyLXNwYWNpbmc6LjdweH0ubW9udGggLndlZWsgLmRheSAuZGF5LW51bWJlcntmb250LXNpemU6MjRweH0ubW9udGggLndlZWsgLmRldGFpbHN7ZGlzcGxheTpub25lO3Bvc2l0aW9uOnJlbGF0aXZlO21heC1oZWlnaHQ6NTAwMHB4O3dpZHRoOjEwMCU7bWFyZ2luLXRvcDo1cHg7Ym9yZGVyLXJhZGl1czo0cHg7ZmxleDoxIDEgMTAwJTttaW4td2lkdGg6MTAwJTttYXgtd2lkdGg6MTAwJX0ubW9udGggLndlZWsgLmRldGFpbHMuaW57ZGlzcGxheTpibG9jazstd2Via2l0LWFuaW1hdGlvbjouNXMgY3ViaWMtYmV6aWVyKDEsMCwxLDApIG1vdmVGcm9tVG9wRmFkZTthbmltYXRpb246LjVzIGN1YmljLWJlemllcigxLDAsMSwwKSBtb3ZlRnJvbVRvcEZhZGV9Lm1vbnRoIC53ZWVrIC5kZXRhaWxzLmluIC5ldmVudHstd2Via2l0LWFuaW1hdGlvbjouM3MgLjNzIGJvdGggZmFkZUluO2FuaW1hdGlvbjouM3MgLjNzIGJvdGggZmFkZUlufS5tb250aCAud2VlayAuZGV0YWlscy5vdXR7ZGlzcGxheTpibG9jazt6LWluZGV4Oi0xO21heC1oZWlnaHQ6MDt0cmFuc2l0aW9uOmFsbCAuNXMgY3ViaWMtYmV6aWVyKDAsMSwwLDEpfS5tb250aCAud2VlayAuZGV0YWlscy5vdXQgLmV2ZW50ey13ZWJraXQtYW5pbWF0aW9uOi4zcyBib3RoIGZhZGVJbjthbmltYXRpb246LjNzIGJvdGggZmFkZUlufS5tb250aCAud2VlayAuZGV0YWlscyAuYXJyb3ctY29udGFpbmVye3dpZHRoOjEwMCU7ZGlzcGxheTpmbGV4fS5tb250aCAud2VlayAuZGV0YWlscyAuYXJyb3ctY29udGFpbmVyIC5maWxse3RyYW5zaXRpb246YWxsIC4zcyBlYXNlfS5tb250aCAud2VlayAuZGV0YWlscyAuYXJyb3ctY29udGFpbmVyIC5hcnJvd3std2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVYKC0yLjVweCkgdHJhbnNsYXRlWSgtNXB4KTt0cmFuc2Zvcm06dHJhbnNsYXRlWCgtMi41cHgpIHRyYW5zbGF0ZVkoLTVweCk7d2lkdGg6MDtoZWlnaHQ6MDtib3JkZXItc3R5bGU6c29saWQ7Ym9yZGVyLXdpZHRoOjAgNXB4IDVweDtib3JkZXItY29sb3I6dHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgI2E0YTRhNH0ubW9udGggLndlZWsgLmRldGFpbHMgLmV2ZW50c3ttaW4taGVpZ2h0OjEyMHB4O3BhZGRpbmc6N3B4IDA7b3ZlcmZsb3cteTphdXRvO292ZXJmbG93LXg6aGlkZGVufS5tb250aCAud2VlayAuZGV0YWlscyAuZXZlbnRzIC5ldmVudHtmb250LXNpemU6MTZweDtsaW5lLWhlaWdodDoyMnB4O2xldHRlci1zcGFjaW5nOi41cHg7cGFkZGluZzoycHggMTZweDt2ZXJ0aWNhbC1hbGlnbjp0b3A7ZGlzcGxheTpmbGV4fS5tb250aCAud2VlayAuZGV0YWlscyAuZXZlbnRzIC5ldmVudC5lbXB0eXtjb2xvcjojZWVlfS5tb250aCAud2VlayAuZGV0YWlscyAuZXZlbnRzIC5ldmVudCAuZXZlbnQtY2F0ZWdvcnl7aGVpZ2h0OjEwcHg7d2lkdGg6MTBweDtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW46NnB4IDVweCAwO3ZlcnRpY2FsLWFsaWduOnRvcH0ubW9udGggLndlZWsgLmRldGFpbHMgLmV2ZW50cyAuZXZlbnQgc3BhbntkaXNwbGF5OmlubGluZS1ibG9jaztwYWRkaW5nOjAgMCAwIDdweH0ubW9udGggLndlZWsgLmRldGFpbHMgLmV2ZW50cyAuZXZlbnQgc3Bhbjpob3Zlcntjb2xvcjojZmYwO2ZvbnQtc2l6ZToxMjAlfS5tb250aCAud2VlayAuZGV0YWlscyAuZXZlbnRzIC5ldmVudCBzcGFuOmFjdGl2ZXtjb2xvcjpyZWR9QG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDozMjBweCl7LmRheXtwYWRkaW5nOjVweH19QC13ZWJraXQta2V5ZnJhbWVzIG1vdmVGcm9tVG9wRmFkZXswJXttYXgtaGVpZ2h0OjB9MTAwJXttYXgtaGVpZ2h0OjUwMDBweH19QGtleWZyYW1lcyBtb3ZlRnJvbVRvcEZhZGV7MCV7bWF4LWhlaWdodDowfTEwMCV7bWF4LWhlaWdodDo1MDAwcHh9fUAtd2Via2l0LWtleWZyYW1lcyBmYWRlSW57MCV7b3BhY2l0eTowfX1Aa2V5ZnJhbWVzIGZhZGVJbnswJXtvcGFjaXR5OjB9fUAtd2Via2l0LWtleWZyYW1lcyBmYWRlT3V0ezEwMCV7b3BhY2l0eTowfX1Aa2V5ZnJhbWVzIGZhZGVPdXR7MTAwJXtvcGFjaXR5OjB9fWAsIGAuYmx1ZXtiYWNrZ3JvdW5kOiM5Y2NhZWJ9Lm9yYW5nZXtiYWNrZ3JvdW5kOiNmN2E3MDB9LmdyZWVue2JhY2tncm91bmQ6Izk5YzY2ZH0ueWVsbG93e2JhY2tncm91bmQ6I2Y5ZTkwMH1gXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5neEhtQ2FsZW5kYXJNb250aFZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpXHJcbiAgY2xhc3NOYW1lID0gJ2JsYWNrJztcclxuICBASW5wdXQoKVxyXG4gIHdlZWtOYW1lczogc3RyaW5nW10gPSBbJ+aYn+acn+aXpScsICfmmJ/mnJ/kuIAnLCAn5pif5pyf5LqMJywgJ+aYn+acn+S4iScsICfmmJ/mnJ/lm5snLCAn5pif5pyf5LqUJywgJ+aYn+acn+WFrSddO1xyXG4gIEBJbnB1dCgpXHJcbiAgeWVhck5hbWUgPSAn5bm0JztcclxuICBASW5wdXQoKVxyXG4gIG1vbnRoTmFtZSA9ICfmnIgnO1xyXG4gIEBJbnB1dCgpXHJcbiAgd2Vla2x5RXZlbnRzOiBOZ3hIbUNhbGVuZGFyRXZlbnRbXSA9IFtdO1xyXG4gIEBJbnB1dCgpXHJcbiAgZXZlbnRzOiBOZ3hIbUNhbGVuZGFyRXZlbnRbXSA9IFtdO1xyXG4gIEBJbnB1dCgpXHJcbiAgbnN0ciA9IG5ldyBEYXRlKCk7XHJcblxyXG4gIEBPdXRwdXQoKVxyXG4gIG9wZW46IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBjYWxlbmRhckRhdGEgPSBnZXRDYWxlbmRhcih0aGlzLnlub3csIHRoaXMubW5vdywgdGhpcy5ldmVudHMsIHRoaXMud2Vla2x5RXZlbnRzKTtcclxuXHJcbiAgcHJpdmF0ZSBlYWNoUHJlc2VudCA9IDEwMCAvIDE0O1xyXG5cclxuICBnZXQgeW5vdygpIHtcclxuICAgIHJldHVybiB0aGlzLm5zdHIuZ2V0RnVsbFllYXIoKTtcclxuICB9XHJcbiAgZ2V0IG1ub3coKSB7XHJcbiAgICByZXR1cm4gdGhpcy5uc3RyLmdldE1vbnRoKCk7XHJcbiAgfVxyXG4gIGdldCBkbm93KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubnN0ci5nZXREYXRlKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIHByZXYoKSB7XHJcbiAgICB0aGlzLm5zdHIuc2V0TW9udGgodGhpcy5uc3RyLmdldE1vbnRoKCkgLSAxKTtcclxuICAgIHRoaXMuY2FsZW5kYXJEYXRhID0gZ2V0Q2FsZW5kYXIodGhpcy55bm93LCB0aGlzLm1ub3csIHRoaXMuZXZlbnRzLCB0aGlzLndlZWtseUV2ZW50cyk7XHJcbiAgfVxyXG5cclxuICBuZXh0KCkge1xyXG4gICAgdGhpcy5uc3RyLnNldE1vbnRoKHRoaXMubnN0ci5nZXRNb250aCgpICsgMSk7XHJcbiAgICB0aGlzLmNhbGVuZGFyRGF0YSA9IGdldENhbGVuZGFyKHRoaXMueW5vdywgdGhpcy5tbm93LCB0aGlzLmV2ZW50cywgdGhpcy53ZWVrbHlFdmVudHMpO1xyXG4gIH1cclxuXHJcbiAgc2hvd0V2ZW50TGlzdCh3ZWVrOiBOZ3hIbUNhbGVuZGFyV2VlaywgZGF5OiBOZ3hIbUNhbGVuZGFyRGF5KSB7XHJcbiAgICBpZiAoZGF5LmV2ZW50cy5sZW5ndGgpIHtcclxuICAgICAgaWYgKHdlZWsuc2VsZWN0ZWREYXkgJiYgd2Vlay5zZWxlY3RlZERheSA9PT0gZGF5KSB7XHJcbiAgICAgICAgd2Vlay5zZWxlY3RlZERheSA9IHVuZGVmaW5lZDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmNhbGVuZGFyRGF0YS5mb3JFYWNoKHcgPT4ge1xyXG4gICAgICAgICAgdy5zZWxlY3RlZERheSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgd2Vlay5zZWxlY3RlZERheSA9IGRheTtcclxuXHJcbiAgICAgICAgY29uc3QgcHJlc2VudCA9IChkYXkubmFtZSAqIDIgKyAxKSAqIHRoaXMuZWFjaFByZXNlbnQ7XHJcbiAgICAgICAgd2Vlay5zdHlsZSA9IHtcclxuICAgICAgICAgIGZsZXg6IGAxIDEgJHtwcmVzZW50fSVgLFxyXG4gICAgICAgICAgJ21heC13aWR0aCc6IGAke3ByZXNlbnR9JWAsXHJcbiAgICAgICAgICAnbWluLXdpZHRoJzogYCR7cHJlc2VudH0lYCxcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvcGVuRXZlbnQoZXZlbnQ6IE5neEhtQ2FsZW5kYXJFdmVudCkge1xyXG4gICAgdGhpcy5vcGVuLmVtaXQoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgdHJhY2tCeUZuKGluZGV4LCBpdGVtKSB7XHJcbiAgICByZXR1cm4gaW5kZXg7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICBpZiAoY2hhbmdlcy5ldmVudHMgfHwgY2hhbmdlcy5uc3RyKSB7XHJcbiAgICAgIHRoaXMuY2FsZW5kYXJEYXRhID0gZ2V0Q2FsZW5kYXIodGhpcy55bm93LCB0aGlzLm1ub3csIHRoaXMuZXZlbnRzLCB0aGlzLndlZWtseUV2ZW50cyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==