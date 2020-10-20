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

  addResponse(event: { phrase: string, response: string }): void {
    this.responseService.postResponse(event.phrase, event.response);
  }

  removeResponse(event: { phrase: string, response: string }): void {
    console.log(event);
    if (event.response === undefined) {
      return;
    }
    if (this.responses[event.phrase] instanceof Array && this.responses[event.phrase].length > 1) {
      const index = this.responses[event.phrase].indexOf(event.response);
      this.responseService.deleteResponse(event.phrase, index);
    } else {
      this.responseService.deletePhrase(event.phrase);
    }
  }

  removePhrase(phrase: string): void {
    this.responseService.deletePhrase(phrase);
  }

}
