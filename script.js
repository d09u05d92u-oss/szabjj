document.addEventListener('DOMContentLoaded', () => {

    // === MENU HAMBURGUER (desktop + mobile) ===
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".side-menu");
    const mainContent = document.querySelector("main"); // Adicionamos uma referência ao conteúdo principal

    if (toggle && menu) {
        // Lógica de toggle: Abre/fecha o menu ao clicar no botão
        toggle.addEventListener("click", (event) => {
            event.stopPropagation(); // Impede que o clique se propague para o document
            menu.classList.toggle("active");
            toggle.classList.toggle("active");
        });

        // Lógica de fechar o menu ao clicar fora dele
        document.addEventListener("click", (event) => {
            // Se o clique não foi dentro do menu e nem no botão, feche o menu
            if (!menu.contains(event.target) && !toggle.contains(event.target) && menu.classList.contains("active")) {
                menu.classList.remove("active");
                toggle.classList.remove("active");
            }
        });
    }

    // === SCRIPT PARA ROLAGEM SUAVE NO BLOG ===
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // === SLIDESHOW (vários carrosséis na mesma página) ===
    const slideshows = document.querySelectorAll('.slideshow');
    slideshows.forEach(slideshow => {
        const slides = slideshow.querySelectorAll('.slide');
        let slideIndex = 0;
        
        const showSlides = () => {
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === slideIndex);
            });
        };

        const plusSlides = (n) => {
            slideIndex += n;
            if (slideIndex >= slides.length) {
                slideIndex = 0;
            }
            if (slideIndex < 0) {
                slideIndex = slides.length - 1;
            }
            showSlides();
        };

        if (slides.length > 1) {
            const navPrev = document.createElement('button');
            navPrev.className = 'nav-btn nav-prev';
            navPrev.innerHTML = '&#10094;';
            navPrev.addEventListener('click', () => plusSlides(-1));
            slideshow.appendChild(navPrev);

            const navNext = document.createElement('button');
            navNext.className = 'nav-btn nav-next';
            navNext.innerHTML = '&#10095;';
            navNext.addEventListener('click', () => plusSlides(1));
            slideshow.appendChild(navNext);
        }

        showSlides();
    });

    // === Botão de voltar ao topo ===
    const topBtn = document.getElementById('topBtn');
    if (topBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 280) {
                topBtn.style.display = 'block';
            } else {
                topBtn.style.display = 'none';
            }
        });

        topBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Remove a classe "active" de todos os links do menu e adiciona ao link da página atual
    const currentPagePath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll("#side-menu a").forEach(link => {
        if (link.href.endsWith(currentPagePath)) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
});