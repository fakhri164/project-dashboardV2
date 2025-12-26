<template>
    <aside 
    class="drawer-side bg-white dark:bg-backgroundDark border-r border-gray-200 dark:border-primary/10">
        <label for="my-drawer" aria-label="Close sidebar" class="drawer-overlay"></label>
        <nav class="menu p-4 w-80 min-h-full text-gray-800 dark:text-gray-200" aria-label="Main navigation"></nav>
            <header class="mb-4 flex p-4">
                <h1 class="text-xl font-bold dark:text-white">AdminPanel</h1>
            </header>

            <ul role="menu">
                <li role="none" class="p-2" v-for="(link,index) in links" :key="index">
                    <button role="menuitem"
                    :aria-expanded="!!links.children && links.open"
                    :aria-haspopup="!!links.children"
                    :class="{'active' :link.active}"
                    @click="setActive(index)"
                    class="flex items-center w-full text-left hover:bg-gray-100 dark:hover:bg-white/10
                     text-black dark:text-white"
                    >
                    <Icon :icon="link.icon" class="h-5 w-5" />
                    <span></span>
                </button>
                </li>
            </ul>
    </aside>
</template>
<script setup>
import { ref } from 'vue';
const links=ref([
    { 
      name: 'Dashboard',
      icon: 'line-md:home',
      active:true,
      open:false,  
    },
    { 
      name: 'Analytics',
      icon: 'icon-park-outline:chart-line',
      active:false,
      open:false,  
    },
    { 
      name: 'Reports',
      icon: 'line-md:document-list',
      active:false,
      open:false,  
    },
    { 
      name: 'Users',
      icon: 'line-md:account',
      active:false,
      open:true,
      children:[
        {name:'All Users'},
        {name:'Add New'},
        {name:'Roles & Permissions'}, 
        ] 
    },
    { 
      name: 'Products',
      icon: 'mdi:shopping-outline',
      active:false,
      open:false,
      children:[
        {name:'All Products'},
        {name:'Categories'},
        {name:'Inventory'}, 
        ] 
    },
    { 
      name: 'Messages',
      icon: 'line-md:email',
      active:false,
      open:false,  
    },
    { 
      name: 'Settings',
      icon: 'line-md:cog-filled',
      active:false,
      open:false,  
    },
])

const setActive =(index) =>{
    //Toggle open state for items with children
    if(links.value[index].children){
        links.value[index].open = !links.value[index].open
    }

    //Set active state
    links.value.forEach((link,i) => {
        link.active = i === index;
    })
}
</script>
<style lang="">
    
</style>