import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LightModeService {

  $lightMode: Subject<boolean>;

  constructor() {
    this.$lightMode = new Subject();
  }
}
