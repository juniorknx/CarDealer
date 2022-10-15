import styles from './Card.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Navigation } from "swiper";

// Import Swiper styles
import 'swiper/css';
import "swiper/css/navigation";

export function CarCard() {
    return (
        <div className={styles.sliderContainer}>
            <h3>Categorias</h3>
            
            <Swiper
                spaceBetween={20}
                slidesPerView={4}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                loop={true}
                modules={[Navigation]}
                className={styles.myswiper}
                navigation={true}
            >
                <SwiperSlide>
                    <div className={styles.cardBg}>
                        <h1 className={styles.slider__Title}>Sedan</h1>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className={styles.cardBgSuv}>
                        <h1 className={styles.slider__Title}>SUV</h1>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className={styles.cardBgHatches}>
                        <h1 className={styles.slider__Title}>Hatches</h1>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className={styles.cardBgPicapes}>
                        <h1 className={styles.slider__Title}>Picapes</h1>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className={styles.cardBgEconomy}>
                        <h1 className={styles.slider__Title}>Carros<br></br>Econômicos</h1>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className={styles.cardBgFam}>
                        <h1 className={styles.slider__Title}>Carros para <br></br> Família</h1>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}