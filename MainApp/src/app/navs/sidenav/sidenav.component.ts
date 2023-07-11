import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  loginAs: any;
  constructor(private router: Router, private _freeApiService: ApiService) {
  }
  ngOnInit() {
    if (this._freeApiService.isloggedin()) {
      this.loginAs = sessionStorage.getItem('email');
    }
    else {
      this.loginAs = '';
    }
  }




  config = {
    paddingAtStart: true,
    interfaceWithRoute: true,
    listBackgroundColor: '#F8F8F8',
    fontColor: `#000000`,
    backgroundColor: '#F8F8F8',
    selectedListFontColor: '#000000',
    highlightOnSelect: true,
    collapseOnSelect: true,
    useDividers: true,
    rtlLayout: false,
  };

  appitems = [
    {
      label: 'Home',
      icon: 'home',
      link: '/home'
    },
    {
      label: 'Dashboard',
      icon: 'menu',
      expanded: false,
      items: [
        {
          label: 'Home',
          icon: 'home',
          link: 'Home'

        },
        {
          label: 'Card',
          icon: 'notes',
          link: 'Card'

        },
        {
          label: 'Album',
          icon: 'photo',
          link: 'Album'
        },
        {
          label: 'User',
          icon: 'people',
          link: 'User',
          style: {
            whiteSpace: 'normal'

          }
        }
      ]
    },
    {
      label: 'Logout',
      icon: 'key'
    },
  ]

}
