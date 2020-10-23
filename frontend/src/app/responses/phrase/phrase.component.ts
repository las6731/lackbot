import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-phrase',
  templateUrl: './phrase.component.html',
  styleUrls: ['./phrase.component.scss']
})
export class PhraseComponent implements OnInit {

  @Input() phrase: any;
  @Output() deletePhrase: EventEmitter<string>;
  @Output() deleteResponse: EventEmitter<{ phrase: string, response: string }>;
  @Output() addResponse: EventEmitter<{ phrase: string, response: string }>;

  phraseForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.deletePhrase = new EventEmitter();
    this.deleteResponse = new EventEmitter();
    this.addResponse = new EventEmitter();
  }

  ngOnInit(): void {
    if (!(this.phrase.value instanceof Array)) {
      this.phrase.value = [this.phrase.value];
    }
    this.phraseForm = this.fb.group({
      phrase: this.phrase.key,
      responses: this.fb.array(this.phrase.value)
    });
  }

  addResponseControl(): void {
    this.responses.push(this.fb.control(''));
  }

  removeResponse(index: number): void {
    this.deleteResponse.emit({ phrase: this.phrase.key, response: this.phrase.value[index] });
    this.responses.removeAt(index);
  }

  get responses(): FormArray {
    return this.phraseForm.get('responses') as FormArray;
  }

  isArray(obj: any): boolean {
    return obj instanceof Array;
  }

}
