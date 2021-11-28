import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../models/student';
import { ApiService } from '../services/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.page.html',
  styleUrls: ['./student-edit.page.scss'],
})
export class StudentEditPage implements OnInit {

  id: number;
  data: Student;
  item: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public apiService: ApiService,
    public alertController: AlertController
  ) { this.data = new Student(); }

  ngOnInit() {

    this.apiService.getItem(this.activatedRoute.snapshot.paramMap.get("id")).subscribe(Response => {
      this.item = Response;
      this.data = this.item.data;
      console.log(this.data);
    })
  }

  update(){
    this.apiService.updateItem(this.activatedRoute.snapshot.params["id"], this.data).subscribe(Response=>{
      this.router.navigate(['student-list']);
      this.presentAlert();
    })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      // subHeader: 'Subtitle',
      message: 'Student Details Updated',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
