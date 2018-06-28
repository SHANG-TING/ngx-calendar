import { Injectable } from '@angular/core';
import { CalendarDay, CalendarEvent, CalendarWeek } from './@core/models';

@Injectable({
  providedIn: 'root'
})
export class NgxCalendarService {

  constructor() { }

  /** 判斷是否為閏年 */
  is_leap(year) {
    return (year % 100 === 0 ? (year % 400 === 0 ? 1 : 0) : (year % 4 === 0 ? 1 : 0));
  }

  getCalendar(nstr: Date, ynow: number, mnow: number, dnow: number, events: CalendarEvent[]): Array<CalendarWeek> {
    // 今天
    const today = new Date();
    // 當月第一天
    const nlstr = new Date(ynow, mnow, 1);
    // 第一天星期幾
    const firstday = nlstr.getDay();
    // 每個月的天數
    const m_days = new Array(31, 28 + this.is_leap(ynow), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    // 當前月天數+第一天是星期幾的數值 獲得 表格行數
    const tr_str = Math.ceil((m_days[mnow] + firstday) / 7);
    // 結果
    const calendar: Array<CalendarWeek> = [];

    let i, k, idx, date_str;

    // 表格的行
    for (i = 0; i < tr_str; i++) {
      const week: CalendarWeek = {
        days: [], style: {}
      };

      // 表格每行的單元格
      for (k = 0; k < 7; k++) {
        // 單元格自然序列號
        idx = i * 7 + k;
        // 計算日期
        date_str = idx - firstday + 1;

        let calendarDay: CalendarDay;

        if (date_str <= 0) { // 過濾無效日期（小於等於零的）
          // 取當月第一天
          const mPrev = new Date(ynow, mnow, 1);
          // 將日期-1為上個月的最後一天，隨著上個月天數變化
          mPrev.setDate(mPrev.getDate() + date_str - 1);
          // 設定日期
          // date_str = mPrev.getDate();
          calendarDay = { date: mPrev, other: true };

        } else if (date_str > m_days[mnow]) { // 過濾無效日期（大於月總天數的）
          // 取當月第一天
          const mNext = new Date(ynow, mnow, 1);
          // 取下個月第一天
          mNext.setMonth(mNext.getMonth() + 1);
          // 隨著下個月天數變化
          mNext.setDate(mNext.getDate() + (date_str - m_days[mnow]) - 1);
          // 設定日期
          // date_str = mNext.getDate();
          calendarDay = { date: mNext, other: true };
        } else {
          calendarDay = { date: new Date(ynow, mnow, date_str) };
        }

        calendarDay.events = events.filter(event => this.contain(event, calendarDay.date));
        calendarDay.name = calendarDay.date.getDay();
        calendarDay.number = calendarDay.date.getDate();
        calendarDay.isToday = calendarDay.date.getFullYear() === today.getFullYear()
          && calendarDay.date.getMonth() === today.getMonth()
          && calendarDay.date.getDate() === today.getDate();

        week.days.push(calendarDay);
      }

      calendar.push(week);
    }
    return calendar;
  }

  contain(event: CalendarEvent, date: Date): boolean {
    if (event.start && event.end) {
      const start = new Date(event.start.getFullYear(), event.start.getMonth(), event.start.getDate());
      const end = new Date(event.end.getFullYear(), event.end.getMonth(), event.end.getDate());
      end.setDate(end.getDate() + 1);

      return start.getTime() <= date.getTime()
        && end.getTime() > date.getTime();
    }

    if (event.start) {
      return event.start.getFullYear() === date.getFullYear()
        && event.start.getMonth() === date.getMonth()
        && event.start.getDate() === date.getDate();
    }

    return false;
  }

}
