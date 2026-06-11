export function getReadingTime(text: string): number {
  const charsPerMinute = 500;
  const minutes = Math.ceil(getWordCount(text) / charsPerMinute);
  return Math.max(1, minutes);
}

// 日本語 (かな + 漢字) は 1 文字 1 語、それ以外は空白区切りで数える
export function getWordCount(text: string): number {
  const cjkChars = (text.match(/[぀-ヿ㐀-鿿]/g) || []).length;
  const otherWords = text
    .replace(/[぀-ヿ㐀-鿿]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
  return cjkChars + otherWords;
}
