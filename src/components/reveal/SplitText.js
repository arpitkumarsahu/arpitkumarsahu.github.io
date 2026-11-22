import React from "react";

/**
 * Splits text into words that rise into place one after another when an
 * ancestor .reveal becomes visible. Screen readers get the plain sentence.
 */
export default function SplitText({text, step = 70, startDelay = 0}) {
  const words = String(text).trim().split(/\s+/);
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <React.Fragment key={`${word}-${i}`}>
            <span className="split-word">
              <span className="split-word-inner" style={{"--word-delay": `${startDelay + i * step}ms`}}>
                {word}
              </span>
            </span>
            {i < words.length - 1 ? " " : null}
          </React.Fragment>
        ))}
      </span>
    </>
  );
}
