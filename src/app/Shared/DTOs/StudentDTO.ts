import { SubjectDTO } from "./SubjectDTO";

export class StudentDTO {
    constructor(public id: number,
                public name: string,
                public address: string,
                public birthDate: string,
                public emailAddress: string,
                public subjects: SubjectDTO[]){

    }
}