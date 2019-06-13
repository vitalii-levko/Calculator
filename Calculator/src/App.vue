<template>
  <div class="container">

    <div id="hello">
      <h2>{{ msg }}</h2>
    </div>

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
        <button @click="trn">{{ turn }}</button>
      </div>
    </div>

    <div v-if="turn === 'Off'">
      <Layout
        v-for="row in rows"
        :key="row.id"
        :items="row.items"
        :cls="row.cls"
      >
      </Layout>
    </div>

  </div>
</template>

<script>
  import Layout from './Layout.vue'

  export default {
    name: 'app',

    components: {
      Layout
    },

    data () {
      return {
        msg: 'Welcome to Vue.js Calculator app',
        rows: [{
          id: 1,
          cls: 'clsRow',
          items: [
            { id: 1, title: 'C', act: 'clr', value: '', cls: 'clsBtn' },
            { id: 2, title: '←', act: 'bck', value: '', cls: 'clsBtn' },
            { id: 3, title: '√', act: 'sqr', value: '', cls: 'clsBtn' },
            { id: 4, title: '÷', act: 'div', value: false, cls: 'clsBtn' }]}, {
          id: 2,
          cls: 'clsRow',
          items: [
            { id: 5, title: '7', act: 'put', value: '7', cls: 'clsBtn' },
            { id: 6, title: '8', act: 'put', value: '8', cls: 'clsBtn' },
            { id: 7, title: '9', act: 'put', value: '9', cls: 'clsBtn' },
            { id: 8, title: '*', act: 'mul', value: false, cls: 'clsBtn' }]}, {
          id: 3,
          cls: 'clsRow',
          items: [
            { id: 9, title: '4', act: 'put', value: '4', cls: 'clsBtn' },
            { id: 10, title: '5', act: 'put', value: '5', cls: 'clsBtn' },
            { id: 11, title: '6', act: 'put', value: '6', cls: 'clsBtn' },
            { id: 12, title: '-', act: 'sub', value: false, cls: 'clsBtn' }]}, {
          id: 4,
          cls: 'clsRow',
          items: [
            { id: 13, title: '1', act: 'put', value: '1', cls: 'clsBtn' },
            { id: 14, title: '2', act: 'put', value: '2', cls: 'clsBtn' },
            { id: 15, title: '3', act: 'put', value: '3', cls: 'clsBtn' },
            { id: 16, title: '+', act: 'sum', value: false, cls: 'clsBtn' }]}, {
          id: 5,
          cls: 'clsRow',
          items: [
            { id: 17, title: '±', act: 'inv', value: '', cls: 'clsBtn' },
            { id: 18, title: '0', act: 'put', value: '0', cls: 'clsBtn' },
            { id: 19, title: '.', act: 'put', value: '.', cls: 'clsBtn' },
            { id: 20, title: '=', act: 'res', value: '', cls: 'clsBtn' }]
        }],
        txt: '',
        one: '',
        two: '',
        op: null,
        toOp: false,
        toClr: false,
        fromOp: false,
        turn: 'On',
        clsRow: 'row justify-content-center',
        clsBtn: 'col-1 btn btn-light',
      }
    },
    
    created() {
      this.rows.forEach(row => {
        row.cls = this[row.cls]
        row.items.forEach(item => {
          item.act = this[item.act]
          item.cls = this[item.cls]
        })
      })
    },
    
    methods: {

      trn() {
        if (this.turn === 'On') {
          this.turn = 'Off'
        }
        else {
          this.clr()
          this.turn = 'On'
        }
      },

      clr() {
        this.txt = ''
        this.one = ''
        this.two = ''
        this.op = null
        this.toOp = false
        this.toClr = false
      },

      bck() {
        if (this.txt && !this.toClr) {
          this.toClr = true
          this.put(this.txt.slice(0, -1))
        }
      },

      sqr() {
        if (this.txt) {
          this.txt = String(Math.sqrt(parseFloat(this.txt)))
          this.one = this.txt
          this.toClr = true
        }
      },

      div(fromRes) {
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

      mul(fromRes) {
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

      sub(fromRes) {
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

      inv(arg) {
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

      put(num) {
        if (num === '.' && (!this.txt || this.txt.includes('.') || this.toClr)) {
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

      sum(fromRes) {
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

      res(arg) {
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
