import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Lackbot';
  lightMode = false;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'text-light');
    this.renderer.addClass(document.body, 'bg-darker');
  }

  onLightModeChanged(): void {
    if (this.lightMode) {
      this.renderer.removeClass(document.body, 'bg-darker');
      this.renderer.removeClass(document.body, 'text-light');
    } else {
      this.renderer.addClass(document.body, 'text-light');
      this.renderer.addClass(document.body, 'bg-darker');
    }
  }
}
