export async function getBase64 (file: File) {
  const value = await new Promise<string>(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result as string);
    };
  });
  return value
}