import { animateAsyncTransition } from '../animate.async.transition';
import {
  style,
  state,
  animate,
  AnimationStateMetadata,
  AnimationTransitionMetadata,
  query,
  group,
  animateChild,
  transition
} from '@angular/animations';

export function fly(timing: string): (AnimationStateMetadata | AnimationTransitionMetadata)[] {
  return [
    state('flyOut', style({
      transform: 'translateX(calc(100% - 55px))'
    })),
    state('flyIn', style({
      transform: 'translateX(0)'
    })),
    animateAsyncTransition('flyOut => flyIn', [
      style({
        transform: 'translateX(calc(100% - 55px))'
      }),
      animate(timing)
    ]),
    animateAsyncTransition('flyIn => flyOut', [
      style({
        transform: 'translateX(0)'
      }),
      animate(timing)
    ])
  ];
}
