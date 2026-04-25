import React, { useMemo } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'

const EmblaCarousel = (props) => {
  const { slides, options } = props
  const autoplayInstance = useMemo(
    () => Autoplay({ delay: 8000, stopOnInteraction: false }),
    []
  )
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { duration: 50, align: 'center', ...options },
    [autoplayInstance]
  )

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  return (
    <div className="embla">
      <div className="embla_viewport" ref={emblaRef}>
        <div className="embla_container">
          {slides.map((slide, index) => (
            <div
              className={`embla_slide ${index === selectedIndex ? 'is-selected' : ''}`}
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
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla_dot'.concat(
                index === selectedIndex ? ' embla_dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
