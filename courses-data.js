// Shared course catalog for the whole site.
// IMPORTANT: once students start enrolling, never change or reuse an
// existing "id" — student records reference courses by this id. Only add
// new courses at the end with new ids.
export const COURSES = [
  { id: "course1", title: "كورس الشهر الأول - أولى ثانوي",  price: "200 جنيه", stage: "الصف الأول الثانوي" },
  { id: "course2", title: "كورس الشهر الأول - تانية ثانوي", price: "200 جنيه", stage: "الصف الثاني الثانوي" },
  { id: "course3", title: "كورس الشهر الأول - تالتة ثانوي", price: "200 جنيه", stage: "الصف الثالث الثانوي" },
];

export function getCourseById(id){
  return COURSES.find(c => c.id === id) || null;
}

export function getCourseByStage(stage){
  return COURSES.find(c => c.stage === stage) || null;
}
