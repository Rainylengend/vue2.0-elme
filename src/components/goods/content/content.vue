<template>
  <div class="content">
    <div class="tabs">
      <div class="goods_tab" @click="foods(true)"><span :class="{active:renderFoods}">商品</span></div>
      <div class="ratings_tab" @click="foods(false)"><span :class="{active:!renderFoods}">评价</span></div>
    </div>
    <div class="main">
      <div :hidden="!renderFoods" class="main-left" id="main-left">
        <ul>
          <li v-for="(item,index) in goods" @click="foodListActive(index)" :class="{active:isListActive[index]}">{{
            item.name }}
          </li>
        </ul>
      </div>
      <div :hidden="!renderFoods" class="main-right" id="main-right">
        <div id="scroll">
          <section v-for="(item,index) in goods">
            <h3>{{ item.info }}</h3>
            <div class="item clear" v-for="(i,indexF) in item.foods">
              <img src="/static/img/food1.png" class="pull-left">
              <div class="item-right pull-left">
                <div class="title">{{ i.name }}</div>
                <div class="description">
                  {{ i.info }}
                </div>
                <p>月售2份</p>
                <div class="show-price clear">
                  <div class="price pull-left"> ￥{{i.price}} <span>￥{{i.oldPrice}}</span></div>
                  <div class="add pull-right" @click="addGoods($event,[index,indexF],i.price,i.name,i.id)">+</div>
                  <div class="pull-right amount" @click="addGoods" v-if="render[index][indexF]">{{ amount[index][indexF]
                    }}
                  </div>
                  <div class="reduce pull-right" @click="reduceGoods([index,indexF],i.price,i.id,i.name)"
                       v-if="render[index][indexF]">-
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <ratings v-if="!renderFoods"></ratings>
    </div>
  </div>
</template>

