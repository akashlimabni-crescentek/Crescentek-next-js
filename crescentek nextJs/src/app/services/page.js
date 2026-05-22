import { redirect } from 'next/navigation';
import { buildServicesRedirectMetadata } from '@/lib/servicesSeo';

export function generateMetadata() {
  return buildServicesRedirectMetadata();
}

export default function ServicesIndexPage() {
  redirect('/all-services');
}
