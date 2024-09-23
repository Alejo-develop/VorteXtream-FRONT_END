import React from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // Importa Swiper y SwiperSlide
import { Autoplay, Pagination, Navigation } from "swiper/modules"; // Importa los módulos necesarios
import "swiper/css"; // Importa los estilos de Swiper
import "swiper/css/pagination"; // Importa los estilos para la paginación
import "swiper/css/navigation"; // Importa los estilos para la navegación
import './swiper.css' // Asegúrate de que este archivo exista y esté correctamente configurado

interface SwiperComponentProps {
  children: React.ReactNode;
  spaceBetween: number;
  slidesPerView: number;
  className: string
}

const SwiperComponent: React.FC<SwiperComponentProps> = ({className, children, spaceBetween, slidesPerView }) => {
  return (
    <Swiper
      navigation={true} // Activa la navegación con flechas
      modules={[Pagination, Autoplay, Navigation]}
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
      }}
      slidesPerView={slidesPerView} // Muestra 5 cartas por vista
      spaceBetween={spaceBetween} // Espacio entre las cartas
      className={className}
    >
      {/* Asegúrate de que children sea un array de SwiperSlide */}
      {React.Children.map(children, (child, index) => (
        <SwiperSlide key={index}>
          {child}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComponent;
