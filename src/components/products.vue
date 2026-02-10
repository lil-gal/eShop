<template>
    
    
    <div class="items">
        <div class="item">
            <div @click="openItemDesc()" class="button">
                
                <!-- pic -->
                <div>
                    <img :src="image" :alt="name">
                </div>

                <!-- name -->
                <div class="name">
                    {{name}}
                </div>
            </div>

            
            <div>
                <!-- description -->
                <div class="description">
                    {{ desc }}
                </div>

                <!-- cost -->
                <div class="cost">
                    {{cost}}
                </div>
                
                <!-- btns -->
                <div class="btns">
                    <!-- btn -->
                    <div @click="addToCart($event)" class="toCart button">
                        Add to Cart
                    </div>
                    <!-- trash -->
                    <div @click="trash($event)" class="trash button">
                        X
                    </div>
                </div>
            </div>

        </div>
    </div>


</template>

<script setup>
    import {computed} from 'vue'

    const props = defineProps(['product'])
    const emit = defineEmits(['addToCart', 'trash'])


    

    const name = computed(() => {
        return `${props.product.name}`
    })
    const cost = computed(() => {
        return `${props.product.cost}€`
    })

    const image = computed(() => {
        return props.product.imageLink
    })

    const desc = computed(() => {
        return `${props.product.description}`
    })
    const arr = []

    function addToCart(event){
        event.stopPropagation();
        emit('addToCart')
    }

    function trash(event){
        event.stopPropagation();
        emit('trash')
    }

    


</script>

<style scoped>

.btns{
    display: flex;
    flex-direction: row;

    align-items: center;
    gap: 12px;
}

.trash{
    padding: 4px 6px;
    color: white;
    background-color: red;

    border-radius: 12px;

    font-size: 20px;
}

.item > div{
    display: flex;
    flex-direction: column;

    gap: 16px;

    justify-content: space-between;
    align-items: center;
}

.item{
    display: flex;
    flex-direction: column;

    gap: 16px;

    justify-content: space-between;
    align-items: center;



    padding: 32px;
    width: fit-content;
    
    /*
    border: 1px solid black;
    border-radius: 12px;
    */

    
}

.description{
  overflow-y: scroll;

  color: rgb(123, 123, 123);

  height: 60px;
  width: 100%;
}

img{
    width: 100px;
}

.name{
    font-size: 20px;
}

.cost{
    font-size: 32px;
}

.button{
    cursor: pointer;
    align-items: center;
}

.toCart{
    padding: 10px 20px;

    background-color: palevioletred;
    border-radius: 20px;

    font-size: 12px;
    
}

</style>
