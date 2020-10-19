import { Component } from '@angular/core';
import { LightModeService } from '../services/light-mode/light-mode.service';
import { ResponseService } from '../services/response/response.service';

@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.scss']
})
export class ResponsesComponent {

  responses: any;
  lightMode: boolean;

  constructor(private responseService: ResponseService, private lightModeService: LightModeService) {
    this.lightModeService.$lightMode.subscribe(lightMode => this.lightMode = lightMode);
    this.responseService.$responses.subscribe(responses => this.responses = responses);
    this.responseService.getResponses();
  }

  isArray(obj: any): boolean {
    return obj instanceof Array;
  }

  removeResponse(phrase: string, response: string): void {
    if (this.responses[phrase] instanceof Array && this.responses[phrase].length > 1) {
      const index = this.responses[phrase].indexOf(response);
      this.responseService.deleteResponse(phrase, index);
    } else {
      this.responseService.deletePhrase(phrase);
    }
  }

  removePhrase(phrase: string): void {
    this.responseService.deletePhrase(phrase);
  }

}
