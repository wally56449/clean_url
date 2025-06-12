import { cleanAndResolveUrl } from "./url-utils.js";

document.getElementById("processBtn").addEventListener("click", async () => {
  const input = document.getElementById("urlInput").value;
  const output = document.getElementById("output");

  if (!input.trim()) {
    output.value = "請輸入網址";
    return;
  }

  const cleanedUrl = await cleanAndResolveUrl(input);
  output.value = cleanedUrl || "處理失敗";
});