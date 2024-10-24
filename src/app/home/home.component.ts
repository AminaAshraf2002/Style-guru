import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    allProducts:any = []

    constructor(private api:ApiService,private toaster:ToastrService){}

    ngOnInit(): void {
      this.api.getAllProductsAPI().subscribe((result:any)=>{
        this.allProducts = result
        console.log(this.allProducts);  
      })
    }

    addToWishlist(product:any){
      if(sessionStorage.getItem("token")){
        //  addToWishlist
        this.api.addToWishlistAPI(product).subscribe({
          next:(result:any)=>{
            this.toaster.success(`Product ${result.title} added to your wishlist!!!`)
            this.api.getWishlistCount()
          },
          error:(reason:any)=>{
            console.log(reason);
            this.toaster.warning(reason.error)
          }
        })
      }else{
        this.toaster.info("Please login!!!")
      }
    }

    addToCart(product:any){
      if(sessionStorage.getItem("token")){
        //  addToCart
      }else{
        this.toaster.info("Please login!!!")
      }


    }
}
