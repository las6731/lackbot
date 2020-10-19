import { Component, OnInit, Renderer2 } from '@angular/core';
import { LightModeService } from './services/light-mode/light-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Lackbot';
  lightMode = false;

  constructor(private renderer: Renderer2, private lightModeService: LightModeService) { }

  ngOnInit(): void {
    this.lightModeService.$lightMode.subscribe(lightMode => {
      if (lightMode) {
        this.renderer.removeClass(document.body, 'bg-darker');
        this.renderer.removeClass(document.body, 'text-light');
      } else {
        this.renderer.addClass(document.body, 'text-light');
        this.renderer.addClass(document.body, 'bg-darker');
      }
    });

    this.onLightModeChanged();
  }

  onLightModeChanged(): void {
    this.lightModeService.$lightMode.next(this.lightMode);
  }
}
