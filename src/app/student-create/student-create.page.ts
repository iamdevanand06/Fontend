import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.page.html',
  styleUrls: ['./student-create.page.scss'],
})
export class StudentCreatePage implements OnInit {

  data: Student

  constructor(
    public apiService: ApiService,
    public router: Router,
    public alertController: AlertController
  ) { this.data = new Student(); }

  ngOnInit() {
  }

  submitForm(){
    this.apiService.createItem(this.data).subscribe(Response => {
      this.router.navigate(['student-list']);
      this.presentAlert();
    });

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      // subHeader: 'Subtitle',
      message: 'Student Details Added',
      buttons: ['OK']
    });

    await alert.present();

    // const { role } = await alert.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
  }

  

}
