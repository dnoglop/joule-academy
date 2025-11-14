
export interface Course {
  id: number;
  category: 'Futuro' | 'Tecnologia' | 'Soft Skills' | 'Carreira';
  title: string;
  description: string;
  duration: string;
  students: number;
  imageUrl: string;
}
