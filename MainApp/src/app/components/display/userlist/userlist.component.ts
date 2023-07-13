import { Component, ViewChild } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { Role } from 'src/app/models/role';
import { NumberFormatStyle, DatePipe } from '@angular/common';
import { Status } from 'src/app/models/status';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent {
  title = "Pengurusan Pengguna";
  breadcrumb = "Pengurusan pengguna membolehkan pentadbir melihat senarai yang terdapat dalam portal";
  emailFormControl = new FormControl('', [Validators.required, Validators.email, Validators.pattern("[^ @]*@[^ @]*"),]);

  constructor(private router: Router, private _freeApiService: ApiService, private _liveAnnouncer: LiveAnnouncer, private datePipe: DatePipe) {
  }
  listRole: Role[] = [];
  listUser: User[] = [];
  listStatus: Status[] = [];
  stat: any;
  value: any;
  page: number = 1;
  ip: number = 5;
  user: User = {} as User;
  role: Role = {} as Role;
  date = new Date();
  currentDate: any = this.date.getUTCDate();

  ngOnInit() {
    this.getAllUsers();
    this.getAllRoles();
    this.getAllStatus();
     
    console.log("HELLO1 : "+this.date);
    console.log("HELLO2 : "+this.currentDate);
    const formattedDateTime = this.datePipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss');
    console.log(formattedDateTime);
  }

  // @ViewChilzd('empTbSort') empTbSort = new MatSort();
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
            console.log(data);
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
  
 

  //  onChange(branchNamae:string,event:any) {  

  //    const checked = event.target.checked;  

  //     if (checked) {  
  //       this.resultText.push(branchNamae);  

  //        } else {  
  //          const index = this.resultText.indexOf(branchNamae);  
  //          this.resultText.splice(index, 1);  
  //      }  
  //      this.values=this.resultText.toString();  
  //      const count=this.resultText.length;  
  //      this.count=count;  
  //   }  
  // }

}
