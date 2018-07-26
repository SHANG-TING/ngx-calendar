import { Component, OnInit, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { POPUP_TOKEN, PopUpRef } from '../../@core/components';
import { getCalendar } from '../utils';

export enum CalendarSelectorMode {
  Year = 'Year', Month = 'Month', Day = 'Day'
}

@Component({
  selector: 'app-ngx-calendar-month-popup',
  templateUrl: './ngx-calendar-month-popup.component.html',
  styleUrls: ['./ngx-calendar-month-popup.component.scss']
})
export class NgxCalendarMonthPopupComponent implements OnInit, PopUpRef {
  theme;
  mode = CalendarSelectorMode.Year;
  minYear = 2016;
  selectedYear: number;
  selectedMonth: number;
  selectedDate: Date;
  calendarData: any;
  months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  get years() {
    return Array.from({ length: 24 }, (v, k) => k + this.minYear);
  }

  public popupOutputSender = new Subject();
  constructor(@Inject(POPUP_TOKEN) private data) {
    this.theme = data;
  }

  ngOnInit() {
  }

  prevYearRange() {
    this.minYear = this.minYear - 24;
  }

  nextYearRange() {
    this.minYear = this.minYear + 24;
  }

  selectYear(year) {
    this.selectedYear = year;
    this.mode = CalendarSelectorMode.Month;
  }

  selectMonth(month) {
    this.selectedMonth = month;
    this.mode = CalendarSelectorMode.Day;
    // this.popupOutputSender.next(new Date(this.selectedYear, this.selectedMonth, 1));
    this.calendarData =  getCalendar(new Date(this.selectedYear, this.selectedMonth, 1),
      this.selectedYear, this.selectedMonth, 1, []);
      console.log(this.calendarData);
  }

  selectDay(day) {
    this.popupOutputSender.next(day);
  }

  backToYearSelector() {
    this.mode = CalendarSelectorMode.Year;
  }

  backToMonthSelector() {
    this.mode = CalendarSelectorMode.Month;
  }

}
