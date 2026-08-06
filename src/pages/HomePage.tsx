import hotelDeVilleRouen from '../assets/hotel-de-ville-rouen.jpeg'
import planHotelDeVilleRouen from '../assets/plan-hotel-de-ville-rouen.jpeg'
import AccommodationSection from '../components/sections/AccommodationSection'
import DecorativeBreak from '../components/sections/DecorativeBreak'
import EventSection from '../components/sections/EventSection'
import WelcomeHero from '../components/sections/WelcomeHero'
import { weddingDetails } from '../content/weddingDetails'

export default function HomePage() {
  return (
    <>
      <WelcomeHero />
      <EventSection
        id="mairie"
        overline="Les vœux"
        title="La mairie"
        description="Nous nous dirons oui à l’hôtel de ville de Rouen, entourés de celles et ceux qui comptent pour nous."
        details={weddingDetails.ceremony}
        image={{ src: hotelDeVilleRouen, alt: 'Façade de l’hôtel de ville de Rouen' }}
        map={{ src: planHotelDeVilleRouen, alt: 'Plan d’accès à l’hôtel de ville de Rouen' }}
      />
      <DecorativeBreak />
      <EventSection
        id="reception"
        overline="La fête"
        title="La réception"
        description="La soirée se poursuivra autour d’un dîner, puis de la piste de danse."
        details={weddingDetails.reception}
        image={{ alt: '[[PHOTO DU LIEU DE LA RÉCEPTION]]' }}
        map={{ alt: '[[PLAN D’ACCÈS À LA RÉCEPTION]]' }}
        imageSide="right"
      />
      <AccommodationSection />
    </>
  )
}
