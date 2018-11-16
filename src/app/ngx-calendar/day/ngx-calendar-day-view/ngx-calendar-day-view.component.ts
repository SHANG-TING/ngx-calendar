import {
  Component, Input, QueryList, ViewChildren, ElementRef, OnChanges, SimpleChanges,
  ViewChild, AfterViewInit, EventEmitter, Output
} from '@angular/core';
import { CalendarEvent, CalendarElmDetial } from '../../ngx-calendar.model';
import { HOUR_SCHEMAS } from './data';

@Component({
  selector: 'ngx-calendar-day-view',
  templateUrl: './ngx-calendar-day-view.component.html',
  styleUrls: ['./ngx-calendar-day-view.component.scss']
})
export class NgxCalendarDayViewComponent implements AfterViewInit, OnChanges {
  @ViewChild('scrollElm') scrollElm: ElementRef;

  hasScroll = false;

  @Input() className = 'black';
  @Input() events: CalendarEvent[] = [];
  @Input() nstr = new Date(2018, 6, 16);
  @Input() start = '00:00';
  @Input() end = '24:00';
  @Input() split = 30;

  @Output() open: EventEmitter<any> = new EventEmitter();

  elmWidth = 110;

  @ViewChildren('bar') bars: QueryList<ElementRef>;

