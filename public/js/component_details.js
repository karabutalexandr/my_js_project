class ProductCardDetails extends HTMLElement{
    constructor(){
        super()
        this.shadow = this.attachShadow({mode: 'open'})
        this.shadow.innerHTML = `
            <div id="myModal" class="modal">
                <div class=modal-content>
                    <span id="close">&times;</span>
                    <div class=modal-content-left>
                        <img src='' id="product-img">
                    </div>
                    <div class=modal-content-right>
                        <h2 id="product-name"></h2>
                        <h3>Детали товара</h3>
                        <p id="product-name"></p>
                        <p id="product-price"></p>
                        <p id="product-color"></p>
                        <p id="product-material"></p>
                        <p id="product-insole-material"></p>
                        <p id="product-size"></p>
                        <p id="product-season"></p>
                    </div>
                </div>
            </div>
        `
        this.productImg = this.shadow.querySelector('#product-img')
        this.productName = this.shadow.querySelector('#product-name')
        this.productPrice = this.shadow.querySelector('#product-price')
        this.productColor = this.shadow.querySelector('#product-color')
        this.productMaterial = this.shadow.querySelector('#product-material')
        this.productInsoleMaterial = this.shadow.querySelector('#product-insole-material')
        this.productSize = this.shadow.querySelector('#product-size')
        this.productSeason = this.shadow.querySelector('#product-season')
        this.close = this.shadow.querySelector('#close')
        this.modal = this.shadow.querySelector('#myModal')


        this.close.onclick = function(){
            this.modal.style.display = "none"
        }.bind(this)

        this.modal.onclick = function(){
            this.modal.style.display = "none"
        }.bind(this)     
    }

    connectedCallback() {
        fetch('../css/component_details.css')
            .then(response => response.text())
                .then( 
                    response => this.shadow.appendChild(
                        document.createElement('style')
                    ).textContent = response
                )
    }

    static get observedAttributes() {
        return ['product-name', 'product-price', 'product-color', 'product-material', 'product-insole-material', 'product-img', 'product-size', 'product-season']
    }

    attributeChangedCallback(atrName, oldValue, newValue){
        atrName === 'product-color' ? this.productColor.innerText = `Цвет: ${newValue}` : 
            atrName === 'product-material' ? this.productMaterial.innerText = `Материал: ${newValue}` : 
                atrName === 'product-insole-material' ? this.productInsoleMaterial.innerText = `Материал стельки: ${newValue}` : 
                    atrName === 'product-season' ? this.productSeason.innerText = `Сезон: ${newValue}` : 
                        atrName === 'product-size' ? this.productSize.innerText = `Размеры: ${newValue}` : 
                            atrName === 'product-name' ? this.productName.innerText = newValue : 
                                atrName === 'product-price' ? this.productPrice.innerText = `Цена: ${newValue}` :
                                    atrName === 'product-img' ? fetch(newValue)
                                        .then ( response => {
                                            response.blob().then ( response => {
                                                var urlObject = URL.createObjectURL( response)
                                                this.productImg.src = urlObject
                                            })
                                        }) : null
    }


}

customElements.define('product-card-details', ProductCardDetails)

