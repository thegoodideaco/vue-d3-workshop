import Vue from 'vue'
import { LoDashStatic } from 'lodash'
interface IGlobalWindow extends Window {
  _?: LoDashStatic
}
