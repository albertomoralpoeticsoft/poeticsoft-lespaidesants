// https://github.com/metafizzy/flickity

export default $ => {

  const $sliderherowrapper = $('.wp-block-group.slider')
  if(!$sliderherowrapper.length) { return }

  let $sliderhero = $('.wp-block-group.slider > .wp-block-group .wp-block-group__inner-container')
  if(!$sliderhero.length) {

    $sliderhero = $('.wp-block-group.slider > .wp-block-group')
  }
  if($sliderhero.length) { 

    $sliderhero
    .each(function(){

      const $this = $(this)

      $this.flickity({
        autoPlay: false,
        prevNextButtons: false,
        wrapAround: true,
        pageDots: false,
        friction: 0.5
      })

      window.addEventListener(
        'resize',
        () => {
      
          $this.flickity('resize')          
        }
      )

      if($sliderherowrapper.hasClass('autoplay')) {

        setInterval(() => {

          $this.flickity('next', true, false)

        }, 6000)
      }

      $this.flickity('resize') 
    })
  }
}