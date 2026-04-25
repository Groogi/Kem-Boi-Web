import React, { useMemo } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'

const EmblaCarousel = (props) => {
  const { slides, options } = props
  
  // Double the slides if we have very few, to ensure a seamless infinite loop
  const displaySlides = slides.length < 6 ? [...slides, ...slides] : slides;

  const autoplayInstance = useMemo(
    () => Autoplay({ delay: 8000, stopOnInteraction: false }),
    []
  )
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      duration: 50, 
      align: 'center', 
      containScroll: false,
      loop: true, // Forcing loop: true to be absolute
      ...options 
    },
    [autoplayInstance]
  )

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  return (
    <div className="embla">
      <div className="embla_viewport" ref={emblaRef}>
        <div className="embla_container">
          {displaySlides.map((slide, index) => (
            <div
              className={`embla_slide ${
                index % slides.length === selectedIndex % slides.length
                  ? 'is-selected'
                  : ''
              }`}
              key={index}
            >
              <div className="embla_slide_inner">
                {typeof slide === 'number' ? (
                  <div className="embla_slide_number">
                    <span>{slide + 1}</span>
                  </div>
                ) : (
                  <img
                    src={slide.src}
                    alt={slide.alt || ''}
                    className="w-full h-full object-cover block"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla_controls">
        <div className="embla_dots">
          {slides.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla_dot'.concat(
                index === selectedIndex % slides.length ? ' embla_dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
