import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'; 
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  user: Observable<any> | undefined; 
  authState: any = null;
  emailLower: string

  constructor(public authservice: AuthService, private router: Router,private afAuth: AngularFireAuth, private firestore: AngularFirestore) {

      this.emailLower = ""
      this.afAuth.authState.subscribe((auth =>{
      this.authState = auth;
    }))
  }

  ngOnInit(): void {
      this.afAuth.authState.subscribe(user => {
          console.log('Dashboard: user', user);

          if (user) {
           
              this.emailLower = this.authState['email'].toLowerCase();
              this.user = this.firestore.collection('users').doc(this.emailLower).valueChanges();
              
          }
      });
  }
}



