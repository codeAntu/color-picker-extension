import { useState, ChangeEvent, useEffect, useCallback } from "react";

function App() {
  const [latestColor, setLatestColor] = useState<string>("#000000");
  const [colors, setColors] = useState<string[]>([]);
  const [isCoped, setIsCoped] = useState<boolean>(false);

  useEffect(() => {
    const color = localStorage.getItem("color-picker-latestColor");
    const colors = localStorage.getItem("color-picker-colors");
    if (color) {
      setLatestColor(color);
    }
    if (colors) {
      setColors(JSON.parse(colors));
    }
  }, []);

  const handleColorChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setLatestColor(event.target.value);
      setIsCoped(false);
    },
    []
  );

  const copyAndSave = useCallback(() => {
    navigator.clipboard.writeText(latestColor);
    setIsCoped(true);
    localStorage.setItem("color-picker-latestColor", latestColor);
    saveColors();
  }, [latestColor]);

  const saveColors = useCallback(() => {
    if (colors.includes(latestColor)) {
      return;
    }
    const newColors = colors.length >= 5 ? colors.slice(1) : colors;
    newColors.push(latestColor);
    setColors(newColors);
    localStorage.setItem("color-picker-colors", JSON.stringify(newColors));
  }, [colors, latestColor]);

  return (
    <div
      className="dark:bg-black dark:text-white flex flex-col justify-center items-center gap-5 w-72 "
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, #ec415920, #d91e7120,#e1429c25,#b440a725,#b236e625,#9134ed25,#793af525,#833ff425,#605bf525,#497af125,#3ea4ee25,#37b0ed25)",
      }}
    >
      <div className="bg-[#ff07390a]"></div>
      <h1
        style={{
          backgroundImage:
            "linear-gradient(to right, #ec4159,#ec4159, #d91e71,#e1429c,#b440a7,#b236e6,#9134ed,#793af5,#833ff4,#605bf5,#497af1,#3ea4ee)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        className="text-center py-4 text-2xl font-extrabold"
      >
        Color Picker
      </h1>

      {colors.length ? (
        <div className="flex justify-center items-center gap-2">
          <div className="bg-black/5 dark:bg-white/5 p-2.5 rounded-lg flex gap-2.5 justify-center items-center border border-black/5  dark:border-white/10 ">
            {colors.map((color, index) => (
              <div
                key={index}
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: color }}
                onClick={() => {
                  setLatestColor(color);
                  setIsCoped(false);
                }}
              ></div>
            ))}
          </div>
          <div
            className="bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl"
            onClick={() => {
              localStorage.removeItem("color-picker-colors");
              setColors([]);
            }}
          >
            <img
              src="./icons/delete.svg"
              alt="Delete icon"
              className="dark:invert p-2.5 w-10 aspect-square"
            />
          </div>
        </div>
      ) : (
        <div></div>
      )}

      <div className="flex justify-center items-center gap-3">
        <div className="flex gap-4 border border-black/5 dark:border-white/10 justify-center items-center p-3 rounded-lg bg-black/5 dark:bg-white/5">
          <div className="font-semibold text-black/70 dark:text-white/70">
            {latestColor}
          </div>
          <input
            type="color"
            name="colorPicker"
            id="colorPicker"
            value={latestColor}
            onChange={handleColorChange}
          />
        </div>
        <div className="bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl">
          {!isCoped ? (
            <img
              src="./icons/copy.svg"
              alt="Copy icon"
              className="dark:invert p-3 w-10 aspect-square"
              onClick={copyAndSave}
            />
          ) : (
            <img
              src="./icons/check.svg"
              alt="Check icon"
              className="dark:invert p-3 w-10 aspect-square"
            />
          )}
        </div>
      </div>
      <div></div>
      <div className="p-6 text-sm">
        <span className="opacity-60">by {"  "} </span>
        <a
          href="https://github.com/codeAntu/"
          className="text-blue-400 font-bold "
        >
          CodeAntu
        </a>
      </div>
    </div>
  );
}

export default App;
