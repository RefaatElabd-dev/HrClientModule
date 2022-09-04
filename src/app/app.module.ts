import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http'
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
import { HeaderComponent } from './header/header.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { setConfig } from './Shared/Helpers/apiHelper';
import { SharedValueService } from './Shared/Services/shared-value.service';
import { StudentItemComponent } from './student/student-list/student-item/student-item.component';
import { SubjectListComponent } from './subject/subject-list/subject-list.component';

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
    StudentDetailsComponent,
    HeaderComponent,
    StudentListComponent,
    StudentItemComponent,
    SubjectListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: setConfig,
      multi: true,
      deps: [SharedValueService, HttpClient],
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
