let maket = document.querySelector('.maket')
let maketRight = document.querySelector('.maket-right')
let flex = document.querySelector('.flex-cont')


const products = async (url) => {
  let request = await fetch(`${url}/categories`)
  let response = await request.json()
  let result = Object.values(response)

  function creater() {
    result.forEach(item => {
      let elementP = document.createElement('p')
      elementP.classList.add('categories')
      elementP.innerText = item
      maket.append(elementP)
    })
  }
  creater()

  function createBoxRight() {
    for (const iterator of maket.children) {
      iterator.addEventListener('click', (e) => {
        setTimeout(() => {
          maketRight.innerHTML = ``
        }, 700)
        maketRight.style.transform = "translateX(-300px)"
        let keys = e.target.innerText
        let categoriesElems = async () => {
          let request = await fetch(`https://dummyjson.com/products/category/${keys}`)
          let response = await request.json()
          let result = Object.values(response)
          result[0].forEach(item => {
            let boxAroundCategories = document.createElement('p')
            boxAroundCategories.classList.add('boxAroundCategories')
            setTimeout(() => {
              maketRight.style.transform = "translateX(0)"
              maketRight.append(boxAroundCategories)
              boxAroundCategories.innerText = item.title
              createElementBox()
            }, 700)
          })
        }
        categoriesElems()

        function createElementBox() {
          for (const iterator of maketRight.children) {
            iterator.addEventListener('click', (e) => {
              flex.innerHTML = ``
              let value = e.target.innerText
              let elementBoxShow = async () => {
                let request = await fetch(`https://dummyjson.com/products/category/${keys}`)
                let response = await request.json()
                let result = Object.values(response)
                result[0].forEach(item => {
                  if (item.title == value) {
                    let docelems = document.createElement("div");
                    docelems.classList.add("show_box");
                    docelems.innerHTML = `
                    <div class="top-element-box"> 
                      <img class="img-overflow" src=${item.thumbnail} />
                    </div>
                    <div class="bottom-element-box">
                      <div class="bottom-element-box-border">
                        <span class="frstSpan">
                          <p class="raiting">Рейтинг ${item.rating}</p>
                          <p class="stock">(${item.stock}) отзывов</p>
                        </span>
                        <p class="title">${item.title}</p>
                        <p class="description">${item.description}</p>
                        <span class="price-bold">
                          <p class="price">${item.price} $</p>
                        </span>
                      </div>
                    </div>`
                    flex.append(docelems)
                  }
                })
              }
              elementBoxShow()
            })
          }
        }
      })
    }

  }
  createBoxRight()
}
products('https://dummyjson.com/products')