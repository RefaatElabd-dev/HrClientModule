import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentDTO } from 'src/app/Shared/DTOs/StudentDTO';
import { SubjectDTO } from 'src/app/Shared/DTOs/SubjectDTO';
import { StudentService } from '../Student.Service';
import { SubjectService } from './../../subject/Subject.Service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit, OnDestroy {
  id!:number;
  editMode:boolean = false;
  studentForm: FormGroup = new FormGroup({});
  private subjectSubscription!: Subscription;

  subjectList!: SubjectDTO[];
  constructor(private route:ActivatedRoute, 
              private router: Router,
              private studentService: StudentService,
              private subjectService: SubjectService) { }

  ngOnInit(): void {
  this.subjectSubscription = this.subjectService.subjectListChanged.subscribe((subjects) =>{
    this.subjectList = subjects;
    console.log(subjects)
  });

  this.subjectService.UpdateSubjectList();
  this.subjectList = this.subjectService.getSubjectList();
    this.route.params.subscribe( (params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      this.formInit();
    })
  }

  onSubmit(){
    if(this.editMode){
      this.studentService.updateStudent(this.studentForm.value)
    }else{
      this.studentService.addStudent(this.studentForm.value)
    }
    this.onCancel();
  }

  onCancel(){
    this.router.navigate(["../"], { relativeTo: this.route })
  }

  formInit(){
    let name = '';
    let address = '';
    let emailAddress = '';
    // let birthDate: Date = new Date();
    let studentSubjects: any = new FormArray([]);

    if(this.editMode){
      let student: StudentDTO = this.studentService.getStudentOf(this.id);
      name = student.name;
      address = student.address;
      emailAddress = student.emailAddress;
      // birthDate = new Date(student.birthDate);
    }
    for(let subject of this.subjectList){
      studentSubjects.push(
        new FormGroup({
          'name': new FormControl(subject.name, null),
          }));
    }

    this.studentForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'address': new FormControl(address, Validators.required),
      'emailAddress': new FormControl(emailAddress, Validators.required),
      // 'birthDate': new FormControl(birthDate, Validators.required),
      'Subjects': studentSubjects
    });
  }

  onAddIngredian(){
    (<FormArray> this.studentForm.get('Subjects')).push(
      new FormGroup({
        'name': new FormControl(null, null),
        })
    );
  }

  getSubjectsControls() {
    return (this.studentForm.get('Subjects') as FormArray).controls;
  }

  onDeleteIngrediant(index: number){
    (<FormArray>this.studentForm.get('Subjects')).removeAt(index);
  }

  ngOnDestroy(): void {
    this.subjectSubscription.unsubscribe();
  }
}