import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentComponent } from './student/student.component';
import { SubjectComponent } from './subject/subject.component';
import { ClassComponent } from './class/class.component';
import { SubjectStartComponent } from './subject/subject-start/subject-start.component';
import { SubjectEditComponent } from './subject/subject-edit/subject-edit.component';
import { SubjectDetailsComponent } from './subject/subject-details-component/subject-details.component';
import { StudentStartComponent } from './student/student-start/student-start.component';
import { StudentEditComponent } from './student/student-edit/student-edit.component';
import { StudentDetailsComponent } from './student/student-details/student-details.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    SubjectComponent,
    ClassComponent,
    SubjectStartComponent,
    SubjectEditComponent,
    SubjectDetailsComponent,
    StudentStartComponent,
    StudentEditComponent,
    StudentDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
