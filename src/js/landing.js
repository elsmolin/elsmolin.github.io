/**
 * Посадочная страница страница
 */
export const landingInit = () => {
  let screenWidth = $(window).width()

  /* Resize компонента landing */
  $(window).resize(() => {
    if (screenWidth == $(window).width()) return
    
    screenWidth = $(window).width()

    // ToDo...
  })

  /* Scroll компонента landing */
  $(window).scroll(() => {

  })
};
