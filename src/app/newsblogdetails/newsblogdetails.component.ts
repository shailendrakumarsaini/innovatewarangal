import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-newsblogdetails',
  templateUrl: './newsblogdetails.component.html',
  styleUrls: ['./newsblogdetails.component.scss']
})
export class NewsblogdetailsComponent implements OnInit { 
  id;
  details;
  loading :boolean;
  constructor(private activatedRoute :ActivatedRoute,private blogService:BlogService) { 
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() { 
    this.loading = true;
    this.blogService.getBlogByID(this.id).subscribe(res =>{
      // console.log(res);
      this.loading = false;
      this.details = res[0];
    })
  }

}
