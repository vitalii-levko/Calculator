Vue.component('control', {
  props: ['func', 'turn'],
  template: '<button v-on:click="func()">{{ turn }}</button>',
})

var app = new Vue({
  el: '#app',

  data: {
    txt: '',
    one: '',
    two: '',
    op: null,
    toOp: false,
    toClr: false,
    fromOp: false,
    turn: 'On',
    clsBtn: 'col-1 btn btn-light',
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

    inv: function () {
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

    res: function () {
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
  }
})
