export const getNearbyRestaurantsOSM = async (lat: number, lng: number) => {
  try {
    const endpoint = "https://overpass.kumi.systems/api/interpreter";

    const query = `
[out:json][timeout:25];
(
  node["amenity"="restaurant"](around:3000,${lat},${lng});
  way["amenity"="restaurant"](around:3000,${lat},${lng});
  relation["amenity"="restaurant"](around:3000,${lat},${lng});
);
out center;
`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `data=${encodeURIComponent(query)}`,
    });

    const text = await res.text();

    // 🚨 CRITICAL SAFETY CHECK
    if (!text.trim().startsWith("{")) {
      console.log("❌ NON-JSON RESPONSE:", text);
      return [];
    }

    const data = JSON.parse(text);
    return data?.elements || [];
  } catch (error) {
    console.log("❌ OSM ERROR:", error);
    return [];
  }
};