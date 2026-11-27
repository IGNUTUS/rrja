import Img from './Img'
import { Button, Reveal } from './ui'
import { images, type ImageAsset } from '../data/images'

type Props = {
  title?: string
  text?: string
  button?: string
  to?: string
  image?: ImageAsset
}

export default function CTASection({
  title = "Let's move your business forward.",
  text = 'Have a shipment or customs brokerage requirement? Get in touch with our team.',
  button = 'Contact RRJA',
  to = '/contact',
  image = images.shipNight,
}: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 py-28 text-white md:py-36">
      <Img img={image} className="!absolute inset-0 -z-10 h-full w-full" sizes="100vw" />
      <div className="absolute inset-0 -z-10 bg-navy-950/80" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(7,22,41,0.85)_75%)]" />
      <div className="container-x text-center">
        <Reveal>
          <p className="eyebrow justify-center text-gold">Get in touch</p>
          <h2 className="display-lg mx-auto mt-6 max-w-4xl">{title}</h2>
          <p className="lead mx-auto mt-6 max-w-xl text-white/70">{text}</p>
          <div className="mt-11 flex justify-center">
            <Button to={to}>{button}</Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
