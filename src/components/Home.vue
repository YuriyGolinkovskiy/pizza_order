<template>
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
          <img :src="`${ingredient.image}`" alt="none">
        </md-card-media>

      <md-card-actions>
        <div class="group">      
            <input type="text" required v-model="ingredient.selected">
            <span class="bar"></span>
            <label >product weight (g)</label>
        </div>
        <md-button>Add</md-button>
      </md-card-actions>
    </md-ripple>
    </md-card>
  </div>
</template>

<script>
export default {
   name: 'Home',
   data() {
    return {
      Ingredients: [
          {name: 'meat', cost: 300, image:'https://images.wallpaperscraft.ru/image/myaso_chesnok_pripravy_petrushka_listiki_tarelka_posuda_belyy_fon_78086_1920x1080.jpg', selected: ''},
          {name: 'cheese', cost: 200, image:'https://avatars.mds.yandex.net/get-pdb/1101614/72c98b5f-81ce-4e0a-9bae-017f63db8c53/s1200?webp=false', selected: ''},
          {name: 'mushrooms', cost: 150, image:'https://avatars.mds.yandex.net/get-pdb/1365671/281a3841-0f32-4019-8bad-95502724d14a/s1200', selected: ''},
      ]
    }
  },
}
</script>

<style scoped>
.md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
img{
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

/* active state */
input:focus ~ .bar:before,
input:focus ~ .bar:after {
  width: 50%;
}
</style>
