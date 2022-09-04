import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { SubjectDTO } from "../Shared/DTOs/SubjectDTO";
import { SubjectHttpService } from "./SubjectHttp.Service";

@Injectable({
    providedIn: 'root'
})
export class SubjectService{
   
    constructor(private subjectHttpService: SubjectHttpService){ }

    subjectList: SubjectDTO[] = [];
    subjectListChanged = new Subject<SubjectDTO[]>();

    public getSubjectList(): SubjectDTO[]{
        return this.subjectList.slice();
    }

    public UpdateSubjectList(){
        this.subjectHttpService.getSubjects().subscribe(res =>{
                this.subjectList = res;
                this.subjectListChanged.next(this.subjectList.slice())});
    }

    getSubjectOf(index: number): SubjectDTO {
        let subject = this.subjectList.find(s => s.id == index);
        if(subject != undefined)
            return subject;
        else 
            return this.subjectList[0];
    }

    addSubject(subject: SubjectDTO){
        this.subjectHttpService.addSubject(subject).subscribe(() =>{
                this.UpdateSubjectList();
            }
        )
    }

    updateSubject(subject: SubjectDTO){
        this.subjectHttpService.updateSubject(subject).subscribe(() =>{
                this.UpdateSubjectList();
            }
        )
    }

    deleteSubject(index: number){
        this.subjectHttpService.deleteSubject(index).subscribe(() =>{
                this.UpdateSubjectList();
            }
        )
    }
}