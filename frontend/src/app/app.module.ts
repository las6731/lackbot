import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ResponsesComponent } from './responses/responses.component';
import { ResponseService } from './services/response/response.service';
import { HttpClientModule } from '@angular/common/http';
import { LightModeService } from './services/light-mode/light-mode.service';
import { PhraseComponent } from './responses/phrase/phrase.component';

@NgModule({
  declarations: [
    AppComponent,
    ResponsesComponent,
    PhraseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    HttpClientModule
  ],
  providers: [
    ResponseService,
    LightModeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
