class ProductCard extends HTMLElement{
    constructor(){
        super()
        this.shadow = this.attachShadow({mode: 'open'})
        this.shadow.innerHTML = `
            <section id='sect'>
                <span id="close">&times;</span>
                <img src=''>
                <p></p>
                <div></div>
                <button>Смотреть</button>
                <div class="prod-size"></div>
            </section>
        `
        this.productName = this.shadow.querySelector('p')
        this.productPrice = this.shadow.querySelector('div')
        this.productImg = this.shadow.querySelector('img')
        this.productSize = this.shadow.querySelector('.prod-size')
        this.btnShow = this.shadow.querySelector('button')
        this.close = this.shadow.querySelector('span')

        this.close.onclick = function(event){
          fetch(`http://localhost:3000/articles/${this.getAttribute("id")}`, {
              method: 'DELETE'
          })
            this.remove()
        }.bind(this)

        this.btnShow.onclick = function(event){
            fetch(`http://localhost:3000/articles/${this.getAttribute("id")}`)
              .then(response => response.json(), ()=> console.error("Error!!"))
                .then(response => {response
                  let item = document.body.appendChild(document.createElement('product-card-details'))
                  item.setAttribute(
                    'product-name',
                    response.productName
                  )
                  item.setAttribute(
                    'id',
                    response.id
                  )
                  item.setAttribute(
                    'product-price',
                    response.productPrice
                  )
                  item.setAttribute(
                    'product-color',
                    response.productColor
                  )
                  item.setAttribute(
                    'product-material',
                    response.productMaterial
                  )
                  item.setAttribute(
                    'product-insole-material',
                    response.productInsoleMaterial
                  )
                  item.setAttribute(
                    'product-season',
                    response.productSeason
                  )
                  item.setAttribute(
                    'product-img',
                    response.productImg
                  )
                  item.setAttribute(
                    'product-size',
                    response.productSize
                  )
                }) 
        }.bind(this)
    }

    connectedCallback() {
        fetch('../css/component.css')
            .then(response => response.text())
                .then( 
                    response => this.shadow.appendChild(
                        document.createElement('style')
                    ).textContent = response
                )
    }

    static get observedAttributes() {
        return ['product-name', 'product-price', 'product-img', 'product-size', 'id']
    }

    attributeChangedCallback(atrName, oldValue, newValue){
        atrName === 'product-name' ? this.productName.innerText = newValue : 
            atrName === 'product-price' ? this.productPrice.innerText = newValue :
                atrName === 'product-img' ? fetch(newValue)
                    .then ( response => {
                        response.blob().then ( response => {
                            var urlObject = URL.createObjectURL( response)
                            this.productImg.src = urlObject
                        })
                    }) : null
    }
}

customElements.define('product-card', ProductCard)

