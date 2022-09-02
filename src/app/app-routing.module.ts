import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassComponent } from './class/class.component';
import { StudentDetailsComponent } from './student/student-details/student-details.component';
import { StudentEditComponent } from './student/student-edit/student-edit.component';
import { StudentStartComponent } from './student/student-start/student-start.component';
import { StudentComponent } from './student/student.component';
import { SubjectDetailsComponent } from './subject/subject-details-component/subject-details.component';
import { SubjectEditComponent } from './subject/subject-edit/subject-edit.component';
import { SubjectStartComponent } from './subject/subject-start/subject-start.component';
import { SubjectComponent } from './subject/subject.component';

const routes: Routes = [];
const appRoutes: Routes = [
  { path: '', redirectTo: '/Students', pathMatch: 'full' },
  { path: 'Students', component:  StudentComponent, children: [
    { path: '', component: StudentStartComponent },
    { path: 'new', component: StudentEditComponent },
    { path: ':id', component: StudentDetailsComponent },
    { path: ':id/edit', component: StudentEditComponent }
    ] },
  { path: 'Subjects', component: SubjectComponent, children: [
      { path: '', component: SubjectStartComponent },
      { path: 'new', component: SubjectEditComponent },
      { path: ':id', component: SubjectDetailsComponent },
      { path: ':id/edit', component: SubjectEditComponent }
      ] 
  },
  { path: 'Classes', component: ClassComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
