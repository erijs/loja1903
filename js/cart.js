document.addEventListener('DOMContentLoaded', () => {
    let adicionados = document.querySelector('.container');
    let car = localStorage.getItem('carrinho')
    let  carrinho = JSON.parse(car) || [];
    let status = document.getElementById('status');
    let acoes = document.getElementById('carrinho-actions');
    let total = document.getElementById('carrinho-total');
    let finalizar = document.getElementById('finalizar-compra');
    let limpar_carrinho = document.getElementById('limpar-carrinho');
    let total_preco = 0;
    carrinho = carrinho.filter((produto, index) => {
        return produto.qtd != 0;
    });
    if (carrinho.length == 0) {
        status.hidden = false;
        total.hidden = true;
        finalizar.hidden = true;
        limpar_carrinho.hidden = true;


        
    }
    document.getElementById('quantidade').textContent = carrinho.length
    
    carrinho.forEach((produto, index) => {
        
        total_preco += Number(produto.preco.replace(',','.'));
        
        let prod = document.createElement('div')
        
        prod.innerHTML = `  
        <div class="card-carrinho">
        <div class="card-carrinho-top">
            <img src="${produto.thumbnail}" alt="${produto.titulo}" class="card-carrinho-img">
            <p class="card-carrinho-title">${produto.titulo}</p>
            </div>
        <div class="card-carrinho-bottom">
            <button class="remover-item" onclick="removerItem('${produto.id}')">Remover</button>
            <button id="diminuir-quantidade" onclick="updateTotal('-', '${produto.id}')">-</button>
            <input type="text" class="qtd-i" id="quantidade-${produto.id}" value="${produto.qtd}" class="card-carrinho-input">
            <button id="aumentar-quantidade" onclick="updateTotal('+', '${produto.id}')">+</button>
            <h3 class="card-carrinho-preco"> R$${formatarPreco(produto.preco)}</h3>
        </div>
        </div>`;
        adicionados.appendChild(prod);     
        document.getElementById('total-carrinho').textContent = 
        `Total R$ ${calcularTotal()}`;
             
    }); 
   

}
);

function limparCarrinho(){
    localStorage.clear()
    location.reload();
}

function removerItem(id){
    let carrinho = localStorage.getItem('carrinho')
    let produtos = JSON.parse(carrinho) || [];
    produtos = produtos.filter((produto, index) => {
        return produto.id != id;
    });
  
    localStorage.setItem('carrinho', JSON.stringify(produtos));
    location.reload();
    
}

document.querySelector('#continuar-comprando').addEventListener('click', () => {
    window.location.href = '../index.html';
})

function formatarPreco(preco){
    preco = preco.toString().replace('.', ',');
    if (!preco.includes(',')){
        preco = preco + ',00';
    }
    return  preco.replace(/,(\d)$/, ',$10')
}

function calcularTotal() {
    carrinho = localStorage.getItem('carrinho')
    let produtos = JSON.parse(carrinho) || [];
    let total = 0;
    produtos.forEach((produto, index) => {
        total += Number(produto.preco * produto.qtd);
    });
    
    return formatarPreco(total);
}   

function updateTotal(op, id){
    carrinho = localStorage.getItem('carrinho')
    let produtos = JSON.parse(carrinho) || [];
    produtos.forEach((produto, index) => {
        if (produto.id == id){
            if (op == '-'){
                produto.qtd--;
                
            }else if(op == '+'){
                produto.qtd++;
                location.reload();
            }
        }   
    });
    
    calcularTotal();
    localStorage.setItem('carrinho', JSON.stringify(produtos));
    location.reload();
}

function finalizarCompra() {
    
    function numeroPedido(min, max) {
        return Math.floor(Math.random()* (max - min +1)) + min
    }


    window.location = `checkout.html?pedido=${numeroPedido(200000, 499999)}&total=${calcularTotal()}`;
    
    
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







