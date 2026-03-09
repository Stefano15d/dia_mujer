document.addEventListener("DOMContentLoaded", () => {
    // --- 1. Remover Loader ---
    const loader = document.getElementById("loader");
    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.style.display = "none";
            }, 800);
        }, 500);
    });

    // --- 2. Inicializar animaciones de scroll (AOS) ---
    AOS.init({
        once: true, // La animación solo sucede la primera vez que se hace scroll
        offset: 100,
        duration: 800
    });

    // --- 3. Inicializar Swiper (Carrusel 3D) ---
    var swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
            rotate: 15,
            stretch: 0,
            depth: 150,
            modifier: 1,
            slideShadows: true,
        },
        loop: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    // --- 4. Efecto Máquina de Escribir (Typed.js) ---
    // Se activa cuando la sección entra en pantalla usando Intersection Observer
    const typedTextID = "typed-text";
    let typedInstance = null;

    /* ==================================================================
       EDITAR AQUÍ: Modifica el texto para cambiar el mensaje de la carta 
       ================================================================== */
    const mensajeCarta = `Hoy quiero recordarte lo increíble, valiosa, fuerte y hermosa que eres. <br><br> Gracias por existir y por iluminar la vida de quienes te rodean. Tu sola presencia hace que todo tenga más sentido y magia.`;

    const dedicatoria = document.getElementById("dedicatoria");
    if(dedicatoria) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting && !typedInstance) {
                    typedInstance = new Typed(`#${typedTextID}`, {
                        strings: [mensajeCarta],
                        typeSpeed: 0, // 0 es lo más rápido (instantáneo) por letra
                        showCursor: true,
                        cursorChar: '|',
                        onComplete: (self) => {
                            setTimeout(() => {
                                document.querySelector('.typed-cursor').style.display = 'none';
                            }, 2000);
                        }
                    });
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(dedicatoria);
    }

    // --- 5. Partículas de Fondo (Corazones Fluidos) ---
    tsParticles.load("tsparticles", {
        fpsLimit: 120, // Rendering a 120hz si es posible
        particles: {
            number: {
                value: 30, // Limitado a 30 objetos que suben
                density: { enable: true, value_area: 800 }
            },
            shape: {
                type: "image",
                image: [
                    {
                        src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='%23ff80ab' d='M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z'/></svg>",
                        width: 100,
                        height: 100
                    },
                    {
                        src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='%23ffffff' d='M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z'/></svg>",
                        width: 100,
                        height: 100
                    }
                ]
            },
            opacity: {
                value: 0.7,
                random: true,
                anim: {
                    enable: true,
                    speed: 2, 
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: { min: 10, max: 25 }, 
                random: true,
                anim: {
                    enable: true,
                    speed: 3, 
                    size_min: 10,
                    sync: false
                }
            },
            move: {
                enable: true,
                speed: 4, // Movimiento super ágil!
                direction: "top", 
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "bubble" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                bubble: { distance: 150, size: 30, duration: 2, opacity: 1, speed: 3 },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });

    // --- 6. Acción del botón final (Confetti Especial) ---
    const btnFinal = document.getElementById("btn-final");
    if(btnFinal) {
        btnFinal.addEventListener("click", () => {
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#d81b60', '#ff80ab', '#ffffff', '#d4af37'],
                shapes: ['circle', 'square'],
            });
        });
    }

    // --- 7. Efecto "Likes de TikTok" en el Video ---
    const videoContainer = document.querySelector(".video-wrapper");
    if(videoContainer) {
        // Colocamos el contenedor relativo por si no lo estuviera en css
        videoContainer.style.position = "relative";
        
        setInterval(() => {
            const heart = document.createElement("i");
            heart.classList.add("fa-solid", "fa-heart", "tiktok-heart");
            
            // Posición inicial aleatoria en la parte inferior derecha
            const randomX = Math.floor(Math.random() * 40) + 10; // entre 10% y 50% desde la derecha
            heart.style.right = `${randomX}%`;
            
            // Tamaño aleatorio para variar
            const size = Math.random() * 1.5 + 0.8;
            heart.style.fontSize = `${size}rem`;
            
            videoContainer.appendChild(heart);
            
            // Eliminar el corazón del DOM cuando termina su animación (3 segundos)
            setTimeout(() => {
                heart.remove();
            }, 3000);
            
        }, 400); // Lanza un corazón cada 400ms
    }
});
