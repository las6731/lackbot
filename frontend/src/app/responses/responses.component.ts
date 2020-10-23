import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  addPhraseForm: FormGroup;

  constructor(private responseService: ResponseService, private lightModeService: LightModeService, private fb: FormBuilder) {
    this.lightModeService.$lightMode.subscribe(lightMode => this.lightMode = lightMode);
    this.responseService.$responses.subscribe(responses => this.responses = responses);
    this.responseService.getResponses();

    this.addPhraseForm = fb.group({
      phrase: '',
      response: ''
    });
  }

  addResponse(event: { phrase: string, response: string }): void {
    event.phrase = event.phrase.trim().toLowerCase();
    event.response = event.response.trim();
    this.responseService.postResponse(event.phrase, event.response);
  }

  removeResponse(event: { phrase: string, response: string }): void {
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

  addPhrase(): void {
    const phrase = this.addPhraseForm.value.phrase.trim().toLowerCase();
    const response = this.addPhraseForm.value.response.trim();
    this.responseService.postResponse(phrase, response);

    this.addPhraseForm.reset();
  }

}
