import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent {
  isloggedIn: boolean = true;

  constructor(private router: Router, private _freeApiService: ApiService) {
  }
  logout() {
    Swal.fire({
      // title: 'Are you sure?',
      text: "Adakah anda pasti ingin log keluar?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'Grey',
      cancelButtonText: 'Tidak',
      confirmButtonText: 'Pasti'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Berjaya Log Keluar!',
          'success'
        )
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('name');
        location.reload();
      }
    })
  }
}
