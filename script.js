let lastScrollTop = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        // Disparaît lorsque vous faites défiler vers le bas
        navbar.style.top = "-70px"; // Ajustez cette valeur selon la hauteur de votre navbar
    } else {
        // Réapparaît dès que vous faites défiler vers le haut
        navbar.style.top = "0";
    }
    lastScrollTop = scrollTop;
});

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".section");
    const dots = document.querySelectorAll(".dot");

    // Scroll to the main section on page refresh
    window.location.hash = "#home";

    let currentSectionIndex = 0;
    let isScrolling = false;

    const updateActiveDot = () => {
        dots.forEach(dot => dot.classList.remove("active"));
        dots[currentSectionIndex].classList.add("active");
    };

    const scrollToSection = (index) => {
        if (index >= 0 && index < sections.length) {
            isScrolling = true;
            sections[index].scrollIntoView({ behavior: "smooth" });
            currentSectionIndex = index;
            updateActiveDot();
            setTimeout(() => {
                isScrolling = false;
            }, 1000); // Adjust this timeout as needed
        }
    };

    // Add event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            scrollToSection(index);
        });
    });

    // Handle mouse wheel scrolling
    window.addEventListener("wheel", (event) => {
        if (isScrolling) return;
        if (event.deltaY > 0) {
            scrollToSection(currentSectionIndex + 1);
        } else {
            scrollToSection(currentSectionIndex - 1);
        }
    });

    // Handle keyboard navigation
    window.addEventListener("keydown", (event) => {
        if (isScrolling) return;
        if (event.key === "ArrowDown") {
            scrollToSection(currentSectionIndex + 1);
        } else if (event.key === "ArrowUp") {
            scrollToSection(currentSectionIndex - 1);
        }
    });

    // Ensure that the page starts at the top section on reload
    window.addEventListener("beforeunload", () => {
        window.scrollTo(0, 0);
    });

    // Liste des images de projet
    const projectImages = [
        'projet/1.png',
        'projet/2.png',
        'projet/3.png',
        'projet/4.png',
        'projet/5.png',
    ];

    let currentProjectIndex = 0;

    // Fonction pour afficher l'image de projet actuelle
    function displayProject(index) {
        const projectImageElement = document.querySelector('.project-display img');
        projectImageElement.classList.add('fade-out');
        
        setTimeout(() => {
            projectImageElement.src = projectImages[index];
            projectImageElement.classList.remove('fade-out');
        }, 500); // La durée de l'animation en ms doit correspondre à celle définie dans le CSS
    }

    // Fonction pour passer au projet suivant
    function nextProject() {
        currentProjectIndex = (currentProjectIndex + 1) % projectImages.length;
        displayProject(currentProjectIndex);
    }

    // Fonction pour revenir au projet précédent
    function prevProject() {
        currentProjectIndex = (currentProjectIndex - 1 + projectImages.length) % projectImages.length;
        displayProject(currentProjectIndex);
    }

    // Initialiser l'affichage avec le premier projet
    displayProject(currentProjectIndex);

    // Ajoutez les gestionnaires d'événements pour les flèches après le chargement du DOM
    document.querySelector('.left-arrow').addEventListener('click', prevProject);
    document.querySelector('.right-arrow').addEventListener('click', nextProject);
});
