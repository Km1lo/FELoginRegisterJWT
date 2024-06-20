import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  constructor(private viewportScroller: ViewportScroller) { }
  /*NAVBAR*/
  scrollToSection(id: string) {
    this.viewportScroller.scrollToAnchor(id);
  }
}
