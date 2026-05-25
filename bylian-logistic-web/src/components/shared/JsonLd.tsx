import React from "react";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LogisticsBusiness",
    "name": "Bylian Logistic",
    "alternateName": "Bylian Logistic Transport Services",
    "url": "https://bylianlogistics.com",
    "logo": "https://bylianlogistics.com/logo.png",
    "image": "https://bylianlogistics.com/images/about-preview.jpg",
    "description": "Bylian Logistic provides professional land freight, maritime shipping, train cargo, air cargo support, and warehousing solutions in Indonesia and globally.",
    "telephone": "+62-812-3456-7890",
    "email": "support@bylianlogistics.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Logistic Center No. 88",
      "addressLocality": "Jakarta",
      "addressRegion": "DKI Jakarta",
      "postalCode": "10110",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -6.2088,
      "longitude": 106.8456
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://facebook.com/bylianlogistics",
      "https://instagram.com/bylianlogistics",
      "https://linkedin.com/company/bylianlogistics"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
