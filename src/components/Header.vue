<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary" md-elevation="0">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">My Title</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>My Order</span>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list v-for="i in list"
          :key="i.id">
          <md-list-item> 
            <img class="small-img" :src="`${i.image}`" alt="none">
            
          </md-list-item>
          <md-list-item>
            <span class="md-list-item-text"><h2>weight:</h2><h4>{{i.selected}}(g)</h4></span>
            <span class="md-list-item-text"><h2>price:</h2> <h4>{{i.price}}₽</h4></span>
          </md-list-item>

        </md-list>
      </md-app-drawer>

      <md-app-content>
       <div>
      <md-card md-with-hover
      v-for="ingredient in Ingredients"
      :key="ingredient.name">
      <md-ripple>   
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">{{ingredient.name}} {{ingredient.cost}}₽ (100g)</div>
          <div class="md-subhead">current price:{{ingredient.cost*ingredient.selected*0.01}}₽</div>
        </md-card-header-text>
       
      </md-card-header>

         <md-card-media>
          <img :src="`${ingredient.image}`" alt="none" class="img">
        </md-card-media>

      <md-card-actions>
        <div class="group">      
            <input type="text" required v-model="ingredient.selected">
            <span class="bar"></span>
            <label >product weight (g)</label>
        </div>
        <md-button @click="add(ingredient.id)">Add</md-button>
      </md-card-actions>
    </md-ripple>
    </md-card>
  </div>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
  export default {
    name: 'PersistentMini',
    data: () => ({
      menuVisible: false,
      Ingredients: [
          {id: 0, name: 'meat', cost: 300, image:'https://images.wallpaperscraft.ru/image/myaso_chesnok_pripravy_petrushka_listiki_tarelka_posuda_belyy_fon_78086_1920x1080.jpg', selected: null},
          {id: 1, name: 'cheese', cost: 200, image:'https://avatars.mds.yandex.net/get-pdb/1101614/72c98b5f-81ce-4e0a-9bae-017f63db8c53/s1200?webp=false', selected: null},
          {id: 2, name: 'mushrooms', cost: 150, image:'https://avatars.mds.yandex.net/get-pdb/1365671/281a3841-0f32-4019-8bad-95502724d14a/s1200', selected: null},
          {id: 3, name: 'vegetables', cost: 230, image:'https://www.belnovosti.by/sites/default/files/article/20-02-2017/f87509fc99815c19e8cc313b5cdacadf.jpg', selected: null},
          {id: 4, name: 'fruits', cost: 350, image:'https://avatars.mds.yandex.net/get-pdb/788379/f795e96d-dbb5-4307-8fb9-47198a70c519/s1200?webp=false', selected: null},
      ],
      Order:[],
      list:[]
    }),
    methods: {
      toggleMenu () {
        this.menuVisible = !this.menuVisible
      },
      add :function (id) {
        this.list = []
        if(this.Ingredients[id].selected != 0){
            if (id in this.Order){
              this.Order[id].selected += Number.parseInt(this.Ingredients[id].selected);
              this.Order[id].price += this.Ingredients[id].selected * this.Ingredients[id].cost *0.01;
            }
            else{
              this.Order[id] = ({id: this.Ingredients[id].id, selected: Number.parseInt(this.Ingredients[id].selected), price: this.Ingredients[id].selected * this.Ingredients[id].cost *0.01, image: this.Ingredients[id].image});
            }
        }
        this.Order.forEach(element => {
          if(element != undefined){
            this.list.push(element);
          }
        });
        // eslint-disable-next-line no-console
        console.log(this.list);
        this.Ingredients[id].selected = '';
      }
    },
  }
</script>

<style lang="scss" scoped>
  .md-app {
    min-height: 800px;
    border: 1px solid rgba(#000, .12);
  }
   // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 225px);
  }
  .md-primary{
      background: rgb(193, 203, 238);
  }
  .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
.img{
    height: 200px !important;
    width: 90% !important  ;
}

  .group {
    position: relative;
    margin-top: 10px;
    margin-bottom: 30px;
  }

input {
  font-size: 16px;
  padding: 10px;
  display: block;
  border: none;
  border-bottom: 1px solid #ccc;
}
input:focus {
  outline: none;
}
label {
  color: #999;
  font-size: 18px;
  position: absolute;
  pointer-events: none;
  left: 10px;
  top: 15px;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

/* active state */
input:focus ~ label, input:valid ~ label {
  top: -10px;
  font-size: 14px;
  color: #5264AE;
}


/* BOTTOM BARS ================================= */
.bar {
  position: relative;
  display: block;
}
.bar:before, .bar:after {
  content: "";
  height: 2px;
  width: 0;
  bottom: 0;
  position: absolute;
  background: #5264AE;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}
.bar:before {
  left: 50%;
}
.bar:after {
  right: 50%;
}
.md-list-item-text{
  text-align: center;
}
/* active state */
input:focus ~ .bar:before,
input:focus ~ .bar:after {
  width: 50%;
}
</style>
