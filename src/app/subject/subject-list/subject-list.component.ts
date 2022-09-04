import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubjectDTO } from 'src/app/Shared/DTOs/SubjectDTO';
import { SubjectService } from '../Subject.Service';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {


  constructor(private route: ActivatedRoute,
    private router: Router,
    private subjectService: SubjectService) { }

private subjectSubscription!: Subscription;

subjectList!: SubjectDTO[];

ngOnInit(): void {
this.subjectSubscription = this.subjectService.subjectListChanged.subscribe((subjects) =>{
this.subjectList = subjects;
console.table(this.subjectList);
} 
);
this.subjectService.UpdateSubjectList();
this.subjectList = this.subjectService.getSubjectList();
}

onAddSubject(){
this.router.navigate(["new"], {relativeTo: this.route})
}

OnSelectSubject(id: number){
this.router.navigate([id], {relativeTo: this.route})
}

ngOnDestroy(): void {
this.subjectSubscription.unsubscribe();
}
}
