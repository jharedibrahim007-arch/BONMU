// =====================================================
// BONMU - JAVASCRIPT
// =====================================================


// =====================================================
// MENÚ PARA CELULAR
// =====================================================

const menuToggle = document.getElementById("menu-toggle");
const nav = document.querySelector("nav");

if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {

        nav.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            nav.classList.contains("active")
        );

    });

}


const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

    });

});


// =====================================================
// BOTÓN VOLVER ARRIBA
// =====================================================

const backToTop = document.getElementById("back-to-top");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });


    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


// =====================================================
// ANIMACIONES AL HACER SCROLL
// =====================================================

const sections = document.querySelectorAll(".section");

if (sections.length > 0) {

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },

        {
            threshold: 0.15
        }

    );


    sections.forEach(section => {

        observer.observe(section);

    });

}


// =====================================================
// FILTRO DE PRODUCTOS
// =====================================================

const filterButtons =
    document.querySelectorAll(".filter-btn");

const productCards =
    document.querySelectorAll(".product-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        const category =
            button.dataset.category;


        productCards.forEach(card => {

            const productCategory =
                card.dataset.category;


            if (
                category === "todos" ||
                category === productCategory
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});


// =====================================================
// GALERÍA - LIGHTBOX (con zoom, navegación y pantalla completa)
// =====================================================

const galleryImages =
    document.querySelectorAll(".gallery-item img");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightbox-image");

const lightboxClose =
    document.getElementById("lightbox-close");

const lightboxZoom =
    document.getElementById("lightbox-zoom");

const lightboxFullscreen =
    document.getElementById("lightbox-fullscreen");

const lightboxPrev =
    document.getElementById("lightbox-prev");

const lightboxNext =
    document.getElementById("lightbox-next");

const lightboxCounter =
    document.getElementById("lightbox-counter");


// Comprobar que la galería existe

if (
    galleryImages.length > 0 &&
    lightbox &&
    lightboxImage &&
    lightboxClose
) {

    const images = Array.from(galleryImages);
    let currentIndex = 0;


    // ---------------------------------------------
    // MOSTRAR UNA IMAGEN SEGÚN SU ÍNDICE
    // ---------------------------------------------

    function showImage(index) {

        // Que el índice siempre esté dentro del rango (circular)

        currentIndex = (index + images.length) % images.length;

        const image = images[currentIndex];

        lightboxImage.src = image.getAttribute("src");
        lightboxImage.alt = image.getAttribute("alt");

        lightbox.classList.remove("zoomed");

        if (lightboxCounter) {

            lightboxCounter.textContent =
                (currentIndex + 1) + " / " + images.length;

        }

    }


    // ---------------------------------------------
    // ABRIR IMAGEN
    // ---------------------------------------------

    images.forEach((image, index) => {

        image.addEventListener("click", () => {

            showImage(index);

            lightbox.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    });


    // ---------------------------------------------
    // SIGUIENTE / ANTERIOR
    // ---------------------------------------------

    if (lightboxNext) {

        lightboxNext.addEventListener("click", event => {

            event.stopPropagation();
            showImage(currentIndex + 1);

        });

    }

    if (lightboxPrev) {

        lightboxPrev.addEventListener("click", event => {

            event.stopPropagation();
            showImage(currentIndex - 1);

        });

    }


    // ---------------------------------------------
    // ZOOM: AGRANDAR / REDUCIR LA IMAGEN
    // ---------------------------------------------

    function toggleZoom(event) {

        if (event) {
            event.stopPropagation();
        }

        lightbox.classList.toggle("zoomed");

    }

    if (lightboxZoom) {

        lightboxZoom.addEventListener("click", toggleZoom);

    }

    // También se puede tocar/hacer clic directamente en la imagen

    lightboxImage.addEventListener("click", event => {

        event.stopPropagation();
        toggleZoom();

    });


    // ---------------------------------------------
    // PANTALLA COMPLETA (Fullscreen API del navegador)
    // ---------------------------------------------

    if (lightboxFullscreen) {

        lightboxFullscreen.addEventListener("click", event => {

            event.stopPropagation();

            if (!document.fullscreenElement) {

                if (lightbox.requestFullscreen) {
                    lightbox.requestFullscreen().catch(() => {});
                }

            } else {

                if (document.exitFullscreen) {
                    document.exitFullscreen().catch(() => {});
                }

            }

        });

    }


    // ---------------------------------------------
    // CERRAR CON X
    // ---------------------------------------------

    lightboxClose.addEventListener("click", () => {

        closeLightbox();

    });


    // ---------------------------------------------
    // CERRAR HACIENDO CLIC EN EL FONDO
    // ---------------------------------------------

    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });


    // ---------------------------------------------
    // TECLADO: ESC PARA CERRAR, FLECHAS PARA NAVEGAR
    // ---------------------------------------------

    document.addEventListener("keydown", event => {

        if (!lightbox.classList.contains("active")) {
            return;
        }

        if (event.key === "Escape") {

            closeLightbox();

        } else if (event.key === "ArrowRight") {

            showImage(currentIndex + 1);

        } else if (event.key === "ArrowLeft") {

            showImage(currentIndex - 1);

        }

    });


    // ---------------------------------------------
    // DESLIZAR CON EL DEDO EN CELULAR (swipe)
    // ---------------------------------------------

    let touchStartX = 0;

    lightbox.addEventListener("touchstart", event => {

        touchStartX = event.changedTouches[0].screenX;

    }, { passive: true });

    lightbox.addEventListener("touchend", event => {

        const touchEndX = event.changedTouches[0].screenX;
        const difference = touchStartX - touchEndX;

        // Se necesita un mínimo de desplazamiento para contar como swipe

        if (Math.abs(difference) > 50) {

            if (difference > 0) {

                showImage(currentIndex + 1);

            } else {

                showImage(currentIndex - 1);

            }

        }

    }, { passive: true });


}


// =====================================================
// FUNCIÓN PARA CERRAR LIGHTBOX
// =====================================================

function closeLightbox() {

    if (!lightbox || !lightboxImage) {
        return;
    }

    lightbox.classList.remove("active");
    lightbox.classList.remove("zoomed");

    document.body.style.overflow = "";

    if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
    }

}
console.log("BONMU JavaScript funciona");

// =====================================================
// BONMU - CARRUSEL AUTOMÁTICO ESTILO CATÁLOGO
// =====================================================
(function(){
    const track = document.getElementById("showcase-track");
    const viewport = document.querySelector(".showcase-viewport");
    const prev = document.getElementById("showcase-prev");
    const next = document.getElementById("showcase-next");
    const dotsBox = document.getElementById("showcase-dots");
    if(!track || !viewport) return;

    const cards = Array.from(track.querySelectorAll(".showcase-card"));
    let index = 0;
    let timer;
    let visible = 3;

    function getVisible(){
        if(window.innerWidth <= 700) return 1;
        if(window.innerWidth <= 1000) return 2;
        return 3;
    }

    function update(){
        visible = getVisible();
        const gap = 22;
        const cardWidth = cards[0].getBoundingClientRect().width;
        const maxIndex = Math.max(0, cards.length - visible);
        if(index > maxIndex) index = 0;
        track.style.transform = `translateX(-${index * (cardWidth + gap)}px)`;
        renderDots(maxIndex + 1);
    }

    function renderDots(total){
        if(!dotsBox) return;
        dotsBox.innerHTML = "";
        for(let i=0;i<total;i++){
            const dot=document.createElement("button");
            dot.className="showcase-dot"+(i===index?" active":"");
            dot.type="button";
            dot.setAttribute("aria-label",`Ir al destacado ${i+1}`);
            dot.addEventListener("click",()=>{ index=i; update(); restart(); });
            dotsBox.appendChild(dot);
        }
    }

    function move(step){
        const maxIndex = Math.max(0, cards.length - getVisible());
        index += step;
        if(index > maxIndex) index = 0;
        if(index < 0) index = maxIndex;
        update();
    }
    function start(){
        clearInterval(timer);
        timer=setInterval(()=>move(1),4200);
    }
    function restart(){ start(); }

    prev?.addEventListener("click",()=>{move(-1);restart()});
    next?.addEventListener("click",()=>{move(1);restart()});
    viewport.addEventListener("mouseenter",()=>clearInterval(timer));
    viewport.addEventListener("mouseleave",start);
    window.addEventListener("resize",update);
    document.addEventListener("visibilitychange",()=>document.hidden?clearInterval(timer):start());
    update();
    start();
})();


// =====================================================
// BONMU - CARRITO DE PEDIDOS (localStorage)
// =====================================================
(function(){
    const storageKey="bonmu_cart_v1";
    let cart=[];
    try{ cart=JSON.parse(localStorage.getItem(storageKey)) || []; }catch(e){ cart=[]; }

    const overlay=document.getElementById("cart-overlay");
    const openBtn=document.getElementById("cart-open");
    const closeBtn=document.getElementById("cart-close");
    const itemsBox=document.getElementById("cart-items");
    const emptyBox=document.getElementById("cart-empty");
    const footer=document.getElementById("cart-footer");
    const count=document.getElementById("cart-count");
    const totalItems=document.getElementById("cart-total-items");
    const checkout=document.getElementById("cart-checkout");
    const clearBtn=document.getElementById("cart-clear");
    const shopBtn=document.getElementById("cart-shop");

    if(!overlay || !itemsBox) return;

    const imageMap={
        respirador:"img/galeria/foto2.jpeg",
        arnes:"img/galeria/foto5.jpeg",
        limpieza:"img/galeria/foto3.jpeg",
        construccion:"img/productos/construccion.jpg"
    };

    function save(){
        localStorage.setItem(storageKey,JSON.stringify(cart));
        render();
    }

    function openCart(){
        overlay.classList.add("open");
        overlay.setAttribute("aria-hidden","false");
        document.body.style.overflow="hidden";
    }
    function closeCart(){
        overlay.classList.remove("open");
        overlay.setAttribute("aria-hidden","true");
        document.body.style.overflow="";
    }

    function add(id,name){
        const found=cart.find(item=>item.id===id);
        if(found) found.qty++;
        else cart.push({id,name,qty:1});
        save();
        openCart();
        count?.classList.remove("cart-badge-pop");
        void count?.offsetWidth;
        count?.classList.add("cart-badge-pop");
    }

    function change(id,delta){
        const item=cart.find(x=>x.id===id);
        if(!item) return;
        item.qty+=delta;
        if(item.qty<=0) cart=cart.filter(x=>x.id!==id);
        save();
    }

    function removeItem(id){
        cart=cart.filter(x=>x.id!==id);
        save();
    }

    function render(){
        const qty=cart.reduce((sum,item)=>sum+item.qty,0);
        if(count) count.textContent=qty;
        if(totalItems) totalItems.textContent=qty;
        emptyBox.style.display=cart.length?"none":"block";
        footer.style.display=cart.length?"block":"none";

        itemsBox.innerHTML="";
        cart.forEach(item=>{
            const row=document.createElement("div");
            row.className="cart-item";
            row.innerHTML=`
                <img src="${imageMap[item.id] || "img/logo.png"}" alt="">
                <div>
                    <h4>${escapeHtml(item.name)}</h4>
                    <small>Precio: consultar</small>
                    <div class="qty-controls">
                        <button type="button" data-action="minus" aria-label="Reducir cantidad">−</button>
                        <strong>${item.qty}</strong>
                        <button type="button" data-action="plus" aria-label="Aumentar cantidad">+</button>
                    </div>
                    <button class="cart-remove" type="button" data-action="remove">Eliminar</button>
                </div>
                <span></span>
            `;
            row.querySelector('[data-action="minus"]').onclick=()=>change(item.id,-1);
            row.querySelector('[data-action="plus"]').onclick=()=>change(item.id,1);
            row.querySelector('[data-action="remove"]').onclick=()=>removeItem(item.id);
            itemsBox.appendChild(row);
        });
    }

    function escapeHtml(text){
        return String(text).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
    }

    document.querySelectorAll(".add-to-cart").forEach(btn=>{
        btn.addEventListener("click",()=>add(btn.dataset.id,btn.dataset.name));
    });

    openBtn?.addEventListener("click",openCart);
    closeBtn?.addEventListener("click",closeCart);
    shopBtn?.addEventListener("click",()=>{closeCart();document.getElementById("productos")?.scrollIntoView({behavior:"smooth"});});
    overlay.addEventListener("click",e=>{if(e.target===overlay)closeCart();});
    clearBtn?.addEventListener("click",()=>{cart=[];save();});

    checkout?.addEventListener("click",()=>{
        if(!cart.length) return;
        let message="Hola BONMU, quiero reservar este pedido:%0A%0A";
        cart.forEach(item=>{
            message+=`• ${encodeURIComponent(item.name)} x${item.qty}%0A`;
        });
        message+="%0AQuisiera confirmar disponibilidad y precio para realizar el pago.";
        window.open("https://wa.me/+51944234226?text="+message,"_blank","noopener");
    });

    document.addEventListener("keydown",e=>{
        if(e.key==="Escape" && overlay.classList.contains("open")) closeCart();
    });

    render();
})();


// =====================================================
// BONMU - GALERÍA: BÚSQUEDA + DETALLES DEL PRODUCTO
// =====================================================
(function(){
    const gallery = document.getElementById("gallery-grid");
    const search = document.getElementById("gallery-search");
    const clearSearch = document.getElementById("gallery-search-clear");
    const resultCount = document.getElementById("gallery-result-count");
    const noResults = document.getElementById("gallery-no-results");
    const showAll = document.getElementById("gallery-show-all");

    const modal = document.getElementById("product-detail-modal");
    const closeModal = document.getElementById("product-detail-close");
    const detailImage = document.getElementById("detail-image");
    const detailCategory = document.getElementById("detail-category");
    const detailTitle = document.getElementById("detail-title");
    const detailDescription = document.getElementById("detail-description");
    const detailOptions = document.getElementById("detail-options");
    const detailAddCart = document.getElementById("detail-add-cart");
    const detailWhatsapp = document.getElementById("detail-whatsapp");

    if(!gallery || !modal) return;

    const products = {
        chaleco: {
            category: "Seguridad · EPP",
            title: "Chaleco reflectivo",
            description: "Prenda de alta visibilidad pensada para facilitar la identificación del trabajador en zonas de tránsito, obras y actividades donde se necesita mayor visibilidad.",
            options: [
                ["Tallas", "Consultar disponibilidad según modelo"],
                ["Colores", "Consultar colores disponibles"],
                ["Uso", "Obras, almacenes, tránsito y trabajo en campo"],
                ["Presentación", "Consultar disponibilidad"]
            ],
            image: "img/galeria/foto1.jpeg"
        },
        detergente: {
            category: "Limpieza",
            title: "Detergente",
            description: "Producto para limpieza de prendas y superficies según la presentación. Ideal para complementar las necesidades de limpieza del hogar, negocio o empresa.",
            options: [
                ["Presentación", "Consultar tamaños disponibles"],
                ["Tipo", "Detergente para limpieza"],
                ["Uso", "Lavado y mantenimiento"],
                ["Disponibilidad", "Consultar stock actual"]
            ],
            image: "img/galeria/foto2.jpeg"
        },
        suavizante: {
            category: "Limpieza",
            title: "Suavizantes",
            description: "Suavizantes para el cuidado de la ropa, pensados para dejar una sensación agradable después del lavado.",
            options: [
                ["Presentación", "Consultar tamaños disponibles"],
                ["Aroma", "Consultar opciones disponibles"],
                ["Uso", "Cuidado y suavizado de prendas"],
                ["Disponibilidad", "Consultar stock actual"]
            ],
            image: "img/galeria/foto3.jpeg"
        },
        papel: {
            category: "Limpieza",
            title: "Toalla de papel",
            description: "Solución práctica para higiene y secado en hogares, oficinas, comercios y espacios de trabajo.",
            options: [
                ["Presentación", "Consultar formato y cantidad"],
                ["Tipo", "Toalla de papel"],
                ["Uso", "Higiene y secado"],
                ["Disponibilidad", "Consultar stock actual"]
            ],
            image: "img/galeria/foto4.jpeg"
        },
        respirador: {
            category: "Seguridad · EPP",
            title: "Respirador de doble vía",
            description: "Equipo de protección respiratoria para actividades donde se requiere protección frente a determinadas partículas o contaminantes, de acuerdo con el modelo y su ficha técnica.",
            options: [
                ["Talla / ajuste", "Consultar modelo y disponibilidad"],
                ["Filtros", "Consultar compatibilidad y disponibilidad"],
                ["Uso", "Según ficha técnica del producto"],
                ["Stock", "Consultar disponibilidad"]
            ],
            image: "img/galeria/foto5.jpeg"
        },
        cinta: {
            category: "Seguridad · Obra",
            title: "Cinta de peligro",
            description: "Cinta de señalización utilizada para delimitar zonas y advertir sobre áreas de riesgo o de acceso restringido.",
            options: [
                ["Color", "Consultar disponibilidad"],
                ["Longitud", "Consultar presentación disponible"],
                ["Uso", "Señalización y delimitación de áreas"],
                ["Disponibilidad", "Consultar stock actual"]
            ],
            image: "img/galeria/foto6.jpeg"
        },
        arnes: {
            category: "Seguridad · EPP",
            title: "Arnés y línea de vida",
            description: "Sistema de protección para trabajos en altura. La selección del equipo debe realizarse de acuerdo con la actividad, compatibilidad y ficha técnica correspondiente.",
            options: [
                ["Talla", "Consultar tallas y ajuste disponibles"],
                ["Configuración", "Consultar modelos disponibles"],
                ["Uso", "Trabajos en altura, según ficha técnica"],
                ["Stock", "Consultar disponibilidad"]
            ],
            image: "img/galeria/foto7.jpeg"
        },
        casco: {
            category: "Seguridad · EPP",
            title: "Casco tipo jockey",
            description: "Elemento de protección para la cabeza destinado a actividades laborales donde se requiere protección, según las características y certificaciones del modelo.",
            options: [
                ["Talla / ajuste", "Consultar disponibilidad"],
                ["Colores", "Consultar colores disponibles"],
                ["Uso", "Obras y actividades laborales"],
                ["Stock", "Consultar disponibilidad"]
            ],
            image: "img/galeria/foto8.jpeg"
        }
    };

    const items = Array.from(gallery.querySelectorAll(".product-detail-trigger"));
    let selectedProduct = null;

    function normalize(text){
        return String(text || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    function filterGallery(){
        const term = normalize(search?.value);
        let visible = 0;

        items.forEach(item => {
            const haystack = normalize(
                item.dataset.search + " " +
                item.dataset.category + " " +
                item.innerText
            );
            const match = !term || haystack.includes(term);
            item.classList.toggle("search-hidden", !match);
            if(match) visible++;
        });

        if(resultCount){
            resultCount.textContent = `${visible} ${visible === 1 ? "producto" : "productos"}`;
        }
        if(noResults){
            noResults.hidden = visible !== 0;
        }
    }

    function openDetail(id){
        const product = products[id];
        if(!product) return;

        selectedProduct = product;

        detailImage.src = product.image;
        detailImage.alt = product.title;
        detailCategory.textContent = product.category;
        detailTitle.textContent = product.title;
        detailDescription.textContent = product.description;

        detailOptions.innerHTML = product.options.map(option => `
            <div class="detail-option">
                <strong>${escapeHtml(option[0])}</strong>
                <span>${escapeHtml(option[1])}</span>
            </div>
        `).join("");

        const message = `Hola BONMU, quisiera información sobre ${product.title}.`;
        detailWhatsapp.href = "https://wa.me/+51944234226?text=" + encodeURIComponent(message);

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeDetail(){
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        selectedProduct = null;
    }

    function escapeHtml(text){
        return String(text).replace(/[&<>"']/g, m => ({
            "&":"&amp;",
            "<":"&lt;",
            ">":"&gt;",
            '"':"&quot;",
            "'":"&#039;"
        }[m]));
    }

    items.forEach(item => {
        const open = () => openDetail(item.dataset.productId);
        item.addEventListener("click", open);
        item.addEventListener("keydown", event => {
            if(event.key === "Enter" || event.key === " "){
                event.preventDefault();
                open();
            }
        });
    });

    search?.addEventListener("input", filterGallery);

    clearSearch?.addEventListener("click", () => {
        if(search){
            search.value = "";
            search.focus();
        }
        filterGallery();
    });

    showAll?.addEventListener("click", () => {
        if(search) search.value = "";
        filterGallery();
    });

    closeModal?.addEventListener("click", closeDetail);

    modal.addEventListener("click", event => {
        if(event.target.matches("[data-detail-close]")) closeDetail();
    });

    document.addEventListener("keydown", event => {
        if(event.key === "Escape" && modal.classList.contains("active")){
            closeDetail();
        }
    });

    // El botón de detalles reutiliza el carrito existente.
    detailAddCart?.addEventListener("click", () => {
        if(!selectedProduct) return;

        const productId = Object.keys(products).find(
            id => products[id] === selectedProduct
        );

        const originalButton = document.querySelector(
            `.add-to-cart[data-id="${CSS.escape(productId || "")}"]`
        );

        if(originalButton){
            originalButton.click();
        } else {
            // Si todavía no existe una tarjeta equivalente en Productos,
            // guardamos directamente un pedido compatible con el carrito actual.
            const storageKey = "bonmu_cart_v1";
            let cart = [];
            try { cart = JSON.parse(localStorage.getItem(storageKey)) || []; } catch(e) {}

            const found = cart.find(item => item.id === productId);
            if(found) found.qty++;
            else cart.push({
                id: productId,
                name: selectedProduct.title,
                qty: 1
            });

            localStorage.setItem(storageKey, JSON.stringify(cart));
            document.getElementById("cart-count")?.classList.add("cart-badge-pop");
            document.getElementById("cart-open")?.click();
        }

        closeDetail();
    });

    filterGallery();
})();

// Botones "Ver detalles" de la sección Productos.
document.addEventListener("click", function(event){
    const button = event.target.closest(".product-detail-link");
    if(!button) return;
    const id = button.dataset.detailId;
    const card = document.querySelector(`.gallery-item[data-product-id="${CSS.escape(id)}"]`);
    card?.click();
});
