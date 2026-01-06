<template>

    <div class="everythingInItem">
        <div class="item">
            <div class="imgPlusName">
                <img :src="image" :alt="name">
                {{name}}
            </div>
        
            <div>
                {{ cost }}
            </div>
            
        </div>
        <div class="countPart" style="justify-content: space-between;">
            <div class="countPart">
                <button class="button leftButton" @click="changeCountBy(-1)">-</button>
                <input type="number" name="" id="" :value="count" @change="changeCount($event.target.value)">
                <button class="button rightButton" @click="changeCountBy(1)">+</button>
                <i class="pi pi-trash button icon" @click="changeCount(0)"></i>
            </div>
            <div>{{ totalCost }}</div>
        </div>
    </div>

</template>



<script setup>
    import {computed} from 'vue'

    const props = defineProps(['product'])
    const emit = defineEmits(['changeCount'])

    function changeCountBy(by){
        changeCount(count.value + by)
    }
    function changeCount(val){
        emit('changeCount', val)
    }

    const name = computed(() => {
        return `${props.product.name}`
    })
    const cost = computed(() => {
        return `${props.product.cost}€`
    })
    
    const totalCost = computed(() => {
        return `${Math.round(props.product.cost * count.value*100)/100}€`
    })

    const count = computed(() => {
        return props.product.count
    })

    const image = computed(() => {
        return props.product.imageLink
    })
</script>
    

<style scoped>
.everythingInItem{
    display: flex;
    flex-direction: column;

    gap: 4px;
}

.item > div{
    display: flex;
    flex-direction: row;

    gap: 16px;

    justify-content: space-between;
    align-items: center;
}

.item{
    display: flex;
    flex-direction: row;

    justify-content: space-between;
    align-items: center;

    gap: 16px;
    

    
    align-items: center;

    border-bottom: rgb(170, 170, 170) solid 1px;



    padding: 16px 8px;
    width: 100%;
}

.countPart{
    display: flex;
    flex-direction: row;
    align-items: center;
}

.countPart > input{
    width:30%;
    background-color: rgb(242, 209, 220);

    border: 1px solid black;

    height: 100%;
}

.icon{
    padding: 4px;
    font-size: 70%
}

.button{
    background-color: palevioletred;
    color: black;

    border: 1px solid black;


    margin: 0px 2px 0px 2px;

    border-radius: 8px;
    cursor: pointer;

    height: 100%;
}

.leftButton{
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
}

.rightButton{
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
}





img{
    width: 40px;
}
</style>