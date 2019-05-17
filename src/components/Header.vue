<template>
  <div class="page-container">
    <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawerRight"
      fixed 
      right
      app
    >
    <div class="title-order" v-if="!list"><h2>nothing added</h2></div>
      <v-list dense>
        <md-list v-for="i in list"
          :key="i.id">
          <md-list-item> 
            <img class="small-img" :src="`${i.image}`" alt="none">
            
          </md-list-item>
          <md-list-item>
            <span class="md-list-item-text"><h2>weight:</h2><h4>{{i.selected}}(g)</h4></span>
            <span class="md-list-item-text"><h2>price:</h2> <h4>{{i.price}}₽</h4></span>
          </md-list-item>
<v-btn
            absolute
            color="orange"
            class="white--text"
            fab
            small
            right
            bottom
            @click="del(i.id)"
          >
            <v-icon>remove</v-icon>
          </v-btn>
        </md-list>
        
        <v-btn v-if="list" block large top @click="pay" depressed color="blue-grey" class="white--text">click to pay: {{orderCost}}₽</v-btn>
      </v-list>
      
    </v-navigation-drawer>
    <v-toolbar
      color="blue-grey"
      dark
      fixed
      app
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Toolbar</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="drawerRight = !drawerRight">
        <v-icon>shopping_cart</v-icon>
      </v-toolbar-side-icon>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile @click.stop="left = !left">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><h1>MainPage</h1></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink>
            <md-card md-with-hover
              v-for="ingredient in ingredients"
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
                    <label >product weight (g)</label>
                </div>
              </md-card-actions>
              <div class="buttons">
                  <md-button @click="remove(ingredient.id)" class="md-raised ">Remove</md-button>
                  <md-button @click="add(ingredient.id)" class="md-raised ">Add</md-button>
              </div>
            </md-ripple>
            </md-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="blue-grey" class="white--text" app>
      <span>Vuetify</span>
      <v-spacer>pizza designer</v-spacer>
      <span>&copy; 2019</span>
    </v-footer>
    </v-app>
  </div> 
    <!-- <md-app>
      <md-app-toolbar class="md-primary" md-elevation="0">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Order Menu</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          <h2>Your Order</h2>
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
        <md-button @click="pay" class="md-accent">Pay: {{orderCost}}₽</md-button>
      </md-app-drawer>

      <md-app-content>
       <div>
      <md-card md-with-hover
      v-for="ingredient in ingredients"
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
            <label >product weight (g)</label>
        </div>
      </md-card-actions>
      <div class="buttons">
          <md-button @click="remove(ingredient.id)" class="md-raised ">Remove</md-button>
          <md-button @click="add(ingredient.id)" class="md-raised ">Add</md-button>
      </div>
    </md-ripple>
    </md-card>
  </div>
      </md-app-content>
    </md-app>
 -->
</template>

<script>
  export default {
    name: 'PersistentMini',
    data: () => ({
      drawer: true,
      drawerRight: true,
      right: null,
      left: null,
      menuVisible: false,
      ingredients: [
          {id: 0, name: 'meat', cost: 300, image:'https://images.wallpaperscraft.ru/image/myaso_chesnok_pripravy_petrushka_listiki_tarelka_posuda_belyy_fon_78086_1920x1080.jpg', selected: null},
          {id: 1, name: 'cheese', cost: 200, image:'https://avatars.mds.yandex.net/get-pdb/1101614/72c98b5f-81ce-4e0a-9bae-017f63db8c53/s1200?webp=false', selected: null},
          {id: 2, name: 'mushrooms', cost: 150, image:'https://avatars.mds.yandex.net/get-pdb/1365671/281a3841-0f32-4019-8bad-95502724d14a/s1200', selected: null},
          {id: 3, name: 'vegetables', cost: 230, image:'https://www.belnovosti.by/sites/default/files/article/20-02-2017/f87509fc99815c19e8cc313b5cdacadf.jpg', selected: null},
          {id: 4, name: 'fruits', cost: 350, image:'https://avatars.mds.yandex.net/get-pdb/788379/f795e96d-dbb5-4307-8fb9-47198a70c519/s1200?webp=false', selected: null},
      ],
      order:[],
      list:null,
      orderCost:0,
    }),
    props: {
    source: String
  },
    methods: {
      toggleMenu () {
        this.menuVisible = !this.menuVisible
      },
      add :function (id) {
        if(parseInt(this.ingredients[id].selected)){
          this.list = []
            if (id in this.order){
              this.order[id].selected += Number.parseInt(this.ingredients[id].selected);
              this.order[id].price += this.ingredients[id].selected * this.ingredients[id].cost *0.01;
            }
            else{
              this.order[id] = ({id: this.ingredients[id].id, selected: Number.parseInt(this.ingredients[id].selected), price: this.ingredients[id].selected * this.ingredients[id].cost *0.01, image: this.ingredients[id].image});
            }
            this.order.forEach(element => {
          if(element != undefined){
            this.list.push(element);
          }
        });
        this.orderCost += Number.parseFloat(this.ingredients[id].selected * this.ingredients[id].cost *0.01);
        }
        // eslint-disable-next-line no-console
           console.log(this.order,this.list,id);
        this.ingredients[id].selected = null
      },
      del:function(id){
        this.list = []
        this.orderCost -= Number.parseFloat(this.order[id].price);
        this.order[id] = null;
       
         this.order.forEach(element => {
          if(element != undefined){
            this.list.push(element);
          }
        });
           // eslint-disable-next-line no-console
           console.log(this.order,this.list,id);
      },
      remove :function (id) {
        if(parseInt(this.ingredients[id].selected)){
          this.list = []
            if (id in this.order){
                this.order[id].selected -= Number.parseInt(this.ingredients[id].selected);
                this.order[id].price -= this.ingredients[id].selected * this.ingredients[id].cost *0.01;
                this.orderCost -= Number.parseFloat(this.ingredients[id].selected * this.ingredients[id].cost *0.01);
            }
            else{
              alert('Этот товар еще не был добавлен');
            }
            this.order.forEach(element => {
          if(element != undefined){
            this.list.push(element);
          }
        });
        }
        
        this.ingredients[id].selected = null
      },
      pay:function(){
        alert('Функция в данный момент не доступна:)');
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
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.14), 0 3px 4px 0 rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.20);
  }
.img{
    height: 200px !important;
    width: 90% !important  ;
}
.title-order{
  display: flex;
  height: 64px;
}
.title-order h2{
  padding-top:15px;
  margin: 0 auto;
}
  .group {
    position: relative;
    margin-top: 10px;
    margin-bottom: 30px;
  }
.buttons{
 width: 100%;
 padding-bottom: 10px;
}
.md-raised{
  width: 40%;
  box-shadow: 0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12), 0 8px 10px 0 rgba(0,0,0,0.20);
}

input {
  width: 300px;
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
input:focus ~ label, input:valid ~ label {
  top: -10px;
  font-size: 14px;
  color: #5264AE;
}
.md-drawer.md-active{
box-shadow: 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 3px rgba(0,0,0,0.12), 0 4px 5px 0 rgba(0,0,0,0.20);
}

.md-accent{
 background: rgb(248, 105, 105);
 box-shadow: 0 2px 4px 0 rgba(0,0,0,0.14), 0 3px 4px 0 rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.20);
}

.small-img{
  height: 100px !important;
  width: 100%;
}
.md-list{
  width: 90%; 
  margin-left: 5%;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.14), 0 3px 4px 0 rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.20);
  margin-top: 10px;
}
.md-list-item-text{
  text-align: center;
}


</style>


