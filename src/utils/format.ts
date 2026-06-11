const dateFormatter = new Intl.DateTimeFormat('ja-JP', {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

// Hugo 時代の表示形式 (2006/01/02) に合わせる
export function formatDate(d: Date): string {
  return dateFormatter.format(d);
}

// Hugo の urlize と同じ規則でタグ・カテゴリ名を URL 用スラッグに変換する
// (小文字化 + 空白をハイフンに。日本語はそのまま)
export function slugify(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, '-');
}
