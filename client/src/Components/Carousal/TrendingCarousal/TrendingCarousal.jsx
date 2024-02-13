import React from "react";
import "./TrendingCarousal.css";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Navigation, Pagination } from "swiper/modules";

const TrendingCarousal = () => {
  const swiperSettings = {
    spaceBetween: 30,
    pagination: {
      clickable: true,
    },
    navigation: true,
    modules: [Pagination, Navigation],
    breakpoints: {
      1280: {
        slidesPerView: 4,
      },
      1100: {
        slidesPerView: 3,
      },
      900: {
        slidesPerView: 2,
      },
      600: {
        slidesPerView: 1,
      },
    },
  };
  return (
    <div className="trending_carousal !text-color2">
      <h2 className="sm:text-3xl md:text-[35px] font-bold  !mb-4 text-center text-redColor py-5">
        TRENDING LIVE EVENTS
      </h2>
      {/* --- craousal  */}
      <div>
        <Swiper {...swiperSettings} className="mySwiper ">
          <SwiperSlide className="bg-color4">
            <div className="">
              <img src="https://wallpaperaccess.com/full/129913.jpg" alt="" />
              <div className="trending_carousal_content">
                <div class="font-bold text-xl mb-2">
                  The Coldest Sunset Lorem ipsum dolor sit amet.
                </div>
                <p class="text-gray-700 text-base text-[15px]">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="bg-color4">
            <div>
              <img
                src="https://www.myarklamiss.com/wp-content/uploads/sites/15/2021/07/Whats-Trending-2.jpg?w=1280"
                alt=""
              />
              <div className="trending_carousal_content">
                <div class="font-bold text-xl mb-2">
                  The Coldest Sunset Lorem ipsum dolor sit amet.
                </div>
                <p class="text-gray-700 text-base text-[15px]">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="bg-color4">
            <div>
              <img
                src="https://cdn.mos.cms.futurecdn.net/gvQ9NhQP8wbbM32jXy4V3j.jpg"
                alt=""
              />
              <div className="trending_carousal_content">
                <div class="font-bold text-xl mb-2">
                  The Coldest Sunset Lorem ipsum dolor sit amet.
                </div>
                <p class="text-gray-700 text-base text-[15px]">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="bg-color4">
            <div>
              <img src="https://wallpaperaccess.com/full/129913.jpg" alt="" />
              <div className="trending_carousal_content">
                <div class="font-bold text-xl mb-2">
                  The Coldest Sunset Lorem ipsum dolor sit amet.
                </div>
                <p class="text-gray-700 text-base text-[15px]">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="bg-color4">
            <div>
              <img
                src="https://m.media-amazon.com/images/I/51UDpiGLRPS._UXNaN_FMjpg_QL85_.jpg"
                alt=""
              />
              <div className="trending_carousal_content">
                <div class="font-bold text-xl mb-2">
                  The Coldest Sunset Lorem ipsum dolor sit amet.
                </div>
                <p class="text-gray-700 text-base text-[15px]">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default TrendingCarousal;
