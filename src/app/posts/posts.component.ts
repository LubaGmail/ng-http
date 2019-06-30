import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

const apiUrl = "https://jsonplaceholder.typicode.com/posts";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.http.get(apiUrl).subscribe((res: Post[]) => {
      this.posts = res;
      console.log(this.posts[0].id);
    });
  }
  createPost(title: HTMLInputElement) {
    let post: any = { title: 'New post' };
    this.http.post(apiUrl, JSON.stringify(post)).subscribe((res: Post[]) => {
      post = res;
      this.posts.push(post);
      // console.log('last', this.posts.pop());

    }); 
  }

  patchPost(post) {
    this.http.patch(apiUrl + '/' + post.id, JSON.stringify({ isRead: true })).subscribe((res: Post[]) => {
      // console.log('patch', res);
    })
  }

  putPost(post) {
    this.http.put(apiUrl + '/' + post.id, JSON.stringify(post)).subscribe((res: Post[]) => {
      // console.log('put', res);
    })
  }

  deletePost(post) {
    this.http.delete(apiUrl + '/' + post.id).subscribe( (res) => {
      const index = this.posts.indexOf(post);
      this.posts.splice(index, 1);
      // console.log(res);   empty objectt {}
    });
  }

}
