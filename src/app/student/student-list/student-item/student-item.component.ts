import { Component, Input, OnInit } from '@angular/core';
import { StudentDTO } from 'src/app/Shared/DTOs/StudentDTO';

@Component({
  selector: 'app-student-item',
  templateUrl: './student-item.component.html',
  styleUrls: ['./student-item.component.css']
})
export class StudentItemComponent implements OnInit {
  @Input() student!: StudentDTO;
  constructor() { }

  ngOnInit(): void {
  }

}
