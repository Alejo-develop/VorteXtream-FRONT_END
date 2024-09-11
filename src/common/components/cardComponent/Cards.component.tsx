// import React from 'react';
// import CardComponent from './CardComponent'; 
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, Autoplay, Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation'; // Importa el CSS para la navegación
// import './style/CardGenreComponent.css';
// import { Movie } from '../../../pages/public/searchPage/search.Page';

// interface CardGenreProps {
//     id: number;
//     name: string;
// }

// interface CardGenreComponentProps {
//     genres: CardGenreProps[];
//     moviesByGenre: { [key: number]: Movie[] }; 
// }

// const CardGenreComponent: React.FC<CardGenreComponentProps> = ({ genres, moviesByGenre }) => {

//     return (
//         <div className="card-genre-container">
//             {genres.map((genre) => (
//                 <div key={genre.id}>
//                     <h1 className='title'>{genre.name}</h1>
                    
//                     <Swiper
//                         navigation={true} // Activa la navegación con flechas
//                         modules={[Pagination, Autoplay, Navigation]}
//                         autoplay={{
//                             delay: 10000,
//                             disableOnInteraction: false,
//                         }}
//                         slidesPerView={5} // Muestra 5 cartas por vista
//                         spaceBetween={5} // Espacio entre las cartas
//                         className="mySwiper"
//                     >
//                         {moviesByGenre.map((movie) => (
//                             <SwiperSlide key={movie.id}>
//                                 <CardComponent
//                                     id={movie.id}
//                                     backdrop_path={movie.backdrop_path}
//                                     overview={movie.overview}
//                                     title={movie.title}
//                                     vote_average={movie.vote_average}  // Añade la puntuación a cada carta
//                                 />
//                             </SwiperSlide>
//                         ))}
//                     </Swiper>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default CardGenreComponent;