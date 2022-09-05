import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchDTO } from 'src/app/Shared/DTOs/SearchDTO';
import { StudentDTO } from 'src/app/Shared/DTOs/StudentDTO';
import { SubjectService } from 'src/app/subject/Subject.Service';
import { StudentService } from '../Student.Service';
import { ClassDTO } from 'src/app/Shared/DTOs/CLassDTO';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private studentService: StudentService,
              private subjectService: SubjectService) { }

  private studentsSubscription!: Subscription;

  studentList!: StudentDTO[];
  subjectClassesList: ClassDTO[] = [];

  ngOnInit(): void {
    this.studentsSubscription = this.studentService.studentListChanged.subscribe((students) =>{
        this.studentList = students;
        console.table(this.studentList);
      } 
    );
    this.studentService.UpdateStudentList(this.studentService.searchDTO);

    this.subjectService.getAllClasses().subscribe(classes=>{
      this.subjectClassesList = classes;
    });

    this.studentList = this.studentService.getStudentList();
  }

  onSearchSubmit(form: NgForm){
    const value = form.value;
    console.log(value)
    if(value.subjectClass.subjectId)
      this.studentService.searchDTO.subjectId = value.subjectClass.subjectId;
    else
      this.studentService.searchDTO.subjectId = 0;
    this.studentService.searchDTO.studentName = value.name ?? '';
    this.studentService.UpdateStudentList(this.studentService.searchDTO);

    this.studentService.searchDTO = new SearchDTO(this.studentService.searchDTO.skip, this.studentService.searchDTO.take)
  }

  onAddStudent(){
    this.router.navigate(["new"], {relativeTo: this.route})
  }

  OnSelectStudent(id: number){
    this.router.navigate([id], {relativeTo: this.route})
  }

  OnSelectPage(page: string){
    if(page === 'prev'){
      this.studentService.getPrevPage();
    }
    else{
      this.studentService.getNextPage();
    }
  }

  ngOnDestroy(): void {
    this.studentsSubscription.unsubscribe();
  }
}
