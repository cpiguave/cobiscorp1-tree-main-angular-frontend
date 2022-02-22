import { Component, OnInit } from '@angular/core';
import { Libro } from '../employee';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  id: number
  libro: Libro
  constructor(private route: ActivatedRoute, private employeService: EmployeeService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.libro = new Libro();
    this.employeService.getEmployeeById(this.id).subscribe(data => {
      this.libro = data;
    });
  }

}
