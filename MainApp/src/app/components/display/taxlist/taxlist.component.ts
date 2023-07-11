import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Card } from 'src/app/models/card';
import { Role } from 'src/app/models/role';
import { Status } from 'src/app/models/status';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-taxlist',
  templateUrl: './taxlist.component.html',
  styleUrls: ['./taxlist.component.css']
})


export class TaxlistComponent {

  title = "Pengurusan Cukai";
  breadcrumb = "Pengurusan cukai membolehkan pentadbir melihat senarai yang terdapat dalam portal";
  items: Card[] = [];
  totalItems: any;

  constructor(private httpclient: HttpClient, private router: Router, private _freeApiService: ApiService, private _liveAnnouncer: LiveAnnouncer) {
  }
  listRole: Role[] = [];
  listUser: User[] = [];
  listStatus: Status[] = [];
  listCard: Card[] = [];
  stat: any;
  value: any;
  pageNumber: number = 1;
  Math: any;
  page: number = 1;
  ip: number = 3;
  //dataSource: User[] = [];
  user: User =  {} as User;

  role: Role = {} as Role;
  
  ngOnInit() {
    // this.getAllUsers();
    // this.getAllRoles();
    // this.getAllStatus();
    this.getPage(1);
  }

  // @ViewChild('empTbSort') empTbSort = new MatSort();
  @ViewChild(MatSort) sort = new MatSort;
  displayedColumns = ['index', 'name', 'email', 'icNum', 'role', 'kemaskini', 'status'];
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  dataSource = new MatTableDataSource<User>(this.listUser);

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getAllCard() {
    this._freeApiService.getCards()
      .subscribe
      (
        data => {
          this.listCard = data;
          // example filter
          // this.lstCard = this.lstCard.filter(e=>e.cardholderName != 'Tia')
          // this.lstCard = this.lstCard.filter(e=>e.cardholderName == 'Tia' || e.expiryYear != 2024)
        }
      )
  }


  getPage(pageNumber: number) {
    console.log("page now: "+pageNumber);
    this.httpclient.get<CardResponse>('https://localhost:7176/test/pagination', { params: { pageNumber: pageNumber.toString(), pageSize: '3', searchYear: '2022' } })
      .subscribe(
        data => {
          this.items = data.items;
          this.totalItems = data.totalItems;
          console.log("items: "+this.items);
          console.log("totalItems: "+this.totalItems);
        });
  }


  getAllUsers() {
    this._freeApiService.getUsers()
      .subscribe
      (
        data => {
          this.listUser = data;
          console.log(this.listUser);
          this.dataSource = new MatTableDataSource<User>(this.listUser);
          this.dataSource.paginator = this.paginator;
        }
      )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  populateForm(user: User) {
    this.user = user;

    // this.btnSave = "Update";
  }

  GetUser(email: string) {
    this._freeApiService.GetUserbyEmail(email)
      .subscribe(
        data => {
          if (data.status == '1') {
            this.stat = 'Aktif';
          }
          else {
            this.stat = 'Tidak Aktif';
          }
          this.user = data;
          console.log("this.user.status:" + this.user.status);
        }
      )
  }

  onSubmit() {
    console.log("submit");
    if (this.user.id === '') {
      if (this.user.email != '') {
        console.log("email available");
        this._freeApiService.addUser(this.user)
          .subscribe(
            data => {
              console.log(data);
              this.getAllUsers();
              // this.clearUser();
              // this.card = data;
            }
          )
      }
      else {
        console.log("email NOT AVAILABLE");
      }
    } else {
      console.log("Already exist");
      this._freeApiService.updateUser(this.user)
        .subscribe(
          data => {
            this.getAllUsers();
          }
        )
    }


    // console.log(this.card);
  }

  clearUser() {
    this.stat = "Aktif";
    this.user = {} as User;
    this.user.id = '';
  }

  deleteUser(id: string) {
    Swal.fire({
      // title: 'Adakah anda pasti?',
      text: "Adakah anda pasti mahu padam item ini",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'Grey',
      cancelButtonText: 'Tidak',
      confirmButtonText: 'Pasti'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Item telah dipadam!'
        )
        this._freeApiService.deleteUser(id)
          .subscribe(
            data => {
              console.log(data);
              this.getAllUsers();
            }
          )
      }
    })

  }

  GetRoles(id: string) {
    this._freeApiService.GetRoles(id)
      .subscribe(
        data => {
          this.role = data;
        }
      )
  }

  getAllRoles() {
    console.log("in ROLES: ");
    this._freeApiService.getRoles()
      .subscribe
      (
        data => {
          this.listRole = data;
          console.log("ROLES: " + this.listRole);
        }
      )
  }

  getAllStatus() {
    console.log("in STATUS: ");
    this._freeApiService.getStatuses()
      .subscribe
      (
        data => {
          this.listStatus = data;
          console.log("STATUS: " + this.listStatus);
        }
      )
  }

  changeStatus(status: any) {
    if (status == "true") {
      this.stat = "Tidak Aktif";

      console.log("this.user.status:" + this.user.status);
    }
    else if (status == "false") {
      this.stat = "Aktif";
      console.log("this.user.status:" + this.user.status);

    }
  }

  checkValue(event: any) {
    console.log(event);
    if (event == "Tidak Aktif") {
      this.stat = "Tidak Aktif";

      console.log("this.user.status:" + this.user.status);
    }
    else if (event == "Aktif") {
      this.stat = "Aktif";
      console.log("this.user.status:" + this.user.status);

    }
  }


}

interface CardResponse {
  items: Card[];
  totalItems: number;
}
