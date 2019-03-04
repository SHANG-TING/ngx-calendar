# NgxHmCalendar

[![Build status](https://travis-ci.org/SHANG-TING/ngx-calendar.svg?branch=master)](https://travis-ci.org/SHANG-TING/ngx-calendar)
[![npm version](https://img.shields.io/npm/v/ngx-hm-calendar.svg)](https://www.npmjs.com/package/ngx-hm-calendar)
[![MIT Licence](https://img.shields.io/github/license/SHANG-TING/ngx-calendar.svg?color=green)](https://github.com/SHANG-TING/ngx-calendar/blob/master/LICENSE)

A calendar UI for Angular, support mobile touch with Hammerjs.

## Description

This package is design by angular and hammerjs, if you use @angular/material, I strongly recommend you use this package.

Depend on [Hammerjs](https://hammerjs.github.io/)

Support Angular 6+ and Rxjs6+

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

<ngx-hm-carousel
  [(ngModel)]="currentIndex"
  [show-num]="4"
  [autoplay-speed]="speed"
  [infinite]="infinite"
  [drag-many]="true"
  [aniTime]="200"
  [data]="avatars"
  class="carousel c-accent">

  <section ngx-hm-carousel-container class="content">
    <article class="item cursor-pointer"
      ngx-hm-carousel-item
      *ngFor="let avatar of avatars; let i = index"
        [ngClass]="{'visible': currentIndex===i}">
      <div class="img" (click)="click(i)"
        [style.backgroundImage]="'url('+avatar.url+')'">
        {{i}}
      </div>
    </article>
    <ng-template #infiniteContainer></ng-template>
  </section>

  <!-- only using in infinite mode or autoplay mode, that will render with-->
  <ng-template #carouselContent let-avatar let-i="index">
    <article class="item cursor-pointer"
      [ngClass]="{'visible': currentIndex===i}">
      <div class="img" (click)="click(i)"
        [style.backgroundImage]="'url('+avatar.url+')'">
        {{i}}
      </div>
    </article>
  </ng-template>

  <ng-template #carouselPrev>
    <div class="click-area">
      <i class="material-icons">keyboard_arrow_left</i>
    </div>
  </ng-template>
  <ng-template #carouselNext>
    <div class="click-area">
      <i class="material-icons">keyboard_arrow_right</i>
    </div>
  </ng-template>

  <ng-template #carouselDot let-model>
    <div class="ball bg-accent"
      [class.visible]="model.index === model.currentIndex"></div>
  </ng-template>

  <ng-template #carouselProgress let-progress>
    <div class="progress"></div>
  </ng-template>

</ngx-hm-carousel>

```

2. TS

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-drag-one',
  templateUrl: './drag-one.component.html',
  styleUrls: ['./drag-one.component.scss']
})
export class DragOneComponent {

  currentIndex = 0;
  speed = 5000;
  infinite = true;
  direction = 'right';
  directionToggle = true;
  autoplay = true;
  avatars = '1234567891234'.split('').map((x, i) => {
    const num = i;
    // const num = Math.floor(Math.random() * 1000);
    return {
      url: `https://picsum.photos/600/400/?${num}`,
      title: `${num}`
    };
  });

  constructor() { }

  click(i) {
    alert(`${i}`);
  }

}
```

3. SCSS

* this project not contain any specile style, you can custom by yourself

```scss
$transition_time:.2s;

.carousel {
  color:white;
  .content {
    display: flex;

    .item {
      width: 100%;
      padding: .5em;
      display: block;
      opacity: 0.5;

      transition: opacity 0.295s linear $transition_time;

      &.visible {
        opacity: 1;
      }

      .img {
        width: 100%;
        height: 400px;
        display: block;
        background-size: cover;
        background-position: center;
      }
    }


  }

  .ball {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: black;
    border: 2px solid;
    opacity: 0.5;

    &.visible {
      opacity: 1;
    }
  }

  .click-area {
    width: 50px;
    text-align: center;

    i {
      font-size: 3em;
    }
  }
}

```
[View more examples](https://alanzouhome.firebaseapp.com/package/NgxHmCarousel)

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

