import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { SharedValueService } from "src/app/Shared/Services/shared-value.service";
import { SearchDTO } from '../Shared/DTOs/SearchDTO';
import { StudentDTO } from '../Shared/DTOs/StudentDTO';
import { Observable } from "rxjs";
import { SubjectDTO } from "../Shared/DTOs/SubjectDTO";
import { StudentSubjects } from "../Shared/DTOs/StudentSubjectsDTO";

@Injectable({
    providedIn: 'root'
})
export class StudentHttpService{
    constructor(private http: HttpClient, private sharedService: SharedValueService){}

    private baseApi: string = this.sharedService.configuration.apiURI;
    private baseController: string = "Student";
    private baseUri: string = this.baseApi + '/' + this.baseController;

    public getStudentPage(searchDTO: SearchDTO): Observable<StudentDTO[]>{
        const uri: string = this.baseUri + '/GetStudentsPage';
        return this.http.get<StudentDTO[]>(uri, { params: {...searchDTO} });
    }

    public getStudentSubjects(studentId: number): Observable<SubjectDTO[]>{
        const uri: string = this.baseUri + '/GetStudentSubjects';
        return this.http.get<SubjectDTO[]>(uri, { params: {"studentId": studentId} });
    }
    

    public addStudent(student: StudentDTO): Observable<any>{
        const uri: string = this.baseUri;
        return this.http.post(uri, student);
    }

    public updateStudent(student: StudentDTO): Observable<any>{
        const uri: string = this.baseUri;
        return this.http.patch(uri, student);
    }

    public deleteStudent(index: number): Observable<any>{
        const uri: string = this.baseUri;
        return this.http.delete(uri, {
            params: new HttpParams().set('id', index)
        });
    }

    public addStudentSubject(studentSubject: StudentSubjects): Observable<any>{
        const uri: string = this.baseUri + "/AddStudentSubject";
        return this.http.patch(uri, studentSubject);
    }

    public removeStudentSubject(studentSubject: StudentSubjects): Observable<any>{
        const uri: string = this.baseUri + "/RemoveStudentSubject";;
        return this.http.patch(uri, studentSubject);
    }
}