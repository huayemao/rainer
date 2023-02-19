import { useEffect, useState } from "react";
import clsx from "clsx";
import ThemePicker from "../components/ThemePicker";
import { MySlider } from "../components/MySlider";
import Head from "next/head";

export default function Home() {
  const [themeColor, setThemeColor] = useState("plant");
  const [images, setImages] = useState([]);
  const [scale, setScale] = useState(50);
  const [translateX, setTranslateX] = useState(50);
  const [translateY, setTranslateY] = useState(50);

  const getScaleValue = (v) => v / 50;
  const getTraslateValue = (v) => v - 50 + "px";
  const scaleV = getScaleValue(scale);
  const translateXV = getTraslateValue(translateX);
  const translateYV = getTraslateValue(translateY);

  useEffect(() => {
    // https://web.dev/patterns/files/
    document.addEventListener("paste", async (e) => {
      e.preventDefault();
      const clipboardItems =
        typeof navigator?.clipboard?.read === "function"
          ? await navigator.clipboard.read()
          : e.clipboardData.files;

      const blobs = [];

      //@ts-ignore
      for (const clipboardItem of clipboardItems) {
        let blob;
        if (clipboardItem.type?.startsWith("image/")) {
          // For files from `e.clipboardData.files`.
          blob = clipboardItem;
          // Do something with the blob.
          blobs.push(blob);
        } else {
          // For files from `navigator.clipboard.read()`.
          const imageTypes = clipboardItem.types?.filter((type) =>
            type.startsWith("image/")
          );
          for (const imageType of imageTypes) {
            blob = await clipboardItem.getType(imageType);
            // Do something with the blob.
            blobs.push(blob);
          }
        }
      }

      setImages(blobs);
    });

    document.addEventListener("dragover", (e) => {
      // Prevent navigation.
      e.preventDefault();
    });

    document.addEventListener("drop", async (e) => {
      e.preventDefault();
      const supportsFileSystemAccessAPI =
        "getAsFileSystemHandle" in window.DataTransferItem.prototype;
      const supportsWebkitGetAsEntry =
        "webkitGetAsEntry" in window.DataTransferItem.prototype;
      //@ts-ignore
      const fileHandlesPromises = [...e.dataTransfer.items]
        .filter((item) => item.kind === "file")
        .map((item) =>
          supportsFileSystemAccessAPI
            ? item.getAsFileSystemHandle()
            : supportsWebkitGetAsEntry
            ? item.webkitGetAsEntry()
            : item.getAsFile()
        );

      for await (const handle of fileHandlesPromises) {
        if (handle.kind === "directory" || handle.isDirectory) {
          console.log(`Directory: ${handle.name}`);
        } else {
          setImages([await handle.getFile()]);
          console.log(`File: ${handle}`);
        }
      }
    });
    return () => {};
  }, []);

  return (
    <div
      className={clsx(
        "grid grid-cols-4 xl:grid-cols-5 print:grid-cols-3",
        `text-${themeColor}`
      )}
    >
      <aside className="pb-12 print:hidden">
        <div className="px-8 py-6">
          <div
            className={clsx(
              "flex gap-2 items-center text-2xl font-semibold tracking-tight",
              `text-${themeColor}`
            )}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: `<svg
              class="icon"
              style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2011"
            >
              <path
                d="M512 1024c-213.333333 0-384-170.666667-384-384 0-170.666667 102.4-349.866667 145.066667-418.133333C298.666667 183.466667 418.133333 0 512 0c119.466667 0 384 371.2 384 640C896 853.333333 725.333333 1024 512 1024zM512 85.333333c-59.733333 8.533333-298.666667 315.733333-298.666667 554.666667 0 166.4 132.266667 298.666667 298.666667 298.666667s298.666667-132.266667 298.666667-298.666667C810.666667 401.066667 571.733333 93.866667 512 85.333333zM512 853.333333c0 0-4.266667 0-4.266667 0-106.666667-4.266667-200.533333-102.4-209.066667-209.066667 0 0 0-4.266667 0-4.266667 0-25.6 17.066667-42.666667 42.666667-42.666667 21.333333 0 42.666667 17.066667 42.666667 42.666667 0 64 64 128 128 128 21.333333 0 42.666667 21.333333 42.666667 42.666667C554.666667 832 537.6 853.333333 512 853.333333z"
                p-id="2012"
              ></path>
            </svg>`,
              }}
            />
            rainer
          </div>
        </div>
        <div className="px-8 space-y-4">
          <ThemePicker activeTheme={themeColor} onChange={setThemeColor} />
          <MySlider
            label={`缩放：${scaleV}`}
            theme={themeColor}
            onValueChange={(v) => {
              setScale(v[0]);
            }}
            value={scale}
          />
          <MySlider
            label={`水平偏移：${translateXV}`}
            theme={themeColor}
            onValueChange={(v) => {
              setTranslateX(v[0]);
            }}
            value={translateX}
          />
          <MySlider
            label={`垂直偏移：${translateYV}`}
            theme={themeColor}
            onValueChange={(v) => {
              setTranslateY(v[0]);
            }}
            value={translateY}
          />
        </div>
      </aside>
      <div className="col-span-3 border-l border-l-slate-200 print:border-none  dark:border-l-slate-700 xl:col-span-4">
        <div className="w-[794px] h-[559px] px-8 py-4 ml-12 print:mx-0 print:py-0">
          <div
            className={
              "p-6 shadow-lg grid grid-cols-8 gap-2 " +
              `text-${themeColor} bg-${themeColor}`
            }
          >
            <div
              className={clsx(
                "p-4 inline-flex gap-4  row-span-3 col-span-6",
                `border-[var(--${themeColor}-dark)]`
              )}
            >
              <div
                className={clsx(
                  "font-bold flex items-center justify-center h-36 w-28 rounded",
                  // todo: 自定义是否添加阴影
                  {
                    "bg-white": images.length === 0,
                  }
                )}
              >
                {images.length === 0 ? (
                  <div className="p-4">粘贴图片或将图片拖拽至此</div>
                ) : (
                  <img
                    className="rounded"
                    src={URL.createObjectURL(images[0])}
                    style={{
                      transform: `scale(${scaleV}) translate(${translateXV},${translateYV})`,
                    }}
                  ></img>
                )}
              </div>
              <div
                className={clsx("border-l-2 border-white flex-[5] px-4 h-40")}
                // style={{ borderColor: `var(--${theme}-dark)`, }}
              >
                <h2 className="relative h-12">
                  <input
                    type="text"
                    placeholder=" "
                    className="text-2xl font-bold input-like"
                    name="title"
                  />
                  <label htmlFor="title">标题</label>
                </h2>
                <div className="relative h-32">
                  <textarea
                    name="detail"
                    placeholder=" "
                    className="resize-none input-like"
                    // rows={6}
                  />
                  <label htmlFor="detail">详情</label>
                </div>
              </div>
            </div>
            {Array.from({ length: 30 }, (_, i) => i + 1).map((e) => (
              <div
                className={clsx(
                  " bg-white h-16 w-20 p-1 text-right font-bold inline-block",
                  `text-${themeColor}-dark`
                )}
              >
                {e}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
