import { Component, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

interface DayTime {
  lesson_number: number;
  day_number: number;
  info?: string;
  lecturer?: string;
  place?: string;
  isBoth?: boolean;
  isEven?: boolean;
}

interface Lesson {
  name?: string;
  short_name?: string;
  info?: string;
  place?: string;
  lecturer?: string;
  class?: string;
  occurs: DayTime[];
}

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent {
  items!: Lesson[];

  constructor(private firestore: AngularFirestore) {
    this.firestore.collection<Lesson>('lessons').valueChanges().subscribe({
      next: res => {
        this.items = res;
      }
    });
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
      const occur = x.occurs.find(y => {
        if (y.day_number === day_number && y.lesson_number === lesson_number) {
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

    return filtered[0] || { name: '', short_name: '', info: '', place: '', lecturer: '', class: '', occurs: [] };
  }

  onSubmit() {
    const lessons: Lesson[] = [{
      "name": "Systemy operacyjne",
      "short_name": "SO",
      "place": "",
      "class": "bg-yellow-500 dark:bg-yellow-600 text-white",
      "occurs": [{
        "isBoth": true,
        "isEven": false,
        "lesson_number": 1,
        "day_number": 1,
        "info": "wykład",
        "lecturer": "dr inż. Dariusz Wawrzyniak",
      },
      {
        "isBoth": true,
        "isEven": false,
        lesson_number: 5,
        day_number: 5,
        info: "lab",
        lecturer: 'K. Bucholc'
      }
      ]
    },
    {
      "name": "Algorytmy i struktury danych",
      "short_name": "AiSD",

      "class": "bg-blue-500 dark:bg-blue-700 text-white",
      "occurs": [{
        "isBoth": true,
        "isEven": false,
        "lesson_number": 2,
        "day_number": 1,
        "info": "wykład",
        "lecturer": "prof. dr hab. inż. Jacek Błażewicz",
        "place": ""
      }, {
        "isBoth": true,
        "isEven": false,
        "lesson_number": 5,
        "day_number": 3,
        "info": "lab",
        "lecturer": "M. Szachniuk",
        "place": "lab. 2.6.21"
      }]
    },
    {
      "name": "Prawo dla informatyków",
      "short_name": "Prawo",
      "place": "",
      "lecturer": "dr inż. Tomasz Bilski",
      "class": "bg-pink-500 text-white dark:bg-pink-600",
      "occurs": [{
        "lesson_number": 6,
        "day_number": 1,
        "info": "wykład",
        "isBoth": true,
        "isEven": false,
      }, {
        "lesson_number": 1,
        "day_number": 4,
        isEven: true,
        "info": "ćwiczenia",
        isBoth: false
      }]
    },
    {
      "name": "Wychowanie fizyczne",
      "short_name": "WF",
      "info": "",
      "place": "CSPP",
      "lecturer": "",
      "class": "bg-yellow-300 text-white dark:bg-yellow-400",
      "occurs": [{
        "isBoth": true,
        "isEven": false,
        "lesson_number": 1,
        "day_number": 2
      },
      {
        "isBoth": true,
        "isEven": false,
        "lesson_number": 2,
        "day_number": 2
      }
      ]
    },
    {
      "name": "Język angielski",
      "short_name": "Ang",
      "info": "",
      "place": "CJiKP",
      "lecturer": "",
      "class": "bg-purple-300 text-white dark:bg-purple-400",
      "occurs": [
        {
          "isBoth": true,
          "isEven": false,
          "lesson_number": 3,
          "day_number": 2
        },
        {
          "isBoth": true,
          "isEven": false,
          lesson_number: 4,
          day_number: 4
        },
        {
          "isBoth": true,
          "isEven": false,
          lesson_number: 5,
          day_number: 4
        }
      ]
    },
    {
      "name": "Podstawy elektroniki",
      "short_name": "PE",
      "info": "",
      "place": "",
      "class": "bg-gray-500 dark:bg-gray-600 text-white",
      "occurs": [
        {
          "isBoth": true,
          "isEven": false,
          "lecturer": "M. Melosik",
          info: 'lab',
          "lesson_number": 6,
          "day_number": 2
        },
        {
          "isBoth": false,
          "isEven": false,
          "lecturer": "dr hab. inż. Paweł Śniatała",
          info: 'wykład',
          "lesson_number": 3,
          "day_number": 4
        }
      ]
    },
    {
      "name": "Programowanie deklaratywne",
      "short_name": "PD",
      "info": "",
      "place": "",
      "class": "bg-purple-500 dark:bg-purple-600 text-white",
      "occurs": [
        {
          "isBoth": false,
          "isEven": false,
          "lecturer": "dr inż. Artur Michalski",
          info: 'wykład',
          place: "",
          "lesson_number": 1,
          "day_number": 4
        },
        {
          "isBoth": false,
          "isEven": false,
          "lecturer": "dr inż. Artur Michalski",
          info: 'lab',
          "place": 'lab. P6',
          "lesson_number": 3,
          "day_number": 3
        }
      ]
    },
    {
      "name": "Metody probabilistyczne",
      "short_name": "MP",
      "place": "",
      "class": "bg-green-700 dark:bg-green-600 text-white",
      "occurs": [
        {
          "isBoth": true,
          "isEven": false,
          "info": "wykład",
          "lecturer": "dr hab. inż. Wojciech Kotłowski",
          "lesson_number": 5,
          "day_number": 2
        },
        {
          "isBoth": true,
          "isEven": false,
          "info": "ćwiczenia",
          "lecturer": "dr inż. Jędrzej Potoniec",
          lesson_number: 2,
          day_number: 5
        }
      ]
    },
    {
      "name": "Fizyka dla informatyków",
      "short_name": "FdI",
      "place": "",
      "class": "bg-red-300 dark:bg-red-400 text-white",
      "occurs": [
        {
          "info": "wykład",
          "lecturer": "dr Krzysztof Łapsa",
          "lesson_number": 2,
          "day_number": 4,
          "isBoth": true,
          "isEven": false,
        },
        {
          "info": "ćwiczenia",
          "lecturer": "dr Andrzej Jarosz",
          lesson_number: 1,
          day_number: 5,
          isBoth: false,
          isEven: false
        }
      ]
    },
    {
      "name": "Programowanie niskopoziomowe",
      "short_name": "C",
      "place": "",
      "class": " bg-red-600 dark:bg-red-800 text-white",
      "occurs": [
        {
          "info": "wykład",
          "lecturer": "dr inż. Marcin radom",
          "lesson_number": 3,
          "day_number": 4,
          "place": "",
          "isBoth": false,
          "isEven": true,
        },
        {
          "info": "lab",
          "lecturer": "A. Urbański",
          "lesson_number": 3,
          "day_number": 5,
          "place": "",
          "isBoth": false,
          "isEven": true,
        }
      ]
    }
    ];

    this.firestore.collection<Lesson>('lessons').get().subscribe({
      next: res => {
        res.docs.map(x => x.id).forEach(x => {
          this.firestore.collection('lessons').doc(x).delete();
        });
      }
    });
    lessons.forEach(lesson => {
      this.firestore.collection<Lesson>('lessons').add(lesson).then(res => console.log, err => console.log);
    });
  }
}
