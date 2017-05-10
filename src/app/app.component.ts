import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {prebootClient} from "preboot/__dist/preboot_browser";

declare var preboot:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'app works fine!';

  linksNav1=[
    {item:'Inbox',logo:'inbox'},
    {item:'Start',logo:'start'},
    {item:'Sent Mail',logo:'send'}
  ];
  linksNav2=[
    {item:'Draft',logo:'drafts'},
    {item:'All Mail',logo:'email'},
    {item:'Trash',logo:'delete'},
    {item:'Spam',logo:'report'}
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {  }

  // browser or server target
  ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {
      // Client only code.
      this.title="Client";

    }
    if (isPlatformServer(this.platformId)) {
      // Server only code.
      this.title="Client";

    }
  }

  ngAfterViewInit() {
    if ((<any>window).preboot) {
      (<any>window).preboot.complete();
    }
  }



}
