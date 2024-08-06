const url_base = 'https://api.mercadolibre.com/sites/MLB/search?q=notebooks';

let carrinho = localStorage.getItem('carrinho');
if (carrinho == null){
    carrinho = [];
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}



async function getNotebooks(url){
    try{
        const response = await fetch(url);
        const data = await response.json();
        return data;    
    }catch(error){
        console.log(`Erro ao buscar produtos: ${error}`)
        return error;
    }
}

function formatarPreco(preco){
    preco = preco.toString().replace('.', ',');
    if (!preco.includes(',')){
        preco = preco + ',00';
    }
    return  preco.replace(/,(\d)$/, ',$10')
}



document.addEventListener('DOMContentLoaded', () => {
    let artigos = document.getElementById('produtos');
    const url = `${url_base}&limit=25`;
    getNotebooks(url).then((data) => {
        const produtos = data.results;
        produtos.forEach((produto, index) => {
            const item = document.createElement('div');
            item.innerHTML = `
            <div class="card">
            <div class="card-image">
            <img src="${produto.thumbnail}" alt="${produto.title}">
            </div>
            <div class="card-content">
            <div class="card-titulo">
            <p class="titulo-produto">${produto.title}</p> 
            </div>
            <div class="card-preco">
            <p class="preco">R$ ${formatarPreco(produto.price)}</p>
            </div>  
            <div class="card-buttons">
            <button class="btn-comprar" id="comprar" onclick="comprar({'id' : '${produto.id}', 'thumbnail' : '${produto.thumbnail}', 'titulo' : '${produto.title.replace(/''/g, " polegadas")}', 'preco' : '${produto.price}', qtd : 0})">
            Comprar 
            </button>                   
            <button class="btn-add"         
            onclick="adicionarCarrinho({'id' : '${produto.id}', 'thumbnail' : '${produto.thumbnail}', 'titulo' : '${produto.title.replace(/''/g, " polegadas")}', 'preco' : '${produto.price}', qtd : 0})"> 
            <p>Adicionar     <spaw>\u{1F6D2}</spaw></p>
            </button>
            </div>
            </div>
            </div>
            `;
            artigos.appendChild(item);
            
        });
        document.getElementById('quantidade').textContent = carrinho? JSON.parse(carrinho).length : 0;
    })
})


function addProdutos(chave, valor){
    localStorage.setItem(chave, JSON.stringify(valor));
}


function adicionarCarrinho(valor) {
    carrinho = localStorage.getItem('carrinho');
    carrinho = JSON.parse(carrinho);
    existe = carrinho.some(item => item.id == valor.id)
    if (!existe){
        carrinho.push(valor);
    
    for (let index in carrinho) {
        if (carrinho[index].id == valor.id){
            carrinho[index].qtd = carrinho[index].qtd + 1;
        }
        }
    console.log(carrinho)
    document.getElementById('quantidade').textContent = carrinho.length;
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    };
}

function comprar(valor) {
    adicionarCarrinho(valor)
    window.location = 'cart.html'
}

document.getElementById('carrinho').addEventListener('click', () => {
    window.location = 'cart.html';
})

document.getElementById('home').addEventListener('click', () => {
    window.location = 'index.html';
})

document.getElementById('sobre').addEventListener('click', () => {
    window.location = 'sobre.html';
})

