import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchDTO } from 'src/app/Shared/DTOs/SearchDTO';
import { StudentDTO } from 'src/app/Shared/DTOs/StudentDTO';
import { StudentService } from '../Student.Service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private studentService: StudentService) { }

  private studentsSubscription!: Subscription;

  studentList!: StudentDTO[];

  ngOnInit(): void {
    this.studentsSubscription = this.studentService.studentListChanged.subscribe((students) =>{
        this.studentList = students;
        console.table(this.studentList);
      } 
    );
    this.studentService.UpdateStudentList();
    this.studentList = this.studentService.getStudentList();
  }

  onAddStudent(){
    this.router.navigate(["new"], {relativeTo: this.route})
  }

  ngOnDestroy(): void {
    this.studentsSubscription.unsubscribe();
  }
}