<script>
  /*  amount 所有商品数量的数组
   *  goods 商品的数组
   */
  import ratings from './ratings.vue';
  export default {
    data(){
      return {
        amount: [],
        goods: null,
        price: 0,
        renderFoods: true,
        isListActive: [true, false]
      }
    },
    computed: {
      allData(){
        return this.$store.state.data;
      },
      render(){
        return this.$store.state.goods.isActive;
      },
      allPrice(){
        return JSON.parse(this.$Storage.allPrice);
      },
      sellerId(){
        return this.$route.query.sellerId;
      }
    },
    watch: {
      allData(val){
        this.initialData(val)
      }
    },
    components: {ratings},
    methods: {
      foodListActive(index){
        let self = [false, false];

        self[index] = true;
        this.isListActive = self;
      },
      foods(val){
        this.renderFoods = val;
      },
      createBall(e){
        let car = document.querySelector('#shop-car'),
          t = 0,
          CreateBall = function () {
            this.ball = document.createElement('div');
          };

        CreateBall.prototype = {
          addStyle(obj){
            for (let i in obj) {
              this.ball.style[i] = obj[i];
            }
          },
          execute(){
            document.body.appendChild(this.ball);
          },
          getBall(){
            return this.ball;
          }
        };

        let _self = this,
          style = {
            position: 'absolute',
            zIndex: '1000',
            top: e.pageY - 5 + 'px',
            left: e.pageX - 5 + 'px',
            background: '#3190e8',
            borderRadius: '50%',
            webkitBorderRadius: '50%',
            width: '.5rem',
            height: '.5rem'
          },
          ball = new CreateBall();

        ball.addStyle(style);
        ball.execute();

        let move = function () {
          t += .017;

          if (t >= .5) {
            t = 0;
            document.body.removeChild(ball.getBall());
            _self.$store.commit('bounce');
            setTimeout(function () {
              _self.$store.commit('unBounce');
            }, 500);
            return;
          }

          let pointer = _self.$Tween.parabola(t, {x: e.pageX - 5, y: e.pageY - 5}, {
            x: car.offsetLeft - (e.pageX - 5),
            y: car.offsetTop - (e.pageY - 5)
          }, .5, .003);

          ball.getBall().style.left = pointer.x + 'px';
          ball.getBall().style.top = pointer.y + 'px';
          requestAnimationFrame(move)
        };

        move()
      },
      recordCache(_amount, index, id, name, price){
        //购物车详情
        let cache = this.$store.state.cache;

        if (!cache[this.sellerId - 1][id]) {
          cache[this.sellerId - 1][id] = {};
        }

        cache[this.sellerId - 1][id].name = name;
        cache[this.sellerId - 1][id].amount = _amount[index[0]][index[1]];
        cache[this.sellerId - 1][id].price = price;

        this.$Storage.cache = JSON.stringify(cache);
        this.$store.commit('initCache', cache);
      },
      reduceGoods(index, price, id, name){
        let _amount = this.amount;

        if (_amount[index[0]][index[1]] === 0) {
          return
        } else if (_amount[index[0]][index[1]] === 1) {
          index[2] = this.sellerId;
          this.$store.commit('unActive', index);
        }

        this.amount = null;
        _amount[index[0]][index[1]]--;
        this.$Storage['goodsAmount' + this.sellerId] = JSON.stringify(_amount);
        this.amount = _amount;
        this.price -= Number(price);
        this.allPrice[this.sellerId - 1] = this.price;

        this.$Storage.allPrice = JSON.stringify(this.allPrice);
        this.$store.commit('changeAllPrice', this.price);

        //购物车详情
        this.recordCache(_amount, index, id, name, price);
        if (this.price === 0) {
          this.$store.commit('isActiveShopCar', false)
        }
      },

      addGoods(e, index, price, name, id){
        let _amount = this.amount;

        this.createBall(e);
        this.amount = null;
        _amount[index[0]][index[1]]++;
        this.$Storage['goodsAmount' + this.sellerId] = JSON.stringify(_amount);
        this.amount = _amount;

        this.price = this.allPrice[this.sellerId - 1];
        this.price += Number(price);
        this.allPrice[this.sellerId - 1] = this.price;

        this.$Storage.allPrice = JSON.stringify(this.allPrice);
        index[2] = this.sellerId;
        this.$store.commit('active', index);
        this.$store.commit('changeAllPrice', this.allPrice[this.sellerId - 1]);
        this.$store.commit('footerActive');

        //记录购物车的商品详情
        this.recordCache(_amount, index, id, name, price)

      },
      // 初始化数据的函数
      initialData(res){

        if (typeof res === 'object') {
          const sellerId = this.sellerId;
          let allPrice = this.allPrice;

          const data = res.goods,
            length = data.length;
          let arr = [],
            __self = {
              amount: []
            };

          __self.amount.length = length;

          for (let i = 0; i < length; i++) {
            __self.amount[i] = [];
            arr[i] = [];
          }

          for (let i = 0; i < __self.amount.length; i++) {
            __self.amount[i].length = arr[i].length = data[i].foods.length;
            __self.amount[i].fill(0);
            arr[i].fill(false);
          }

          // 把每一个商家商品购买的数量存到本地存储上
          if (!this.$Storage['goodsAmount' + sellerId]) {
            this.$Storage['goodsAmount' + sellerId] = JSON.stringify(__self.amount);
          }

          if (!this.$Storage['setActive' + sellerId]) {
            this.$Storage['setActive' + sellerId] = JSON.stringify(arr);
          }

          this.amount = JSON.parse(this.$Storage['goodsAmount' + sellerId]);
          this.$store.commit('setActive', JSON.parse(this.$Storage['setActive' + sellerId]) || arr);

          if (allPrice[sellerId - 1] === 0)
            this.$store.commit('FooterUnActive');

          this.goods = data;
        }
      }
    },

    created(){
      const sellerId = this.sellerId;
      let allPrice = this.allPrice;

      if (allPrice[sellerId - 1] !== 0)
        this.$store.commit('footerActive');

      this.price = JSON.parse(this.$Storage.allPrice)[sellerId - 1];
      this.$store.commit('changeAllPrice', this.allPrice[this.sellerId - 1]);
      this.initialData(this.allData);
    },
    mounted(){
      new this.$iScroll('main-left', {
        vScrollbar: false,
        onScrollEnd(){
          this.refresh();
        }
      });

      new this.$iScroll('main-right', {
        onScrollEnd(){
          this.refresh();
        }
      });
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .content {
    width: 100vw;
  }

  .tabs {
    height: .9rem;
    line-height: .9rem;
    display: flex;
    border-bottom: 1px solid #F4F4F4;
    > * {
      text-align: center;
      flex-grow: 1;
      position: relative;
    }
    span {
      position: relative;
      &.active {
        color: #3190e8;
        &::after {
          content: "";
          display: block;
          width: 100%;
          position: absolute;
          left: 0;
          top: .4rem;
          border-bottom: 2px solid #3190e8;
        }
      }
    }
  }

  .main {
    height: calc(100vh - 4.36rem);
    display: flex;
  }

  .main-left {
    width: 1.7rem;
    height: 100%;
    background: #F8F8F8;
    overflow: auto;
    ul {
      padding-bottom: 1rem;
      li {
        text-align: center;
        padding: .4rem .3rem;
        border-bottom: 1px solid #e1e1e1;
        &.active {
          background: #fff;
        }
      }
    }
  }

  .main-right {
    height: 100%;
    flex-grow: 1;
    position: relative;
    h3 {
      padding: .2rem;
      background: #F8F8F8;
    }
  }

  .item {
    border-bottom: 1px solid #F4F4F4;
    padding: .2rem;
    img {
      width: 1.24rem;
      height: 1.24rem;
      padding: .2rem;
    }
    .title {
      font-size: .3rem;
      font-weight: bold;
    }
  }

  .item-right {
    width: calc(100vw - 3.34rem);
    line-height: 1.3;
    p {
      padding: .05rem 0;
    }
  }

  .description {
    color: #aaa;
    text-align: justify;
  }

  .price {
    color: #f60;
    font-size: .30rem;
    span {
      font-size: .24rem;
      color: #aaa;
      text-decoration: line-through;
    }
  }

  .add, .reduce {
    width: .5rem;
    height: .5rem;
    text-align: center;
    line-height: .46rem;
    font-size: .4rem;
    font-weight: bold;
    border-radius: 50%;
  }

  .add {
    background: #3190e8;
    color: #fff;
  }

  .reduce {
    color: #3190e8;
    border: 1px solid #3190e8;
  }

  .amount {
    width: .7rem;
    text-align: center;
    line-height: .5rem;
  }
</style>
