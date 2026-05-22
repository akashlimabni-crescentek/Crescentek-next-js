import Hero from '@/components/home/Hero';
import Marquee from '@/components/home/Marquee';
import HomeServicesShowcase from '@/components/home/HomeServicesShowcase';
import Stats from '@/components/home/Stats';
import AboutPreview from '@/components/home/AboutPreview';
import CaseStudies from '@/components/home/CaseStudies';
import Testimonials from '@/components/home/Testimonials';
import FinalCTA from '@/components/home/FinalCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <HomeServicesShowcase />
      <Stats />
      <AboutPreview />
      <CaseStudies />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
