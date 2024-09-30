
  export function determineFileType(file: File): "image" | "video" | "gif" {
    const fileType = file.type.toLowerCase();
    if (fileType.startsWith("image/gif")) return "gif";
    if (fileType.startsWith("video/")) return "video";
    return "image";
  }