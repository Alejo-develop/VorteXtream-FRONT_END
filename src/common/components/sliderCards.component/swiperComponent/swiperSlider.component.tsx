import React from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // Importa Swiper y SwiperSlide
import { Autoplay, Pagination, Navigation } from "swiper/modules"; // Importa los módulos necesarios
import "swiper/css"; // Importa los estilos de Swiper
import "swiper/css/pagination"; // Importa los estilos para la paginación
import "swiper/css/navigation"; // Importa los estilos para la navegación
import './swiper.css' // Asegúrate de que este archivo exista y esté correctamente configurado

interface SwiperComponentProps {
  children: React.ReactNode; // Asegúrate de que los children sean válidos
}

const SwiperComponent: React.FC<SwiperComponentProps> = ({ children }) => {
  return (
    <Swiper
      navigation={true} // Activa la navegación con flechas
      modules={[Pagination, Autoplay, Navigation]}
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
      }}
      slidesPerView={5} // Muestra 5 cartas por vista
      spaceBetween={5} // Espacio entre las cartas
      className="mySwiper-most-watched"
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
