import React, { useEffect, useState, type FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { X } from "lucide-react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import type {
  categoryLevel,
  genderLevel,
  MediaType,
  sizelevel,
  UploadResponse,
} from "@/types/types";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { IKContext, IKUpload } from "imagekitio-react";
import { getOptimizedMedia } from "@/featues/imagekit/optimizedMedia";
import { useNavigate } from "react-router-dom";
import { authenticator } from "@/featues/imagekit/authenticator";
import { createProductsThunk } from "@/featues/products/products.thunk";
import { motion } from "motion/react";
import AiProduct from "./AiProduct";

const UploadProducts = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<MediaType | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [uploading, setUploading] = useState<boolean>();
  const [gender, setGender] = useState<genderLevel | null>(null);
  const [size, setSize] = useState<sizelevel>("md");
  const [category, setCategory] = useState<categoryLevel>("Fashion");
  const [error, setError] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(1);
  const { user } = useAppSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const { items } = useAppSelector((state) => state.aiProductGenerator);

  useEffect(() => {
    if (!items) return;

    setName(items.name ?? "");
    setTitle(items.title ?? "");
    setDescription(items.description ?? "");
    setCategory((items.category as categoryLevel) ?? "Fashion");
    setSize((items.size as sizelevel) ?? "md");
    setPrice(items.price ?? 0);
    setStock(items.stock ?? 1);
    setGender((items.gender as genderLevel) ?? null);
  }, [items]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !name ||
      !title ||
      !description ||
      !price ||
      !stock ||
      !category ||
      !size
    ) {
      setError("Please fill all required fields");
      return;
    }

    await dispatch(
      createProductsThunk({
        title,
        name,
        description,
        price,
        stock,
        thumbnailUrl,
        category,
        gender,
        size,
        mediaType,
        mediaUrl,
      }),
    );

    setName("");
    setDescription("");
    setGender(null);
    setCategory("Fashion");
    setCategory("Fashion");
    setSize("md");
    setPrice(0);
    setStock(1);
    setMediaUrl(null);
    setMediaType(null);
    setError("");
    navigate("/dashboard");
  };

  const handleRemoveMedia = () => {
    setMediaUrl(null);
    setMediaType(null);
  };

  return (
    <div className="min-h-screen bg-muted/40 p-4 md:p-8">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle className="text-2xl font-semibold">
                Create New Products
              </CardTitle>
              <div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  <Button
                    onClick={() => setOpen(true)}
                    // disabled={!mediaUrl}
                    className={`bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:brightness-110 shadow-lg 
    ${!mediaUrl ? "cursor-not-allowed opacity-20" : "cursor-pointer"}
  `}
                  >
                    Generate with AI ✨
                  </Button>
                </motion.div>

                <AiProduct open={open} setOpen={setOpen} mediaUrl={mediaUrl} />
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Fill in the details below to publish your product
            </p>
          </CardHeader>

          {/* IMAGEKIT UPLOAD */}
          <IKContext
            publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY}
            urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
            authenticator={authenticator}
          >
            <IKUpload
              fileName={name || "product-media"}
              accept="image/*"
              onUploadStart={() => setUploading(true)}
              onError={(err: Error) => {
                setUploading(false);
                alert("Upload error: " + err.message);
              }}
              multiple
              onSuccess={(res: UploadResponse) => {
                // console.log("File Type:", res.fileType); // <-- check this
                setUploading(false);
                const optimized = getOptimizedMedia(res);
                setMediaUrl(optimized.url);
                setMediaType(optimized.mediaType);
                setThumbnailUrl(res.thumbnailUrl);

                // console.log("Original URL:", res.url);
                // console.log("Optimized URL:", optimized.url);
                // //
              }}
              className="cursor-pointer rounded border border-dashed px-4 py-2 mt-4 mx-4 hover:shadow-md"
            />
          </IKContext>

          {uploading && (
            <p className="text-sm text-center text-muted-foreground px-4 mt-2 animate-pulse">
              Uploading...
            </p>
          )}

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {mediaUrl && (
                <div className=" relative rounded-xl">
                  <img
                    src={mediaUrl}
                    alt="Course Media"
                    className=" w-full aspect-video object-contain rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveMedia}
                    className=" absolute top-0 right-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-muted"
                  >
                    <X className="h-5 w-5 text-red-600  cursor-pointer absolute" />
                  </button>
                </div>
              )}

              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  placeholder="e.g. Jacket"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                  }}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  placeholder="e.g. Men's Waxed Canvas Jacket with Hoodie"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setError("");
                  }}
                  required
                />
              </div>

              <div className="space-y-1">
                <Label>Description:</Label>
                <Textarea
                  placeholder="Imported T-Shirt"
                  className="resize-none min-h-32 max-h-64 whitespace-pre-line leading-relaxed"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setError("");
                  }}
                  // maxLength={200}
                  required
                />
              </div>

              <div className="flex justify-between">
                <div className="space-y-2">
                  <Label>Product Gender</Label>
                  <Select
                    value={gender ?? ""}
                    onValueChange={(gender) => {
                      setGender(gender as genderLevel);
                      setError("");
                    }}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="men">Men</SelectItem>
                      <SelectItem value="women">women</SelectItem>
                      <SelectItem value="baby">baby</SelectItem>
                      <SelectItem value="unisex">unisex</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={category ?? ""}
                    onValueChange={(value) => {
                      setCategory(value as categoryLevel);
                      setError("");
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Electronic">Electronic</SelectItem>
                      <SelectItem value="Grocery">Grocery</SelectItem>
                      <SelectItem value="Fashion">Fashion</SelectItem>
                      <SelectItem value="Cosmetics">Cosmetics </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Size</Label>
                  <Select
                    value={size ?? ""}
                    onValueChange={(size) => {
                      setSize(size as sizelevel);
                      setError("");
                    }}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select products size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xs">xs</SelectItem>
                      <SelectItem value="sm">sm</SelectItem>
                      <SelectItem value="md">md</SelectItem>
                      <SelectItem value="lg">lg</SelectItem>
                      <SelectItem value="xl">xl</SelectItem>
                      <SelectItem value="xxl">xxl</SelectItem>
                      <SelectItem value="standard">standard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-between gap-3">
                <div className="space-y-2">
                  <Label>Price ($)</Label>
                  <Input
                    placeholder="$ 25"
                    type="number"
                    inputMode="decimal"
                    step={"0.01"}
                    value={price}
                    min={0}
                    onChange={(e) => {
                      setPrice(Number(e.target.value));
                      setError("");
                    }}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Stock</Label>
                  <Input
                    placeholder="Stock"
                    type="number"
                    value={stock}
                    // onChange={(e) => setStock(e.target.value)}
                    onChange={(e) => setStock(Number(e.target.value))}
                    pattern="\d+"
                    min={1}
                    required
                  />
                </div>
              </div>
              {error && <div className="text-red-500 ">{error}</div>}
              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={uploading}
              >
                Create Products
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="hidden lg:flex flex-col justify-center border-dashed p-4">
          <CardContent className="space-y-4 text-center">
            <h3 className="text-xl font-semibold">Live Preview</h3>

            <div className="rounded-lg border p-4 text-left space-y-2 bg-background">
              <div className="flex items-center justify-center">
                {mediaUrl ? (
                  <img
                    src={mediaUrl}
                    alt="Preview"
                    className=" w-full aspect-video object-contain rounded-xl"
                  />
                ) : (
                  <div className="h-52 w-full flex flex-col items-center justify-center rounded-xl border border-dashed text-muted-foreground">
                    <div className="text-center">Preview will appear here</div>
                    <div className="block text-xs text-muted-foreground mt-2">
                      Automatically remove background
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center">
                <p className="font-medium text-lg">{name || "Product Name"}</p>
                <span className="font-semibold">{price}</span>
              </div>
              <p className="font-medium text-lg text-muted-foreground">
                {title || "Product Title"}
              </p>

              <div className="flex items-center justify-between pt-2 text-sm  border-b py-4">
                <div className="flex gap-5">
                  <div className="flex items-end">
                    <span className="text-sm">
                      {user?.firstName} {user?.lastName}, Author
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
                <Badge className="capitalize">{gender || "category"}</Badge>
              </div>

              <div className="resize-none min-h-32 whitespace-pre-line leading-relaxed text-muted-foreground">
                {description || "Course description will appear here..."}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UploadProducts;
