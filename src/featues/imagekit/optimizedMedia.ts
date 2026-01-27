import type { MediaType, UploadResponse } from "@/types/types";

export const getOptimizedMedia = (res: UploadResponse) => {
  let optimizedUrl = res.url;
  let mediaType: MediaType = "image";

  if (res.fileType && res.fileType.startsWith("image")) {
    optimizedUrl = `${res.url}?tr=f-webp,q-60`; // for remove backgound use this ,e-removedotbg
    mediaType = "image";
  } else {
    mediaType = null;
  }

  return {
    url: optimizedUrl,
    mediaType,
  };
};
