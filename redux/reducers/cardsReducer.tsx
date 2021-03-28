import { formatMonthYear } from '../../hooks/dateFormatting';
const initialState = [
  // {
  //   name: 'Ethan Keshishian',
  //   picture:
  //     'https://media-exp1.licdn.com/dms/image/C5603AQGIyCOBBGThwg/profile-displayphoto-shrink_400_400/0/1613284472291?e=1622073600&v=beta&t=mJNrWMR9HJFJJeFPENTait9tljjZV8llIwCqGFI6QCw',
  //   experience: [
  //     { organization: 'LA Hacks 2021', title: 'Developer', date: 'March 2021' },
  //   ],
  //   education: [
  //     {
  //       name: 'UCLA',
  //       date: '2019-2023',
  //       major: 'Bachelor of Science - Computer Science',
  //     },
  //   ],
  // },
] as any[];

function cardsReducer(state = initialState, action: any) {
  console.log('Cards Reducer');
  console.log(action);
  switch (action.type) {
    case 'update':
      return action.payload.map((x: any) => ({
        name: x.userProfile.fullName,
        picture: x.userProfile.photo,
        experience: x.experiences.map((x: any) => ({
          organization: x.company,
          title: x.title,
          date:
            formatMonthYear(x.startDate) + ' - ' + formatMonthYear(x.endDate),
        })),
        education: x.education.map((x: any) => ({
          name: x.schoolName,
          date:
            formatMonthYear(x.startDate) + ' - ' + formatMonthYear(x.endDate),
          major: x.degreeName,
        })),
      }));
    default:
      return state;
  }
}

export default cardsReducer;
