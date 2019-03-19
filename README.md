# NgxHmCalendar

[![Build status](https://travis-ci.org/SHANG-TING/ngx-calendar.svg?branch=master)](https://travis-ci.org/SHANG-TING/ngx-calendar)
[![npm version](https://img.shields.io/npm/v/ngx-hm-calendar.svg)](https://www.npmjs.com/package/ngx-hm-calendar)
[![MIT Licence](https://img.shields.io/github/license/SHANG-TING/ngx-calendar.svg?color=green)](https://github.com/SHANG-TING/ngx-calendar/blob/master/LICENSE)

A calendar UI for Angular, support mobile touch with Hammerjs.

## Description

Depend on [Hammerjs](https://hammerjs.github.io/)

Support Angular 7+ and Rxjs6+

## Example
https://alanzouhome.firebaseapp.com/package/NgxHmCarousel

![](https://res.cloudinary.com/dw7ecdxlp/image/upload/v1533206320/1533206262496_soounq.gif)


## Install

```ts
npm install --save ngx-hm-calendar
```

1. HammerJs

+ Import `hammerjs` in your main.ts or app.module.ts;

```ts
import 'hammerjs';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
...
...
```

+ Import `NgxHmCarouselModule` into your main AppModule or the module where you want use.

1. Module

```ts
import { NgxHmCalendarModule } from 'ngx-hm-calendar';

@NgModule({
  imports: [
    NgxHmCalendarModule
  ]
})
export class YourModule {}
```

2. HTML


```html

<ngx-hm-calendar [className]="theme"
                   [events]="events"
                   (open)="onOpenEvent($event)"></ngx-hm-calendar>

```

2. TS

```ts
import { Component } from '@angular/core';
import { NgxHmCalendarEvent } from 'ngx-hm-calendar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  theme = 'black';
  title = 'app';
  events: NgxHmCalendarEvent[] = [
    {
      title: '學科',
      start: new Date(2018, 7, 6, 18, 30),
      end: new Date(2018, 7, 6, 21, 0),
      color: 'orange',
      url:
        'https://docs.google.com/forms/d/e/1FAIpQLSchC4AadufooQ_wR7krQk9ys2nsPmekq0qj22ZodxPT9Dlxjw/viewform',
    },
    {
      title: '學科',
      start: new Date(2018, 7, 4, 9, 30),
      end: new Date(2018, 7, 4, 12, 0),
      color: 'orange',
      url:
        'https://docs.google.com/forms/d/e/1FAIpQLSchC4AadufooQ_wR7krQk9ys2nsPmekq0qj22ZodxPT9Dlxjw/viewform',
    },
    {
      title: '學科',
      start: new Date(2018, 7, 13, 18, 30),
      end: new Date(2018, 7, 13, 21, 0),
      color: 'orange',
      url:
        'https://docs.google.com/forms/d/e/1FAIpQLSchC4AadufooQ_wR7krQk9ys2nsPmekq0qj22ZodxPT9Dlxjw/viewform',
    },
    {
      title: '學科',
      start: new Date(2018, 7, 11, 9, 30),
      end: new Date(2018, 7, 11, 12, 0),
      color: 'orange',
      url:
        'https://docs.google.com/forms/d/e/1FAIpQLSchC4AadufooQ_wR7krQk9ys2nsPmekq0qj22ZodxPT9Dlxjw/viewform',
    },
    {
      title: '學科',
      start: new Date(2018, 7, 20, 18, 30),
      end: new Date(2018, 7, 20, 21, 0),
      color: 'orange',
      url:
        'https://docs.google.com/forms/d/e/1FAIpQLSchC4AadufooQ_wR7krQk9ys2nsPmekq0qj22ZodxPT9Dlxjw/viewform',
    },
    {
      title: '學科',
      start: new Date(2018, 7, 18, 9, 30),
      end: new Date(2018, 7, 18, 12, 0),
      color: 'orange',
      url:
        'https://docs.google.com/forms/d/e/1FAIpQLSchC4AadufooQ_wR7krQk9ys2nsPmekq0qj22ZodxPT9Dlxjw/viewform',
    },
    {
      title: '學科',
      start: new Date(2018, 7, 27, 18, 30),
      end: new Date(2018, 7, 28, 21, 0),
      color: 'orange',
      url:
        'https://docs.google.com/forms/d/e/1FAIpQLSchC4AadufooQ_wR7krQk9ys2nsPmekq0qj22ZodxPT9Dlxjw/viewform',
    },
    {
      title: '學科',
      start: new Date(2018, 7, 25, 9, 30),
      end: new Date(2018, 7, 25, 12, 0),
      color: 'orange',
      url:
        'https://docs.google.com/forms/d/e/1FAIpQLSchC4AadufooQ_wR7krQk9ys2nsPmekq0qj22ZodxPT9Dlxjw/viewform',
    },
  ];

  addEvent() {
    const newEvents = this.events.slice();
    newEvents.push(this.events[0]);
    this.events = newEvents;
  }

  onOpenEvent($event: NgxHmCalendarEvent) {
    // alert(JSON.stringify($event));
    window.open($event.url);
  }

  changeTheme() {
    this.theme = this.theme === 'black' ? 'white' : 'black';
  }
}
```

[View more examples](https://shang-ting.github.io/ngx-calendar/)

## Attribute

### Configuration (Input)
-------------

| Attribute            | Necessary | Default value    | Type                        | Location        | Description                                                                                                                                         |
| -------------------- | --------- | ---------------- | --------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `autoplay`           | no        | false            | boolean                     | ngx-hm-carousel | carousel auto play confing                                                                                                                          |
| `autoplay-speed`     | no        | 5000 (ms)        | number                      | ngx-hm-carousel | auto play speed                                                                                                                                     |
| `between-delay`      | no        | 8000 (ms)        | number                      | ngx-hm-carousel | each auto play between time                                                                                                                         |
| `autoplay-direction` | no        | 'right'          | 'left' or 'right'           | ngx-hm-carousel | auto play direction                                                                                                                                 |
| `mourse-enable`      | no        | false            | boolean                     | ngx-hm-carousel | is mourse moveover stop the auto play                                                                                                               |
| `autoplay`           | no        | false            | boolean                     | ngx-hm-carousel | carousel auto play confing                                                                                                                          |
| `[breakpoint]`       | no        | []               | `NgxHmCarouselBreakPointUp` | ngx-hm-carousel | switch show number with own logic like boostrap scss media-breakpoint-up                                                                            |
| `show-num`           | no        | 1                | number  or 'auto'           | ngx-hm-carousel | how many number items to show once                                                                                                                  |
| `scroll-num`         | no        | 1                | number                      | ngx-hm-carousel | how many number with each scroll                                                                                                                    |
| `drag-many`          | no        | false            | boolean                     | ngx-hm-carousel | is can scroll many item once,  simulate with scrollbar                                                                                              |
| `align`              | no        | 'left'           | 'left' or 'right'           | 'center'        | ngx-hm-carousel                                                                                                                                     | when show-num is bigger than 1, the first item align |
| `infinite`           | no        | false            | boolean                     | ngx-hm-carousel | is the carousel will move loop                                                                                                                      |
| `data`               | no        | undefined        | any[]                       | ngx-hm-carousel | the data you using with `*ngFor`, it need when infinite mode or autoplay mode                                                                       |
| `aniTime`            | no        | 400              | number                      | ngx-hm-carousel | when `infinite` is true, the animation time with item                                                                                               |
| `aniClass`           | no        | 'transition'     | string                      | ngx-hm-carousel | this class will add when carousel touch drap or click change index                                                                                  |
| `aniClassAuto`       | no        | using `aniClass` | string                      | ngx-hm-carousel | this class will add when carousel auto play                                                                                                         |
| `disable-drag`       | no        | false            | boolean                     | ngx-hm-carousel | disable drag event with touch and mouse pan moving                                                                                                  |
| `not-follow-pan`     | no        | false            | boolean                     | ngx-hm-carousel | disable when drag occur the child element will follow touch point.                                                                                  |
| `[(ngModel)]`        | no        | 0                | number                      | ngx-hm-carousel | You can bind ngModel with this carousel, it will two way binding with current index. You also can use `(ngModelChange)="change($event)"` with that. |

