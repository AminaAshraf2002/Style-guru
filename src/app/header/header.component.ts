import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartCount:number = 0
  wishlistCount:number = 0
  username:any = ""

  constructor(private api:ApiService){}
  ngOnInit(): void {
    if(sessionStorage.getItem("user")){
      this.username = JSON.parse(sessionStorage.getItem("user") || "").username.split(" ")[0]
      this.api.wishlistCount.subscribe((result:any)=>{
        this.wishlistCount = result
      })
      this.api.cartCount.subscribe((result:any)=>{
        this.cartCount = result
      })
    }else{
      this.username = ""
    }
  }
}
