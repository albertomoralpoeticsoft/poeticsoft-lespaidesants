
export default $ => {

  $('body')
  .addClass('WithBGRotatory')

  $('#page')
  .prepend(`<div id="LEDS-BG-Rotatory">
    <div class="ImageA"></div>
    <div class="ImageB"></div>
  </div>`)
}