  get firstDate() {
    const date = new Date(this.nstr.getFullYear(), this.nstr.getMonth(), this.nstr.getDate());
    const time = this.start.split(':');

    if (time.length > 0) {
      const hour = Number(time[0]);
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

  get lastDate() {
    const date = new Date(this.nstr.getFullYear(), this.nstr.getMonth(), this.nstr.getDate());
    const time = this.end.split(':');

    if (time.length > 0) {
      const hour = Number(time[0]);
      const minute = Number(time[1]);

      if (hour) {
        date.setHours(hour);

        if (minute) {
          date.setMinutes(minute);
        }
      }
    }

    if ((Number(date) - Number(this.firstDate)) <= 0) {
      date.setHours(24);
      date.setMinutes(0);
    }

    return date;
  }

  dayEvents: CalendarElmDetial<string>[] = [];

  hourSchemas: any[] = HOUR_SCHEMAS;

  constructor() { }

  ngAfterViewInit(): void {
    this.initView();
  }

  initView(): void {
    this.setHourSchemas();
    this.setDayEvent();
    this.bindDayEventWidth();

    setTimeout(() => {
      const elm = this.scrollElm.nativeElement as HTMLElement;
      this.hasScroll = elm.scrollWidth > elm.clientWidth;
      // console.log(this.hasScroll);
    }, 0);
  }

  setHourSchemas(): void {
    const diffMs = (Number(this.lastDate) - Number(this.firstDate));
    const diffHrs = Math.ceil(diffMs / 3600000); // hours
    // const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    const firstHour = this.firstDate.getHours();

    this.hourSchemas = [];

    for (let i = firstHour; i < firstHour + diffHrs; i++) {
      this.hourSchemas.push({
        name: `${('0' + i).substr(-2)} ${i > 12 ? 'PM' : 'AM'}`
      });
    }
  }

  setDayEvent(): void {
    const width = 30;
    const firstdate = this.firstDate;
    const lastdate = this.lastDate;
    const getPixelForDiffSplit = (end, start) => {
      const diffMs = (end.getTime() - start.getTime());
      return (diffMs % 86400000) / (this.split * 60 * 1000);
    };

    this.dayEvents = this.events
      // 先過濾出會經過這一天的事件們
      .filter((e: CalendarEvent) => {
        return (e.start >= firstdate && e.start < lastdate) ||
          (firstdate >= e.start && firstdate <= e.end) ||
          (firstdate >= e.start && lastdate < e.end);
      })
      // 根據開始時間做排序
      .sort((e1: CalendarEvent, e2: CalendarEvent) => e1.start.getTime() - e2.start.getTime())
      // 轉換為畫面上需要綁定的值
      .map((e: CalendarEvent, i: number) => {
        const elmDetial: CalendarElmDetial = {
          style: {
            top: 0,
            height: 0,
            left: i * this.elmWidth,
            // background: e.color.toString()
          },
          startsBeforeWeek: true,
          endsAfterWeek: true,
          data: e
        };
        // if event first date is bigger than firstdate
        if (e.start >= firstdate) {
          if (e.end < lastdate) {

            //      |---------------------|
            //            |---------|

            elmDetial.style.top = getPixelForDiffSplit(e.start, firstdate) * width;
            elmDetial.style.height = getPixelForDiffSplit(e.end, e.start) * width;

          } else if (e.start < lastdate && e.end >= lastdate) {

            //      |---------------------|
            //                |--------------------|

            elmDetial.style.top = getPixelForDiffSplit(e.start, firstdate) * width;
            elmDetial.style.height = getPixelForDiffSplit(lastdate, e.start) * width;
            elmDetial.endsAfterWeek = false;

          }
        } else if (e.start <= firstdate) {
          // if event first date is bigger than firstdate
          if (lastdate < e.end) {
            elmDetial.style.height = this.hourSchemas.length * 2 * width;
            elmDetial.startsBeforeWeek = false;
            elmDetial.endsAfterWeek = false;
          } else if (firstdate <= e.end && e.end < lastdate) {
            elmDetial.style.height = getPixelForDiffSplit(e.end, firstdate) * width;
            elmDetial.startsBeforeWeek = false;
          }
        }

        return elmDetial;
      })
      // 再次過濾出在這hour區間裡面的事件們
      .filter((e: CalendarElmDetial) => e.style.height !== 0)
      // 重新綁定left的順序
      .map((e: CalendarElmDetial, i) => {
        e.style.left = i * this.elmWidth;
        return {
          ...e,
          style: {
            top: `${e.style.top}px`,
            height: `${e.style.height}px`,
            left: `${e.style.left}px`,
          }
        };
      });
  }

  bindDayEventWidth(): void {
    // 崇軒大神版本
    // let tempWidth = 0;
    // for (let index = 0; index < this.dayEvents.length; index++) {
    //   tempWidth = tempWidth + index * 10;
    // }

    setTimeout(() => {
      // 灰塵版本 (僅供參考XD)
      const tempWidth = this.dayEvents.length ? this.dayEvents.map((x, i) => i * 10).reduce((a, b) => a + b) : 0;

      if ((document.body.offsetWidth - 100) < (100 * this.dayEvents.length) + tempWidth) {

        this.bars.forEach(
          (item, index) => {
            item.nativeElement.style.width = `${(100 * this.dayEvents.length) + tempWidth}px`;
          }
        );
      }
    }, 0);
  }

  onScroll($event: Event) {
    $event.preventDefault();
    const elm = $event.srcElement as HTMLElement;
    if (elm.scrollLeft === 0) {
      console.log('start');
      // this.prev();
    } else if (elm.scrollLeft === elm.scrollWidth - elm.clientWidth) {
      console.log('end');
      // this.next();
    }
  }

  prev(): void {
    this.nstr.setDate(this.nstr.getDate() - 1);
    this.initView();
  }

  next(): void {
    this.nstr.setDate(this.nstr.getDate() + 1);
    this.initView();
  }

  openEvent(event): void {
    this.open.emit(event);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nstr || changes.start || changes.end) {
      this.initView();
    }
  }

}



    // {
    //   style: {
    //     top: '30px',
    //     height: '180px',
    //     background: 'yellow'
    //   },
    //   data: {}
    // }, {
    //   style: {
    //     top: '60px',
    //     height: '180px',
    //     left: '110px',
    //     background: 'blue'
    //   },
    //   data: {}
    // }, {
    //   style: {
    //     top: '30px',
    //     height: '180px',
    //     left: '220px',
    //     background: 'red'
    //   },
    //   data: {}
    // },
