import { Injectable } from "@angular/core";
import { SearchDTO } from '../Shared/DTOs/SearchDTO';
import { StudentDTO } from '../Shared/DTOs/StudentDTO';
import { Observable, Subject } from "rxjs";
import { StudentHttpService } from './StudentHttp.service';

@Injectable({
    providedIn: 'root'
})
export class StudentService{
   
    constructor(private studentHttpService: StudentHttpService){
        this.searchDTO = new SearchDTO(0, 10)

    }

    searchDTO: SearchDTO;
    studentList: StudentDTO[] = [];
    studentListChanged = new Subject<StudentDTO[]>();

    public getStudentList(): StudentDTO[]{
        return this.studentList.slice();
    }

    public UpdateStudentList(search: SearchDTO){
        this.studentHttpService.getStudentPage(search).subscribe(res =>{
                this.studentList = res;
                this.studentListChanged.next(this.studentList.slice())});
    }

    getStudentOf(index: number): StudentDTO {
        let student = this.studentList.find(s => s.id == index);
        if(student != undefined)
            return student;
        else 
            return this.studentList[0];
    }

    addStudent(student: StudentDTO){
        this.studentHttpService.addStudent(student).subscribe(() =>{
                this.UpdateStudentList(this.searchDTO);
            }
        )
    }

    updateStudent(student: StudentDTO){
        this.studentHttpService.updateStudent(student).subscribe(() =>{
                this.UpdateStudentList(this.searchDTO);
            }
        )
    }

    deleteStudent(index: number){
        this.studentHttpService.deleteStudent(index).subscribe(() =>{
                this.UpdateStudentList(this.searchDTO);
            }
        )
    }

    getPrevPage() {
        if(this.searchDTO.skip == 0)return;
        
        this.searchDTO.skip -= 10;
        this.UpdateStudentList(this.searchDTO);
      }

      getNextPage() {
        if(this.studentList.length < 1)return;
        this.searchDTO.skip += 10;
        this.UpdateStudentList(this.searchDTO);
      }
}