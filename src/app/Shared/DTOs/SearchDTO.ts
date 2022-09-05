export class SearchDTO {
    constructor(public skip: number = 0,
                public take: number = 10,
                public subjectId: number = 0,
                public studentName: string = '' ){}
}