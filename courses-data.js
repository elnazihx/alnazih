// Shared course catalog for the whole site.
// IMPORTANT: once students start enrolling, never change or reuse an
// existing "id" — student records reference courses by this id. Only add
// new courses at the end with new ids.
export const COURSES = [
  { id: "course1",  title: "أساسيات الكيمياء - أولى ثانوي",       price: "150 جنيه", stage: "الصف الأول الثانوي" },
  { id: "course2",  title: "الكيمياء العضوية - تانية ثانوي",       price: "180 جنيه", stage: "الصف الثاني الثانوي" },
  { id: "course3",  title: "الكيمياء غير العضوية - تالتة ثانوي",   price: "220 جنيه", stage: "الصف الثالث الثانوي" },
  { id: "course4",  title: "التفاعلات الكيميائية",                 price: "150 جنيه", stage: "" },
  { id: "course5",  title: "الروابط الكيميائية",                   price: "150 جنيه", stage: "" },
  { id: "course6",  title: "الجدول الدوري وخواص العناصر",          price: "150 جنيه", stage: "" },
  { id: "course7",  title: "الحسابات الكيميائية",                  price: "180 جنيه", stage: "" },
  { id: "course8",  title: "الكيمياء الكهربية",                    price: "180 جنيه", stage: "" },
  { id: "course9",  title: "الاتزان الكيميائي",                    price: "180 جنيه", stage: "" },
  { id: "course10", title: "الكيمياء النووية",                     price: "150 جنيه", stage: "" },
  { id: "course11", title: "البوليمرات والمركبات العضوية",         price: "180 جنيه", stage: "" },
  { id: "course12", title: "مراجعة نهائية شاملة",                  price: "250 جنيه", stage: "" },
];

export function getCourseById(id){
  return COURSES.find(c => c.id === id) || null;
}
