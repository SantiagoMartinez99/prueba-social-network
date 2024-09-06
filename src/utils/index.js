export const dataURLToBlob = (dataURL) => {
  const [header, data] = dataURL.split(",");
  const mime = header.match(/:(.*?);/)[1];
  const binary = atob(data);
  let array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: mime });
};