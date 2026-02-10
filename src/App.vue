
<template>
  <!DOCTYPE html>
  
  <div class="header">
    <div @click="show_menu = true" class="menu">
      <i class="pi pi-bars icon"></i>
    </div>
    <div class="headerName">
      Monsterr
    </div>
    <div @click="show_cart = true" class="cartIcon">
      <i class="pi pi-shopping-cart icon"></i>
      <div class="cartNum">{{ cartItemsNumber }}</div>
    </div>
  </div>
<!-- body -->
  <!-- items -->
  <div class="items">
    <Products v-for="(product, index) in visibleProducts" :key="index" :product="product" 
      @addToCart="addToCart(product)" @trash="deleteProduct(product)"
    />
    <div class="center">
      <i class="pi pi-plus icon button" @click="show_addproduct = true"></i>
    </div>
  </div>

  

  <!-- form -->
  <Dialog v-model:visible="show_addproduct" header="Add Product" modal style="min-width: 400px;">
    <div id="addproduct">
        <label>Product Name </label>
        <input type="text" id="addproduct_title">
        
        <br>

        
        <label>Price </label>
        <input type="text" id="addproduct_price"> 

        <br>
        <br>
        
        <label>Description </label>
        <textarea id="addproduct_desc"></textarea> 

        <br>
        <br>

        <label>image url</label>
        <input type="text" id="addproduct_imgsrc">    

        <br>
        <br>

        <label>Category </label>
        <input type="text" id="addproduct_category"> 

        <br>
        <br>

        <span id="form_errors"></span>

        <br>

        <button @click="sendForm">Add product</button>
    </div>
  </Dialog>

<!-- drawers -->
  <Drawer v-model:visible="show_cart" id="cartPopup" header="Cart" position="right">

    <ul class="cartItems">
      <li> 
        <Cart v-for="(product, index) in visibleCartData" :key="index" :product="product"
        @changeCount="changeCount(product, $event)"></Cart> 
      </li>
    </ul>

    <div class="buyButton button" @click="buy()">
      Buy for {{ totalCartCost }}€
    </div>
  </Drawer>

  <Drawer v-model:visible="show_menu" header="Filters" position="left">
    <div id="menuPopup">
      <!-- name -->
      <div>
        <div class="filterRow">
          <input type="text" name="" id="" placeholder="Search by text" :value="searchFilter" @change="searchFilter = $event.target.value"> 
          <div class="resetButton button" @click="searchFilter = ''">reset</div>
        </div>
        <div>Searching for: "{{ searchFilter }}"</div>
      </div>
      
      <!-- cost -->
      <div>
        <div class="filterRow ">
          <div class="costFilterRow">
            <input type="number" placeholder="min" v-model.number="costFilter[0]">
            -
            <input type="number" placeholder="max" v-model.number="costFilter[1]">
            €
          </div>
          <div class="resetButton button" @click="costFilter[0] = 0; costFilter[1] = 100">reset</div>
        </div>
        
      </div>

      <!-- categories -->
      <div>
        <div class="filterRow">
          <div>Categories:</div>
          <div class="resetButton button" @click="categoryFilter = getCategories()">reset</div>
        </div>

        <ul class="categories">
          <div v-for="category in categories" :key="category">
            {{ category }}
            <input checked="true" type="checkbox" :value="category" v-model="categoryFilter">
          </div>
        </ul>

      </div>
    </div>
  </Drawer>

  

  <!-- name, image, desc, cost, add to cart -->

</template>



<script setup>
import {ref, computed, onMounted} from 'vue'


const api_url = "http://localhost:3000/"
const products = ref([])

onMounted(async () => {
    await refreshList()
})

const refreshList = (async () => {
  const res = await fetch(api_url+"products?category=Ultra");
  //const res2 = await fetch(api_url+"products/1");
  const data = await res.json();

  products.value = data

  console.log("refresh", data)
})






import Products from './components/products.vue'
import Drawer from 'primevue/drawer';
import Dialog from 'primevue/dialog';

//import cartData from './cart.json'
import Cart from './components/cart.vue'


const cartData = ref([]);
const visibleCartData = computed(() => {
  const map = {};

  cartData.value.forEach(item => {
    if (map[item.id]) {
      map[item.id].count++;
    } else {
      map[item.id] = {
        ...item,
        count: 1
      };
    }
  });

  return Object.values(map);
});



function buy(){
  window.alert("Thanks for shopping with us");
}


