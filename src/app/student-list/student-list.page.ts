import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.page.html',
  styleUrls: ['./student-list.page.scss'],
})
export class StudentListPage implements OnInit {

  studentsData: any;

  constructor(public apiservice: ApiService, public alertController: AlertController) { this.studentsData = []; }

  ngOnInit() {
    // this.getAllStudents();
  }

  ionViewWillEnter(){
    this.getAllStudents();
  }

  getAllStudents(){
    this.apiservice.getList().subscribe(Response =>{
      // console.log(Response);
      this.studentsData = Response;
      console.log(this.studentsData)
    });
  }

  delete(item){
    this.presentAlertConfirm(item);
    // this.apiservice.deleteItem(item.id).subscribe(Response => {
    //   this.getAllStudents();
    // });
  }

  async presentAlertConfirm(item) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: '<strong>Do you want to Delete?</strong>',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
              this.getAllStudents();
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.apiservice.deleteItem(item.id).subscribe(Response => {
              this.getAllStudents();
            });
          }
        }
      ]
    });

    await alert.present();
  }

}
