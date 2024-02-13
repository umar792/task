import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Swiper.css";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const HeroCarousal = () => {
  return (
    <div className="my-[50px] py-3 px-[100px] home_carousal bg-color1 !z-10 heroCarousal">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper border-[1px] border-color3 rounded-xl bg-color4 shadow-lg"
      >
        <SwiperSlide className="bg-color4">
          <div className="Swiper_Slider_Box 2xl:px-[50px]">
            <img src="https://wallpaperaccess.com/full/129913.jpg" alt="" />
            <div className="Swiper_Slider_Box_right_box">
              <h2 className="text-redColor">Lorem ipsum dolor sit.</h2>
              <p className="">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Praesentium mollitia iusto magni culpa itaque nobis architecto
                debitis. Harum, sunt. Architecto eveniet non tempora et velit
                voluptate itaque atque, est,Architecto eveniet non tempora et
                velit voluptate itaque atque, est,
              </p>
              <button className="bg-transparent text-color2 text-[20px] rounded-lg py-3 px-5 border-[1px] my-2 border-color2 hover:bg-color2 hover:text-color1">
                Get Ticket
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="bg-color4">
          <div className="Swiper_Slider_Box">
            <img
              src="https://cdn.mos.cms.futurecdn.net/gvQ9NhQP8wbbM32jXy4V3j.jpg"
              alt=""
            />

            <div className="Swiper_Slider_Box_right_box">
              <h2 className="text-redColor">Lorem ipsum dolor sit amet.</h2>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Praesentium mollitia iusto magni culpa itaque nobis architecto
                debitis. Harum, sunt. Architecto eveniet non tempora et velit
                voluptate itaque atque, est,Architecto eveniet non tempora et
                velit voluptate itaque atque, est,
              </p>
              <button className="bg-transparent text-color2 text-[20px] rounded-lg py-3 px-5 border-[1px] my-2 border-color2 hover:bg-color2 hover:text-color1">
                Get Ticket
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="bg-color4">
          <div className="Swiper_Slider_Box">
            <img
              src="https://m.media-amazon.com/images/I/51UDpiGLRPS._UXNaN_FMjpg_QL85_.jpg"
              alt=""
            />

            <div className="Swiper_Slider_Box_right_box">
              <h2 className="text-redColor">Lorem, ipsum dolor.</h2>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Praesentium mollitia iusto magni culpa itaque nobis architecto
                debitis. Harum, sunt. Architecto eveniet non tempora et velit
                voluptate itaque atque, est,Architecto eveniet non tempora et
                velit voluptate itaque atque, est,
              </p>
              <button className="bg-transparent text-color2 text-[20px] rounded-lg py-3 px-5 border-[1px] my-2 border-color2 hover:bg-color2 hover:text-color1">
                Get Ticket
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="bg-color4">
          <div className="Swiper_Slider_Box">
            <img
              src="https://www.myarklamiss.com/wp-content/uploads/sites/15/2021/07/Whats-Trending-2.jpg?w=1280"
              alt=""
            />
            <div className="Swiper_Slider_Box_right_box">
              <h2 className="text-redColor">Lorem, ipsum dolor sit elit.</h2>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Praesentium mollitia iusto magni culpa itaque nobis architecto
                debitis. Harum, sunt. Architecto eveniet non tempora et velit
                voluptate itaque atque, est,Architecto eveniet non tempora et
                velit voluptate itaque atque, est,
              </p>
              <button className="bg-transparent text-color2 text-[20px] rounded-lg py-3 px-5 border-[1px] my-2 border-color2 hover:bg-color2 hover:text-color1">
                Get Ticket
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroCarousal;
