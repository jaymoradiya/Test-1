import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OnlyAlphabetsDirective } from './only-alphabets.directive';

@NgModule({
  declarations: [
    AppComponent,
    TemplateFormComponent,
    ReactiveFormComponent,
    HomeComponent,
    OnlyAlphabetsDirective,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
