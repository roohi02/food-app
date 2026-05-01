const UNSPLASH_KEY = "XgplgDN54_16iwwGkYgFz-V3t2UjOjQvdsABt_1vKqM";


export const getRestaurantImage = async (
  name: string,
  cuisine: string
) => {
  const queryMap: Record<string, string> = {
    indian: "indian food curry thali",
    italian: "pizza pasta italian food",
    chinese: "noodles dumplings chinese food",
    "fast food": "burger fries fast food",
  };

  const query =
    queryMap[cuisine?.toLowerCase()] || "restaurant food dish";

  const res = await fetch(
    `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
      query
    )}&client_id=${UNSPLASH_KEY}`
  );

  const data = await res.json();

  return data?.urls?.regular;
};