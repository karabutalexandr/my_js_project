fetch('http://localhost:3000/articles')
  .then(response => response.json(), ()=> console.error("Error!!"))
    .then(response => response
      .forEach(
        artc => {
          let item = document.body.appendChild(document.createElement('product-card'))
          item.setAttribute(
            'product-name',
            artc.productName
          )
          item.setAttribute(
            'id',
            artc.id
          )
          item.setAttribute(
            'product-price',
            artc.productPrice
          )
          item.setAttribute(
            'product-color',
            artc.productColor
          )
          item.setAttribute(
            'product-material',
            artc.productMaterial
          )
          item.setAttribute(
            'product-insole-material',
            artc.productInsoleMaterial
          )
          item.setAttribute(
            'product-season',
            artc.productSeason
          )
          item.setAttribute(
            'product-img',
            artc.productImg
          )
          item.setAttribute(
            'product-size',
            artc.productSize
          )
        }
      ) 
    )


const addBtn = document.getElementById('btn').onclick = function(event){
  document.body.appendChild(document.createElement('form-element'))
    .setAttribute("form-num", "02")
}

