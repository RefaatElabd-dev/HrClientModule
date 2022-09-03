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

    public UpdateStudentList(){
        this.studentHttpService.getStudentPage(this.searchDTO).subscribe(res =>{
                this.studentList = res;
                this.studentListChanged.next(this.studentList.slice())});
    }

    getStudentOf(index: number): StudentDTO | undefined {
        return this.studentList.find(s => s.id == index);
    }

    addStudent(student: StudentDTO){
        this.studentHttpService.addStudent(student).subscribe(() =>{
                this.UpdateStudentList();
            }
        )
    }

    updateStudent(student: StudentDTO){
        this.studentHttpService.updateStudent(student).subscribe(() =>{
                this.UpdateStudentList();
            }
        )
    }

    deleteStudent(index: number){
        this.studentHttpService.deleteStudent(index).subscribe(() =>{
                this.UpdateStudentList();
            }
        )
    }
}