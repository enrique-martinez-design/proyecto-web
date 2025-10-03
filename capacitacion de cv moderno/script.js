// script.js - versión limpia
(function(){
    // Abrir PDF dentro del visor y resaltar botón correspondiente
    function abrirPDF(rutaPDF) {
        const visor = document.getElementById("visorPDF");
        if(!visor) {
            console.warn('No se encontró el elemento #visorPDF');
            return;
        }

        // Limpiar visor y crear iframe de forma segura
        while(visor.firstChild) visor.removeChild(visor.firstChild);
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', rutaPDF);
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('title', 'Visor de PDF');
        iframe.setAttribute('allowfullscreen', '');
        iframe.style.width = '90%';
        iframe.style.height = '500px';
        visor.appendChild(iframe);

        // Resaltar botón seleccionado (si existe)
        const buttons = document.querySelectorAll('.cv-buttons .btn');
        buttons.forEach(b => b.classList.remove('active'));

        const clickedBtn = Array.from(buttons).find(b => {
            const onclick = b.getAttribute('onclick') || '';
            return onclick.includes(rutaPDF);
        });
        if(clickedBtn) clickedBtn.classList.add('active');
    }

    // Exponer la función globalmente para los botones inline (onclick)
    window.abrirPDF = abrirPDF;

    // Colapsar/expandir secciones y resaltar menú
    const menuBtns = document.querySelectorAll('.menu-btn');

    menuBtns.forEach(btn => {
        // Permitir activación por teclado (Enter / Space)
        btn.addEventListener('keydown', (e) => {
            if(e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });

        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const section = document.getElementById(targetId);
            if(!section) return;

            // Comportamiento tipo acordeón: cerrar otras secciones
            const allSections = document.querySelectorAll('.collapse-section');
            allSections.forEach(s => {
                if(s !== section) {
                    s.classList.remove('active');
                    s.setAttribute('aria-hidden', 'true');
                }
            });

            // Toggle de la sección solicitada
            const isActive = section.classList.toggle('active');
            section.setAttribute('aria-hidden', String(!isActive));

            // Actualizar aria-expanded en botones
            menuBtns.forEach(b => b.setAttribute('aria-expanded', 'false'));
            btn.setAttribute('aria-expanded', String(isActive));

            // Scroll suave hacia la sección si se abre
            if(isActive){
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            // Resaltar menú seleccionado
            menuBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

})();

menuBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const section = document.getElementById(targetId);

        // Cerrar la sección de bienvenida si existe
        const bienvenida = document.getElementById('bienvenida');
        if(bienvenida) bienvenida.classList.remove('active');

        // Toggle active class en la sección seleccionada
        section.classList.toggle('active');

        // Scroll suave
        if(section.classList.contains('active')){
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Resaltar menú
        menuBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});
