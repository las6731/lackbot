import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ResponsesComponent } from './responses/responses.component';
import { ResponseService } from './services/response/response.service';
import { HttpClientModule } from '@angular/common/http';
import { LightModeService } from './services/light-mode/light-mode.service';

@NgModule({
  declarations: [
    AppComponent,
    ResponsesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
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
