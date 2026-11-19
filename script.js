const WHATSAPP_NUMBER = '5511913409838';

const PRODUCTS = [
  { name: 'Sabonetes Artesanais',      desc: 'Kit com sabonetes artesanais hidratante',                category: 'skincare', price: 10, image: 'sabonetes-artesanais.jpg' },
  { name: 'Lenço Demaquilante',        desc: 'Limpeza prática e eficaz para remover maquiagem',        category: 'skincare', price: 10, image: 'lenco-demaquilante.jpg' },
  { name: 'Kit Love Hidratante',       desc: 'Tratamento completo com ingredientes nutritivos',        category: 'skincare', price: 10, image: 'kit-love-hidratante.jpg' },
  { name: 'Máscaras Faciais Coloridas',desc: 'Trio de máscaras para revitalizar a pele',               category: 'skincare', price: 10, image: 'mascaras-faciais.jpg' },
  { name: 'Kit Tratamento Facial APIS',desc: 'Vitamina C, Antioxidante e Pré Makeup',                  category: 'skincare', price: 10, image: 'kit-tratamento-apis.jpg' },
  { name: 'Sérum Rosa Mosqueta',       desc: 'Sérum facial hidratante e regenerador',                  category: 'skincare', price: 10, image: 'serum-rosa-mosqueta.jpg' },
  { name: 'Águas Micelares Love',      desc: 'Limpeza profunda e suave para todos os tipos de pele',   category: 'skincare', price: 10, image: 'aguas-micelares-love.jpg' },
  { name: 'Bruma Facial Hidratante',   desc: 'Spray refrescante para hidratar ao longo do dia',        category: 'skincare', price: 10, image: 'bruma-facial.jpg' },
  { name: 'Gloss Labial Dourado',      desc: 'Brilho intenso com acabamento dourado',                  category: 'labios',   price: 10, image: 'gloss-dourado.jpg' },
  { name: 'Gloss Angels & Spirit',     desc: 'Gloss com brilho glamouroso e hidratação',               category: 'labios',   price: 10, image: 'gloss-angels-spirit.jpg' },
  { name: 'Gloss Labial Vermelho',     desc: 'Cor vibrante com brilho intenso',                        category: 'labios',   price: 10, image: 'gloss-vermelho.jpg' },
  { name: 'Lip Tint Glitter',          desc: 'Tinta labial com brilho e longa duração',                category: 'labios',   price: 10, image: 'lip-tint-glitter.jpg' },
  { name: 'Kit Escovas de Cabelo',     desc: 'Escovas desembaraçadoras para todos os tipos de fios',   category: 'cabelos',  price: 10, image: 'kit-escovas.jpg' },
  { name: 'Scrunchies Acetinadas',     desc: 'Xuxinhas delicadas que não marcam os fios',              category: 'cabelos',  price: 10, image: 'scrunchies-acetinadas.jpg' },
  { name: 'Kit Scrunchies Coloridas',  desc: 'Mix de cores vibrantes para seu penteado',               category: 'cabelos',  price: 10, image: 'kit-scrunchies.jpg' },
  { name: 'Elásticos de Cabelo Premium', desc: 'Elásticos resistentes que não machucam',               category: 'cabelos',  price: 10, image: 'elasticos-premium.jpg' },
];

const grid = document.getElementById('products-grid');
const filterButtons = document.querySelectorAll('.filter');

function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function formatPrice(value) {
  return `R$ ${value.toFixed(2)}`;
}

function createCard(product) {
  const card = document.createElement('article');
  card.className = 'card';
  card.dataset.category = product.category;

  const message = `Olá! Tenho interesse no produto "${product.name}". Pode me passar mais informações?`;

  card.innerHTML = `
    <div class="card__image">
      <img src="assets/img/${product.image}" alt="${product.name}" loading="lazy">
    </div>
    <div class="card__body">
      <h3 class="card__title"></h3>
      <p class="card__desc"></p>
      <p class="card__price">${formatPrice(product.price)}</p>
      <p class="card__pix">à vista no PIX</p>
      <a class="btn btn--whatsapp" target="_blank" rel="noopener noreferrer" href="${whatsappUrl(message)}">
        <img src="assets/icons/whatsapp-card.svg" alt="" width="20" height="20">
        Contatar no WhatsApp
      </a>
    </div>
  `;

  card.querySelector('.card__title').textContent = product.name;
  card.querySelector('.card__desc').textContent = product.desc;

  return card;
}

function renderProducts(filter = 'todos') {
  const list = filter === 'todos'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === filter);

  grid.replaceChildren(...list.map(createCard));
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((b) => {
      const active = b === button;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-selected', String(active));
    });
    renderProducts(button.dataset.filter);
  });
});

document.querySelectorAll('[data-whatsapp]').forEach((link) => {
  link.href = whatsappUrl(link.dataset.whatsapp);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});

document.getElementById('year').textContent = new Date().getFullYear();

renderProducts();
