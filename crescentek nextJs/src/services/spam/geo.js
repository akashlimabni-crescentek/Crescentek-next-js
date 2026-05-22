export async function getGeoFromIp(ip) {
  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`);
    if (!res.ok) return {};
    const data = await res.json();
    return {
      ip_country: data.country_name || '',
      ip_city: data.city || '',
      ip_region: data.region || '',
      ip_timezone: data.timezone || '',
    };
  } catch {
    return {};
  }
}
