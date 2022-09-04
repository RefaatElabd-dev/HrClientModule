import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentDTO } from 'src/app/Shared/DTOs/StudentDTO';
import { StudentService } from '../Student.Service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  student!: StudentDTO;
  id!: number;
  constructor(private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe( params =>{
      this.id = +params['id'];
      this.student = this.studentService.getStudentOf(this.id);
      console.log(this.student)
    })
  }

  onEditStudent(){
    this.router.navigate(["edit"], { relativeTo: this.route })
  }

  onDelete(){
    this.studentService.deleteStudent(this.id);
    this.router.navigate(["/Students"]);
  }
}
