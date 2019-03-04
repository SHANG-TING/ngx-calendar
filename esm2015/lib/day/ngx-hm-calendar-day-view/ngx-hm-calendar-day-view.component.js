/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, QueryList, ViewChildren, } from '@angular/core';
import { getMutipleEvents } from '../../month/utils';
import { HOUR_SCHEMAS } from './data';
export class NgxHmCalendarDayViewComponent {
    constructor() {
        this.className = 'black';
        this.weeklyEvents = [];
        this.events = [];
        this.nstr = new Date(2018, 6, 16);
        this.start = '00:00';
        this.end = '24:00';
        this.split = 30;
        this.open = new EventEmitter();
        this.elmWidth = 110;
        this.dayEvents = [];
        this.hourSchemas = HOUR_SCHEMAS;
    }
    /**
     * @return {?}
     */
    get firstDate() {
        /** @type {?} */
        const date = new Date(this.nstr.getFullYear(), this.nstr.getMonth(), this.nstr.getDate());
        /** @type {?} */
        const time = this.start.split(':');
        if (time.length > 0) {
            /** @type {?} */
            const hour = Number(time[0]);
            /** @type {?} */
            const minute = Number(time[1]);
            if (hour + 1) {
                date.setHours(hour);
                if (minute + 1) {
                    date.setMinutes(minute);
                }
            }
        }
        return date;
    }
    /**
     * @return {?}
     */
    get lastDate() {
        /** @type {?} */
        const date = new Date(this.nstr.getFullYear(), this.nstr.getMonth(), this.nstr.getDate());
        /** @type {?} */
        const time = this.end.split(':');
        if (time.length > 0) {
            /** @type {?} */
            const hour = Number(time[0]);
            /** @type {?} */
            const minute = Number(time[1]);
            if (hour) {
                date.setHours(hour);
                if (minute) {
                    date.setMinutes(minute);
                }
            }
        }
        if (Number(date) - Number(this.firstDate) <= 0) {
            date.setHours(24);
            date.setMinutes(0);
        }
        return date;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.initView();
    }
    /**
     * @return {?}
     */
    initView() {
        this.setHourSchemas();
        this.setDayEvent();
        this.bindDayEventWidth();
    }
    /**
     * @return {?}
     */
    setHourSchemas() {
        /** @type {?} */
        const diffMs = Number(this.lastDate) - Number(this.firstDate);
        /** @type {?} */
        const diffHrs = Math.ceil(diffMs / 3600000);
        // hours
        // const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
        /** @type {?} */
        const firstHour = this.firstDate.getHours();
        this.hourSchemas = [];
        for (let i = firstHour; i < firstHour + diffHrs; i++) {
            this.hourSchemas.push({
                name: `${('0' + i).substr(-2)} ${i > 12 ? 'PM' : 'AM'}`,
            });
        }
    }
    /**
     * @return {?}
     */
    setDayEvent() {
        /** @type {?} */
        const width = 30;
        /** @type {?} */
        const firstdate = this.firstDate;
        /** @type {?} */
        const lastdate = this.lastDate;
        /** @type {?} */
        const getPixelForDiffSplit = (end, start) => {
            /** @type {?} */
            const diffMs = end.getTime() - start.getTime();
            return (diffMs % 86400000) / (this.split * 60 * 1000);
        };
        this.dayEvents = this.events
            .concat(...this.weeklyEvents.map(getMutipleEvents(this.nstr.getFullYear(), this.nstr.getMonth())))
            // 先過濾出會經過這一天的事件們
            .filter((e) => {
            return ((e.start >= firstdate && e.start < lastdate) ||
                (firstdate >= e.start && firstdate <= e.end) ||
                (firstdate >= e.start && lastdate < e.end));
        })
            // 根據開始時間做排序
            .sort((e1, e2) => e1.start.getTime() - e2.start.getTime())
            // 轉換為畫面上需要綁定的值
            .map((e, i) => {
            /** @type {?} */
            const elmDetial = {
                style: {
                    top: 0,
                    height: 0,
                    left: i * this.elmWidth,
                },
                startsBeforeWeek: true,
                endsAfterWeek: true,
                data: e,
            };
            // if event first date is bigger than firstdate
            if (e.start >= firstdate) {
                if (e.end < lastdate) {
                    //      |---------------------|
                    //            |---------|
                    elmDetial.style.top = getPixelForDiffSplit(e.start, firstdate) * width;
                    elmDetial.style.height = getPixelForDiffSplit(e.end, e.start) * width;
                }
                else if (e.start < lastdate && e.end >= lastdate) {
                    //      |---------------------|
                    //                |--------------------|
                    elmDetial.style.top = getPixelForDiffSplit(e.start, firstdate) * width;
                    elmDetial.style.height = getPixelForDiffSplit(lastdate, e.start) * width;
                    elmDetial.endsAfterWeek = false;
                }
            }
            else if (e.start <= firstdate) {
                // if event first date is bigger than firstdate
                if (lastdate < e.end) {
                    elmDetial.style.height = this.hourSchemas.length * 2 * width;
                    elmDetial.startsBeforeWeek = false;
                    elmDetial.endsAfterWeek = false;
                }
                else if (firstdate <= e.end && e.end < lastdate) {
                    elmDetial.style.height = getPixelForDiffSplit(e.end, firstdate) * width;
                    elmDetial.startsBeforeWeek = false;
                }
            }
            return elmDetial;
        })
            // 再次過濾出在這hour區間裡面的事件們
            .filter((e) => e.style.height !== 0)
            // 重新綁定left的順序
            .map((e, i) => {
            e.style.left = i * this.elmWidth;
            return Object.assign({}, e, { style: {
                    top: `${e.style.top}px`,
                    height: `${e.style.height}px`,
                    left: `${e.style.left}px`,
                    background: `${e.data.color}`,
                } });
        });
    }
    /**
     * @return {?}
     */
    bindDayEventWidth() {
        // 崇軒大神版本
        // let tempWidth = 0;
        // for (let index = 0; index < this.dayEvents.length; index++) {
        //   tempWidth = tempWidth + index * 10;
        // }
        setTimeout(() => {
            // 灰塵版本 (僅供參考XD)
            /** @type {?} */
            const tempWidth = this.dayEvents.length
                ? this.dayEvents.map((x, i) => i * 10).reduce((a, b) => a + b)
                : 0;
            if (document.body.offsetWidth - 100 < 100 * this.dayEvents.length + tempWidth) {
                this.bars.forEach((item, index) => {
                    item.nativeElement.style.width = `${100 * this.dayEvents.length + tempWidth}px`;
                });
            }
        }, 0);
    }
    /**
     * @return {?}
     */
    prev() {
        this.nstr.setDate(this.nstr.getDate() - 1);
        this.initView();
    }
    /**
     * @return {?}
     */
    next() {
        this.nstr.setDate(this.nstr.getDate() + 1);
        this.initView();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    openEvent(event) {
        this.open.emit(event);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.nstr || changes.start || changes.end) {
            this.initView();
        }
    }
}
NgxHmCalendarDayViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-hm-calendar-day-view',
                template: `<div [ngClass]="className"
     class="content">
  <div class="title">
    <div class="hour name"
         *ngFor="let hourSchema of hourSchemas">
      {{ hourSchema.name }}
    </div>
  </div>
  <div class="strip">
    <section *ngFor="let hourSchema of hourSchemas; let index = index;"
             class="hour"
             #bar>
      <div class="line"></div>
      <div class="line"></div>
    </section>

    <!-- events -->
    <div *ngFor="let dayEvent of dayEvents"
         class="bar"
         [ngStyle]="dayEvent.style"
         [class.cal-starts-within-day]="dayEvent.startsBeforeWeek"
         [class.cal-ends-within-day]="dayEvent.endsAfterWeek">
      <span (click)="openEvent(dayEvent.data)">
        {{ dayEvent.data.title }}
      </span>
    </div>
    <!--<div style="background: green;
    height: 90px;
    width: 100px;
    position: absolute;
    top: 180px;
    left: 100px;">
    </div>
    <div style="background: pink;
    height: 120px;
    width: 100px;
    position: absolute;
    top: 180px;left: 200px;">
    </div>
    <div style="background: paleturquoise;
    height: 210px;
    width: 100px;
    position: absolute;
    top: 180px;left: 300px;">
    </div> -->
  </div>
</div>
`,
                styles: [`:host{display:block;overflow-y:scroll;max-height:85vh}.black .hour .line{border-bottom:thin dashed #888f90}.black .hour .line:hover{background:wheat}.black .hour.name{color:#fff}.black .hour:nth-child(odd){background:#6f6e6e}.white .hour .line{border-bottom:thin dashed #000}.white .hour .line:hover{background:wheat}.white .hour:nth-child(odd){background:#fbeeee}.content{display:flex;margin-bottom:30px}.content .title{width:100px;flex:0 0 100px}.content .strip{position:relative;width:100%}.content .hour{height:60px}.content .hour.name{line-height:60px;text-align:center}.content .hour .line{height:30px;display:flex}.content .hour .line .active{width:100px;height:100%;flex:0 0 100px;box-sizing:content-box;z-index:1}.bar{border:1px solid #1e90ff;width:100px;position:absolute;color:#fff;padding:5px}.bar.cal-starts-within-day{border-top-left-radius:5px;border-top-right-radius:5px}.bar.cal-ends-within-day{border-bottom-left-radius:5px;border-bottom-right-radius:5px}`]
            }] }
];
/** @nocollapse */
NgxHmCalendarDayViewComponent.ctorParameters = () => [];
NgxHmCalendarDayViewComponent.propDecorators = {
    className: [{ type: Input }],
    weeklyEvents: [{ type: Input }],
    events: [{ type: Input }],
    nstr: [{ type: Input }],
    start: [{ type: Input }],
    end: [{ type: Input }],
    split: [{ type: Input }],
    open: [{ type: Output }],
    bars: [{ type: ViewChildren, args: ['bar',] }]
};
if (false) {
    /** @type {?} */
    NgxHmCalendarDayViewComponent.prototype.className;
    /** @type {?} */
    NgxHmCalendarDayViewComponent.prototype.weeklyEvents;
    /** @type {?} */
    NgxHmCalendarDayViewComponent.prototype.events;
    /** @type {?} */
    NgxHmCalendarDayViewComponent.prototype.nstr;
    /** @type {?} */
    NgxHmCalendarDayViewComponent.prototype.start;
    /** @type {?} */
    NgxHmCalendarDayViewComponent.prototype.end;
    /** @type {?} */
    NgxHmCalendarDayViewComponent.prototype.split;
    /** @type {?} */
    NgxHmCalendarDayViewComponent.prototype.open;
    /** @type {?} */
    NgxHmCalendarDayViewComponent.prototype.elmWidth;
    /** @type {?} */
    NgxHmCalendarDayViewComponent.prototype.bars;
    /** @type {?} */
    NgxHmCalendarDayViewComponent.prototype.dayEvents;
    /** @type {?} */
    NgxHmCalendarDayViewComponent.prototype.hourSchemas;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWhtLWNhbGVuZGFyLWRheS12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1obS1jYWxlbmRhci8iLCJzb3VyY2VzIjpbImxpYi9kYXkvbmd4LWhtLWNhbGVuZGFyLWRheS12aWV3L25neC1obS1jYWxlbmRhci1kYXktdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFTCxTQUFTLEVBRVQsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBQ04sU0FBUyxFQUVULFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBc0R0QyxNQUFNLE9BQU8sNkJBQTZCO0lBd0V4QztRQXRFQSxjQUFTLEdBQUcsT0FBTyxDQUFDO1FBRXBCLGlCQUFZLEdBQXlCLEVBQUUsQ0FBQztRQUV4QyxXQUFNLEdBQXlCLEVBQUUsQ0FBQztRQUVsQyxTQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUU3QixVQUFLLEdBQUcsT0FBTyxDQUFDO1FBRWhCLFFBQUcsR0FBRyxPQUFPLENBQUM7UUFFZCxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBR1gsU0FBSSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTdDLGFBQVEsR0FBRyxHQUFHLENBQUM7UUFpRGYsY0FBUyxHQUFxQyxFQUFFLENBQUM7UUFFakQsZ0JBQVcsR0FBVSxZQUFZLENBQUM7SUFFbEIsQ0FBQzs7OztJQWpEakIsSUFBSSxTQUFTOztjQUNMLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLElB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XHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBDb21wb25lbnQsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSW5wdXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIE91dHB1dCxcclxuICBRdWVyeUxpc3QsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBWaWV3Q2hpbGRyZW4sXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGdldE11dGlwbGVFdmVudHMgfSBmcm9tICcuLi8uLi9tb250aC91dGlscyc7XHJcbmltcG9ydCB7IE5neEhtQ2FsZW5kYXJFbG1EZXRpYWwsIE5neEhtQ2FsZW5kYXJFdmVudCB9IGZyb20gJy4uLy4uL25neC1obS1jYWxlbmRhci5tb2RlbCc7XHJcbmltcG9ydCB7IEhPVVJfU0NIRU1BUyB9IGZyb20gJy4vZGF0YSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25neC1obS1jYWxlbmRhci1kYXktdmlldycsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2IFtuZ0NsYXNzXT1cImNsYXNzTmFtZVwiXHJcbiAgICAgY2xhc3M9XCJjb250ZW50XCI+XHJcbiAgPGRpdiBjbGFzcz1cInRpdGxlXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiaG91ciBuYW1lXCJcclxuICAgICAgICAgKm5nRm9yPVwibGV0IGhvdXJTY2hlbWEgb2YgaG91clNjaGVtYXNcIj5cclxuICAgICAge3sgaG91clNjaGVtYS5uYW1lIH19XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwic3RyaXBcIj5cclxuICAgIDxzZWN0aW9uICpuZ0Zvcj1cImxldCBob3VyU2NoZW1hIG9mIGhvdXJTY2hlbWFzOyBsZXQgaW5kZXggPSBpbmRleDtcIlxyXG4gICAgICAgICAgICAgY2xhc3M9XCJob3VyXCJcclxuICAgICAgICAgICAgICNiYXI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJsaW5lXCI+PC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJsaW5lXCI+PC9kaXY+XHJcbiAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgPCEtLSBldmVudHMgLS0+XHJcbiAgICA8ZGl2ICpuZ0Zvcj1cImxldCBkYXlFdmVudCBvZiBkYXlFdmVudHNcIlxyXG4gICAgICAgICBjbGFzcz1cImJhclwiXHJcbiAgICAgICAgIFtuZ1N0eWxlXT1cImRheUV2ZW50LnN0eWxlXCJcclxuICAgICAgICAgW2NsYXNzLmNhbC1zdGFydHMtd2l0aGluLWRheV09XCJkYXlFdmVudC5zdGFydHNCZWZvcmVXZWVrXCJcclxuICAgICAgICAgW2NsYXNzLmNhbC1lbmRzLXdpdGhpbi1kYXldPVwiZGF5RXZlbnQuZW5kc0FmdGVyV2Vla1wiPlxyXG4gICAgICA8c3BhbiAoY2xpY2spPVwib3BlbkV2ZW50KGRheUV2ZW50LmRhdGEpXCI+XHJcbiAgICAgICAge3sgZGF5RXZlbnQuZGF0YS50aXRsZSB9fVxyXG4gICAgICA8L3NwYW4+XHJcbiAgICA8L2Rpdj5cclxuICAgIDwhLS08ZGl2IHN0eWxlPVwiYmFja2dyb3VuZDogZ3JlZW47XHJcbiAgICBoZWlnaHQ6IDkwcHg7XHJcbiAgICB3aWR0aDogMTAwcHg7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDE4MHB4O1xyXG4gICAgbGVmdDogMTAwcHg7XCI+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kOiBwaW5rO1xyXG4gICAgaGVpZ2h0OiAxMjBweDtcclxuICAgIHdpZHRoOiAxMDBweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogMTgwcHg7bGVmdDogMjAwcHg7XCI+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kOiBwYWxldHVycXVvaXNlO1xyXG4gICAgaGVpZ2h0OiAyMTBweDtcclxuICAgIHdpZHRoOiAxMDBweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogMTgwcHg7bGVmdDogMzAwcHg7XCI+XHJcbiAgICA8L2Rpdj4gLS0+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG5gLFxyXG4gIHN0eWxlczogW2A6aG9zdHtkaXNwbGF5OmJsb2NrO292ZXJmbG93LXk6c2Nyb2xsO21heC1oZWlnaHQ6ODV2aH0uYmxhY2sgLmhvdXIgLmxpbmV7Ym9yZGVyLWJvdHRvbTp0aGluIGRhc2hlZCAjODg4ZjkwfS5ibGFjayAuaG91ciAubGluZTpob3ZlcntiYWNrZ3JvdW5kOndoZWF0fS5ibGFjayAuaG91ci5uYW1le2NvbG9yOiNmZmZ9LmJsYWNrIC5ob3VyOm50aC1jaGlsZChvZGQpe2JhY2tncm91bmQ6IzZmNmU2ZX0ud2hpdGUgLmhvdXIgLmxpbmV7Ym9yZGVyLWJvdHRvbTp0aGluIGRhc2hlZCAjMDAwfS53aGl0ZSAuaG91ciAubGluZTpob3ZlcntiYWNrZ3JvdW5kOndoZWF0fS53aGl0ZSAuaG91cjpudGgtY2hpbGQob2RkKXtiYWNrZ3JvdW5kOiNmYmVlZWV9LmNvbnRlbnR7ZGlzcGxheTpmbGV4O21hcmdpbi1ib3R0b206MzBweH0uY29udGVudCAudGl0bGV7d2lkdGg6MTAwcHg7ZmxleDowIDAgMTAwcHh9LmNvbnRlbnQgLnN0cmlwe3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjEwMCV9LmNvbnRlbnQgLmhvdXJ7aGVpZ2h0OjYwcHh9LmNvbnRlbnQgLmhvdXIubmFtZXtsaW5lLWhlaWdodDo2MHB4O3RleHQtYWxpZ246Y2VudGVyfS5jb250ZW50IC5ob3VyIC5saW5le2hlaWdodDozMHB4O2Rpc3BsYXk6ZmxleH0uY29udGVudCAuaG91ciAubGluZSAuYWN0aXZle3dpZHRoOjEwMHB4O2hlaWdodDoxMDAlO2ZsZXg6MCAwIDEwMHB4O2JveC1zaXppbmc6Y29udGVudC1ib3g7ei1pbmRleDoxfS5iYXJ7Ym9yZGVyOjFweCBzb2xpZCAjMWU5MGZmO3dpZHRoOjEwMHB4O3Bvc2l0aW9uOmFic29sdXRlO2NvbG9yOiNmZmY7cGFkZGluZzo1cHh9LmJhci5jYWwtc3RhcnRzLXdpdGhpbi1kYXl7Ym9yZGVyLXRvcC1sZWZ0LXJhZGl1czo1cHg7Ym9yZGVyLXRvcC1yaWdodC1yYWRpdXM6NXB4fS5iYXIuY2FsLWVuZHMtd2l0aGluLWRheXtib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOjVweDtib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czo1cHh9YF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hIbUNhbGVuZGFyRGF5Vmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KClcclxuICBjbGFzc05hbWUgPSAnYmxhY2snO1xyXG4gIEBJbnB1dCgpXHJcbiAgd2Vla2x5RXZlbnRzOiBOZ3hIbUNhbGVuZGFyRXZlbnRbXSA9IFtdO1xyXG4gIEBJbnB1dCgpXHJcbiAgZXZlbnRzOiBOZ3hIbUNhbGVuZGFyRXZlbnRbXSA9IFtdO1xyXG4gIEBJbnB1dCgpXHJcbiAgbnN0ciA9IG5ldyBEYXRlKDIwMTgsIDYsIDE2KTtcclxuICBASW5wdXQoKVxyXG4gIHN0YXJ0ID0gJzAwOjAwJztcclxuICBASW5wdXQoKVxyXG4gIGVuZCA9ICcyNDowMCc7XHJcbiAgQElucHV0KClcclxuICBzcGxpdCA9IDMwO1xyXG5cclxuICBAT3V0cHV0KClcclxuICBvcGVuOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgZWxtV2lkdGggPSAxMTA7XHJcblxyXG4gIEBWaWV3Q2hpbGRyZW4oJ2JhcicpIGJhcnM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcclxuXHJcbiAgZ2V0IGZpcnN0RGF0ZSgpIHtcclxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh0aGlzLm5zdHIuZ2V0RnVsbFllYXIoKSwgdGhpcy5uc3RyLmdldE1vbnRoKCksIHRoaXMubnN0ci5nZXREYXRlKCkpO1xyXG4gICAgY29uc3QgdGltZSA9IHRoaXMuc3RhcnQuc3BsaXQoJzonKTtcclxuXHJcbiAgICBpZiAodGltZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGhvdXIgPSBOdW1iZXIodGltZVswXSk7XHJcbiAgICAgIGNvbnN0IG1pbnV0ZSA9IE51bWJlcih0aW1lWzFdKTtcclxuXHJcbiAgICAgIGlmIChob3VyICsgMSkge1xyXG4gICAgICAgIGRhdGUuc2V0SG91cnMoaG91cik7XHJcblxyXG4gICAgICAgIGlmIChtaW51dGUgKyAxKSB7XHJcbiAgICAgICAgICBkYXRlLnNldE1pbnV0ZXMobWludXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGF0ZTtcclxuICB9XHJcblxyXG4gIGdldCBsYXN0RGF0ZSgpIHtcclxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh0aGlzLm5zdHIuZ2V0RnVsbFllYXIoKSwgdGhpcy5uc3RyLmdldE1vbnRoKCksIHRoaXMubnN0ci5nZXREYXRlKCkpO1xyXG4gICAgY29uc3QgdGltZSA9IHRoaXMuZW5kLnNwbGl0KCc6Jyk7XHJcblxyXG4gICAgaWYgKHRpbWUubGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCBob3VyID0gTnVtYmVyKHRpbWVbMF0pO1xyXG4gICAgICBjb25zdCBtaW51dGUgPSBOdW1iZXIodGltZVsxXSk7XHJcblxyXG4gICAgICBpZiAoaG91cikge1xyXG4gICAgICAgIGRhdGUuc2V0SG91cnMoaG91cik7XHJcblxyXG4gICAgICAgIGlmIChtaW51dGUpIHtcclxuICAgICAgICAgIGRhdGUuc2V0TWludXRlcyhtaW51dGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChOdW1iZXIoZGF0ZSkgLSBOdW1iZXIodGhpcy5maXJzdERhdGUpIDw9IDApIHtcclxuICAgICAgZGF0ZS5zZXRIb3VycygyNCk7XHJcbiAgICAgIGRhdGUuc2V0TWludXRlcygwKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGF0ZTtcclxuICB9XHJcblxyXG4gIGRheUV2ZW50czogTmd4SG1DYWxlbmRhckVsbURldGlhbDxzdHJpbmc+W10gPSBbXTtcclxuXHJcbiAgaG91clNjaGVtYXM6IGFueVtdID0gSE9VUl9TQ0hFTUFTO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmluaXRWaWV3KCk7XHJcbiAgfVxyXG5cclxuICBpbml0VmlldygpOiB2b2lkIHtcclxuICAgIHRoaXMuc2V0SG91clNjaGVtYXMoKTtcclxuICAgIHRoaXMuc2V0RGF5RXZlbnQoKTtcclxuICAgIHRoaXMuYmluZERheUV2ZW50V2lkdGgoKTtcclxuICB9XHJcblxyXG4gIHNldEhvdXJTY2hlbWFzKCk6IHZvaWQge1xyXG4gICAgY29uc3QgZGlmZk1zID0gTnVtYmVyKHRoaXMubGFzdERhdGUpIC0gTnVtYmVyKHRoaXMuZmlyc3REYXRlKTtcclxuICAgIGNvbnN0IGRpZmZIcnMgPSBNYXRoLmNlaWwoZGlmZk1zIC8gMzYwMDAwMCk7IC8vIGhvdXJzXHJcbiAgICAvLyBjb25zdCBkaWZmTWlucyA9IE1hdGgucm91bmQoKChkaWZmTXMgJSA4NjQwMDAwMCkgJSAzNjAwMDAwKSAvIDYwMDAwKTsgLy8gbWludXRlc1xyXG4gICAgY29uc3QgZmlyc3RIb3VyID0gdGhpcy5maXJzdERhdGUuZ2V0SG91cnMoKTtcclxuXHJcbiAgICB0aGlzLmhvdXJTY2hlbWFzID0gW107XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IGZpcnN0SG91cjsgaSA8IGZpcnN0SG91ciArIGRpZmZIcnM7IGkrKykge1xyXG4gICAgICB0aGlzLmhvdXJTY2hlbWFzLnB1c2goe1xyXG4gICAgICAgIG5hbWU6IGAkeygnMCcgKyBpKS5zdWJzdHIoLTIpfSAke2kgPiAxMiA/ICdQTScgOiAnQU0nfWAsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0RGF5RXZlbnQoKTogdm9pZCB7XHJcbiAgICBjb25zdCB3aWR0aCA9IDMwO1xyXG4gICAgY29uc3QgZmlyc3RkYXRlID0gdGhpcy5maXJzdERhdGU7XHJcbiAgICBjb25zdCBsYXN0ZGF0ZSA9IHRoaXMubGFzdERhdGU7XHJcbiAgICBjb25zdCBnZXRQaXhlbEZvckRpZmZTcGxpdCA9IChlbmQsIHN0YXJ0KSA9PiB7XHJcbiAgICAgIGNvbnN0IGRpZmZNcyA9IGVuZC5nZXRUaW1lKCkgLSBzdGFydC5nZXRUaW1lKCk7XHJcbiAgICAgIHJldHVybiAoZGlmZk1zICUgODY0MDAwMDApIC8gKHRoaXMuc3BsaXQgKiA2MCAqIDEwMDApO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmRheUV2ZW50cyA9IHRoaXMuZXZlbnRzXHJcbiAgICAgIC5jb25jYXQoXHJcbiAgICAgICAgLi4udGhpcy53ZWVrbHlFdmVudHMubWFwKGdldE11dGlwbGVFdmVudHModGhpcy5uc3RyLmdldEZ1bGxZZWFyKCksIHRoaXMubnN0ci5nZXRNb250aCgpKSksXHJcbiAgICAgIClcclxuICAgICAgLy8g5YWI6YGO5r++5Ye65pyD57aT6YGO6YCZ5LiA5aSp55qE5LqL5Lu25YCRXHJcbiAgICAgIC5maWx0ZXIoKGU6IE5neEhtQ2FsZW5kYXJFdmVudCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAoZS5zdGFydCA+PSBmaXJzdGRhdGUgJiYgZS5zdGFydCA8IGxhc3RkYXRlKSB8fFxyXG4gICAgICAgICAgKGZpcnN0ZGF0ZSA+PSBlLnN0YXJ0ICYmIGZpcnN0ZGF0ZSA8PSBlLmVuZCkgfHxcclxuICAgICAgICAgIChmaXJzdGRhdGUgPj0gZS5zdGFydCAmJiBsYXN0ZGF0ZSA8IGUuZW5kKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC8vIOagueaTmumWi+Wni+aZgumWk+WBmuaOkuW6j1xyXG4gICAgICAuc29ydCgoZTE6IE5neEhtQ2FsZW5kYXJFdmVudCwgZTI6IE5neEhtQ2FsZW5kYXJFdmVudCkgPT4gZTEuc3RhcnQuZ2V0VGltZSgpIC0gZTIuc3RhcnQuZ2V0VGltZSgpKVxyXG4gICAgICAvLyDovYnmj5vngrrnlavpnaLkuIrpnIDopoHntoHlrprnmoTlgLxcclxuICAgICAgLm1hcCgoZTogTmd4SG1DYWxlbmRhckV2ZW50LCBpOiBudW1iZXIpID0+IHtcclxuICAgICAgICBjb25zdCBlbG1EZXRpYWw6IE5neEhtQ2FsZW5kYXJFbG1EZXRpYWwgPSB7XHJcbiAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgICAgIGhlaWdodDogMCxcclxuICAgICAgICAgICAgbGVmdDogaSAqIHRoaXMuZWxtV2lkdGgsXHJcbiAgICAgICAgICAgIC8vIGJhY2tncm91bmQ6IGUuY29sb3IudG9TdHJpbmcoKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHN0YXJ0c0JlZm9yZVdlZWs6IHRydWUsXHJcbiAgICAgICAgICBlbmRzQWZ0ZXJXZWVrOiB0cnVlLFxyXG4gICAgICAgICAgZGF0YTogZSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIGlmIGV2ZW50IGZpcnN0IGRhdGUgaXMgYmlnZ2VyIHRoYW4gZmlyc3RkYXRlXHJcbiAgICAgICAgaWYgKGUuc3RhcnQgPj0gZmlyc3RkYXRlKSB7XHJcbiAgICAgICAgICBpZiAoZS5lbmQgPCBsYXN0ZGF0ZSkge1xyXG4gICAgICAgICAgICAvLyAgICAgIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS18XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgfC0tLS0tLS0tLXxcclxuXHJcbiAgICAgICAgICAgIGVsbURldGlhbC5zdHlsZS50b3AgPSBnZXRQaXhlbEZvckRpZmZTcGxpdChlLnN0YXJ0LCBmaXJzdGRhdGUpICogd2lkdGg7XHJcbiAgICAgICAgICAgIGVsbURldGlhbC5zdHlsZS5oZWlnaHQgPSBnZXRQaXhlbEZvckRpZmZTcGxpdChlLmVuZCwgZS5zdGFydCkgKiB3aWR0aDtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoZS5zdGFydCA8IGxhc3RkYXRlICYmIGUuZW5kID49IGxhc3RkYXRlKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tfFxyXG5cclxuICAgICAgICAgICAgZWxtRGV0aWFsLnN0eWxlLnRvcCA9IGdldFBpeGVsRm9yRGlmZlNwbGl0KGUuc3RhcnQsIGZpcnN0ZGF0ZSkgKiB3aWR0aDtcclxuICAgICAgICAgICAgZWxtRGV0aWFsLnN0eWxlLmhlaWdodCA9IGdldFBpeGVsRm9yRGlmZlNwbGl0KGxhc3RkYXRlLCBlLnN0YXJ0KSAqIHdpZHRoO1xyXG4gICAgICAgICAgICBlbG1EZXRpYWwuZW5kc0FmdGVyV2VlayA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZS5zdGFydCA8PSBmaXJzdGRhdGUpIHtcclxuICAgICAgICAgIC8vIGlmIGV2ZW50IGZpcnN0IGRhdGUgaXMgYmlnZ2VyIHRoYW4gZmlyc3RkYXRlXHJcbiAgICAgICAgICBpZiAobGFzdGRhdGUgPCBlLmVuZCkge1xyXG4gICAgICAgICAgICBlbG1EZXRpYWwuc3R5bGUuaGVpZ2h0ID0gdGhpcy5ob3VyU2NoZW1hcy5sZW5ndGggKiAyICogd2lkdGg7XHJcbiAgICAgICAgICAgIGVsbURldGlhbC5zdGFydHNCZWZvcmVXZWVrID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVsbURldGlhbC5lbmRzQWZ0ZXJXZWVrID0gZmFsc2U7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGZpcnN0ZGF0ZSA8PSBlLmVuZCAmJiBlLmVuZCA8IGxhc3RkYXRlKSB7XHJcbiAgICAgICAgICAgIGVsbURldGlhbC5zdHlsZS5oZWlnaHQgPSBnZXRQaXhlbEZvckRpZmZTcGxpdChlLmVuZCwgZmlyc3RkYXRlKSAqIHdpZHRoO1xyXG4gICAgICAgICAgICBlbG1EZXRpYWwuc3RhcnRzQmVmb3JlV2VlayA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGVsbURldGlhbDtcclxuICAgICAgfSlcclxuICAgICAgLy8g5YaN5qyh6YGO5r++5Ye65Zyo6YCZaG91cuWNgOmWk+ijoemdoueahOS6i+S7tuWAkVxyXG4gICAgICAuZmlsdGVyKChlOiBOZ3hIbUNhbGVuZGFyRWxtRGV0aWFsKSA9PiBlLnN0eWxlLmhlaWdodCAhPT0gMClcclxuICAgICAgLy8g6YeN5paw57aB5a6abGVmdOeahOmghuW6j1xyXG4gICAgICAubWFwKChlOiBOZ3hIbUNhbGVuZGFyRWxtRGV0aWFsLCBpKSA9PiB7XHJcbiAgICAgICAgZS5zdHlsZS5sZWZ0ID0gaSAqIHRoaXMuZWxtV2lkdGg7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIC4uLmUsXHJcbiAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICB0b3A6IGAke2Uuc3R5bGUudG9wfXB4YCxcclxuICAgICAgICAgICAgaGVpZ2h0OiBgJHtlLnN0eWxlLmhlaWdodH1weGAsXHJcbiAgICAgICAgICAgIGxlZnQ6IGAke2Uuc3R5bGUubGVmdH1weGAsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IGAke2UuZGF0YS5jb2xvcn1gLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGJpbmREYXlFdmVudFdpZHRoKCk6IHZvaWQge1xyXG4gICAgLy8g5bSH6LuS5aSn56We54mI5pysXHJcbiAgICAvLyBsZXQgdGVtcFdpZHRoID0gMDtcclxuICAgIC8vIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmRheUV2ZW50cy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgIC8vICAgdGVtcFdpZHRoID0gdGVtcFdpZHRoICsgaW5kZXggKiAxMDtcclxuICAgIC8vIH1cclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgLy8g54Gw5aG154mI5pysICjlg4Xkvpvlj4PogINYRClcclxuICAgICAgY29uc3QgdGVtcFdpZHRoID0gdGhpcy5kYXlFdmVudHMubGVuZ3RoXHJcbiAgICAgICAgPyB0aGlzLmRheUV2ZW50cy5tYXAoKHgsIGkpID0+IGkgKiAxMCkucmVkdWNlKChhLCBiKSA9PiBhICsgYilcclxuICAgICAgICA6IDA7XHJcblxyXG4gICAgICBpZiAoZG9jdW1lbnQuYm9keS5vZmZzZXRXaWR0aCAtIDEwMCA8IDEwMCAqIHRoaXMuZGF5RXZlbnRzLmxlbmd0aCArIHRlbXBXaWR0aCkge1xyXG4gICAgICAgIHRoaXMuYmFycy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgaXRlbS5uYXRpdmVFbGVtZW50LnN0eWxlLndpZHRoID0gYCR7MTAwICogdGhpcy5kYXlFdmVudHMubGVuZ3RoICsgdGVtcFdpZHRofXB4YDtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSwgMCk7XHJcbiAgfVxyXG5cclxuICBwcmV2KCk6IHZvaWQge1xyXG4gICAgdGhpcy5uc3RyLnNldERhdGUodGhpcy5uc3RyLmdldERhdGUoKSAtIDEpO1xyXG4gICAgdGhpcy5pbml0VmlldygpO1xyXG4gIH1cclxuXHJcbiAgbmV4dCgpOiB2b2lkIHtcclxuICAgIHRoaXMubnN0ci5zZXREYXRlKHRoaXMubnN0ci5nZXREYXRlKCkgKyAxKTtcclxuICAgIHRoaXMuaW5pdFZpZXcoKTtcclxuICB9XHJcblxyXG4gIG9wZW5FdmVudChldmVudCk6IHZvaWQge1xyXG4gICAgdGhpcy5vcGVuLmVtaXQoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgaWYgKGNoYW5nZXMubnN0ciB8fCBjaGFuZ2VzLnN0YXJ0IHx8IGNoYW5nZXMuZW5kKSB7XHJcbiAgICAgIHRoaXMuaW5pdFZpZXcoKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19