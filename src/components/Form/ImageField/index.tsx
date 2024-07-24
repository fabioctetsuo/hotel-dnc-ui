import Image from "next/image";
import { InputHTMLAttributes, ChangeEvent, useState } from "react";

type ImageFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const ImageField = ({ id, label }: ImageFieldProps) => {
  const [image, setImage] = useState<string | null | ArrayBuffer>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Image
        src={image ? (image as string) : "/default-shadow-profile.jpg"}
        width={100}
        height={100}
        alt="Default Profile Picture"
        className="rounded-full relative object-cover w-24 h-24"
      />
      <label
        htmlFor={id}
        className="py-4 px-6 w-full border-none rounded-lg font-bold text-center cursor-pointer"
      >
        {label}
      </label>
      <input
        type="file"
        id={id}
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImageField;
