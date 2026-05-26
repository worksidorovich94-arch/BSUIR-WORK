document.addEventListener('DOMContentLoaded', function () {
    // 1. Инициализация слайдера главного экрана (Галерея)
    const heroSwiper = new Swiper('.hero-slider', {
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 5000,
        },
    });

    // 2. Инициализация слайдера отзывов (включается только на мобильных)
    let reviewsSwiper = null;

    function initReviewsSlider() {
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            if (!reviewsSwiper) {
                reviewsSwiper = new Swiper('.reviews-slider', {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                });
            }
        } else {
            if (reviewsSwiper) {
                reviewsSwiper.destroy(true, true);
                reviewsSwiper = null;
                // Сброс стилей, добавленных swiper-ом
                document.querySelector('.reviews-slider .swiper-wrapper').removeAttribute('style');
                document.querySelectorAll('.reviews-slider .swiper-slide').forEach(s => s.removeAttribute('style'));
            }
        }
    }

    // Проверяем при загрузке и изменении размера окна
    window.addEventListener('resize', initReviewsSlider);
    initReviewsSlider();

    // 3. Бургер меню для мобильной версии
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');

    if (burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // Закрываем меню при клике на ссылку (на мобильном)
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        });
    });

    // 4. Логика появления кнопки "Наверх"
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
});