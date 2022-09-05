import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { SharedValueService } from "src/app/Shared/Services/shared-value.service";
import { Observable } from "rxjs";
import { SubjectDTO } from "../Shared/DTOs/SubjectDTO";
import { ClassDTO } from "../Shared/DTOs/CLassDTO";

@Injectable({
    providedIn: 'root'
})
export class SubjectHttpService{
    constructor(private http: HttpClient, private sharedService: SharedValueService){}

    private baseApi: string = this.sharedService.configuration.apiURI;
    private baseController: string = "Subject";
    private baseUri: string = this.baseApi + '/' + this.baseController;

    public getSubjects(): Observable<SubjectDTO[]>{
        const uri: string = this.baseUri + '/GetAllSubjects';
        return this.http.get<SubjectDTO[]>(uri);
    }

    public addSubject(subject: SubjectDTO): Observable<any>{
        const uri: string = this.baseUri;
        return this.http.post(uri, subject);
    }

    public updateSubject(subject: SubjectDTO): Observable<any>{
        const uri: string = this.baseUri;
        return this.http.patch(uri, subject);
    }

    public deleteSubject(index: number): Observable<any>{
        const uri: string = this.baseUri;
        return this.http.delete(uri, {
            params: new HttpParams().set('id', index)
        });
    }

    public getAllClasses(): Observable<ClassDTO[]>{
        const uri = this.baseApi + '/Class/GetAllClasses';
        return this.http.get<ClassDTO[]>(uri);
    }
}