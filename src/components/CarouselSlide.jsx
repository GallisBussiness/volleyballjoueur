import { Carousel } from "@mantine/carousel"
import { Image } from "@mantine/core"
import { useRef } from "react";
import Autoplay from 'embla-carousel-autoplay';


function CarouselSlide({images = []}) {

    const autoplay = useRef(Autoplay({ delay: 6000 }));

  return (
    <div className="my-5 mx-10">
    {images.length !== 0 && <Carousel
      withIndicators
      height={300}
      slideSize="33.333333%"
      slideGap="md"
      controlSize={35}
      loop 
      align="start"
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
    >
     {images.map((im,i) => (
       <Carousel.Slide key={i}>
       <Image
         radius="md"
         src={im}
         alt={`Image ${i}`}
       />
       </Carousel.Slide>
     ))}
    </Carousel>}
    </div>
  )
}

export default CarouselSlide