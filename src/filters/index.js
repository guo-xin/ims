import Vue from 'vue'
import { formatLength, formatData } from '../common/js/util'

let filters = {

  formatCurrency(number) {
    if (isNaN(number)) {
      return 0;
    } else if (number === 0) {
      return 0;
    }
    return formatLength(formatData(number, 1 / 100).toFixed(2));
  },
}

Object.keys(filters).forEach((k) => {
  Vue.filter(k, filters[k])
})
