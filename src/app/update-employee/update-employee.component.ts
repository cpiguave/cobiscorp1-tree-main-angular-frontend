import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Libro } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  id: number;
  libro: Libro = new Libro();
  constructor(private libroService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.libroService.getEmployeeById(this.id).subscribe(data => {
      this.libro = data;
    }, error => console.log(error));
  }

  onSubmit() {
    this.libroService.updateEmployee(this.id, this.libro).subscribe(data => {
      this.goToEmployeeList();
    }
      , error => console.log(error));
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }
}
