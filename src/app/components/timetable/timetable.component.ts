import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/firestore';
import { Lesson } from 'src/app/models/lesson';
import { ModalService } from '../modal/modal.service';
import data from './classes.json';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent {
  items: Lesson[] = data as Lesson[];
  @Input() selectedGroup = 'i3.2';
  @Input() obligatory: string[] = [];

  selectedClass: Lesson = { name: '', short_name: '', info: '', place: '', lecturer: '', class: '', occurs: [], obligatory: false };

  constructor(
    // private firestore: AngularFirestore,
    private modalService: ModalService
    ) {
    // this.firestore.collection<Lesson>('lessons').valueChanges().subscribe({
    //   next: res => {
    //     this.items = res;
    //   }
    // });
  }

  @Input() isWeekEven: boolean = false;

  hours = [
    '8:00 - 9:30',
    '9:45 - 11:15',
    '11:45 - 13:15',
    '13:30 - 15:00',
    '15:10 - 16:40',
    '16:50 - 18:20',
    '18:30 - 20:00',
    '20:10 - 21:40'
  ]

  public getItems(lesson_number: number): Lesson[] {
    let res = [];
    for (const day of [1, 2, 3, 4, 5]) {
      res.push(this.getItem(day, lesson_number))
    }
    return res;
  }

  private getItem(day_number: number, lesson_number: number): Lesson {
    let filtered = this.items.map(x => {
      if(x.obligatory){
        if(!this.obligatory.includes(x.name)) {
          return null;
        }
      }
      const occur = x.occurs.find(y => {
        if (y.day_number === day_number && y.lesson_number === lesson_number && y.groups?.includes(this.selectedGroup)) {
          return (y.isEven === this.isWeekEven) || y.isBoth;
        }
        return false;
      });

      if (occur != null) {
        x = { ...x, ...occur };
        return x;
      }
      return null;
    }).filter(x => x != null);

    return filtered[0] || { name: '', short_name: '', info: '', place: '', lecturer: '', class: '', occurs: [], obligatory: false };
  }

  onSubmit() {
    // const lessons: Lesson[] = data as Lesson[];
    // this.firestore.collection<Lesson>('lessons').get().subscribe({
    //   next: res => {
    //     res.docs.map(x => x.id).forEach(x => {
    //       this.firestore.collection('lessons').doc(x).delete();
    //     });
    //   }
    // });
    // lessons.forEach(lesson => {
    //   this.firestore.collection<Lesson>('lessons').add(lesson).then(res => console.log, err => console.log);
    // });
  }

  @ViewChild('classDetailsTemplate') classDetailsTemplate!: TemplateRef<any>;
  public openClassDetailsModal(lesson: Lesson) {
    this.selectedClass = lesson;
    this.modalService.open(this.classDetailsTemplate);
  }
}
