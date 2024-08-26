import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notif',
  templateUrl: './notif.component.html',
  styleUrls: ['./notif.component.css']
})
export class NotifComponent 
implements OnInit {

  notifications = [
    {
      title: 'New Message',
      description: 'You have received a new message from John Doe',
      time: '5m ago',
      iconColor: 'text-blue-500'
    },
    {
      title: 'New Comment',
      description: 'Anna commented on your post',
      time: '10m ago',
      iconColor: 'text-green-500'
    },
    // Ajoutez d'autres notifications ici
  ];

  constructor() { }

  ngOnInit(): void {
  }

   
}


