import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassDTO } from 'src/app/Shared/DTOs/CLassDTO';
import { SubjectDTO } from 'src/app/Shared/DTOs/SubjectDTO';
import { SubjectService } from '../Subject.Service';

@Component({
  selector: 'app-subject-edit',
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.css']
})
export class SubjectEditComponent implements OnInit {

  @ViewChild('f') subjectForm!: NgForm;
  editMode: boolean = false;
  currentIndex!: number;
  subject!: SubjectDTO;

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private subjectService: SubjectService) { }
  
  ngOnInit(): void {
    this.route.params.subscribe( (params) => {
      this.currentIndex = +params["id"];
      this.editMode = params["id"] != null;
      if(this.editMode)
        this.subject = this.subjectService.getSubjectOf(this.currentIndex);
      else
        this.subject = new SubjectDTO(0, "", new ClassDTO(0, ""));
    })
  }
  
  onSubmit(form: NgForm){
    const value = form.value;
    this.subject.name = value.name;
    this.subject.subjectClass.name = value.subjectClass.name;
    if(this.editMode)
    {
      this.subjectService.updateSubject(this.subject);
    }
    else
    {
      this.subjectService.addSubject(this.subject);
    }
    
    this.editMode = false;
    form.reset();
  }

  onDelete(){
    this.subjectService.deleteSubject(this.currentIndex);
    this.onClear();
  }

  onClear(){
    this.subjectForm.reset();
    this.editMode = false;
  }
}
