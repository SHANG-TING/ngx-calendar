import { Component, OnInit, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { POPUP_TOKEN, PopUpRef } from '../../@core/components';

export enum CalendarSelectorMode {
  Year = 'Year', Month = 'Month'
}

@Component({
  selector: 'app-ngx-calendar-month-popup',
  templateUrl: './ngx-calendar-month-popup.component.html',
  styleUrls: ['./ngx-calendar-month-popup.component.css']
})
export class NgxCalendarMonthPopupComponent implements OnInit, PopUpRef {
  mode = CalendarSelectorMode.Year;
  minYear = 2016;
  selectedYear: number;
  selectedMonth: number;
  months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  get years() {
    return Array.from({length: 24 }, (v, k) => k + this.minYear);
  }

  public popupOutputSender = new Subject();
  constructor(@Inject(POPUP_TOKEN) private data) {
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
    this.popupOutputSender.next(new Date(this.selectedYear, this.selectedMonth, 1));
  }

  backToYearSelector() {
    this.mode = CalendarSelectorMode.Year;
  }

}
