import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectDTO } from 'src/app/Shared/DTOs/SubjectDTO';
import { SubjectService } from '../Subject.Service';
import { SubjectComponent } from './../subject.component';

@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.css']
})
export class SubjectDetailsComponent implements OnInit {

  subject!: SubjectDTO;
  id!: number;
  constructor(private subjectService: SubjectService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe( params =>{
      this.id = +params['id'];
      this.subject = this.subjectService.getSubjectOf(this.id);
      console.log(this.subject)
    })
  }

  onEditSubject(){
    this.router.navigate(["edit"], { relativeTo: this.route })
  }

  onDelete(){
    this.subjectService.deleteSubject(this.id);
    this.router.navigate(["/Subjects"]);
  }

}
