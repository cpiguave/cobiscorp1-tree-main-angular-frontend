import { Component, OnInit } from '@angular/core';
import { Libro } from '../employee'
import { EmployeeService } from '../employee.service'
import { Router } from '@angular/router';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  libros: Libro[];

  paises: Array<any>;
  totalPages: Array<number>;

  page = 0;
  size = 10;
  order = 'id';
  asc = true;

  isFirst = false;
  isLast = false;

  constructor(private libroService: EmployeeService,
    private router: Router) { }

  ngOnInit(): void {
    this.getEmployees();
    this.cargarPaises();
  }

  private getEmployees() {
    this.libroService.getEmployeesList().subscribe(data => {
      this.libros = data;
    });
  }


  cargarPaises() {
    this.libroService.paises(this.page, this.size, this.order, this.asc).subscribe(
      data => {
        this.paises = data.content;
        this.isFirst = data.first;
        this.isLast = data.last;
        this.totalPages = new Array(data['totalPages']);
        console.log(data);
      },
      err => {
        console.log(err.error);
      }
    );
  }


  sort(): void {
    this.asc = !this.asc;
    this.cargarPaises();
  }

  rewind(): void {
    if (!this.isFirst) {
      this.page--;
      this.cargarPaises();
    }
  }

  forward(): void {
    if (!this.isLast) {
      this.page++;
      this.cargarPaises();
    }
  }

  setPage(page: number): void {
    this.page = page;
    this.cargarPaises();
  }

  setOrder(order: string): void {
    this.order = order;
    this.cargarPaises();
  }


  employeeDetails(id: number) {
    this.router.navigate(['employee-details', id]);
  }

  updateEmployee(id: number) {
    this.cargarPaises();
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: number) {
    this.libroService.deleteEmployee(id).subscribe(data => {
      this.cargarPaises();
    })
  }

}
