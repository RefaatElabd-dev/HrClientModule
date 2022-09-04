import { StudentSubjects } from "./StudentSubjectsDTO";

export class StudentDTO {
    constructor(public id: number,
                public name: string,
                public address: string,
                public birthDate: string,
                public emailAddress: string,
                public studentSubjects: StudentSubjects[]){ }
}