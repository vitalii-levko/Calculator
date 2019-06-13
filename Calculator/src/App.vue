<template>
  <div>
    <div id="hello">
      <h2>{{ msg }}</h2>
    </div>

    <div id="calc-app" class="container">
      
      <div class="row justify-content-center">
        <div class="center-block text-center">
          <template v-if="turn === 'On'">
            <input v-model="txt"
              disabled 
              placeholder="Calculator"
            >    
          </template>
          <template v-else>
            <input v-model="txt"
              readonly
              placeholder="0"
            > 
          </template>
          <button v-on:click="trn">{{ turn }}</button>
        </div>
      </div>

      <div v-if="turn === 'Off'">
        <div class="row justify-content-center">
          <span v-on:click="clr()" v-bind:class="clsBtn">C</span>
          <span v-on:click="bck" v-bind:class="clsBtn">←</span>
          <span v-on:click="sqr()" v-bind:class="clsBtn">√</span>
          <span v-on:click="div(false)" v-bind:class="clsBtn">÷</span>
        </div>
        <div class="row justify-content-center">
          <span v-on:click="put(7)" v-bind:class="clsBtn">7</span>
          <span v-on:click="put(8)" v-bind:class="clsBtn">8</span>
          <span v-on:click="put(9)" v-bind:class="clsBtn">9</span>
          <span v-on:click="mul(false)" v-bind:class="clsBtn">*</span>
        </div>
        <div class="row justify-content-center">
          <span v-on:click="put(4)" v-bind:class="clsBtn">4</span>
          <span v-on:click="put(5)" v-bind:class="clsBtn">5</span>
          <span v-on:click="put(6)" v-bind:class="clsBtn">6</span>
          <span v-on:click="sub(false)" v-bind:class="clsBtn">-</span>
        </div>
        <div class="row justify-content-center">
          <span v-on:click="put(1)" v-bind:class="clsBtn">1</span>
          <span v-on:click="put(2)" v-bind:class="clsBtn">2</span>
          <span v-on:click="put(3)" v-bind:class="clsBtn">3</span>
          <span v-on:click="sum(false)" v-bind:class="clsBtn">+</span>
        </div>

        <div class="row justify-content-center">
          <span
            v-for="btn in btns"
            v-on:click="btn.act(btn.value)"
            v-bind:class="btn.cls"
          >{{ btn.title }}</span>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
export default {
  name: 'app',

  data () {
    return {
      msg: 'Welcome to Vue.js Calculator app',
      btns: [
        { id: 1, title: '±', act: 'inv', value: '', cls: 'col-1 btn btn-light' },
        { id: 2, title: '0', act: 'put', value: '0', cls: 'col-1 btn btn-light' },
        { id: 3, title: '.', act: 'put', value: '.', cls: 'col-1 btn btn-light' },
        { id: 4, title: '=', act: 'res', value: '', cls: 'col-1 btn btn-light' },
      ],
      txt: '',
      one: '',
      two: '',
      op: null,
      toOp: false,
      toClr: false,
      fromOp: false,
      turn: 'On',
      clsBtn: 'col-1 btn btn-light',
    }
  },
  
  created() {
    this.btns.forEach(btn => { btn.act = this[btn.act] })
  },
  
  methods: {

    trn: function () {
      if (this.turn === 'On') {
        this.turn = 'Off'
      }
      else {
        this.clr()
        this.turn = 'On'
      }
    },

    clr: function () {
      this.txt = ''
      this.one = ''
      this.two = ''
      this.op = null
      this.toClr = false
      this.toOp = false
    },

    bck: function () {
      if (this.txt && !this.toClr) {
        this.toClr = true
        this.put(this.txt.slice(0, -1))
      }
    },

    sqr: function () {
      if (this.txt) {
        this.txt = String(Math.sqrt(parseFloat(this.txt)))
        this.one = this.txt
        this.toClr = true
      }
    },

    div: function (fromRes) {
      if (this.op && this.two && this.toOp) {
        if (!parseFloat(this.two)) {
          this.txt = 'Cannot divide by zero'
          this.one = ''
          this.two = ''
          this.op = null
        }
        else {
          this.txt = String(parseFloat(this.one) / parseFloat(this.two))
          this.one = this.txt
          if (!fromRes) {
            this.two = ''
          }
        }
        this.toOp = false
      }
      else if (this.txt) {
        this.op = this.div
        if (!fromRes) {
          this.two = ''
        }
      }
      this.toClr = true
      this.fromOp = true
    },

    mul: function (fromRes) {
      if (this.op && this.two && this.toOp) {
        this.txt = String(parseFloat(this.one) * parseFloat(this.two))
        this.one = this.txt
        if (!fromRes) {
          this.two = ''
        }
        this.toOp = false
      }
      else if (this.txt) {
        this.op = this.mul
        if (!fromRes) {
          this.two = ''
        }
      }
      this.toClr = true
      this.fromOp = true
    },

    sub: function (fromRes) {
      if (this.op && this.two && this.toOp) {
        this.txt = String(parseFloat(this.one) - parseFloat(this.two))
        this.one = this.txt
        if (!fromRes) {
          this.two = ''
        }
        this.toOp = false
      }
      else if (this.txt) {
        this.op = this.sub
        if (!fromRes) {
          this.two = ''
        }
      }
      this.toClr = true
      this.fromOp = true
    },

    inv: function (arg) {
      if (this.txt) {
        this.txt = String(parseFloat(this.txt) * -1)
        if (!this.fromOp && !this.two) {
          this.one = this.txt
        }
        else {
          this.two = this.txt
        }
      }
    },

    put: function (num) {
      if (num === '.' && (!this.txt || this.txt.includes('.'))) {
        return
      }
      if (this.toClr) {
        this.txt = ''
        this.toClr = false
      }
      this.txt += num
      if (!this.fromOp) {
        this.one = this.txt
      }
      else {
        this.two = this.txt
        if (this.op) {
          this.toOp = false
        }
      }
    },

    sum: function (fromRes) {
      if (this.op && this.two && this.toOp) {
        this.txt = String(parseFloat(this.one) + parseFloat(this.two))
        this.one = this.txt
        if (!fromRes) {
          this.two = ''
        }
        this.toOp = false
      }
      else if (this.txt) {
        this.op = this.sum
        if (!fromRes) {
          this.two = ''
        }
      }
      this.toClr = true
      this.fromOp = true
    },

    res: function (arg) {
      if (this.op) {
        this.toOp = true
        if (!this.two) {
          this.two = this.txt
        }
        this.op(true)
        this.fromOp = false
        this.toClr = true
      }
    },
  },
}
</script>

<style>
#hello {
  font-family: Verdana;
  color: navy;
  text-align: center;
}
</style>
