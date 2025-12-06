import { supabase } from "../lib/supabase";

const processProduct = (product: any) => {
  const images = product.images || [];

  const publicImages = images.map((imagePath: string) => {
    return supabase.storage.from("product-images").getPublicUrl(imagePath).data
      .publicUrl;
  });

  return {
    ...product,
    image: publicImages[0] || null, // Fallback to first image or null
    images: publicImages,
  };
};

// Get all products
export const products = async () => {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  const allProducts = products.map(processProduct);

  return allProducts;
};

// Get a single product by slug
export const getProductBySlug = async (slug: string) => {
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return processProduct(product);
};

// Shuffle an array of products
function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

// Get products for the home page
export const getHomePageProducts = async () => {
  const allProducts = await products();
  const shuffled = shuffle([...allProducts]);

  const ourBreads = shuffled.slice(0, 6);
  const marqueeBreads = [...ourBreads, ...ourBreads];
  const bakersSpecials = shuffle([...allProducts]);

  return {
    marqueeBreads,
    bakersSpecials,
  };
};
