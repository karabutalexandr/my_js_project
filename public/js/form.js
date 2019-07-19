class FormComponent extends HTMLElement{
    constructor(){
        super();
        this.shadow = this.attachShadow({mode:'open'});
    }

    connectedCallback(){
        this.loadData('articles')
            .then(response => this.articles = response)
    }

    static get observedAttributes(){
        return ['form-num']
    }

    attributeChangedCallback(attr,oldVal,newVal){
        const formElements = this.findFormElements.bind(this);
        Promise.all([
            fetch(`../chunk/${newVal}.html`)
                .then(response => response.text()),
            fetch(`../css/${newVal}.css`)
                .then(response => response.text())
        ]).then(response => {
            this.shadow.innerHTML = response[0];
            this.shadow.appendChild(
                    document.createElement('style')
            ).textContent = response[1];
        })
        .then(formElements)
    }

    async loadData(arg){
        return await (
            await fetch(`http://localhost:3000/${arg}`)
        ).json()
    }

    findElem(id){
        return this.shadow.querySelector(`#${id}`)
    }

    saveData(){
        const product = {
                productName: this['reg-name'].value,
                productColor: this['reg-color'].value,
                productMaterial: this['reg-material'].value,
                productInsoleMaterial: this['reg-insole-material'].value,
                productSeason: this['reg-season'].value,
                productPrice: `${this['reg-price'].value} грн`,
                productImg: this['reg-photo'].src,
                productSize: this['reg-size'].value.split(',')
            }
        fetch('http://localhost:3000/articles',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        this.parentNode
            .dispatchEvent(
                new CustomEvent(
                    'registration',
                        {
                            detail: product
                        }
                )
            )
    }

    findFormElements(){
        const self = this;
        ['reg-name','reg-price','reg-img','reg-size', 'reg-photo', 'submit','demo', 'reg-season', 'reg-insole-material', 'reg-material', 'reg-color', 'close']
            .forEach(
                function(item){
                    self[item] = self.findElem(item)
                }
            );

        this['submit'].onclick = function(event){
            this.saveData();
            window.location.replace('http://localhost:3000/')
        }.bind(this);

        this['reg-name'].onchange = function(event){
           const valid = function (){
                event.target.className = 'valid';
                this['demo'].textContent = '';
                this['submit'].style.display = 'block';
           }.bind(this)

           const invalide = function (){
                event.target.className = 'invalide';
                this['demo'].textContent = 'Такой товар уже существует';
                this['submit'].style.display = 'none';
                event.target.style.borderColor = 'red'
           }.bind(this)

           this.articles.find(artcl =>  artcl.productName === event.target.value) ? invalide() : valid();
           
        }.bind(this);

        this['reg-img'].onchange = function(event){
            const f1 = function (){
                this['demo'].textContent = 'Слишком большой размер файла!';
            }.bind(this)

            const f2 = function (){
                this['demo'].textContent = ''
                var fileReader = new FileReader;
                fileReader.readAsDataURL ( event.target.files [0] );
                fileReader.onload = function ( event ) {
                    this.shadow.querySelector('#reg-photo').src = event.target.result;
                }.bind(this)
            }.bind(this)

            event.target.files [0].size > 100000000 ? f1() : f2();

            this['close'].onclick = function(event){
                this.remove()
            }.bind(this)
         
        }.bind(this)

        this['close'].onclick = function(event){
            this.remove()
            console.log(this)
        }.bind(this)
    }
}

customElements.define(
    'form-element',
    FormComponent
)
