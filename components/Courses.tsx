
import React, { useState } from 'react';
import { Course } from '../types';
import { StarIcon } from './icons';

const coursesData: Course[] = [
  { id: 1, category: 'Tecnologia', title: 'Hackathon Lab.AI', description: 'Aprenda IA criando soluções reais para desafios de impacto.', duration: '20h', students: 66, imageUrl: 'https://picsum.photos/seed/tech1/400/250' },
  { id: 2, category: 'Carreira', title: 'Trilha Black Mentoring', description: 'Uma jornada do propósito à realização profissional.', duration: '6h', students: 25, imageUrl: 'https://picsum.photos/seed/career1/400/250' },
  { id: 3, category: 'Soft Skills', title: 'Trilha Conecta — De Missão a Profissão', description: 'Autoconhecimento prático para quem quer fazer boas escolhas.', duration: '10h', students: 41, imageUrl: 'https://picsum.photos/seed/soft1/400/250' },
  { id: 4, category: 'Futuro', title: 'Futurismo Aplicado', description: 'Entenda e aplique as tendências que moldam o amanhã.', duration: '15h', students: 50, imageUrl: 'https://picsum.photos/seed/future1/400/250' },
  { id: 5, category: 'Tecnologia', title: 'Desenvolvimento Web Moderno', description: 'Crie aplicações web do zero com as tecnologias mais recentes.', duration: '40h', students: 102, imageUrl: 'https://picsum.photos/seed/tech2/400/250' },
  { id: 6, category: 'Carreira', title: 'Personal Branding para Jovens', description: 'Construa sua marca pessoal e se destaque no mercado.', duration: '8h', students: 78, imageUrl: 'https://picsum.photos/seed/career2/400/250' },
];

const categories: ('Todos' | Course['category'])[] = ['Todos', 'Futuro', 'Tecnologia', 'Soft Skills', 'Carreira'];

const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
    <div className="bg-card text-card-foreground rounded-lg shadow-lg hover:shadow-xl dark:shadow-2xl dark:hover:shadow-primary/10 overflow-hidden transform hover:-translate-y-1 transition-all duration-300 flex flex-col border border-transparent dark:hover:border-primary/30">
        <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" />
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold">{course.title}</h3>
            <p className="mt-2 text-muted-foreground flex-grow">{course.description}</p>
            <div className="mt-6 flex items-center justify-between text-muted-foreground/80 text-sm">
                <span>{course.duration}</span>
                <span>•</span>
                <span>{course.students} alunos</span>
                <span>•</span>
                <div className="flex items-center text-primary">
                    <StarIcon className="w-4 h-4 mr-1" />
                    <StarIcon className="w-4 h-4 mr-1" />
                    <StarIcon className="w-4 h-4 mr-1" />
                    <StarIcon className="w-4 h-4 mr-1" />
                    <StarIcon className="w-4 h-4" />
                </div>
            </div>
        </div>
    </div>
);


const Courses: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>('Todos');

  const filteredCourses = activeCategory === 'Todos'
    ? coursesData
    : coursesData.filter(c => c.category === activeCategory);

  return (
    <section id="courses" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground">
          Nossos cursos mais buscados
        </h2>
        <div className="mt-10 flex justify-center flex-wrap gap-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={`px-5 py-2.5 text-sm font-semibold rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring dark:focus:ring-offset-background ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => <CourseCard key={course.id} course={course} />)}
        </div>
      </div>
    </section>
  );
};

export default Courses;
