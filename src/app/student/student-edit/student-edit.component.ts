import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentDTO } from 'src/app/Shared/DTOs/StudentDTO';
import { StudentService } from '../Student.Service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  id!:number;
  editMode:boolean = false;
  studentForm!: FormGroup;

  constructor(private route:ActivatedRoute, 
              private router: Router,
              private studentService: StudentService) { }

  ngOnInit(): void {
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
    let imagePath = '';
    let description = '';
    let studentIngrediants: any = new FormArray([]);

    if(this.editMode){
      let student: StudentDTO = this.studentService.getStudentOf(this.id);
      name = student.name;
      // imagePath = student.imagePath;
      // description = student.description;
      // if(student['ingrediants']){
      //   for(let ingrediant of student.ingrediants){
      //     studentIngrediants.push(
      //       new FormGroup({
      //         'name': new FormControl(ingrediant.name, Validators.required),
      //         'amount': new FormControl(ingrediant.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      //         }));
        // }
      // }
    }

    this.studentForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingrediants': studentIngrediants
    });
  }

  onAddIngredian(){
    (<FormArray> this.studentForm.get('ingrediants')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      })
    );
  }

  getIngrediantsControls() {
    return (this.studentForm.get('ingrediants') as FormArray).controls;
  }

  onDeleteIngrediant(index: number){
    (<FormArray>this.studentForm.get('ingrediants')).removeAt(index);
  }
}