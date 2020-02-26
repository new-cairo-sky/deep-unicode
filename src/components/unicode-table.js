import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "./unicode-table.css"

const charCodeUTF32 = value => {
  if (value.length == 1) {
    return value.charCodeAt(0)
  }
  if (value.length > 1) {
    return (
      (value.charCodeAt(0) - 0xd800) * 0x400 +
      (value.charCodeAt(1) - 0xdc00) +
      0x10000
    )
  }
}

const UnicodeTable = () => {
  const testTextStart = "The lazy fox"
  const testTextEnd = "jumped over the blah."
  const testCodes = [
    /* u000E0000: punycode.ucs2.encode([0x000e0000]), visible in chrome */
    {
      name: "bel",
      code: `\u0007` /* visible in code, inspector */,
      test: `${testTextStart}\u0007${testTextEnd}`,
      contextual: false,
    },
    {
      name: "tab",
      code: `\u0009` /* visible in code, inspector */,
      test: `${testTextStart}\u0009${testTextEnd}`,
      contextual: false,
    },
    {
      name: "linefeed",
      code: `\u000A` /* visible in code, inspector */,
      test: `${testTextStart}\u000A${testTextEnd}`,
      contextual: false,
    },
    {
      name: "next line",
      code: `\u0085` /* visible in code, inspector */,
      test: `${testTextStart}\u0085${testTextEnd}`,
      contextual: false,
    },
    {
      name: "Soft Hyphen",
      code: `\u00AD` /* chrome: visible as entity in inspector - can result in hyphen if places between non-white-space chars */,
      test: `sdkhfjdsfhjsdhfsdjhfjdshfjdshfjhsdfjhdsfjh${testTextStart}\u00AD${testTextEnd}`,
      contextual: false,
    },
    /**
     * Punctuation and spaces
     * https://en.wikibooks.org/wiki/Unicode/Character_reference/2000-2FFF
     * https://en.wikipedia.org/wiki/Whitespace_character#MMSP
     */
    {
      name: "En Quad (NQ SP)",
      code: `\u2000`,
      test: `${testTextStart}\u2000${testTextEnd}`,
      contextual: false,
    },
    {
      name: "Em Quad (MQ SP)",
      code: `\u2001`,
      test: `${testTextStart}\u2001${testTextEnd}`,
      contextual: false,
    },
    {
      name: "En Space (En SP)",
      code: `\u2002`,
      test: `${testTextStart}\u2002${testTextEnd}`,
      contextual: false,
    },
    {
      name: "Em Space (Em SP)",
      code: `\u2003`,
      test: `${testTextStart}\u2003${testTextEnd}`,
      contextual: false,
    },
    {
      name: "Three Per Em Space (3/M SP)",
      code: `\u2004`,
      test: `${testTextStart}\u2004${testTextEnd}`,
      contextual: false,
    },
    {
      name: "Four Per Em Space (4/M SP)",
      code: `\u2005`,
      test: `${testTextStart}\u2005${testTextEnd}`,
      contextual: false,
    },
    {
      name: "Six Per Em Space (6/M SP)",
      code: `\u2006`,
      test: `${testTextStart}\u2006${testTextEnd}`,
      contextual: false,
    },
    {
      name: "Figure Space (F SP)",
      code: `\u2007`,
      test: `${testTextStart}\u2007${testTextEnd}`,
      contextual: false,
    },
    {
      name: "Punctuation Space (P SP)",
      code: `\u2008`,
      test: `${testTextStart}\u2008${testTextEnd}`,
      contextual: false,
    },
    {
      name: "Thin Space (TH SP)",
      code: `\u2009`,
      test: `${testTextStart}\u2009${testTextEnd}`,
      contextual: false,
    },
    {
      name: "Hair Space (H SP)",
      code: `\u200A`,
      test: `${testTextStart}\u200A${testTextEnd}`,
      contextual: false,
    },
    {
      name: "Zero Width Space (ZWS)",
      code: `\u200B`,
      test: `${testTextStart}\u200B${testTextEnd}`,
      contextual: false,
    },
    {
      name: "Zero Width Non-Joiner (ZWNJ)",
      code: `\u200C` /* visible in inspector */,
      test: `${testTextStart}\u200C${testTextEnd}`,
      contextual: false,
    },
    /**
     * Combining the ZWJ with whitespace results in a non-breaking white space
     * Note that u200A does not match to space char in FireFox search.
     * Chrome does correctly parse as a space character for search
     * it also does not collapse with other the white space
     */
    {
      name: "Zero Width Joiner (ZWJ)",
      code: `\u200D` /* visible in inspector - flips out atom - acts a ligature joiner*/,
      test: (
        <div>
          <textarea>{`testinglinebreaktestingline\u200Dbreak\u200A\u200Dtestinglinebreaktestinglinebreaktestinglinebreaktestinglinebreak`}</textarea>
          <div>
            <span>A</span>
            <span style={{ paddingLeft: ".03em" }}>B</span>
          </div>
        </div>
      ),
      contextual: false,
    },
    {
      name: "Zero Width Non-breaker Space (ZWNBSP)",
      code: `\uFEFF` /* chrome: visible as entity in inspector */,
      test: `${testTextStart}\uFEFF${testTextEnd}`,
      contextual: false,
    },
    {
      name: "Left to Right",
      code: `\u200E` /* chrome visible entity */,
      test: `${testTextStart}\u200E${testTextEnd}`,
      contextual: false,
    },
    {
      name: "Right to Left",
      code: `\u200F` /*visible in inspector - can cause puntuation order problems */,
      test: `${testTextStart}\u200F${testTextEnd}`,
      contextual: false,
    },
    {
      name: "Narrow Non-breaking Space (NNB SP)",
      code: `\u202F` /*visible in inspector - can cause puntuation order problems */,
      test: `${testTextStart}\u202F${testTextEnd}`,
      contextual: false,
    },
    {
      name: "NBSP",
      code: `\u00a0` /* visible in both */,
      test: `${testTextStart}\u00a0${testTextEnd}`,
      contextual: false,
    },
    {
      name: "mongolian sep",
      code: `\u180e` /* sometimes visible next to other special chars */,
      test: `${testTextStart}\u180e\u180e\u180e\u180e\u180e\u180e${testTextEnd}`,
      contextual: false,
    },
    {
      name: "Combining Enclosed Circle",
      code: `\u20dd`,
      test: `${testTextStart}\u20dd${testTextEnd}`,
      contextual: false,
    },
    {
      name: "word joiner",
      code: `\u2060` /* visible in safari */,
      test: `${testTextStart}\u2060${testTextEnd}`,
      contextual: false,
    },
    {
      name: "function app",
      code: `\u2061` /*  */,
      test: `${testTextStart}\u2061${testTextEnd}`,
      contextual: false,
    },
    {
      name: "invisble times ",
      code: `\u2062` /*   */,
      test: `${testTextStart}\u2062${testTextEnd}`,
      contextual: false,
    },
    {
      name: "invisible separator",
      code: `\u2063` /*  */,
      test: `${testTextStart}\u2063${testTextEnd}`,
      contextual: false,
    },
    // "invisible plus": `\u2064` /*  */,
    // unassigned: `\u2065` /*  */,
    // "ltr isolate": `\u2066` /* +++ invisible everywhere */,
    // "urtl isolate": `\u2067` /* right to left isolate - can cause punctuation order problems */,
    {
      name: "first strong",
      code: `\u2068`,
      test: `${testTextStart}\u2068${testTextEnd}`,
      contextual: false,
    },
    {
      name: "pop directional isolate (PDI)",
      code: `\u2069`,
      test: `${testTextStart}\u2069${testTextEnd}`,
      contextual: false,
    },
    // LRE: `\u202a`,
    // RLE: `\u202b`,
    // PDF: `\u202c`,
    // LRO: `\u202d`,
    // RLO: `\u202e`,
    // // "RLO PDF Test": `\u202e r to l \u202c`,
    // "u2069 pop directional": `\u2069` /**/,
    // "u206A inhibit symmetic swapping": `\u206A` /**/,
    // "u206B symmetric swapping": `\u206B`,
    // "u206C inhibit arabic form shaping": `\u206C`,
    // "u206D arabic form shaping": `\u206D`,
    // "u2028 line separator": `\u2028` /* +++ sometime visible in combination with other non-standard chars - causes line feed when pasted */,
    // "u2029 paragraph separator": `\u2029` /* visible in safari as ligature */,
    /**
     * Combining symbols
     * https://en.wikipedia.org/wiki/Combining_character
     * https://en.wikipedia.org/wiki/Combining_Diacritical_Marks
     * https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols
     **/
    {
      name: "combining grapheme joiner",
      code: `\u034F`,
      test: `${testTextStart}\u034F${testTextEnd}`,
      contextual: false,
    },
    // /* All private use chars are visible in Firefox */
    // uE000: `\uE000` /* firefox: visible */,
    /**
     * Variation Selectors
     * */
    {
      name: "Variation Selector 1",
      code: `\uFE00`,
      test: `${testTextStart}\uFE00${testTextEnd}`,
      contextual: false,
    },
    // "lang tag ": `\uE001` /* chrome: visible everwhere */,
    // "uE002 ": `\uE002` /* chrome: visible  */,
    // "cancel tag": `\uE007F` /* chrome: visible everwhere */,
    // /* unassigned -  reserved for special character definitions - chars get transformed when copy/pasted from fire-fox*/
    // "uFFF0 unasigned": `\uFFF0` /* +++ invisible everywhere */,
    // "uFFF1 unasigned": `\uFFF1` /* +++ invisible everywhere */,
    // "uFFF2 unasigned": `\uFFF2` /* +++ invisible everywhere */,
    // "uFFF3 unasigned": `\uFFF3` /* +++ invisible everywhere */,
    // "uFFF4 unasigned": `\uFFF4` /* +++ invisible everywhere */,
    // "uFFF5 unasigned": `\uFFF5` /* +++ invisible everywhere */,
    // "uFFF6 unasigned": `\uFFF6` /* +++ invisible everywhere */,
    // "uFFF7 unasigned": `\uFFF7` /* +++ invisible everywhere */,
    // "uFFF8 unasigned": `\uFFF8` /* +++ invisible everywhere */,
    /**
     *  annotation marks - these require starting and ending marks and can hide the content in between - must appear in the correct order
     **/
    {
      name: "Inter annotation start",
      code: `\uFFF9` /* +++ invisible everwhere / visible in combination with unasigned chars */,
      test: `${testTextStart}\uFFF9\uFFFA${testTextEnd}\uFFFB`,
      contextual: false,
    },
    // "uFFFA inter anno separator": `\uFFFA` /* +++ invisible everwhere */,
    // "uFFFB inter anno end": `\uFFFB` /* +++ invisible everwhere */,
    // "inter anno test": `\uFFF9a1\uFFFAa2\uFFFB` /* firefox does not hide annotation text */,
    // "uFFFC Object replacement": `\uFFFC`,
    // "uFFFD replacement char": `\uFFFD`,
    // "uFFFE non-character": `\uFFFE` /* not allowed in xhtml */,
    // "uFFFF non-character": `\uFFFF` /* not allowed in xhtml */,
    // "en space": `\u2002`,
    // "hair space": `\u200A`,
  ]

  const getCharMatrix = unicode => {
    // const unicode = props.unicode ? props.unicode : "error"
    const start = 32
    const end = 127
    let chars = []
    let matrix = []
    let table
    let rows

    for (var i = start; i <= end; i++) {
      chars.push(i)
    }

    return (
      <table className="unicode-table__char-matrix">
        {chars.map((charA, i) => (
          <tr className="unicode-table__char-matrix__row">
            {chars.map((charB, j) => (
              <td className="unicode-table__char-matrix__cell">
                {String.fromCharCode(charA)}
                {unicode}
                {String.fromCharCode(charB)}
              </td>
            ))}
          </tr>
        ))}
      </table>
    )
  }

  const normalizedTests = Object.entries(testCodes).map((key, value) => {
    if (typeof yourVariable === "object") {
      return value
    }
  })

  return (
    <div className="unicode-table">
      <table className="unicode-table__table">
        {testCodes.map(test => (
          <React.Fragment>
            <tr>
              <td className="unicode-table__name">{test.name}</td>
              <td>{charCodeUTF32(test.code)}</td>
              <td>u{charCodeUTF32(test.code).toString(16)}</td>
              <td className="unicode-table__value">{test.code}</td>
              <td className="unicode-table__value"></td>
            </tr>
            <tr>
              <td colSpan={5}>{test.test}</td>
            </tr>
            {test.contextual && (
              <tr className="unicode-table__char-matrix-row">
                <td colSpan={5}>{getCharMatrix(test.code)}</td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </table>
    </div>
  )
}
export default UnicodeTable
