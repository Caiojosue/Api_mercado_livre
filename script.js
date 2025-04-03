document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const productCards = document.querySelectorAll('.product-card');
    const dropdownList = document.getElementById('dropdown-list');
    const categoryTrigger = document.getElementById('category-trigger');
  
    let categoriesVisible = false;
    let categoriesLoaded = false;
  
    // 🔍 Evento de busca
    const handleSearch = () => {
      const query = searchInput.value.trim();
      if (query) {
        alert(`Buscando por: ${query}`);
        // Aqui você pode chamar a API de busca se quiser
      } else {
        alert('Digite algo para buscar.');
      }
    };
  
    if (searchButton && searchInput) {
      searchButton.addEventListener('click', handleSearch);
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          handleSearch();
        }
      });
    }
  
    // 🛒 Evento ao clicar em produto
    productCards.forEach(card => {
      card.addEventListener('click', () => {
        const title = card.querySelector('h3');
        if (title) {
          alert(`Você clicou no produto: ${title.textContent}`);
        }
      });
    });
  
    // 📂 Abrir categorias e buscar da API
    if (categoryTrigger && dropdownList) {
      categoryTrigger.addEventListener('click', async (e) => {
        e.preventDefault();
        categoriesVisible = !categoriesVisible;
        dropdownList.classList.toggle('hidden', !categoriesVisible);
  
        if (!categoriesLoaded && categoriesVisible) {
          try {
            const response = await fetch("http://localhost:5174/caracteristica");
  
            if (!response.ok) {
              throw new Error(`Erro HTTP: ${response.status}`);
            }
  
            const data = await response.json();
            dropdownList.innerHTML = '';
  
            if (!Array.isArray(data)) {
              console.warn("A resposta da API não é um array:", data);
              return;
            }
  
            data.forEach((categoria) => {
              const li = document.createElement('li');
              li.innerHTML = `<a href="#">${categoria.name}</a>`;
              dropdownList.appendChild(li);
            });
  
            categoriesLoaded = true;
          } catch (error) {
            console.error("Erro ao buscar categorias da API:", error.message);
          }
        }
      });
    }
  });
  