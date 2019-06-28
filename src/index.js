import { landingInit } from './js/landing'
import { inputmaskInit, inputMask } from "./js/inputmask"
import { tooltipInit, tooltip } from "./js/tooltip"
import { selectInit, select } from "./js/select"
import { popupInit } from "./js/popup"
import { carouselInit, carousel } from "./js/carousel"
import { formInit, form } from "./js/form"
import { headerInit } from "./js/header"

import { demoInit } from "./js/_demoJS"

window._custom_ = {
  inputMask,
  // form,
  // tooltip,
  // select,
  // carousel,
}

$(document).ready(function(){
  /* Компоненты */
  inputmaskInit()
  // tooltipInit()
  // selectInit()
  // popupInit()
  // carouselInit()
  // formInit()
  headerInit()

  /* Скрипты необходимые только на конкретной странице */
  landingInit()

  //removeIf(production)
  demoInit()
  //endRemoveIf(production)
})