const cartItemsNumber = computed(() => {
  let num = 0;
  visibleCartData.value.forEach(item => {
    num += item.count
  });
  if(num == 0){num =""}
  if(num >= 100){num="99+"}
  return num
})


const searchFilter = ref("");
const costFilter = ref([0,100]);
const categoryFilter = computed(() => {
  return [...new Set(products.value.map(item => item.category))];
})

const categories = computed(() => {
  return [...new Set(products.value.map(item => item.category))];
})

const visibleProducts = computed(() => {
  const result = []
  const search = searchFilter.value.toLowerCase()
  const min = costFilter.value[0]
  const max = costFilter.value[1]
  

  products.value.forEach(item => {
    if (search && !item.name.toLowerCase().includes(search)) {return;}
    
    if(item.cost < min || item.cost > max){return;}
    

    if (!categoryFilter.value.includes(item.category)){return;}
    
    result.push(item)
  })


  return result
})

function addToCart(val){
  cartData.value.push(val)
  
  //open cart
  show_cart.value = true;

}

function changeCount(product, newCount){
  cartData.value = cartData.value.filter(p => p.id !== product.id)

  for (let i = 0; i < newCount; i++) {
    cartData.value.push(product)
  }
}

const show_cart = ref(false);
const show_menu = ref(false); 

const totalCartCost = computed(() =>{
  let sum = 0;
  visibleCartData.value.forEach(item => {
    sum += item.cost * item.count
  });
  return Math.round(sum*100)/100;
})



const show_addproduct = ref(false)

let form_ids = [
  {matches:"name",id:"addproduct_title",type:"string"},
  {matches:"cost",id:"addproduct_price",type:"float"},
  {matches:"description",id:"addproduct_desc",type:"string"},
  {matches:"imageLink",id:"addproduct_imgsrc",type:"string"},
  {matches:"category",id:"addproduct_category",type:"string"}
]
    
let sendForm = async () => {
  let new_product = {};
  const error_el = document.getElementById("form_errors");
  error_el.innerText = ""
  
  new_product["id"] = products.value.length +1
  
  form_ids.forEach(val=>{
      const element = document.getElementById(val.id)
      let value = element.value
      if (val.type == "string") {
      } else if (val.type == "float") {
          value = Number(value);
          if (isNaN(value)) error_el.innerText += "Must be a number\n"
      } else if (val.type == "int") {
          value = Math.round(Number(value));
          if (isNaN(value)) error_el.innerText += "Must be a number\n"
      }
      new_product[val.matches] = value
  })
  console.log(new_product)
  if (!error_el.innerText){
    show_addproduct.value = false;

    await fetch(api_url+"products",{
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(new_product)
    });

    await fetch(api_url+"products")
    //await refreshList();
  }
  
}


let getID = (id) => {
  fetch(api_url+"products/"+id,{
    method: "GET",
    headers: {"Content-Type":"application/json"}
  })
}





</script>




<style scoped>
html, body, #app{
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
}

li{
  list-style-type: none;
}

.center{
  display: flex;
  justify-content: center;
  align-items: center;
}

.header{
  position: sticky;
  top: 0;
  left: 12px;
  right: 12px;
  padding: 12px 4px 12px 4px;

  border-bottom: 1px solid rgb(194, 191, 191);
  background-color: rgba(233,233,233);

  display: flex;
  justify-content: space-between;

  align-items: center;
}

.icon{
  font-size: 40px;
}

.header > div{
  cursor: pointer;
}

.headerName{
  font-size: 40px;
}


.items{
  display: grid;
  grid-template-columns: repeat(5, 20%);

  margin: 20px;
}

#menuPopup{
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.button{
  cursor: pointer;
}

.cartItems{
  overflow-y: scroll;

  height: 85%;
  width: 100%;
}

.categories{
  overflow-y: scroll;

  height: 200px;
  width: 100%;
}

.buyButton{
  padding: 8px 16px;

  background-color: palevioletred;
  border-radius: 20px;

  justify-self: end;
}

.resetButton{
  background-color: palevioletred;
  padding: 2px 4px;
  width: fit-content;
}

.filterRow{
  display: flex;
  flex-direction: row;
  
  justify-content: space-between;
}

.costFilterRow{
  justify-content: start;
}

.costFilterRow > input{
  margin: 0px 2px;
  width: 20%;
}

.cartIcon{
  display: flex;
  flex-direction: row;
  align-items: start;
}

.cartNum{
  background-color: red;
  border-radius: 12px;

  padding: 0px 4px;
}



</style>
