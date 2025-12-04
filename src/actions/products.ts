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
