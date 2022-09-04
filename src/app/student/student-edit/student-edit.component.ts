import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentDTO } from 'src/app/Shared/DTOs/StudentDTO';
import { StudentSubjects } from 'src/app/Shared/DTOs/StudentSubjectsDTO';
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
  student!: StudentDTO;
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
        if(this.editMode)
          this.student = this.studentService.getStudentOf(this.id);
        else
          this.student = new StudentDTO(0, '', '', '', '', []);

        console.log(this.student)
        this.formInit();
      })
  }

  onSubmit(){
    this.student.name = this.studentForm.value['name'];
    this.student.address = this.studentForm.value['address'];
    this.student.emailAddress = this.studentForm.value['emailAddress'];
    this.student.birthDate = this.studentForm.value['birthDate'];
    if(this.editMode){
      this.studentService.updateStudent(this.student)
    }else{
      this.studentService.addStudent(this.student)
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
    let birthDate: Date = new Date();
    let studentSubjects: any = new FormArray([]);

    if(this.editMode){
      let student: StudentDTO = this.studentService.getStudentOf(this.id);
      name = student.name;
      address = student.address;
      emailAddress = student.emailAddress;
      birthDate = new Date(student.birthDate);
    }
    this.studentService.getStudentSubjects(this.id).subscribe((subjects: SubjectDTO[])=>{
      for(let subject of this.subjectList){
        if(subjects.find(s=> s.id == subject.id)){
          
          studentSubjects.push(
            new FormGroup({
              'name': new FormControl(true, null),
              }));
        }else{
          studentSubjects.push(
            new FormGroup({
              'name': new FormControl(false, null),
              }));
        }
      }
    })

    this.studentForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'address': new FormControl(address, Validators.required),
      'emailAddress': new FormControl(emailAddress, [Validators.required, Validators.email]),
      'birthDate': new FormControl(birthDate, Validators.required),
      'Subjects': studentSubjects
    });
  }

  onAddSubject(){
    (<FormArray> this.studentForm.get('Subjects')).push(
      new FormGroup({
        'name': new FormControl(null, null),
        })
    );
  }

  getSubjectsControls() {
    return (this.studentForm.get('Subjects') as FormArray).controls;
  }

  onDeleteSubject(index: number){
    (<FormArray>this.studentForm.get('Subjects')).removeAt(index);
  }

  onSelectSubject(event: any, subject: SubjectDTO){
    const studentSubject: StudentSubjects = new StudentSubjects(this.student.id, subject.id);
      if(event.target.checked){
          this.student.studentSubjects.push(studentSubject)
          this.studentService.addStudentSubject(studentSubject);
      }
      else{
        let index = this.student.studentSubjects.findIndex(s=> s.subjectId == subject.id);
        this.student.studentSubjects.splice(index, 1)
        this.studentService.removeStudentSubject(studentSubject);
      }
  }

  ngOnDestroy(): void {
    this.subjectSubscription.unsubscribe();
  }
}