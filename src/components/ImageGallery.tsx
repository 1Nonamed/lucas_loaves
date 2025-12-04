import { useState } from "react";

interface Props {
  images: string[];
  productName: string;
  slug: string;
}

export default function ImageGallery({ images, productName, slug }: Props) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="aspect-square w-full overflow-hidden rounded-xl shadow-sm">
        <img
          src={selectedImage}
          alt={productName}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(img)}
              className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-all border-2 ${
                selectedImage === img
                  ? "border-warm-gold opacity-100"
                  : "border-stone-200 opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`${productName} view ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
