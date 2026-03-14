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
    const mensajeCarta = `Si alguna vez olvidas lo mucho que vales, vuelve a estas palabras y recuérdalo: eres luz en medio de los días grises, calma en medio del ruido y ternura en un mundo que muchas veces olvida sentir. Eres una de esas personas que hacen que la vida se sienta más bonita, más cálida y más llena de esperanza.<br><br>Tu manera de existir tiene algo especial, algo que no todos tienen: la capacidad de transmitir paz, de regalar sonrisas sinceras y de dejar huella en el corazón de quienes te rodean. Hay una belleza en ti que va mucho más allá de lo que se ve, porque nace de tu esencia, de tu fuerza, de tu dulzura y de esa luz tan única que llevas dentro.<br><br>Nunca dudes de lo importante que eres, porque incluso en los días en los que no lo notas, sigues siendo alguien valiosa, admirable y profundamente especial. Tu presencia tiene ese tipo de magia que alegra, acompaña y hace sentir que todo puede estar un poco mejor. Y eso, aunque a veces no lo veas, es un regalo inmenso para este mundo.`;

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

    // --- 6. Acción del botón final (Confetti Especial y "Te Amo" flotantes) ---
    const btnFinal = document.getElementById("btn-final");
    if(btnFinal) {
        btnFinal.addEventListener("click", (e) => {
            // 1. Confetti
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#d81b60', '#ff80ab', '#ffffff', '#d4af37'],
                shapes: ['circle', 'square'],
            });

            // 2. Generar múltiples "Te amo" flotantes
            const containerFinal = document.getElementById("cierre");
            if(containerFinal) {
                // Cantidad de textos a generar
                const numTexts = 6;
                const rect = btnFinal.getBoundingClientRect();
                
                // Calculamos el centro del contenedor padre relative (hero/cierre usa relative)
                // Para posicionarlos alrededor del botón
                
                for (let i = 0; i < numTexts; i++) {
                    const teAmoText = document.createElement("span");
                    teAmoText.classList.add("floating-te-amo");
                    teAmoText.innerText = "¡Te amo!";
                    
                    // Posicionamiento aleatorio cerca de donde se hizo click
                    // Obtenemos coordenadas X e Y relativas al viewport desde el evento de click (o el centro del botón)
                    let xPos = e.clientX || (rect.left + rect.width / 2);
                    let yPos = e.clientY || rect.top;
                    
                    // Variación aleatoria (-80px a +80px en X, -20px a +20px en Y)
                    const randomX = (Math.random() - 0.5) * 160;
                    const randomY = (Math.random() - 0.5) * 40;
                    
                    // Aseguramos que el contenedor padre maneje bien positions absolutos respecto al viewport
                    // Lo más fácil es hacer fix al body u obligar a pegarlo al elemento
                    teAmoText.style.left = `${xPos + randomX}px`;
                    teAmoText.style.top = `${yPos + randomY}px`;
                    teAmoText.style.position = 'fixed'; // Fixed para que suba independientemente del scroll
                    
                    // Colores temáticos aleatorios
                    const colors = ['#d81b60', '#ff80ab', '#ffffff', '#880e4f'];
                    teAmoText.style.color = colors[Math.floor(Math.random() * colors.length)];
                    
                    // Tamaños aleatorios para variedad
                    teAmoText.style.fontSize = `${Math.random() * 1.5 + 1.5}rem`;
                    
                    // Retrasos aleatorios para que salgan en cascada
                    const delay = Math.random() * 0.4;
                    teAmoText.style.animationDelay = `${delay}s`;
                    
                    // Agregamos al body para evitar problemas de overflow: hidden de contenedores padre
                    document.body.appendChild(teAmoText);
                    
                    // Limpiamos el DOM tras la animación (2.5s base + retraso max 0.4s)
                    setTimeout(() => {
                        teAmoText.remove();
                    }, 3000);
                }
            }
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

    // --- 8. Contador de Días ---
    // Desde el 14 de noviembre del 2022 hasta el 14 de marzo del 2026
    const startDate = new Date('2022-11-14T00:00:00');
    const endDate = new Date('2026-03-14T00:00:00');
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const numDiasElement = document.getElementById("num-dias");
    if (numDiasElement) {
        let startTimestamp = null;
        const duration = 2500; // 2.5 segundos de animación premium
        
        // Función de easing (easeOutExpo) para que empiece rápido y termine súper suave
        const easeOutExpo = (x) => {
            return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
        };
        
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easedProgress = easeOutExpo(progress);
            
            numDiasElement.innerText = Math.floor(easedProgress * diffDays);
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                numDiasElement.innerText = diffDays;
                // Mágia al terminar: Añadimos la clase pop-effect
                if (numDiasElement.parentElement) {
                    numDiasElement.parentElement.classList.add("pop-effect");
                }
                
                // Un pequeño burst de confetti exclusivo para el contador
                setTimeout(() => {
                    confetti({
                        particleCount: 60,
                        spread: 70,
                        origin: { y: 0.45 },
                        colors: ['#d81b60', '#ff80ab', '#ffffff']
                    });
                }, 100);
            }
        };
        // Retrasamos el inicio un poquito para que coincida con la entrada (AOS)
        setTimeout(() => {
            window.requestAnimationFrame(step);
        }, 600);
    }

    // --- 9. Animación Interactiva Frases (Osito) ---
    const cards = document.querySelectorAll('.interactive-quote-card');
    const bear = document.getElementById('cute-bear');
    const bearWrapper = document.getElementById('bear-wrapper');
    const cardsContainer = document.getElementById('cards-container');

    if (cards.length > 0 && bear && bearWrapper && cardsContainer) {
        let isAnimating = false;

        cards.forEach(card => {
            card.addEventListener('click', () => {
                // Prevenir múltiples clics si ya hay una animación en curso
                // o si la tarjeta ya fue ocultada
                if (isAnimating || card.classList.contains('card-hide')) return;
                
                isAnimating = true;

                // 1. Resaltar la tarjeta
                card.classList.add('card-highlight');

                // Calcular posiciones relativas para mover la envoltura (wrapper) del osito
                const bearRect = bearWrapper.getBoundingClientRect();
                const cardRect = card.getBoundingClientRect();
                
                // Calculamos cuánto tiene que moverse en X y Y para llegar al centro de la tarjeta
                const deltaX = cardRect.left + (cardRect.width / 2) - (bearRect.left + (bearRect.width / 2));
                const deltaY = cardRect.top + (cardRect.height / 2) - (bearRect.top + (bearRect.height / 2));

                // 2. Mover el envoltura (wrapper) hacia la tarjeta mientras el osito camina adentro
                bear.classList.add('walk-action');
                
                // Aplicamos el movimiento (translación pura en el div padre)
                bearWrapper.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

                // 3. Cuando el osito llega (después de 800ms)
                setTimeout(() => {
                    // Detenemos la caminata
                    bear.classList.remove('walk-action');

                    // El osito hace efecto de abrazo
                    bear.classList.add('hug-action');
                    
                    // Se oculta la tarjeta suavemente
                    card.classList.remove('card-highlight');
                    card.classList.add('card-hide');
                    
                    // 4. Después de la animación de abrazo, el osito regresa
                    setTimeout(() => {
                        bear.classList.remove('hug-action');
                        
                        // Vuelve a caminar de regreso
                        bear.classList.add('walk-action');
                        
                        // Retornar el wrapper a la base
                        bearWrapper.style.transform = 'translate(0px, 0px)';
                        
                        // Termina toda la interacción cuando el osito llega a su lugar (800ms después)
                        setTimeout(() => {
                            // Se detiene al llegar
                            bear.classList.remove('walk-action');
                            isAnimating = false;
                        }, 800);
                        
                    }, 600); 
                    
                }, 800);
            });
        });
    }
});
